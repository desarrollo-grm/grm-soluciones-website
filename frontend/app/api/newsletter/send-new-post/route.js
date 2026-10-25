import { getAllContacts } from "@/src/server/services/contacts";
import { sendBatchEmail } from "@/src/server/services/email";
import { loadTemplate } from "@/src/server/services/templates";
import { verifySanityWebhookRequest } from "@/src/server/lib/webhook-auth";
import { claimCampaignSend, releaseCampaignSend } from "@/src/server/lib/campaign-idempotency";
import { escapeHtml, renderTemplate } from "@/src/server/lib/html";
import { parseJsonBody, readRequestBody } from "@/src/server/lib/request-body";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 512 * 1024;
const MAX_TITLE_LENGTH = 200;
const MAX_EXCERPT_LENGTH = 1000;

function skipWebhook(reason) {
    console.info(`[Send API] Skipping webhook payload: ${reason}`);
    return Response.json({ ok: true, skipped: reason });
}

export async function GET() {
    return Response.json({ ok: true, status: "healthy", route: "/send-new-post", timestamp: new Date().toISOString() });
}

export async function POST(request) {
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error("[Send API] SANITY_WEBHOOK_SECRET is not configured in the server environment.");
        return Response.json({ ok: false, error: "Webhook authentication is not configured." }, { status: 500 });
    }

    try {
        const body = await readRequestBody(request, { maxBytes: MAX_BODY_BYTES });
        if (body.response) return body.response;

        const auth = verifySanityWebhookRequest(request, body.rawBody, webhookSecret);
        if (!auth.ok) {
            console.warn(`[Send API] Rejected webhook request: ${auth.reason}`);
            return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const parsedBody = parseJsonBody(body.rawBody);
        if (parsedBody.response) return parsedBody.response;
        const post = parsedBody.data;

        if (post._type !== "post") {
            return skipWebhook("not a post document");
        }
        if (typeof post._id !== "string" || !post._id || post._id.startsWith("drafts.")) {
            return skipWebhook("not a published post");
        }
        if (typeof post._rev !== "string" || !post._rev) {
            return skipWebhook("missing post revision");
        }
        const slug = post.slug?.current;
        if (typeof slug !== "string" || !slug.trim()) {
            return skipWebhook("missing post slug");
        }

        const title = typeof post.title === "string" && post.title.trim()
            ? post.title.trim()
            : "Nuevo Post en GRM Soluciones";
        const excerpt = typeof post.excerpt === "string" && post.excerpt.trim()
            ? post.excerpt.trim()
            : "¡Hola! Tenemos un nuevo post para ti. Visita nuestro sitio web para más detalles.";
        if (title.length > MAX_TITLE_LENGTH || excerpt.length > MAX_EXCERPT_LENGTH) {
            return Response.json({ ok: false, error: "Post title or excerpt exceeds the allowed length." }, { status: 400 });
        }

        const { contacts = [] } = await getAllContacts();
        const recipients = contacts
            .filter((item) => typeof item?.email === "string")
            .map((item) => ({
                email: item.email.trim(),
                ...(item.name ? { name: String(item.name) } : {}),
                unsubToken: item.attributes?.EXT_ID || item.attributes?.ext_id || item.unsubToken,
            }))
            .filter((item) => item.email && typeof item.unsubToken === "string" && item.unsubToken.length > 0);
        if (recipients.length === 0) {
            return Response.json({ ok: false, error: "No subscribers found to send to." }, { status: 400 });
        }

        const tag = Array.isArray(post.tags) && typeof post.tags[0] === "string" && post.tags[0].trim()
            ? post.tags[0]
            : "Blog";
        const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${encodeURIComponent(slug.trim())}`;
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?token={{params.unsubToken}}`;
        const htmlContent = renderTemplate(await loadTemplate("new-post.html"), {
            title: escapeHtml(title),
            excerpt: escapeHtml(excerpt),
            "tags[0]": escapeHtml(tag),
            "post-url": escapeHtml(postUrl),
            unsubscribe_url: escapeHtml(unsubscribeUrl),
        });

        const claimed = await claimCampaignSend(post._id, post._rev);
        if (!claimed) {
            console.info(`[Send API] Campaign already sent for post ${post._id}.`);
            return Response.json({ ok: true, skipped: "already_sent" });
        }

        let response;
        try {
            response = await sendBatchEmail({
                subject: `${title} - Lo último de GRM-soluciones`,
                htmlContent,
                versions: recipients.map(({ email, name, unsubToken }) => ({
                    to: [{ email, ...(name ? { name } : {}) }],
                    params: { unsubToken },
                })),
            });
        } catch (error) {
            await releaseCampaignSend(post._id);
            throw error;
        }

        const messageIds = response?.messageIds || [];
        if (messageIds.length !== recipients.length) {
            await releaseCampaignSend(post._id);
            return Response.json({ ok: false, error: `Failed to send ${recipients.length - messageIds.length} messages.` }, { status: 207 });
        }
        return Response.json({ ok: true, messageIds });
    } catch (error) {
        console.error("[Send API] Request failed:", error);
        return Response.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
    }
}

export function PUT() {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
}

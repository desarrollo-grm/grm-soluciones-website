import { getAllContacts } from "@/src/server/services/contacts";
import { sendBatchEmail } from "@/src/server/services/email";
import { loadTemplate } from "@/src/server/services/templates";
import { verifySanityWebhookRequest } from "@/src/server/lib/webhook-auth";
import { claimCampaignSend, releaseCampaignSend } from "@/src/server/lib/campaign-idempotency";

export const runtime = "nodejs";

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
        const rawBody = await request.text();
        const auth = verifySanityWebhookRequest(request, rawBody, webhookSecret);
        if (!auth.ok) {
            console.warn(`[Send API] Rejected webhook request: ${auth.reason}`);
            return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        let post;
        try {
            post = JSON.parse(rawBody);
        } catch {
            return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
        }

        if (!post || typeof post !== "object" || post._type !== "post") {
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

        const title = post.title || "Nuevo Post en GRM Soluciones";
        const excerpt = post.excerpt || "¡Hola! Tenemos un nuevo post para ti. Visita nuestro sitio web para más detalles.";
        const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug.trim()}`;
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?token={{params.unsubToken}}`;
        const htmlContent = (await loadTemplate("new-post.html"))
            .replaceAll("{{title}}", title)
            .replaceAll("{{excerpt}}", excerpt)
            .replaceAll("{{tags[0]}}", Array.isArray(post.tags) ? post.tags[0] || "Blog" : "Blog")
            .replaceAll("{{post-url}}", postUrl)
            .replaceAll("{{unsubscribe_url}}", unsubscribeUrl);

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

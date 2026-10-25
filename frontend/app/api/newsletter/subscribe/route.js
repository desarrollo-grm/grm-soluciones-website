import { validate } from "deep-email-validator";
import { createContact } from "@/src/server/services/contacts";
import { verifyCaptcha } from "@/src/server/lib/captcha";
import { sendEmail } from "@/src/server/services/email";
import { loadTemplate } from "@/src/server/services/templates";
import { checkRateLimit } from "@/src/server/lib/rate-limit";
import { escapeHtml, renderTemplate } from "@/src/server/lib/html";
import { readJsonBody } from "@/src/server/lib/request-body";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_EMAIL_LENGTH = 254;

export async function GET() {
    return Response.json({ ok: true, status: "healthy", route: "/subscribe", timestamp: new Date().toISOString() });
}

export async function POST(request) {
    const limited = checkRateLimit(request, { limit: 5, windowMs: 60 * 60 * 1000 });
    if (limited) return limited;

    try {
        const body = await readJsonBody(request, { maxBytes: MAX_BODY_BYTES });
        if (body.response) return body.response;

        const data = body.data;
        const email = typeof data.email === "string" ? data.email.trim() : "";
        if (!email || email.length > MAX_EMAIL_LENGTH) {
            return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
        }

        if (typeof data?.captchaToken !== "string" || !(await verifyCaptcha(data.captchaToken))) {
            return Response.json({ ok: false, error: "Captcha verification failed. Please try again." }, { status: 400 });
        }
        const emailResult = await validate({
            email,
            validateRegex: true,
            validateMx: true,
            validateTypo: false,
            validateDisposable: true,
            validateSMTP: false
        });
        if (!emailResult.valid) {
            return Response.json({ ok: false, error: "Invalid email address.", raw_response:emailResult }, { status: 400 });
        }

        const { unsubToken, ...contact } = await createContact({ email });
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?token=${unsubToken}`;
        const htmlContent = renderTemplate(await loadTemplate("welcome.html"), {
            unsubscribe_url: escapeHtml(unsubscribeUrl),
        });
        const response = await sendEmail({
            subject: "Bienvenido a GRM Soluciones (y una pregunta rápida)",
            htmlContent,
            to: [{ email: contact.email }],
        });

        return Response.json({ ok: true, contact, messageId: response?.messageId }, { status: 201 });
    } catch (error) {
        console.error("[Subscribe API] Request failed:", error);
        if (error?.body?.code === "duplicate_parameter") {
            return Response.json({ ok: false, error: "This email is already subscribed.", code: "duplicate_parameter" }, { status: 409 });
        }
        return Response.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
    }
}

export function PUT() {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
}

import { validate } from "deep-email-validator";
import { verifyCaptcha } from "@/src/server/lib/captcha";
import { sendEmail } from "@/src/server/services/email";
import { loadTemplate } from "@/src/server/services/templates";
import { checkRateLimit } from "@/src/server/lib/rate-limit";
import { escapeHtml, renderTemplate } from "@/src/server/lib/html";
import { readJsonBody } from "@/src/server/lib/request-body";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32 * 1024;
const FIELD_LIMITS = { name: 100, email: 254, telephone: 20, message: 5000 };

export async function GET() {
    return Response.json({ ok: true, status: "healthy", route: "/contact", timestamp: new Date().toISOString() });
}

export async function POST(request) {
    const limited = checkRateLimit(request, { limit: 5, windowMs: 60 * 60 * 1000 });
    if (limited) return limited;

    try {
        const body = await readJsonBody(request, { maxBytes: MAX_BODY_BYTES });
        if (body.response) return body.response;

        const data = body.data;
        const name = typeof data.name === "string" ? data.name.trim() : "";
        const email = typeof data.email === "string" ? data.email.trim() : "";
        const message = typeof data.message === "string" ? data.message.trim() : "";
        const telephoneValue = data.telephone ?? "";
        const telephone = typeof telephoneValue === "string" ? telephoneValue.trim() : null;

        if (!name || !email || !message) {
            return Response.json({ ok: false, error: "Missing or invalid contact fields." }, { status: 400 });
        }
        if (name.length > FIELD_LIMITS.name
            || email.length > FIELD_LIMITS.email
            || telephone.length > FIELD_LIMITS.telephone
            || message.length > FIELD_LIMITS.message) {
            return Response.json({ ok: false, error: "Contact fields exceed the allowed length." }, { status: 400 });
        }
        if (typeof data.captchaToken !== "string" || !(await verifyCaptcha(data.captchaToken))) {
            return Response.json({ ok: false, error: "Captcha verification failed. Please try again." }, { status: 400 });
        }
        if (!(await validate({
            email,
            validateRegex: true,
            validateMx: true,
            validateTypo: false,
            validateDisposable: true,
            validateSMTP: false
        })).valid) {
            return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
        }

        const supportTemplate = await loadTemplate("support-contact.html");
        const supportHtmlContent = renderTemplate(supportTemplate, {
            name: escapeHtml(name),
            email: escapeHtml(email),
            message: escapeHtml(message),
            timestamp: escapeHtml(new Date().toISOString()),
            telephone: escapeHtml(telephone || "Not provided"),
        });
        const supportEmail = process.env.SUPPORT_EMAIL;
        if (!supportEmail) throw new Error("SUPPORT_EMAIL is not configured in the server environment.");

        await sendEmail({
            to: [{ email: supportEmail }],
            subject: `Nuevo mensaje de contacto de ${name}`,
            htmlContent: supportHtmlContent,
        });
        const confirmation = renderTemplate(await loadTemplate("contact-confirmation.html"), {
            name: escapeHtml(name),
        });
        await sendEmail({
            to: [{ email }],
            subject: "Mensaje recibido - Gracias por contactarnos",
            htmlContent: confirmation,
            replyTo: { email: supportEmail, name: "GRM Soluciones - Soporte" },
        });

        return Response.json({ ok: true, message: "Contact message sent successfully." });
    } catch (error) {
        console.error("[Contact API] Request failed:", error);
        return Response.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
    }
}

export function PUT() {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
}

import { validate } from "deep-email-validator";
import { verifyCaptcha } from "@/src/server/lib/captcha";
import { sendEmail } from "@/src/server/email";
import { loadTemplate } from "@/src/server/templates";
import { checkRateLimit } from "@/src/server/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    return Response.json({ ok: true, status: "healthy", route: "/contact", timestamp: new Date().toISOString() });
}

export async function POST(request) {
    const limited = checkRateLimit(request, { limit: 5, windowMs: 60 * 60 * 1000 });
    if (limited) return limited;

    try {
        const data = await request.json();
        if (!["name", "email", "message"].every((field) => typeof data?.[field] === "string" && data[field].trim())) {
            return Response.json({ ok: false, error: "Missing or invalid contact fields." }, { status: 400 });
        }
        if (!(await validate(data.email)).valid) {
            return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
        }
        if (typeof data.captchaToken !== "string" || !(await verifyCaptcha(data.captchaToken))) {
            return Response.json({ ok: false, error: "Captcha verification failed. Please try again." }, { status: 400 });
        }

        const supportTemplate = await loadTemplate("support-contact.html");
        const supportHtmlContent = supportTemplate
            .replace("{{name}}", data.name)
            .replace("{{email}}", data.email)
            .replace("{{message}}", data.message)
            .replace("{{timestamp}}", new Date().toISOString())
            .replace("{{telephone}}", data.telephone || "Not provided");
        const supportEmail = process.env.SUPPORT_EMAIL;
        if (!supportEmail) throw new Error("SUPPORT_EMAIL is not configured in the server environment.");

        await sendEmail({
            to: [{ email: supportEmail }],
            subject: `Nuevo mensaje de contacto de ${data.name}`,
            htmlContent: supportHtmlContent,
        });
        const confirmation = (await loadTemplate("contact-confirmation.html")).replace("{{name}}", data.name);
        await sendEmail({
            to: [{ email: data.email }],
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

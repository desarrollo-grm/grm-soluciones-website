import fs from 'fs/promises';
import path from 'path';

function isValidEmail(email) {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeRecipients(value) {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter((item) => item && typeof item.email === "string")
        .map((item) => ({
            email: item.email.trim(),
            ...(item.name ? { name: String(item.name) } : {}),
        }))
        .filter((item) => isValidEmail(item.email));
}

export default async function handleWelcome(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({
            ok: true,
            status: "healthy",
            route: "/send",
            timestamp: new Date().toISOString(),
        });
    }

    if (req.method !== "POST") {
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({
            ok: false,
            error: "Method not allowed",
        });
    }

    try {
        const { sendEmail } = await import("./lib/sendEmail.js");

        const templatePath = path.join(process.cwd(), 'static', 'welcome.html');
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        const body = req.body && typeof req.body === "object" ? req.body : {};
        const recipients = normalizeRecipients(body.to);

        if (body.to !== undefined && recipients.length === 0) {
            return res.status(400).json({
                ok: false,
                error: "Invalid recipient list. Expected [{ email, name? }] with valid email(s).",
            });
        }

        // Replace placeholders in the template with actual values from the request body
        const unsubLink = `https://api.grm-soluciones.com/api/unsubscribe?email=${encodeURIComponent(recipients[0]?.email || '')}`;
        const htmlContent = htmlTemplate.replace('{{unsubscribe_url}}', unsubLink);

        const response = await sendEmail({
            subject: "Bienvenido a GRM Soluciones (y una pregunta rápida)",
            htmlContent: htmlContent,
            to: recipients.length > 0 ? recipients : undefined,
            sender: body.sender && typeof body.sender === "object" ? body.sender : undefined,
        });

        return res.status(200).json({
            ok: true,
            messageId: response?.messageId || null,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({
            ok: false,
            error: message,
        });
    }
}

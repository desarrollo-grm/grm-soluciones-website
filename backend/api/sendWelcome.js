// api/send.js

import fs from 'fs/promises'; 
import path from 'path'; 
const { sendEmail } = await import("./lib/sendEmail.js");

function isValidEmail(email) { 
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
}

function normalizeRecipients(value) { 
    if (!Array.isArray(value)) { return []; }

    return value
        .filter((item) => item && typeof item.email === "string")
        .map((item) => ({
            email: item.email.trim(),
            ...(item.name ? { name: String(item.name) } : {}),
        }))
        .filter((item) => isValidEmail(item.email));
}

export default async function handleWelcome(req, res) { 
    console.log(`[Send API] handleWelcome initialized.`);

    if (req.method === "GET") { 
        return res.status(200).json({ ok: true, status: "healthy", route: "/send", timestamp: new Date().toISOString() }); 
    }

    if (req.method !== "POST") {
        console.warn(`[Send API] Method not allowed: ${req.method}`);
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const templatePath = path.join(process.cwd(), 'static', 'welcome.html');
        console.log(`[Send API] Reading HTML template from: ${templatePath}`);
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        const body = req.body && typeof req.body === "object" ? req.body : {};
        const recipients = normalizeRecipients(body.to);
        
        console.log(`[Send API] Normalized recipients:`, recipients);

        if (body.to !== undefined && recipients.length === 0) {
            console.warn(`[Send API] Validation failed. No valid recipients found in payload.`);
            return res.status(400).json({
                ok: false,
                error: "Invalid recipient list. Expected [{ email, name? }] with valid email(s).",
            });
        }

        const unsubLink = `https://api.grm-soluciones.com/api/unsubscribe?email=${encodeURIComponent(recipients[0]?.email || '')}`;
        const htmlContent = htmlTemplate.replace('{{unsubscribe_url}}', unsubLink);

        console.log(`[Send API] Calling sendEmail for ${recipients.length} recipient(s)...`);
        
        const response = await sendEmail({
            subject: "Bienvenido a GRM Soluciones (y una pregunta rápida)",
            htmlContent: htmlContent,
            to: recipients.length > 0 ? recipients : undefined,
            sender: body.sender && typeof body.sender === "object" ? body.sender : undefined,
        });

        console.log(`[Send API] Email sent successfully! Message ID: ${response?.messageId}`);
        
        return res.status(200).json({ ok: true, messageId: response?.messageId || null });
        
    } catch (error) {
        console.error(`[Send API] Exception caught during handleWelcome:`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({ ok: false, error: message });
    }
}
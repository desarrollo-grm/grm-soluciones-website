import fs from "fs/promises";
import path from "path";
import { validate } from "deep-email-validator";

const { verifyCaptcha } = await import("./lib/captcha.js");
const { sendEmail } = await import("./lib/sendEmail.js");

async function isValidEmail(email) {
    const result = await validate(email);
    return { valid: result.valid, reason: result.reason };
}

export default async function handleContact(req, res) {
    const startedAt = Date.now();
    console.log(`[Contact API] Request received. Method: ${req.method}`);

    if (req.method === "GET") { 
        console.log(`[Contact API] Health check completed.`);
        return res.status(200).json({ ok: true, status: "healthy", route: "/contact", timestamp: new Date().toISOString() }); 
    }

    if (req.method !== "POST") {
        console.warn(`[Contact API] Method not allowed: ${req.method}`);
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const contactData = req.body && typeof req.body === "object" ? req.body : {};
        if (!contactData.email || typeof contactData.email !== "string") {
            console.warn(`[Contact API] Validation failed. Missing or invalid email.`);
            return res.status(400).json({ ok: false, error: "Missing or invalid email address." });
        }
        if (!contactData.message || typeof contactData.message !== "string") {
            console.warn(`[Contact API] Validation failed. Missing or invalid message.`);
            return res.status(400).json({ ok: false, error: "Missing or invalid message." });
        }
        if (!contactData.name || typeof contactData.name !== "string") {
            console.warn(`[Contact API] Validation failed. Missing or invalid name.`);
            return res.status(400).json({ ok: false, error: "Missing or invalid name." });
        }
        console.log(`[Contact API] Required fields validated.`);

        // 1. Validate email
        const { valid, reason } = await isValidEmail(contactData.email);
        if (!valid) {
            console.warn(`[Contact API] Validation failed. Invalid email. Reason: ${reason}`);
            return res.status(400).json({ ok: false, error: "Invalid email address." });
        }
        console.log(`[Contact API] Email validated.`);

        // 2. Validate captcha token
        if (!contactData.captchaToken || typeof contactData.captchaToken !== "string") {
            console.warn(`[Contact API] Validation failed. Missing or invalid captcha token.`);
            return res.status(400).json({ ok: false, error: "Missing or invalid captcha token." });
        }
        const isHuman = await verifyCaptcha(contactData.captchaToken);
        if (!isHuman) {
            console.warn(`[Contact API] Captcha verification failed. Possible bot detected.`);
            return res.status(400).json({ ok: false, error: "Captcha verification failed. Please try again." });
        }
        console.log(`[Contact API] Captcha verified.`);
        
        // 3. Load the contact support template
        const supportTemplatePath = path.join(process.cwd(), "static", "support-contact.html");
        const supportHtmlTemplate = await fs.readFile(supportTemplatePath, "utf-8");
        console.log(`[Contact API] Support email template loaded.`);
        const supportHtmlContent = supportHtmlTemplate.replace("{{name}}", contactData.name)
            .replace("{{email}}", contactData.email)
            .replace("{{message}}", contactData.message)
            .replace("{{timestamp}}", new Date().toISOString())
            .replace("{{telephone}}", contactData.telephone || "Not provided");

        const supportEmailSubject = `Nuevo mensaje de contacto de ${contactData.name}`;

        // 4. Send the contact email to support
        if (!process.env.SUPPORT_EMAIL) {
            throw new Error("SUPPORT_EMAIL is not configured in the server environment.");
        }

        await sendEmail({
            to: [{ email: process.env.SUPPORT_EMAIL }],
            subject: supportEmailSubject,
            htmlContent: supportHtmlContent,
        });
        console.log(`[Contact API] Support email sent.`);

        // 5. Load the contact confirmation template
        const confirmationTemplatePath = path.join(process.cwd(), "static", "contact-confirmation.html");
        const confirmationHtmlTemplate = await fs.readFile(confirmationTemplatePath, "utf-8");
        const confirmationHtmlContent = confirmationHtmlTemplate.replace("{{name}}", contactData.name);
        
        const confirmationEmailSubject = `Mensaje recibido - Gracias por contactarnos`;
        await sendEmail({
            to: [{ email: contactData.email }],
            subject: confirmationEmailSubject,
            htmlContent: confirmationHtmlContent,
            replyTo: { email: process.env.SUPPORT_EMAIL, name: "GRM Soluciones - Soporte" },
        });
        console.log(`[Contact API] Confirmation email sent.`);

        console.log(`[Contact API] Request completed successfully in ${Date.now() - startedAt}ms.`);
        return res.status(200).json({ ok: true, message: "Contact message sent successfully." });
    }
    catch (error) {
        console.error(`[Contact API] Request failed after ${Date.now() - startedAt}ms:`, error);
        return res.status(500).json({ ok: false, error: "Unexpected server error" });
    }

}
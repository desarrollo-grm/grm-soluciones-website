import { randomUUID } from "node:crypto";
import fs from "fs/promises";
import path from "path";
import { validate } from "deep-email-validator";

const { createContact } = await import("./lib/contacts.js");
const { verifyCaptcha } = await import("./lib/captcha.js");
const { sendEmail } = await import("./lib/sendEmail.js");

async function isValidEmail(email) { 
    const res = await validate(email);
    return { valid: res.valid, reason: res.reason };
}

export default async function handleSubscribe(req, res) { 
    console.log(`[Contact API] handleSubscribe initialized.`);

    if (req.method === "GET") { 
        return res.status(200).json({ ok: true, status: "healthy", route: "/subscribe", timestamp: new Date().toISOString() }); 
    }

    if (req.method !== "POST") {
        console.warn(`[Contact API] Method not allowed: ${req.method}`);
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const contactData = req.body && typeof req.body === "object" ? req.body : {};

        // 1. Validate email
        const { valid, reason } = await isValidEmail(contactData.email);
        if (!valid) {
            console.warn(`[Contact API] Validation failed. Invalid email: ${contactData.email}, Reason: ${reason}`);
            return res.status(400).json({ ok: false, error: "Invalid email address." });
        }

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

        // 3. Create contact in Brevo with the UNSUB_TOKEN attribute
        console.log(`[Contact API] Proceeding to create contact for: ${contactData.email}`);
        const { unsubToken, ...contact } = await createContact(contactData);

        console.log(`[Contact API] Contact created successfully. Email: ${contact.email}, UnsubToken: ${unsubToken}`);

        // 4. Construct tokenized unsubscribe link
        const backendUrl = process.env.GRM_API_URL;
        const unsubLink = `${backendUrl}/api/unsubscribe?token=${unsubToken}`;

        // 5. Read and prepare the welcome email
        const templatePath = path.join(process.cwd(), "static", "welcome.html");
        let htmlTemplate = await fs.readFile(templatePath, "utf-8");
        const htmlContent = htmlTemplate.replace("{{unsubscribe_url}}", unsubLink);

        // 7. Send email with both footer URL and RFC 8058 headers
        console.log(`[Contact API] Calling sendEmail for welcome email to: ${contactData.email}`);
        const response = await sendEmail({
            subject: "Bienvenido a GRM Soluciones (y una pregunta rápida)",
            htmlContent: htmlContent,
            to: [{ email: contactData.email }],
            sender: undefined
        });

        console.log(`[Contact API] Email sent successfully! Message ID: ${response?.messageId}`);
        return res.status(201).json({ ok: true, contact, messageId: response?.messageId });

    } catch (error) {
        console.error(`[Contact API] Exception caught during handleSubscribe:`, error.message || error);

        if (error?.body?.code === "duplicate_parameter") {
            console.warn(`[Contact API] Duplicate email attempt blocked.`);
            return res.status(409).json({
                ok: false,
                error: "This email is already subscribed.",
                code: "duplicate_parameter"
            });
        }

        return res.status(500).json({ ok: false, error: "Unexpected server error" });
    }
}
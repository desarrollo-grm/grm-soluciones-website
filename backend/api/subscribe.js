const { createContact } = await import("./lib/contacts.js");
const { verifyCaptcha } = await import("./lib/captcha.js");
const { sendEmail } = await import("./lib/sendEmail.js");
import { validate } from 'deep-email-validator'
import fs from 'fs/promises';
import path from 'path';

async function isValidEmail(email) { 
    const res = await validate(email)
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

        // Validate email
        const { valid, reason } = await isValidEmail(contactData.email);
        if (!valid) {
            console.warn(`[Contact API] Validation failed. Invalid email: ${contactData.email}, Reason: ${reason}`);
            return res.status(400).json({ ok: false, error: "Invalid email address." });
        }

        // Validate captcha token
        if (!contactData.captchaToken || typeof contactData.captchaToken !== "string") {
            console.warn(`[Contact API] Validation failed. Missing or invalid captcha token.`);
            return res.status(400).json({ ok: false, error: "Missing or invalid captcha token." });
        }
        const isHuman = await verifyCaptcha(contactData.captchaToken);
        if (!isHuman) {
            console.warn(`[Contact API] Captcha verification failed. Possible bot detected.`);
            return res.status(400).json({ ok: false, error: "Captcha verification failed. Please try again." });
        }

        // Create contact in Brevo
        console.log(`[Contact API] Proceeding to create contact for: ${contactData.email}`);
        const contact = await createContact(contactData); 
        
        // Contact return check

        // Read the welcome email template and build email content
        const templatePath = path.join(process.cwd(), 'static', 'welcome.html');

        console.log(`[Contact API] Reading HTML template from: ${templatePath}`);
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        const unsubLink = `https://api.grm-soluciones.com/api/unsubscribe?email=${encodeURIComponent(contactData.email)}`;
        const htmlContent = htmlTemplate.replace('{{unsubscribe_url}}', unsubLink);

        // Send welcome email
        console.log(`[Contact API] Calling sendEmail for welcome email to: ${contactData.email}`); // Log the email being sent ??
        
        const response = await sendEmail({
            subject: "Bienvenido a GRM Soluciones (y una pregunta rápida)",
            htmlContent: htmlContent,
            to: [{email: contactData.email}],
            sender: undefined,
        });

        console.log(`[Contact API] Email sent successfully! Message ID: ${response?.messageId}`);

        console.log(`[Contact API] Success! Contact created:`, contact);
        return res.status(201).json({ ok: true, contact: contact, messageId: response?.messageId });

    } catch (error) {
        console.error(`[Contact API] Exception caught during handleSubscribe:`, error.message || error);

        // Catch Brevo's specific "duplicate_parameter" error
        if (error?.body?.code === 'duplicate_parameter') {
            console.warn(`[Contact API] Duplicate email attempt blocked.`);
            
            // 409 Conflict is the standard status code for "Resource already exists"
            return res.status(409).json({
                ok: false,
                error: "This email is already subscribed.",
                code: "duplicate_parameter"
            });
        }

        console.error(`[Contact API] Unexpected error during subscription process:`, error.message || error);
        const message = "Unexpected server error";
        return res.status(500).json({ ok: false, error: message });
    }
};
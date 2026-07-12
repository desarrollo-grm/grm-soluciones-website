import fs from 'fs/promises'; 
import path from 'path'; 
const { sendEmail } = await import("./lib/sendEmail.js");
const { getAllContacts } = await import("./lib/contacts.js");

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

export default async function handleSendNewPost(req, res) { 
    console.log(`[Send API] handleSendNewPost initialized.`);

    if (req.method === "GET") { 
        return res.status(200).json({ ok: true, status: "healthy", route: "/send-new-post", timestamp: new Date().toISOString() }); 
    }

    if (req.method !== "POST") {
        console.warn(`[Send API] Method not allowed: ${req.method}`);
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const templatePath = path.join(process.cwd(), 'static', 'new-post.html');
        console.log(`[Send API] Reading HTML template from: ${templatePath}`);
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        const body = req.body && typeof req.body === "object" ? req.body : {};
        const contacts = await getAllContacts(); // Fetch all contacts from the database

        console.log(`[Send API] Fetched ${contacts.contacts.length} contacts from the database.`);

        const recipients = normalizeRecipients(contacts.contacts);

        console.log(`[Send API] Fetched ${recipients.length} recipients from the database.`);

        if (recipients.length === 0) {
            console.warn(`[Send API] No contacts found in the database. Aborting.`);
            return res.status(400).json({ ok: false, error: "No subscribers found to send to." });
        }

        // TODO : Haddle image with sanity
        const title = body.title || "Nuevo Post en GRM Soluciones";
        const excerpt = body.excerpt || "¡Hola! Tenemos un nuevo post para ti. Visita nuestro sitio web para más detalles.";
        const slug = body.slug.current || '';
        const tags = Array.isArray(body.tags) ? body.tags : [];
        const postUrl = `${process.env.GRM_WEBSITE_URL}/blog/${slug}`;
        // TODO : My mail? 
        const unsubLink = `${process.env.GRM_API_URL}/api/unsubscribe`;

        let htmlContent = htmlTemplate.replace('{{title}}', title);
        htmlTemplate = htmlContent.replace('{{excerpt}}', excerpt);
        htmlTemplate = htmlContent.replace('{{tags[0]}}', tags[0] || '');
        htmlContent = htmlContent.replace('{{post-url}}', postUrl);
        htmlContent = htmlContent.replace('{{unsubscribe_url}}', unsubLink);

        console.log(`[Send API] Calling sendEmail for ${recipients.length} recipient(s)...`);
        
        const response = await sendEmail({
            subject: `${title} - Lo último de GRM-soluciones`,
            htmlContent: htmlContent,
            to: [{ email: process.env.BREVO_SENDER_EMAIL }],
            bcc: recipients.length > 0 ? recipients : undefined,
            sender: { email: process.env.BREVO_SENDER_EMAIL },
        });

        console.log(`[Send API] Email sent successfully! Message ID: ${response?.messageId}`);
        
        return res.status(200).json({ ok: true, messageId: response?.messageId || null });
        
    } catch (error) {
        console.error(`[Send API] Exception caught during handleSendNewPost:`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({ ok: false, error: message });
    }
}
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
            unsubToken: item.attributes?.EXT_ID || item.attributes?.ext_id || item.unsubToken,
        }))
        .filter((item) => isValidEmail(item.email) && typeof item.unsubToken === "string" && item.unsubToken.length > 0);
}

function renderPostTemplate(template, { title, excerpt, postUrl, unsubscribeUrl, tag }) {
    return template
        .replaceAll('{{title}}', title)
        .replaceAll('{{excerpt}}', excerpt)
        .replaceAll('{{tags[0]}}', tag)
        .replaceAll('{{post-url}}', postUrl)
        .replaceAll('{{unsubscribe_url}}', unsubscribeUrl);
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
        const htmlTemplate = await fs.readFile(templatePath, 'utf-8');

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
        const slug = body.slug?.current || '';
        const tags = Array.isArray(body.tags) ? body.tags : [];
        const postUrl = `${process.env.GRM_WEBSITE_URL}/blog/${slug}`;
        const subject = `${title} - Lo último de GRM-soluciones`;
        const senderEmail = process.env.BREVO_SENDER_EMAIL;
        const senderName = process.env.BREVO_SENDER_NAME || "GRM Soluciones";

        if (!senderEmail) {
            throw new Error("BREVO_SENDER_EMAIL is not configured in the server environment.");
        }

        const sendResults = [];

        console.log(`[Send API] Calling sendEmail for ${recipients.length} recipient(s)...`);

        for (const recipient of recipients) {
            const unsubscribeUrl = `${process.env.GRM_API_URL}/api/unsubscribe?token=${encodeURIComponent(recipient.unsubToken)}`;
            const htmlContent = renderPostTemplate(htmlTemplate, {
                title,
                excerpt,
                postUrl,
                unsubscribeUrl,
                tag: tags[0] || '',
            });

            try {
                const response = await sendEmail({
                    subject,
                    htmlContent,
                    to: [{ email: recipient.email, ...(recipient.name ? { name: recipient.name } : {}) }],
                    sender: { email: senderEmail, name: senderName },
                    headers: {
                        "List-Unsubscribe": `<${unsubscribeUrl}>`,
                        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
                    },
                });

                sendResults.push({
                    email: recipient.email,
                    messageId: response?.messageId || null,
                    ok: true,
                });
            } catch (recipientError) {
                const message = recipientError instanceof Error ? recipientError.message : "Unexpected server error";
                console.error(`[Send API] Failed to send to ${recipient.email}:`, recipientError);
                sendResults.push({
                    email: recipient.email,
                    ok: false,
                    error: message,
                });
            }
        }

        const failed = sendResults.filter((item) => !item.ok);
        const sentCount = sendResults.length - failed.length;

        if (failed.length > 0) {
            return res.status(207).json({
                ok: false,
                sentCount,
                failedCount: failed.length,
                results: sendResults,
            });
        }

        return res.status(200).json({
            ok: true,
            sentCount,
            messageIds: sendResults.map((item) => item.messageId).filter(Boolean),
        });
        
    } catch (error) {
        console.error(`[Send API] Exception caught during handleSendNewPost:`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({ ok: false, error: message });
    }
}
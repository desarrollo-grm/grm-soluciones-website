// api/unsubscribe.js

const { deleteContact } = await import("./lib/contacts.js");

function isValidEmail(email) { 
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
}

// TODO handle GET /api/unsubscribe?email=... for unsubscribe link 
export default async function handleUnsubscribe(req, res) { 
    console.log(`[Unsubscribe API] handleUnsubscribe initialized.`);

    // Smartly grab the email from the URL query (GET) or body (POST/DELETE)
    const email = req.method === "GET" ? req.query?.email : req.body?.email;

    // If it's a GET request and NO email is provided, treat it as a health check
    if (req.method === "GET" && !email) { 
        return res.status(200).json({ ok: true, status: "healthy", route: "/unsubscribe", timestamp: new Date().toISOString() }); 
    }

    // Only allow GET, POST, or DELETE
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        console.warn(`[Unsubscribe API] Method not allowed: ${req.method}`);
        res.setHeader("Allow", "GET, POST, DELETE");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        if (!isValidEmail(email)) {
            console.warn(`[Unsubscribe API] Validation failed. Invalid email: ${email}`);
            return res.status(400).json({ ok: false, error: "Invalid email address." });
        }

        console.log(`[Unsubscribe API] Proceeding to delete contact for: ${email}`);
        await deleteContact(email);
        
        console.log(`[Unsubscribe API] Success! Contact deleted: ${email}`);
        
        // Note: If this was clicked from an email (GET request), the user will see this raw JSON in their browser.
        // If you want to show a nice page instead, uncomment the line below and add your frontend URL:
        // if (req.method === "GET") return res.redirect("https://grm-soluciones.com/unsubscribed-success");

        return res.status(200).json({ 
            ok: true, 
            message: "Successfully unsubscribed." 
        });

    } catch (error) {
        console.error(`[Unsubscribe API] Exception caught during handleUnsubscribe:`, error.message || error);

        // Catch Brevo's specific error if the contact doesn't exist
        if (error?.body?.code === 'document_not_found') {
            console.warn(`[Unsubscribe API] Contact not found (already unsubscribed): ${email}`);
            
            // Return 404 because the resource doesn't exist
            return res.status(404).json({
                ok: false,
                error: "This email is not on our mailing list.",
                code: "document_not_found"
            });
        }

        const message = error instanceof Error ? error.message : "Unexpected server error";
        return res.status(500).json({ ok: false, error: message });
    }
};
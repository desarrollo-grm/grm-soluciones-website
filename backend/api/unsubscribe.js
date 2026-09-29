// api/unsubscribe.js

const { unsubscribeContact } = await import("./lib/contacts.js");

const frontendUrl = process.env.GRM_WEBSITE_URL;

// Validate UUIDv4 format
function isValidToken(token) {
    return (
        typeof token === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token)
    );
}

export default async function handleUnsubscribe(req, res) {
    console.log(`[Unsubscribe API] Request received: ${req.method}`);

    // Grab the token from query (GET or RFC 8058 POST) or JSON body
    const token = req.query?.token || req.body?.token;

    // Reject unsupported methods
    if (!["GET", "POST"].includes(req.method)) {
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    // Validate the token
    if (!isValidToken(token)) {
        console.warn(`[Unsubscribe API] Invalid or missing token: ${token}`);
        return res.status(400).json({ ok: false, error: "Invalid or missing token." });
    }

    // -------------------------------------------------------------------------
    // 1. GET Request: Human clicked footer link or an email scanner crawled it
    // -------------------------------------------------------------------------
    if (req.method === "GET") {
        // DO NOT unsubscribe here.
        // Redirect to your frontend confirmation page where the user can click "Confirm".
        const frontendConfirmUrl = `${frontendUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
        return res.redirect(302, frontendConfirmUrl);
    }

    // -------------------------------------------------------------------------
    // 2. POST Request: RFC 8058 One-Click (Gmail/Yahoo) OR frontend confirmation
    // -------------------------------------------------------------------------
    try {
        console.log(`[Unsubscribe API] Blocklisting contact with token: ${token}`);
        await unsubscribeContact(token);

        console.log(`[Unsubscribe API] Successfully unsubscribed token: ${token}`);
        return res.status(200).json({
            ok: true,
            message: "Successfully unsubscribed.",
        });

    } catch (error) {
        console.error(`[Unsubscribe API] Error during unsubscribe:`, error.message || error);

        // IDEMPOTENCY: If the contact was already deleted or doesn't exist,
        // treat it as successful (200 OK) so clients do not fail or retry.
        if (error?.body?.code === "document_not_found" || error?.status === 404) {
            console.warn(`[Unsubscribe API] Token not found in Brevo (already removed/unsubscribed).`);
            return res.status(200).json({
                ok: true,
                message: "You are already unsubscribed.",
            });
        }

        const message = error instanceof Error ? error.message : "Unexpected server error";
        return res.status(500).json({ ok: false, error: message });
    }
}
const { createContact } = await import("./lib/contacts.js");

function isValidEmail(email) {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handleSubscribe(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({
            ok: true,
            status: "healthy",
            route: "/subscribe",
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
        const contactData = req.body && typeof req.body === "object" ? req.body : {};

        if (!isValidEmail(contactData.email)) {
            return res.status(400).json({
                ok: false,
                error: "Invalid email address.",
            });
        }

        const contact = await createContact(contactData);

        return res.status(201).json({
            ok: true,
            contact: contact,
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({
            ok: false,
            error: message,
        });
    }
};
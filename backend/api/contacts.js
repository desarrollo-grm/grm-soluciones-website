// api/contact.js

const { createContact } = await import("./lib/contacts.js");

function isValidEmail(email) { 
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
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

        if (!isValidEmail(contactData.email)) {
            console.warn(`[Contact API] Validation failed. Invalid email: ${contactData.email}`);
            return res.status(400).json({ ok: false, error: "Invalid email address." });
        }

        console.log(`[Contact API] Proceeding to create contact for: ${contactData.email}`);
        const contact = await createContact(contactData);
        
        console.log(`[Contact API] Success! Contact created:`, contact);
        return res.status(201).json({ ok: true, contact: contact });

    } catch (error) {
        console.error(`[Contact API] Exception caught during handleSubscribe:`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error";

        return res.status(500).json({ ok: false, error: message });
    }
};
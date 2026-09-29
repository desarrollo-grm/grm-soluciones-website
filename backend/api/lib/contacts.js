import { brevoClient } from "./brevo.js";

import { randomUUID } from "node:crypto";

export async function createContact(contactData) {
    if (!contactData || typeof contactData !== "object") {
        throw new Error("Invalid contact data. Expected an object with contact details.");
    }
    if (!contactData.email || typeof contactData.email !== "string") {
        throw new Error("Invalid contact data. 'email' is required and must be a string.");
    }

    // 1. Generate or preserve an unsubscribe token
    const unsubToken = randomUUID();

    // 2. Sanitize payload: Brevo only accepts specific root keys
    // (email, attributes, listIds, updateEnabled, etc.)
    // This strips out extraneous fields like 'captchaToken'.
    const payload = {
        email: contactData.email.trim().toLowerCase(),
        attributes: {
            EXT_ID: unsubToken,
        },
        updateEnabled: false, 
    };

    // 3. Call Brevo
    const response = await brevoClient.contacts.createContact(payload);

    // 4. Return Brevo's response along with the generated token
    // Brevo's API only returns { id: 123 }, NOT the attributes.
    // We must return the token so the caller can build the unsubscribe link.
    return {
        ...response,
        unsubToken,
        email: payload.email,
    };
}

export async function deleteContact(email) {
    if (!email || typeof email !== 'string') {
        throw new Error("Invalid email. Expected a string.");
    }
    // Use the email to find the contact and delete it
    return await brevoClient.contacts.deleteContact({identifier: email, identifierType: 'email_id'});
}

export async function unsubscribeContact(token) {
    if (!token || typeof token !== "string") {
        throw new Error("Invalid unsubscribe token.");
    }
    // Use the token to find the contact and delete it
    return await brevoClient.contacts.deleteContact({identifier: token, identifierType: 'ext_id'});
}

export async function getAllContacts() {
    return await brevoClient.contacts.getContacts();
}
import { randomUUID } from "node:crypto";
import { getBrevoClient } from "./lib/brevo.js";

export async function createContact(contactData) {
    if (!contactData || typeof contactData !== "object" || typeof contactData.email !== "string") {
        throw new Error("Invalid contact data. 'email' is required and must be a string.");
    }
    const unsubToken = randomUUID();
    const email = contactData.email.trim().toLowerCase();
    const response = await getBrevoClient().contacts.createContact({
        email,
        attributes: { EXT_ID: unsubToken },
        updateEnabled: false,
    });
    return { ...response, unsubToken, email };
}

export function unsubscribeContact(token) {
    return getBrevoClient().contacts.deleteContact({ identifier: token, identifierType: "ext_id" });
}

export function getAllContacts() {
    return getBrevoClient().contacts.getContacts();
}

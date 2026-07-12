import { brevoClient } from "./brevo.js";

export async function createContact(contactData) {
    if (!contactData || typeof contactData !== 'object') {
        throw new Error("Invalid contact data. Expected an object with contact details.");
    }
    if (!contactData.email || typeof contactData.email !== 'string') {
        throw new Error("Invalid contact data. 'email' is required and must be a string.");
    }
    return await brevoClient.contacts.createContact(contactData);
}

export async function deleteContact(email) {
    if (!email || typeof email !== 'string') {
        throw new Error("Invalid email. Expected a string.");
    }
    return await brevoClient.contacts.deleteContact({identifier: email, identifierType: 'email_id'});
}

export async function getAllContacts() {
    return await brevoClient.contacts.getContacts();
}
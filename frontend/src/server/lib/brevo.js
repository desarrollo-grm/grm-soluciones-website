import { BrevoClient } from "@getbrevo/brevo";

let client;

export function getBrevoClient() {
    if (!client) {
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            throw new Error("BREVO_API_KEY is not configured in the server environment.");
        }
        client = new BrevoClient({ apiKey });
    }
    return client;
}

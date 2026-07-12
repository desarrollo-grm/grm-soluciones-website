import { BrevoClient } from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured in the server environment.");
}

export const brevoClient = new BrevoClient({
    apiKey,
});

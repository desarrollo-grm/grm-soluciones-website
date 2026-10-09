import { getBrevoClient } from "../lib/brevo.js";

function getDefaultSender() {
    const email = process.env.BREVO_SENDER_EMAIL;
    if (!email) {
        throw new Error("BREVO_SENDER_EMAIL is not configured in the server environment.");
    }
    return { email, name: process.env.BREVO_SENDER_NAME || "GRM Soluciones" };
}

export async function sendEmail({ subject, htmlContent, to, replyTo, sender } = {}) {
    if (!Array.isArray(to) || to.length === 0) {
        throw new Error("No recipients provided.");
    }
    return getBrevoClient().transactionalEmails.sendTransacEmail({
        subject,
        htmlContent,
        to,
        sender: sender || getDefaultSender(),
        replyTo,
    });
}

export async function sendBatchEmail({ subject, htmlContent, sender, versions } = {}) {
    if (!Array.isArray(versions) || versions.length === 0) {
        throw new Error("versions must be a non-empty array");
    }
    const recipients = versions.reduce((total, version) => total + (version.to?.length || 0), 0);
    if (recipients > 2000) {
        throw new Error(`Total recipients exceed Brevo's limit of 2000. Found: ${recipients}`);
    }
    return getBrevoClient().transactionalEmails.sendTransacEmail({
        subject,
        htmlContent,
        sender: sender || getDefaultSender(),
        messageVersions: versions,
    });
}

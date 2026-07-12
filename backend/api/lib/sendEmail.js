import { brevoClient } from "./brevo.js";

function getDefaultSender() {
    const email = process.env.BREVO_SENDER_EMAIL;

    if (!email) {
        throw new Error("BREVO_SENDER_EMAIL is not configured in the server environment.");
    }

    return {
        email,
        name: process.env.BREVO_SENDER_NAME || "GRM Soluciones",
    };
}

export async function sendEmail({
    subject = "Brevo test message",
    htmlContent = "<html><body><p>Brevo test email from server runtime.</p></body></html>",
    to,
    cc,
    bcc,
    sender,
} = {}) {
    const recipients = Array.isArray(to) && to.length > 0 ? to : getDefaultRecipients();
    const ccRecipients = Array.isArray(cc) && cc.length > 0 ? cc : undefined;
    const bccRecipients = Array.isArray(bcc) && bcc.length > 0 ? bcc : undefined;

    if (recipients.length === 0) {
        throw new Error("No recipients provided. Set BREVO_TEST_RECIPIENTS or pass a non-empty 'to' array.");
    }

    const response = await brevoClient.transactionalEmails.sendTransacEmail({
        subject,
        htmlContent,
        to: recipients,
        cc: ccRecipients,
        bcc: bccRecipients,
        sender: sender || getDefaultSender(),
    });

    return response;
}

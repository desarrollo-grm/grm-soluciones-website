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
    headers
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
        headers,
    });

    return response;
}

export async function sendBatchEmail({
    subject = "Brevo batch test message",
    htmlContent = "<html><body><p>Brevo batch test email from server runtime.</p></body></html>",
    sender,
    headers,
    versions,
} = {}) {

    if (!Array.isArray(versions) || versions.length === 0) {
        throw new Error("versions must be a non-empty array");
    }
    if(!versions.every(version => Array.isArray(version.to) && version.to.length > 0)){
        throw new Error("Each version should include 'to' recipients.");
    }

    const totalRecipients = versions.reduce((total, current) => {
        return total + 
            (current.to?.length || 0) + 
            (current.cc?.length || 0) + 
            (current.bcc?.length || 0);
    }, 0);

    if (totalRecipients === 0) {
        throw new Error("Total recipients count is zero. Ensure each version has at least one recipient.");
    }
    else if (totalRecipients > 2000) {
        throw new Error(`Total recipients exceed Brevo's limit of 2000. Found: ${totalRecipients}`);
    }

    const payload = {
        subject,
        htmlContent,
        sender: sender || getDefaultSender(),
        headers,
        messageVersions: versions,
    };

    const response = await brevoClient.transactionalEmails.sendTransacEmail(payload);

    return response;
}
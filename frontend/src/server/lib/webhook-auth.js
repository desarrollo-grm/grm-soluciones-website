import { createHmac, timingSafeEqual } from "node:crypto";

const SIGNATURE_HEADER = "sanity-webhook-signature";
const SIGNATURE_PATTERN = /^t=(\d+)[, ]+v1=([^, ]+)$/;
const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;

function safeEqual(left, right) {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getTimestampMs(timestamp) {
    const value = Number(timestamp);
    return Number.isFinite(value) && value >= 1e12 ? value : null;
}

export function verifySanityWebhookRequest(request, rawBody, secret) {
    const signature = request.headers.get(SIGNATURE_HEADER);

    if (signature) {
        const match = signature.trim().match(SIGNATURE_PATTERN);
        if (!match) {
            return { ok: false, reason: "Malformed signature header." };
        }

        const [, timestamp, providedSignature] = match;
        const timestampMs = getTimestampMs(timestamp);
        if (timestampMs === null || Math.abs(Date.now() - timestampMs) > MAX_SIGNATURE_AGE_MS) {
            return { ok: false, reason: "Expired signature." };
        }

        const expectedSignature = createHmac("sha256", secret)
            .update(`${timestamp}.${rawBody}`)
            .digest("base64url");
        if (!safeEqual(expectedSignature, providedSignature)) {
            return { ok: false, reason: "Invalid signature." };
        }

        return { ok: true };
    }

    const authorization = request.headers.get("authorization");
    const bearerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
    if (bearerToken && safeEqual(secret, bearerToken)) {
        return { ok: true };
    }

    return { ok: false, reason: "Missing credentials." };
}

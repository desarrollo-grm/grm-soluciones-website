const buckets = globalThis.__grmRateLimitBuckets || new Map();
globalThis.__grmRateLimitBuckets = buckets;

export function getClientIp(request) {
    return request.headers.get("x-nf-client-connection-ip")
        || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || "unknown";
}

export function checkRateLimit(request, { limit, windowMs }) {
    const key = `${getClientIp(request)}:${limit}:${windowMs}`;
    const now = Date.now();
    const current = buckets.get(key);

    if (!current || current.expiresAt <= now) {
        buckets.set(key, { count: 1, expiresAt: now + windowMs });
        return null;
    }

    current.count += 1;
    if (current.count > limit) {
        return Response.json(
            { ok: false, error: "Too many requests. Please try again later." },
            { status: 429, headers: { "Retry-After": String(Math.ceil((current.expiresAt - now) / 1000)) } },
        );
    }

    return null;
}

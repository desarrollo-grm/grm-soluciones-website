const JSON_CONTENT_TYPE = /^application\/json(?:\s*;|$)/i;

function jsonError(error, status) {
    return { response: Response.json({ ok: false, error }, { status }) };
}

export async function readRequestBody(request, { maxBytes } = {}) {
    const contentType = request.headers.get("content-type")?.trim() || "";
    if (!JSON_CONTENT_TYPE.test(contentType)) {
        return jsonError("Content-Type must be application/json.", 415);
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength !== null) {
        const declaredBytes = Number(contentLength);
        if (!Number.isFinite(declaredBytes) || declaredBytes < 0) {
            return jsonError("Invalid Content-Length header.", 400);
        }
        if (declaredBytes > maxBytes) {
            return jsonError("Request body is too large.", 413);
        }
    }

    let rawBody;
    try {
        rawBody = await request.text();
    } catch {
        return jsonError("Unable to read request body.", 400);
    }

    if (new TextEncoder().encode(rawBody).length > maxBytes) {
        return jsonError("Request body is too large.", 413);
    }

    return { rawBody };
}

export function parseJsonBody(rawBody) {
    let data;
    try {
        data = JSON.parse(rawBody);
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return jsonError("JSON body must be an object.", 400);
    }

    return { data };
}

export async function readJsonBody(request, options) {
    const body = await readRequestBody(request, options);
    if (body.response) {
        return body;
    }
    return parseJsonBody(body.rawBody);
}

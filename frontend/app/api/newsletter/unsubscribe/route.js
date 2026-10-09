import { unsubscribeContact } from "@/src/server/services/contacts";

export const runtime = "nodejs";

function isValidToken(token) {
    return typeof token === "string"
        && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token);
}

export async function GET(request) {
    const token = new URL(request.url).searchParams.get("token");
    if (!isValidToken(token)) {
        return Response.json({ ok: false, error: "Invalid or missing token." }, { status: 400 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    return Response.redirect(`${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`, 302);
}

export async function POST(request) {
    try {
        const data = await request.json();
        if (!isValidToken(data?.token)) {
            return Response.json({ ok: false, error: "Invalid or missing token." }, { status: 400 });
        }
        await unsubscribeContact(data.token);
        return Response.json({ ok: true, message: "Successfully unsubscribed." });
    } catch (error) {
        console.error("[Unsubscribe API] Request failed:", error);
        if (error?.body?.code === "document_not_found" || error?.status === 404) {
            return Response.json({ ok: true, message: "You are already unsubscribed." });
        }
        return Response.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
    }
}

export function PUT() {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
}

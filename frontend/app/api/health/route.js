export const runtime = "nodejs";

export function GET() {
    return Response.json({
        ok: true,
        status: "healthy",
        route: "/api/health",
        timestamp: new Date().toISOString(),
    });
}

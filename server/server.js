import express from "express";
import { loadEnvFile } from "node:process";

loadEnvFile();

const app = express();
const port = Number(process.env.API_PORT || 8787);

app.use(express.json({ limit: "1mb" }));

app.all("/api/send-welcome", async (req, res) => {
    try {
        const { default: handleWelcome } = await import("../api/send.js");
        await handleWelcome(req, res);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";
        res.status(500).json({
            ok: false,
            error: message,
        });
    }
});

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        ok: true,
        status: "healthy",
        route: "/api/health",
        timestamp: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`[api server] listening on http://localhost:${port}`);
});

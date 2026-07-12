import express from "express"; 
import { loadEnvFile } from "node:process";

loadEnvFile();

const app = express(); 
const port = Number(process.env.API_PORT || 8787);

app.use(express.json({ limit: "1mb" }));

// ---------------------------------------------------------
// ADDED: Global Request Logger Middleware
// ---------------------------------------------------------
app.use((req, res, next) => {
    console.log(`\n[${new Date().toISOString()}] [Express] ${req.method} ${req.url}`);
    if (req.method === "POST" || req.method === "PUT") {
        console.log(`[Express] Payload:`, JSON.stringify(req.body, null, 2));
    }
    next();
});

app.all("/api/send-welcome", async (req, res) => { 
    try { 
        console.log(`[Express] Routing to handleWelcome...`);
        const { default: handleWelcome } = await import("./api/send.js"); 
        await handleWelcome(req, res);
    } catch (error) { 
        console.error(`[Express] Route Error (/api/send-welcome):`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error"; 
        res.status(500).json({ ok: false, error: message });
    } 
});

app.all("/api/subscribe", async (req, res) => { 
    try { 
        console.log(`[Express] Routing to handleSubscribe...`);
        // FIXED: Changed from "./api/contacts.js" to "./api/contact.js" based on your file name
        const { default: handleSubscribe } = await import("./api/contacts.js"); 
        await handleSubscribe(req, res); 
    } catch (error) { 
        console.error(`[Express] Route Error (/api/subscribe):`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error"; 
        res.status(500).json({ ok: false, error: message }); 
    } 
});

app.all("/api/unsubscribe", async (req, res) => { 
    try { 
        console.log(`[Express] Routing to handleUnsubscribe...`);
        const { default: handleUnsubscribe } = await import("./api/unsubscribe.js"); 
        await handleUnsubscribe(req, res); 
    } catch (error) { 
        console.error(`[Express] Route Error (/api/unsubscribe):`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error"; 
        res.status(500).json({ ok: false, error: message }); 
    } 
});

app.get("/api/health", (_req, res) => { 
    console.log(`[Express] Health check pinged`);
    res.status(200).json({ ok: true, status: "healthy", route: "/api/health", timestamp: new Date().toISOString() }); 
});

app.listen(port, () => { 
    console.log(`[api server] listening on http://localhost:${port}`); 
});
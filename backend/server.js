import express from "express"; 
import { loadEnvFile } from "node:process";
import rateLimit from "express-rate-limit";

loadEnvFile();

const app = express(); 
const port = Number(process.env.API_PORT || 8787);

// ---------------------------------------------------------
// CRITICAL FOR CPANEL & VERCEL:
// Express must trust the reverse proxy to get the real client IP 
// via the `X-Forwarded-For` header.
// ---------------------------------------------------------
app.set("trust proxy", 1);

app.use(express.json({ limit: "1mb" }));

// ---------------------------------------------------------
// Logger Middleware
// ---------------------------------------------------------
app.use((req, res, next) => {
    console.log(`\n[${new Date().toISOString()}] [Express] ${req.method} ${req.url}`);
    if (req.method === "POST" || req.method === "PUT") {
        console.log(`[Express] Payload:`, JSON.stringify(req.body, null, 2));
    }
    next();
});

// ---------------------------------------------------------
// Rate Limiter Configurations
// ---------------------------------------------------------

// 1. General limiter for all API endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // 100 requests per IP per window
  standardHeaders: "draft-8", // Returns standard `RateLimit-*` headers
  legacyHeaders: false, // Disables `X-RateLimit-*` headers
  message: {
    ok: false,
    error: "Too many requests. Please try again later.",
  },
});

// 2. Stricter limiter for sensitive / email-triggering endpoints
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // Max 5 requests per IP per hour
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many submissions from this IP. Please try again after an hour.",
  },
});

// Apply general rate limit to all /api/ routes
app.use("/api/", generalLimiter);

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------


app.all("/api/send-welcome", async (req, res) => { 
    try { 
        console.log(`[Express] Routing to handleWelcome...`);
        const { default: handleWelcome } = await import("./api/sendWelcome.js"); 
        await handleWelcome(req, res);
    } catch (error) { 
        console.error(`[Express] Route Error (/api/send-welcome):`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error"; 
        res.status(500).json({ ok: false, error: message });
    } 
});

app.all("/api/send-new-post", async (req, res) => {
    try {
        console.log(`[Express] Routing to handleSendNewPost...`);
        const { default: handleSendNewPost } = await import("./api/sendNewPost.js");
        await handleSendNewPost(req, res);
    } catch (error) {
        console.error(`[Express] Route Error (/api/send-new-post):`, error);
        const message = error instanceof Error ? error.message : "Unexpected server error";
        res.status(500).json({ ok: false, error: message });
    }
});

app.all("/api/subscribe", strictLimiter, async (req, res) => { 
    try { 
        console.log(`[Express] Routing to handleSubscribe...`);
        const { default: handleSubscribe } = await import("./api/subscribe.js"); 
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
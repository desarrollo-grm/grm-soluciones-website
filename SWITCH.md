# Switching website hosting to Cloudflare

The frontend and API are deployed as a Cloudflare Worker through OpenNext. The Sanity Studio remains a separate static deployment.

## Deploy the Worker

From the repository root:

```bash
npm install
npx wrangler login
npx wrangler r2 bucket create grm-soluciones-opennext-cache
npm run cf:deploy
```

The R2 bucket command is only needed once. Configure the private environment variables with `wrangler secret put` and the public `NEXT_PUBLIC_*` variables in the Cloudflare deployment environment. See [`frontend/README.md`](frontend/README.md) for the complete variable list and deployment details.

## Preserve cPanel email

Changing the website host does not require moving email hosting. Keep the existing cPanel nameservers and mail records. Update only the web records required by the Cloudflare custom domain setup:

1. Add the domain in Cloudflare and follow the DNS records it provides for the Worker.
2. Keep the MX records pointed at the cPanel mail host.
3. Ensure `mail.<domain>` remains an A record or CNAME pointing to the cPanel mail host, not to the Worker.
4. Verify sending and receiving email before removing the previous website records.

Cloudflare provisions HTTPS for the Worker domain after DNS is active. Confirm the deployed site and `/api/health` endpoint before switching the production DNS record.

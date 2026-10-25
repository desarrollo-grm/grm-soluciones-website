# TODO

## DEV

### General
- [ x ] Social media
- [ ] Maybe .cfg
- [ x ] not-found page

### Optimization
- [ X ] Optimize images with responsive Next.js images and Sanity format conversion.
- [ X ] Next.js Caching / Static Generation
Removed the root-level `force-dynamic` setting so static pages are pre-rendered at build time.
Blog post pages use SSG with five-minute ISR revalidation, while the filtered and paginated blog index remains dynamic because it reads URL search parameters.
- [ X ] Overuse of "use client" (App Router)

### About us
- [ ] Hero section colors

### Saint e integraciones
- [ ] Crear logo de saint svg
- [ ] Hide for small view ports

### Soporte 
- [ ] Hero quitar 1vh

### Blog
- [ X ] Page number from the last implementation.

### Blog Post
- [ X ] The suggested blog posts should be left

### Footer & Header
- [ - ] Logo svg better visibility : set it to white, maybe could be orange or so.

### Equipos y Maquinas fiscales
- [ X ] Set icons for Equipos y Maquinas fiscales 

### Contactanos
- [ ] Diffrent links to contactanos with filled about page or secret params
- [ X ] Contactanos doing something
- [ X ] Validate properly telefono number
- [ x ] Map is requesting an API Key

### Create pages
- [ X ] unsubscribe fail

### API

- [ X ] Auth for send endpoints
    - [ X ] Google catpcha
      - [  ] Test bot call
    - [ X ] Filter for temporary emails : deep-email-validator
    - [ X ] Strict IP Rate Limiting
- [ ] handdle cover image in new post email
- [ X ] handdle unsubscribe link, tokens...
    - [ X ] handdle on batch email
    - [ X ] Seems to work, have to test on dev. 
- [ ] batch email with api token
- [ X ] subscribe + send welcome
- [ X ] send to grm contactanos
- [ - ] security

#### API review findings

Priority 1 — security and correctness
- [x] Authenticate `POST /api/newsletter/send-new-post` with a Sanity webhook signature or shared secret; fail closed when the secret is missing.
- [x] Dedupe by post `_id` + `_rev` so webhook retries do not resend the campaign.
- [x] HTML-escape every substituted value in `send-new-post` (`title`, `excerpt`, `tags[0]`) and `contact` (`name`, `email`, `message`, `telephone`); encode `slug.current` before building the post URL.
- [x] Return `400` on malformed JSON and enforce content type, body size, and field length caps (`name`, `email`, `telephone`, `message`, `title`, `excerpt`).
- [x] Verify captcha before running `deep-email-validator` MX lookups; check reCAPTCHA `action` and `hostname`, and remove the full response log.

Priority 2 — reliability
- [ ] Move rate limiting to a durable store and key it per route+IP (the in-memory `Map` resets per serverless instance and never prunes).
- [ ] Remove `raw_response` from the subscribe error response.
- [ ] Fix `unsubscribe` error handling to use `error?.statusCode === 404` instead of `error?.status`.
- [ ] Validate `NEXT_PUBLIC_SITE_URL` at startup and reject empty or malformed `slug` values before building email links.
- [ ] Send the contact confirmation without failing the whole request when the support email already succeeded; same for the welcome email after subscribing.
- [ ] Handle `messageId` as well as `messageIds` in the batch response and remove the dead `207` path.
- [ ] Map submitted fields explicitly in `createContact` (e.g., `FIRSTNAME`) and normalize email casing.
- [ ] Add the `/api/newsletter/subscribe` fallback in `useNewsletterSubscription`
- [ ] Remove the duplicate health GET handlers from POST-only routes (keep `/api/health`).
- [ ] Standardize responses: `403` for captcha failures and one consistent `{ ok, error }` shape.
- [ ] Cache email templates in module scope instead of reading from disk on every send.
- [ ] Paginate `getAllContacts` (Brevo defaults to 50 per page) and chunk campaigns into ≤2000-recipient batches
- [ ] Stop deleting contacts on unsubscribe; mark them unsubscribed/blacklisted in Brevo instead so history and dedupe are preserved.

### SEO (frontend)

#### Critical

- [ X ] Add route-specific SEO metadata for every indexable page: title, meta description, canonical URL, Open Graph tags, and Twitter card tags.
- [ X ] Address client-rendered SPA SEO for public pages, especially Sanity blog posts, with SSR, SSG, or a reliable prerendering strategy.

#### High priority

- [ X ] Add `robots.txt` and a generated `sitemap.xml` covering all indexable routes.
- [ X ] Change the document language from `en` to `es`.
- [ X ] Add `noindex, nofollow` metadata to `/unsubscribe` and `/unsubscribed-success`.
- [ X ] Add canonical URL handling for blog search, product, category, and other query-parameter variations.
- [ X ] Add Article structured data for blog posts.
- [ X ] Add Organization or LocalBusiness structured data with the company name, location, phone, services, and social profiles.
- [ x ] Replace placeholder About page content (`XXXX` dates and Lorem ipsum).
- [ x ] Replace the incorrect fiscal-equipment hero image and alt text currently referring to digital invoicing.

#### Medium priority

- [ ] Create a dedicated 1200x630 Open Graph image and include its dimensions and MIME type in social metadata.
- [ ] Add favicon, Apple touch icon, web app manifest, and theme-color metadata.
- [ ] Add BreadcrumbList structured data for nested routes such as blog posts.
- [ ] Add Google and Bing verification metadata after obtaining the production verification tokens. (after v1.0.0)
- [x] Add GA4 and GSC
- [X] Ensure every indexable page has one meaningful `<h1>`, including About, Contact, Blog, and Condominio.
- [X] Review heading hierarchy so subtitles and cards use semantic heading levels consistently.
- [ x ] Replace placeholder social links and generic social profile URLs with the company’s real profiles.
- [ ] Verify every social platform URL is official, active, and consistent with the business identity used on the site.
- [x] Validate all public email addresses across the website and backend are the official corporate addresses, not personal or test addresses.
- [ ] Check that phone numbers, WhatsApp links, Google Maps locations, and email addresses are consistent across all pages and marketing channels.
- [X] Fix spelling and grammar issues in SEO-visible page copy, including the Condominio page.

### Deployment configuration
- [x] Create and configure the final corporate email addresses for sender, support, newsletter, and unsubscribe assistance.
- [X] Replace personal/test email addresses in, `frontend/src/components/layout/Footer.jsx`, `frontend/src/components/pages/contact/ContactInfo.jsx`, and `frontend/src/page-sections/UnsubscribePage.jsx`.
- [x] Verify the final corporate email list matches the production sender, support, newsletter, and unsubscribe inboxes.
- [x] Confirm the official company social profiles, contact emails, and phone numbers match the sources of truth used in the structured data and footer/contact components.
- [-] Change Apis
- [ ] Verify the production sender domain in Brevo with SPF, DKIM, and DMARC.
- [x] Replace and verify company contact details: address, phone numbers, WhatsApp, Google Maps location, and social profile URLs.
- [ ] Test the production contact, subscription, welcome email, unsubscribe, and new-post email flows.

## Lauch Day
When you deploy your site live to your production domain:
- [ ] Submit Sitemap to GSC:
    In Google Search Console, go to Sitemaps in the left menu.
    Enter your sitemap path (e.g., https://yourdomain.com/sitemap.xml) and click Submit.
- [ ] Link GA4 and Search Console:
In GA4, navigate to Admin > Product Links > Search Console Links.
Click Link and select your verified GSC property.
This allows you to view organic Google search queries and search impressions alongside user behavior inside GA4.
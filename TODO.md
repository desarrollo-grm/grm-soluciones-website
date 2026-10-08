# TODO

## GRM 

- [ ] Content for about 
- [ ] Content for Saint e Intégraciones
- [ X ] Content for Equipos y Maquinas fiscales

## DEV

### Deployment configuration
- [ ] Create and configure the final corporate email addresses for sender, support, newsletter, and unsubscribe assistance.
- [ ] Replace personal/test email addresses in `backend/.env`, `frontend/src/components/layout/Footer.jsx`, `frontend/src/components/pages/contact/ContactInfo.jsx`, and `frontend/src/page-sections/UnsubscribePage.jsx`.
- [ ] Revoke and regenerate the Brevo API key currently used for development.
- [ ] Revoke and regenerate the Google reCAPTCHA secret and register the production domain; update the public site key.
- [ ] Revoke and regenerate the ngrok authentication token if it has been shared outside the local machine.
- [ ] Configure production `NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`, `GRM_WEBSITE_URL`, and `GRM_API_URL` with HTTPS URLs.
- [ ] Set `ALLOW_INDEXING=true` only in the production frontend deployment; keep it disabled in development.
- [ ] Set the production `API_PORT` provided by the hosting platform.
- [ ] Confirm whether Sanity project `no20m7ap` and dataset `production` will remain the company production CMS or be migrated.
- [ ] Verify the production sender domain in Brevo with SPF, DKIM, and DMARC.
- [ ] Replace and verify company contact details: address, phone numbers, WhatsApp, Google Maps location, and social profile URLs.
- [ ] Test the production contact, subscription, welcome email, unsubscribe, and new-post email flows.
- [ ] Confirm that no private keys, secrets, or local `.env` files are committed or exposed in the frontend bundle.

### Optimization
- [ ] Optimaze images
- [ X ] Next.js Caching / Static Generation
Removed the root-level `force-dynamic` setting so static pages are pre-rendered at build time.
Blog post pages use SSG with five-minute ISR revalidation, while the filtered and paginated blog index remains dynamic because it reads URL search parameters.
- [ X ] Overuse of "use client" (App Router)

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
- [ ] Map is requesting an API Key

### Create pages
- [ X ] unsubscribe fail

### API

- [ X ] Auth for send endpoints
    - [ X ] Google catpcha
      - [  ] Test bot call
    - [ X ] Filter for temporary emails : deep-email-validator
    - [ X ] Strict IP Rate Limiting
- [ ] handdle cover image in new post email
- [ - ] handdle unsubscribe link, tokens...
    - [ X ] handdle on batch email
    - [ ] Seems to work, have to test on dev. 
- [ ] batch email with api token
- [ X ] subscribe + send welcome
- [ X ] send to grm contactanos
- [ - ] security

## SEO (frontend)

### Critical

- [ ] Add route-specific SEO metadata for every indexable page: title, meta description, canonical URL, Open Graph tags, and Twitter card tags.
- [ X ] Address client-rendered SPA SEO for public pages, especially Sanity blog posts, with SSR, SSG, or a reliable prerendering strategy.

### High priority

- [ X ] Add `robots.txt` and a generated `sitemap.xml` covering all indexable routes.
- [ ] Change the document language from `en` to `es`.
- [ ] Add `noindex, nofollow` metadata to `/unsubscribe` and `/unsubscribed-success`.
- [ ] Add canonical URL handling for blog search, product, category, and other query-parameter variations.
- [ ] Add Article structured data for blog posts.
- [ ] Add Organization or LocalBusiness structured data with the company name, location, phone, services, and social profiles.
- [ ] Replace placeholder About page content (`XXXX` dates and Lorem ipsum).
- [ ] Replace the incorrect fiscal-equipment hero image and alt text currently referring to digital invoicing.

### Medium priority

- [ ] Ensure every indexable page has one meaningful `<h1>`, including About, Contact, Blog, and Condominio.
- [ ] Replace placeholder social links and generic social profile URLs with the company’s real profiles.
- [ ] Fix spelling and grammar issues in SEO-visible page copy, including the Condominio page.
- [ ] Review heading hierarchy so subtitles and cards use semantic heading levels consistently.
- [ ] Reduce the initial JavaScript bundle and optimize the oversized logo SVG for Core Web Vitals.
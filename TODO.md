# TODO

## GRM 

- [ ] Content for about 
- [ ] Content for Saint e Intégraciones
- [ X ] Content for Equipos y Maquinas fiscales

## DEV

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
- [ ] Address client-rendered SPA SEO for public pages, especially Sanity blog posts, with SSR, SSG, or a reliable prerendering strategy.

### High priority

- [ ] Add `robots.txt` and a generated `sitemap.xml` covering all indexable routes.
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
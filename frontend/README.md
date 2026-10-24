# GRM Soluciones frontend

The frontend is the public website and API for GRM Soluciones. It is a Next.js 15 application using the App Router, React 19, Tailwind CSS, Leaflet, and Sanity for blog content. API route handlers under `app/api/` run as Netlify serverless functions.

This directory is an npm workspace in the repository root. Commands can be run from either the repository root with `--workspace=frontend` or from this directory.

## Prerequisites

- Node.js 18 or newer
- npm 7 or newer
- The repository dependencies installed from the root directory

From the repository root:

```bash
npm install
```

## Development

Start only the frontend from the repository root:

```bash
npm run dev:frontend
```

Or run it from this directory:

```bash
npm run dev
```

The development server runs at <http://localhost:3000>. To run the complete local stack (frontend and Sanity Studio), use `npm run dev` from the repository root.

## Environment variables

Create `frontend/.env` for local development. Environment files are intentionally not committed. The frontend reads the following variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base URL used for metadata, canonical URLs, the sitemap, and `robots.txt` | `https://grm.net.ve` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project used for blog content and images | `no20m7ap` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset used by the public client | `production` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key used by the client-side provider | None |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Contact form endpoint | `/api/contact` |
| `NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT` | Newsletter subscription endpoint | `/api/newsletter/subscribe` |
| `NEXT_PUBLIC_UNSUBSCRIPTION_ENDPOINT` | Newsletter unsubscribe endpoint | `/api/newsletter/unsubscribe` |
| `BREVO_API_KEY` | Private Brevo API key used by server routes | None |
| `BREVO_SENDER_EMAIL` | Verified Brevo sender address | None |
| `BREVO_SENDER_NAME` | Brevo sender display name | `GRM Soluciones` |
| `GOOGLE_RECAPTCHA_SECRET_KEY` | Private reCAPTCHA v3 secret | None |
| `SUPPORT_EMAIL` | Address that receives contact messages | None |
| `SANITY_WEBHOOK_SECRET` | Secret configured on the Sanity webhook; validates the `sanity-webhook-signature` header (or `Authorization: Bearer <secret>`) before sending a new-post campaign | None |
| `ALLOW_INDEXING` | Enables search-engine indexing only when exactly `true` | Disabled |

The `NEXT_PUBLIC_*` variables are exposed to browser code, so they must not contain secrets. Keep private API variables only in the frontend deployment environment.

### Local API requests

Forms use relative `/api/*` URLs by default. Next.js route handlers process those requests on the same origin:

```text
Browser and API:  http://localhost:3000/api/contact
```

## Application structure

```text
frontend/
├── app/                    # App Router routes, metadata, robots, and sitemap
│   ├── blog/[slug]/        # Dynamic blog post pages
│   └── ...                 # Public page routes
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared layout and page components
│   ├── data/               # Local data and Sanity post formatting
│   ├── hooks/              # Reusable client hooks
│   ├── page-sections/      # Page-level compositions
│   ├── sanity/             # Sanity client, image builder, and queries
│   ├── styles/             # Global CSS and Tailwind entrypoints
│   └── types/              # Shared TypeScript types
├── next.config.mjs         # Image hosting and response headers
└── package.json
```

The project uses the `@/` import alias for paths relative to `frontend/`, for example:

```js
import Header from '@/src/components/layout/Header';
```

## Routes

The main public routes are:

- `/`
- `/about-us`
- `/contact`
- `/facturacion-digital`
- `/equipos-maquinas-fiscales`
- `/condominio`
- `/soporte`
- `/blog`
- `/blog/[slug]`
- `/unsubscribe`
- `/unsubscribed-success`

The blog reads published content through the Sanity client in `src/sanity/`. Static page routes and blog post URLs are included in the generated sitemap.

## Rendering and caching

The root layout does not force dynamic rendering, so public routes without request-time data are pre-rendered as static HTML during the production build. Blog post pages use `generateStaticParams` and are incrementally regenerated every five minutes when Sanity content changes.

The `/blog` index is dynamic because search, category, product, and pagination filters are read from URL search parameters. This is intentional; the unfiltered post detail pages and other public routes retain static generation or ISR where applicable.

When adding server-side data to a route, avoid `dynamic = 'force-dynamic'` unless the route genuinely depends on request-time data. Keep interactive behavior in focused client components and preserve a Suspense boundary around client components that use navigation hooks such as `useSearchParams`.

## SEO and indexing safety

Indexing is opt-in. Unless `ALLOW_INDEXING=true`:

- responses include `X-Robots-Tag: noindex, nofollow`;
- page metadata contains `noindex, nofollow`; and
- `robots.txt` disallows all crawlers.

Indexable routes define their own title, description, canonical URL, Open Graph metadata, and Twitter card metadata. Blog articles additionally use article-specific Open Graph fields and their cover image. Blog query-parameter variations keep `/blog` as the canonical URL and receive `noindex, follow` metadata, while empty parameters and `page=1` are treated as the clean blog URL.

For a production deployment, set `NEXT_PUBLIC_SITE_URL` to the public HTTPS URL and explicitly set `ALLOW_INDEXING=true`. When indexing is enabled, `robots.txt` still excludes `/api/`, `/unsubscribe`, and `/unsubscribed-success`.

Verify a non-indexing deployment with:

```bash
curl -I https://<frontend-domain>/
curl https://<frontend-domain>/robots.txt
```

## Scripts

Run these from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Equivalent root-workspace commands include:

```bash
npm run build --workspace=frontend
npm run lint --workspace=frontend
npm run start --workspace=frontend
```

## Production deployment

1. Install dependencies from the repository root with `npm install`.
2. Configure the frontend environment variables, including the private API variables, `SANITY_WEBHOOK_SECRET` (the same secret set on the Sanity webhook that calls `/api/newsletter/send-new-post`), and `NEXT_PUBLIC_SITE_URL`.
3. Build the workspace:

   ```bash
   npm run build --workspace=frontend
   ```

4. Start the Next.js server:

   ```bash
   npm run start --workspace=frontend
   ```

The frontend and API are deployed together by Netlify. In the Netlify web
interface, set `frontend` as the base directory and `npm run build` as the
build command. Netlify should detect the Next.js app and use its generated
`.next` output. Keep `ALLOW_INDEXING` disabled for preview or staging
deployments and enable it only for the intended production domain.

## Related workspaces

- [`../studio`](../studio) contains the Sanity Studio used to manage blog content.

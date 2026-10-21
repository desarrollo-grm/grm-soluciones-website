# GRM Soluciones

Corporate website for GRM Soluciones, a technology solutions provider specializing in digital services for businesses and condominiums. 

This project uses a **monorepo architecture** with the Next.js website and Sanity Studio as npm workspaces. The website also contains the server-side API routes used by Netlify.

## 🚀 Tech Stack

### Frontend (Website)
- **React** 19 - UI library
- **Next.js** 15 - App Router, server rendering, and static generation
- **Tailwind CSS** 4.1.16 - Utility-first CSS framework
- **Leaflet** 1.9.4 - Interactive maps
- **Sanity** - Headless CMS integration and Portable Text rendering

### Backend (API)
- **Next.js App Router route handlers** - Netlify-compatible serverless API routes
- **Brevo (@getbrevo/brevo)** - Transactional email handling
- **Protected by Google ReCaptcha V3**

### Studio (CMS)
- **Sanity Studio** - Headless CMS for managing blog posts, articles, and dynamic content.

## 📋 Features

- **Multi-page application** with server-rendered Next.js routes.
- **Service Pages**: Digital Invoicing, Condominium Management, Technical Support.
- **Corporate Pages**: Home, About Us, Contact.
- **Headless Blog**: Sanity-powered blog with statically generated post pages and five-minute incremental revalidation.
- **Contact and subscription forms**: Handled by Next.js API routes and Brevo.
- **Protected API**: Request rate limiting and Google reCAPTCHA v3 validation.
- **Responsive Design** with Tailwind CSS.
- **Interactive Maps** using Leaflet.

## 🏗️ Project Structure

```text
grm-soluciones/
├── frontend/               # Next.js website
│   ├── public/
│   ├── app/                # App Router routes, metadata, robots, and sitemap
│   ├── src/
│   │   ├── components/     # Reusable UI components & layouts
│   │   ├── page-sections/  # Reused page compositions
│   │   ├── sanity/         # Sanity client configuration and queries
│   │   └── styles/         # Global Tailwind styles
│   └── package.json        
├── frontend/
│   ├── app/api/             # Netlify-compatible API route handlers
│   └── src/server/          # Private Brevo, CAPTCHA, rate-limit, and email helpers
├── studio/                 # Sanity CMS Dashboard
│   ├── schemaTypes/        # Database schemas (Posts, Authors, etc.)
│   ├── sanity.config.ts    
│   └── package.json        
└── package.json            # Root workspace configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 7 or higher (npm workspaces support)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grm-soluciones
```

2. Install dependencies for all projects simultaneously from the root:
```bash
npm install
```

3. Set up environment variables. Environment files are intentionally not committed:
   - **`frontend/.env`**: Set the public site URL, Sanity project and dataset, reCAPTCHA site key, private Brevo, reCAPTCHA secret, sender, and support email settings, and `ALLOW_INDEXING=false` for dev.
   - **`studio`**: Configure the Sanity project using the Sanity CLI when prompted. Studio configuration is defined in `studio/sanity.config.ts`.

   Never commit API keys, reCAPTCHA secrets, or other credentials. Use the deployment provider's secret or environment-variable settings in production.

4. Start the development environment:
```bash
npm run dev
```
*This command uses `concurrently` to start the Frontend and Studio all at once in the same terminal.*

### Local Development Ports
- **Frontend:** `http://localhost:3000`
- **Frontend API:** `http://localhost:3000/api/*`
- **Sanity Studio:** `http://localhost:3333`

The frontend serves `/api/*` itself through Next.js route handlers. No separate API server or `BACKEND_URL` is required.

## 📜 Available Root Scripts

- `npm run dev` - Starts the frontend and Sanity Studio concurrently.
- `npm run dev:frontend` - Starts only the React frontend.
- `npm run dev:studio` - Starts only the Sanity Studio.
- `npm run build` - Builds all workspaces for production.
- `npm run lint` - Runs ESLint across all workspaces.
- `npm run build --workspace=frontend` - Builds the Next.js website.
- `npm run build --workspace=studio` - Builds the Sanity Studio.

To run a workspace command from its directory, use the corresponding package script directly. For example:

```bash
cd frontend
npm run build
```

## 🚀 Deployment

The frontend/API and Sanity Studio are deployed as separate Netlify sites.

1. **Frontend and API (`/frontend`)**: Create a Netlify site with `frontend` as its **Base directory**, `npm run build` as its build command, and `.next` as its publish directory. Enable the Next.js runtime/plugin in Netlify if prompted.
2. **Studio (`/studio`)**: Create a second Netlify site with `studio` as its **Base directory**, `npm run build` as its build command, and `dist` as its publish directory. Add a `/*` to `/index.html` rewrite with status `200` in Netlify if client-side Studio routes need direct access.

The Next.js frontend generates `/robots.txt` and `/sitemap.xml`. Public pages are statically rendered where possible, and known Sanity blog post slugs are generated with five-minute incremental revalidation. The filtered and paginated `/blog` index remains dynamic because it reads URL search parameters.

### Dev deployment and search-engine protection

Configure these variables in the frontend deployment environment before building:

```text
NEXT_PUBLIC_SITE_URL=https://<dev-domain>
ALLOW_INDEXING=false
```

`ALLOW_INDEXING` is deliberately opt-in. With it set to anything other than `true`, the frontend:

- sends `X-Robots-Tag: noindex, nofollow` on every response;
- renders `noindex, nofollow` metadata;
- serves a `robots.txt` that disallows every crawler.

For the production deployment, set `NEXT_PUBLIC_SITE_URL` to `https://grm.net.ve` and explicitly set `ALLOW_INDEXING=true`. Do not reuse production environment variables in the dev deployment.

After deployment, verify the protection from a machine that can reach the dev URL:

```bash
curl -I https://<dev-domain>/
curl https://<dev-domain>/robots.txt
```

The response headers must include `X-Robots-Tag: noindex, nofollow`, and `robots.txt` must contain `Disallow: /`. Check the generated HTML as well if the hosting platform modifies response headers.

## 📄 License

This project is licensed under the GNU General Public License, version 3.0.
See [LICENSE](./LICENSE) for the complete license text.

---

Built with ❤️ by Rafael Sagués - GRM Soluciones
# GRM Soluciones

Corporate website for GRM Soluciones, a technology solutions provider specializing in digital services for businesses and condominiums. 

This project uses a **monorepo architecture**, separating the frontend, backend API, and content management system (CMS) into distinct npm workspaces.

## 🚀 Tech Stack

### Frontend (Website)
- **React** 19 - UI library
- **Next.js** 15 - App Router, server rendering, and static generation
- **Tailwind CSS** 4.1.16 - Utility-first CSS framework
- **Leaflet** 1.9.4 - Interactive maps
- **Sanity** - Headless CMS integration and Portable Text rendering

### Backend (API)
- **Node.js & Express** - Traditional server for API routes
- **Brevo (@getbrevo/brevo)** - Transactional email handling
- **Protected by Google ReCaptcha V3**

### Studio (CMS)
- **Sanity Studio** - Headless CMS for managing blog posts, articles, and dynamic content.

## 📋 Features

- **Multi-page application** with server-rendered Next.js routes.
- **Service Pages**: Digital Invoicing, Condominium Management, Technical Support.
- **Corporate Pages**: Home, About Us, Contact.
- **Headless Blog**: Fully dynamic blog powered by Sanity CMS.
- **Contact and subscription forms**: Handled by the custom Express backend and Brevo.
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
├── backend/                # The Express API Server
│   ├── api/                # API handlers and integrations
│   ├── email_templates/    # HTML email templates
│   ├── server.js           # Express entry point
│   └── package.json        
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
   - **`frontend/.env`**: Set the public site URL, Sanity project and dataset, reCAPTCHA site key, optional form endpoints, `BACKEND_URL`, and `ALLOW_INDEXING=false` for dev.
   - **`backend/.env`**: Set `API_PORT` and the private Brevo, reCAPTCHA, sender, support, and site URL settings required by the API.
   - **`studio`**: Configure the Sanity project using the Sanity CLI when prompted. Studio configuration is defined in `studio/sanity.config.ts`.

   Never commit API keys, reCAPTCHA secrets, or other credentials. Use the deployment provider's secret or environment-variable settings in production.

4. Start the development environment:
```bash
npm run dev
```
*This command uses `concurrently` to start the Frontend, Backend, and Studio all at once in the same terminal.*

### Local Development Ports
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8787`
- **Sanity Studio:** `http://localhost:3333`

The frontend rewrites `/api/*` requests to the backend using `BACKEND_URL`. When running the default local setup, this points to `http://127.0.0.1:8787`.

## 📜 Available Root Scripts

- `npm run dev` - Starts all three development servers concurrently.
- `npm run dev:frontend` - Starts only the React frontend.
- `npm run dev:backend` - Starts only the Express backend.
- `npm run dev:studio` - Starts only the Sanity Studio.
- `npm run build` - Builds all workspaces for production.
- `npm run lint` - Runs ESLint across all workspaces.
- `npm run test --workspace=backend` - Runs the backend's Node.js test suite.
- `npm run build --workspace=frontend` - Builds the Next.js website.
- `npm run build --workspace=studio` - Builds the Sanity Studio.

To run a workspace command from its directory, use the corresponding package script directly. For example:

```bash
cd backend
npm test
```

## 🚀 Deployment

Because the project is separated into distinct workspaces, it can be deployed anywhere without vendor lock-in.

1. **Frontend (`/frontend`)**: Run `npm run build --workspace=frontend`, then `npm run start --workspace=frontend` on a Node.js-compatible host. Configure `BACKEND_URL` to the deployed API URL.
2. **Backend (`/backend`)**: Deploy the Node.js service, configure its private environment variables, and run `npm run start --workspace=backend`. Set `API_PORT` to the port provided by the hosting platform when required.
3. **Studio (`/studio`)**: Run `npm run build --workspace=studio` and host the generated static site (for example, under an `/admin` subfolder).

The Next.js frontend generates `/robots.txt` and `/sitemap.xml`, renders Sanity blog posts on the server, and statically generates known post slugs with revalidation.

### Dev deployment and search-engine protection

Configure these variables in the frontend deployment environment before building:

```text
NEXT_PUBLIC_SITE_URL=https://<dev-domain>
BACKEND_URL=https://<dev-api-domain>
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

Private project - All rights reserved.

---

Built with ❤️ by Rafael Sagués - GRM Soluciones
# GRM Soluciones

Corporate website for GRM Soluciones, a technology solutions provider specializing in digital services for businesses and condominiums. 

This project uses a **Monorepo Architecture**, separating the frontend, the backend API, and the content management system (CMS) into distinct, independent workspaces.

## 🚀 Tech Stack

### Frontend (Website)
- **React** 19.1.1 - Modern UI library
- **Vite** 7.1.7 - Lightning-fast build tool
- **React Router** 7.9.5 - Client-side routing
- **Tailwind CSS** 4.1.16 - Utility-first CSS framework
- **Leaflet** 1.9.4 - Interactive maps
- **@sanity/client** - Data fetching from the CMS

### Backend (API)
- **Node.js & Express** - Traditional server for API routes
- **Brevo (@getbrevo/brevo)** - Transactional email handling
- **Protected by Google ReCaptcha V3**

### Studio (CMS)
- **Sanity Studio** - Headless CMS for managing blog posts, articles, and dynamic content.

## 📋 Features

- **Multi-page Application** with client-side routing.
- **Service Pages**: Digital Invoicing, Condominium Management, Technical Support.
- **Corporate Pages**: Home, About Us, Contact.
- **Headless Blog**: Fully dynamic blog powered by Sanity CMS.
- **Working Contact Forms**: Handled securely via the custom Express backend and Brevo.
- **Responsive Design** with Tailwind CSS.
- **Interactive Maps** using Leaflet.

## 🏗️ Project Structure

```text
grm-soluciones/
├── frontend/               # The React + Vite Website
│   ├── public/             
│   ├── src/                
│   │   ├── components/     # Reusable UI components & layouts
│   │   ├── pages/          # Page-specific components
│   │   ├── sanity/         # Sanity API configurations & queries
│   │   └── styles/         # Global Tailwind styles
│   └── package.json        
├── backend/                # The Express API Server
│   ├── api/                # Email logic & integrations (Brevo)
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
- Node.js (v18 or higher recommended)
- npm (v7 or higher for workspace support)

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

3. Set up Environment Variables:
   - Create a `.env` file in `/frontend` (e.g., `VITE_API_URL=http://localhost:8787`)
   - Create a `.env` file in `/backend` (for Brevo API keys)
   - Create a `.env` file in `/studio` (for Sanity keys)

4. Start the development environment:
```bash
npm run dev
```
*This command uses `concurrently` to start the Frontend, Backend, and Studio all at once in the same terminal.*

### Local Development Ports
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:8787`
- **Sanity Studio:** `http://localhost:3333`

## 📜 Available Root Scripts

- `npm run dev` - Starts all three development servers concurrently.
- `npm run dev:frontend` - Starts only the React frontend.
- `npm run dev:backend` - Starts only the Express backend.
- `npm run dev:studio` - Starts only the Sanity Studio.
- `npm run build` - Builds all workspaces for production.
- `npm run lint` - Runs ESLint across all workspaces.

## 🚀 Deployment

Because the project is separated into distinct workspaces, it can be deployed anywhere without vendor lock-in.

1. **Frontend (`/frontend`)**: Run `npm run build --workspace=frontend` and deploy the `dist/` folder to any static host (Vercel, Netlify, or cPanel `public_html`).
2. **Backend (`/backend`)**: Upload the folder to a Node.js-supported server (like cPanel's "Setup Node.js App", Render, or Railway) and start `server.js`.
3. **Studio (`/studio`)**: Run `npm run build --workspace=studio` and host it statically (e.g., in a `/admin` subfolder on your main domain).

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ by Rafael Sagués - GRM Soluciones
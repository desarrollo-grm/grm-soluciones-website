# GRM Soluciones

Corporate website for GRM Soluciones, a technology solutions provider specializing in digital services for businesses and condominiums.

## 🚀 Tech Stack

- **React** 19.1.1 - Modern UI library
- **Vite** 7.1.7 - Lightning-fast build tool
- **React Router** 7.9.5 - Client-side routing
- **Tailwind CSS** 4.1.16 - Utility-first CSS framework
- **Leaflet** 1.9.4 - Interactive maps
- **React Leaflet** 5.0.0 - React components for Leaflet

## 📋 Features

- **Multi-page Application** with client-side routing
- **Service Pages**:
  - Digital Invoicing (`/facturacion-digital`)
  - Condominium Management (`/condominio`)
  - Technical Support (`/soporte`)
- **Corporate Pages**:
  - Home page with services showcase
  - About Us with company values and objectives
  - Contact page with interactive map
  - Blog with articles
- **Responsive Design** with Tailwind CSS
- **Interactive Maps** using Leaflet
- **Reusable Components** for consistent UI

## 🏗️ Project Structure

```
grm-soluciones/
├── src/
│   ├── components/
│   │   ├── commons/        # Reusable UI components
│   │   ├── layout/         # Header, Footer
│   │   └── pages/          # Page-specific components
│   ├── data/               # Static data (articles, clients, services)
│   ├── pages/              # Page components
│   └── styles/             # Global styles
├── assets/                 # Images, icons, and static assets
│   ├── articles/
│   ├── clients/
│   ├── icons/
│   ├── images/
│   └── partners/
└── public/                 # Public static files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grm-soluciones
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Components

### Commons
- `ArticleCard` - Blog article preview cards
- `BenefitCard` - Service benefits display
- `Carousel` - Image/content carousel
- `ServiceCard` - Service offering cards
- `Map` - Interactive Leaflet map
- `CTAButton` - Call-to-action button

### Pages
- **HomePage** - Main landing page with services
- **AboutUsPage** - Company information and values
- **ContactPage** - Contact form and location
- **FacturacionDigitalPage** - Digital invoicing service
- **CondominioPage** - Condominium management service
- **SoportePage** - Technical support service
- **Blog** - Blog listing page
- **BlogPost** - Individual blog post view

## 🚀 Deployment

Build the production-ready application:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ by Rafael Sagués - GRM Soluciones

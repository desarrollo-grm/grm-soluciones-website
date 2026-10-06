import '@/src/styles/tailwind.css';
import '@/src/styles/main.css';
import '@/src/styles/carousel.css';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import Providers from './providers';

export const dynamic = 'force-dynamic';

const allowIndexing = process.env.ALLOW_INDEXING === 'true';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve'),
  title: {
    default: 'GRM Soluciones',
    template: '%s | GRM Soluciones',
  },
  description: 'Soluciones tecnológicas para empresas y condominios.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    siteName: 'GRM Soluciones',
    title: 'GRM Soluciones',
    description: 'Soluciones tecnológicas para empresas y condominios.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: allowIndexing
    ? undefined
    : {
        index: false,
        follow: false,
      },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

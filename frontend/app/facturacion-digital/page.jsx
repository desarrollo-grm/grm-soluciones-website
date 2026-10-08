import FacturacionDigitalPage from '@/src/page-sections/FacturacionDigitalPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Facturación digital',
  description: 'Optimiza la facturación de tu negocio con las soluciones digitales de GRM Soluciones.',
  path: '/facturacion-digital',
});

export default function Page() {
  return <FacturacionDigitalPage />;
}

import HomePage from '@/src/page-sections/HomePage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Soluciones tecnológicas para tu negocio',
  description: 'GRM Soluciones ofrece facturación digital, gestión de condominios, soporte y equipos fiscales.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}

import ContactPage from '@/src/page-sections/ContactPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contáctanos',
  description: 'Escríbenos para conocer las soluciones de GRM Soluciones para tu empresa o condominio.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}

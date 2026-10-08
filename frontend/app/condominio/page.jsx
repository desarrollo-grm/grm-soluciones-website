import CondominioPage from '@/src/page-sections/CondominioPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Gestión de condominios',
  description: 'Administra tu condominio con una solución integral y eficiente.',
  path: '/condominio',
});

export default function Page() {
  return <CondominioPage />;
}

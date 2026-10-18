import SaintEIntegracionesPage from '@/src/page-sections/SaintEIntegracionesPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Saint e Integraciones',
  description: 'Software administrativo, contable, de nómina y condominio Saint Annual, junto a desarrollos propios e integraciones aliadas.',
  path: '/saint-e-integraciones',
});

export default function Page() {
  return <SaintEIntegracionesPage />;
}

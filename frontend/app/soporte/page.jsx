import SoportePage from '@/src/page-sections/SoportePage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Soporte integral',
  description: 'Soporte técnico integral para mantener tu operación funcionando.',
  path: '/soporte',
});

export default function Page() {
  return <SoportePage />;
}

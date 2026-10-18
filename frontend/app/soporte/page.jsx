import SoportePage from '@/src/page-sections/SoportePage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Soporte integral',
  description: 'Soporte técnico especializado para software, hardware, equipos fiscales y redes corporativas.',
  path: '/soporte',
});

export default function Page() {
  return <SoportePage />;
}

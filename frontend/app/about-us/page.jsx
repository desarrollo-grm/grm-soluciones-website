import AboutUsPage from '@/src/page-sections/AboutUsPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Conócenos',
  description: 'Conoce a GRM Soluciones, nuestro equipo, valores y experiencia tecnológica.',
  path: '/about-us',
});

export default function Page() {
  return <AboutUsPage />;
}

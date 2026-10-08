import EquiposMaquinasFiscalesPage from '@/src/page-sections/EquiposMaquinasFiscalesPage';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata = createPageMetadata({
  title: 'Equipos y máquinas fiscales',
  description: 'Equipos y máquinas fiscales para operar con eficiencia y cumplimiento.',
  path: '/equipos-maquinas-fiscales',
});

export default function Page() {
  return <EquiposMaquinasFiscalesPage />;
}

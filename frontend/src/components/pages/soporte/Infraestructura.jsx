import BenefitCard from '@/src/components/commons/BenefitCard';
import CTAButton from '@/src/components/commons/CTAButton';
import SectionHeader from '@/src/components/commons/SectionHeader';

const Infraestructura = () => {
  const services = [
    {
      icon: '/assets/icons/hardware.svg',
      title: 'Mantenimiento de Equipos de Cómputo',
      description: 'Servicio técnico preventivo y correctivo para servidores, computadores de escritorio, laptops e impresoras corporativas.',
    },
    {
      icon: '/assets/icons/verified.svg',
      title: 'Servicio Técnico y Equipos Fiscales Autorizados',
      description: 'Venta, diagnóstico, reparación y mantenimiento oficial de impresoras y cajas fiscales bajo normativa vigente.',
    },
    {
      icon: '/assets/icons/puzzle.svg',
      title: 'Redes y Conectividad',
      description: 'Diseño, cableado estructurado, certificación de redes corporativas e integración fluida entre hardware y software.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Infraestructura Tecnológica y Soluciones Fiscales"
          subtitle="Cobertura integral para el hardware y la conectividad que sostienen tu empresa."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {services.map((service, index) => (
            <BenefitCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <CTAButton to="/equipos-maquinas-fiscales">
            Equipos y máquinas fiscales
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default Infraestructura;

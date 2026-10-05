import BenefitCard from '@/src/components/commons/BenefitCard';
import SectionHeader from "@/src/components/commons/SectionHeader";

const Benefits = () => {
  const benefits = [
    {
      icon: '/assets/icons/shield.svg',
      title: 'Venta y Distribución',
      description: 'Equipos fiscales homologados y adaptados a tus necesidades (impresoras fiscales, cajas registradoras)',
    },
    {
      icon: '/assets/icons/lightning.svg',
      title: 'Fiscalización e Inicialización',
      description: 'Configuración y puesta en marcha bajo los estrictos estándares legales vigentes.',
    },
    {
      icon: '/assets/icons/clock.svg',
      title: 'Servicio Técnico y Reparación',
      description: 'Diagnóstico especializado y reparación utilizando únicamente piezas autorizadas.',
    },
    {
      icon: '/assets/icons/check.svg',
      title: 'Mantenimiento Preventivo',
      description: 'Aseguramos el óptimo y continuo funcionamiento de todo tu parque fiscal.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <SectionHeader 
          title="Apoyo Especializado y Servicio Técnico"
          subtitle="Soluciones adaptadas a los estándares legales vigentes"
        />
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

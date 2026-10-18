import BenefitCard from '@/src/components/commons/BenefitCard';
import ObjectiveCard from '@/src/components/commons/ObjectiveCard';
import SectionHeader from '@/src/components/commons/SectionHeader';

const DesarrollosIntegraciones = () => {
  const propias = [
    {
      icon: '/assets/icons/shield.svg',
      title: 'Saint Condominio Sagués',
      description: 'Desarrollo propio de G.R.M. Soluciones, totalmente integrado a la plataforma Saint y homologado por el SENIAT para la gestión integral de inmuebles, edificios y condominios, con emisión de avisos de cobro y cumplimiento fiscal.',
      color: 'primary',
    },
    {
      icon: '/assets/icons/gear.svg',
      title: 'Desarrollos y Herramientas a Medida',
      description: 'Creación de aplicaciones complementarias, módulos de integración, utilitarios de facturación masiva y adaptaciones personalizadas según la operativa de cada cliente.',
      color: 'accent',
    },
  ];

  const terceros = [
    {
      icon: '/assets/icons/clock.svg',
      title: 'SACA 365',
      description: 'Sistema especializado de terceros para la gestión, registro y control de asistencia laboral en tiempo real.',
    },
    {
      icon: '/assets/icons/facturacion.svg',
      title: 'Facturación Digital e Imprenta Digital',
      description: 'Integraciones con proveedores autorizados (The Factory Facturación Imprenta Digital y Unidigital) para el cumplimiento de facturación electrónica y digital bajo normas del SENIAT.',
    },
    {
      icon: '/assets/icons/star.svg',
      title: 'Licenciamiento Corporativo',
      description: 'Distribuidor de soluciones Microsoft para dotar a tu empresa de herramientas corporativas confiables.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Desarrollos Propios y Soluciones Especializadas"
          subtitle="Tecnología adaptada a tu operación"
        />

        <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-primary mb-8">
          Soluciones Propias y Homologadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center mb-16">
          {propias.map((solucion, index) => (
            <ObjectiveCard
              key={index}
              icon={solucion.icon}
              title={solucion.title}
              description={solucion.description}
              color={solucion.color}
              imageSize={20}
            />
          ))}
        </div>

        <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-primary mb-8">
          Soluciones de Terceros e Integraciones Aliadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {terceros.map((solucion, index) => (
            <BenefitCard
              key={index}
              icon={solucion.icon}
              title={solucion.title}
              description={solucion.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesarrollosIntegraciones;

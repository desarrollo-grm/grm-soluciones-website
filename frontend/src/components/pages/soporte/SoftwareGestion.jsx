import BenefitCard from '@/src/components/commons/BenefitCard';
import SectionHeader from '@/src/components/commons/SectionHeader';

const SoftwareGestion = () => {
  const services = [
    {
      icon: '/assets/icons/shield.svg',
      title: 'Soporte Correctivo de Incidencias',
      description: 'Diagnóstico y resolución de fallas críticas en el sistema y bases de datos para evitar interrupciones en tu operación diaria.',
    },
    {
      icon: '/assets/icons/lightning.svg',
      title: 'Consultoría Funcional y Operativa',
      description: 'Orientación a los usuarios en el uso óptimo de las herramientas, mejores prácticas y resolución de dudas sobre los módulos.',
    },
    {
      icon: '/assets/icons/clock.svg',
      title: 'Mantenimiento Preventivo y Optimización',
      description: 'Revisión periódica de bases de datos, auditoría de permisos de usuario y ajuste de configuraciones para prevenir errores antes de que ocurran.',
    },
    {
      icon: '/assets/icons/check.svg',
      title: 'Capacitación y Autonomía',
      description: 'Creación de manuales para incidencias recurrentes y transferencia de conocimiento al personal clave para el manejo autónomo de tareas críticas.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Soporte para Módulos Administrativos y de Gestión"
          subtitle="Asegura la operatividad de tus sistemas contables, fiscales y de recursos humanos."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {services.map((service, index) => (
            <BenefitCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareGestion;

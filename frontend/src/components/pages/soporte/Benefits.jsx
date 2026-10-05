import BenefitCard from '@/src/components/commons/BenefitCard';

const Benefits = () => {
  const benefits = [
    {
      icon: '/assets/icons/shield.svg',
      title: 'Soporte Correctivo de Incidencias',
      description: 'Diagnosticamos y resolvemos fallas críticas del sistema, desde errores de base de datos hasta problemas de rendimiento, para garantizar la continuidad de tu operación fiscal y administrativa.',
    },
    {
      icon: '/assets/icons/lightning.svg',
      title: 'Soporte Funcional y Consultivo',
      description: 'Asistimos y guiamos en el uso correcto de las funcionalidades del módulo, asegurando que los usuarios aprovechen todas sus herramientas (resolución de dudas operativas, mejores prácticas)',
    },
    {
      icon: '/assets/icons/clock.svg',
      title: 'Mantenimiento Preventivo Periódico',
      description: 'Realizamos chequeos del estado de la base de datos asociada al módulo, revisión de permisos de usuario y optimización de configuraciones para asegurar un rendimiento óptimo antes de que surjan problemas.',
    },
    {
      icon: '/assets/icons/check.svg',
      title: 'Gestión de Conocimiento y Acompañamiento',
      description: 'Creamos y actualizamos documentación de ayuda para incidencias recurrentes y acompañamos al usuario clave para el manejo autónomo de tareas administrativas críticas.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Beneficios clave para tu empresa
        </h2>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 lg:gap-x-0 justify-items-center">
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

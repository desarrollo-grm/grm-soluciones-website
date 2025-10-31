import BenefitCard from '/src/components/commons/BenefitCard';

const Benefits = () => {
  const benefits = [
    {
      icon: '/assets/icons/shield.svg',
      title: 'Reduce errores',
      description: 'Minimiza la posibilidad de errores humanos al automatizar el proceso de facturación.',
    },
    {
      icon: '/assets/icons/lightning.svg',
      title: 'Acelera el cobro',
      description: 'Envía facturas de manera instantánea y realiza seguimientos automáticos.',
    },
    {
      icon: '/assets/icons/clock.svg',
      title: 'Ahorra tiempo y recursos',
      description: 'Olvídate del papeleo y dedica más tiempo a lo que realmente importa: hacer crecer tu negocio.',
    },
    {
      icon: '/assets/icons/check.svg',
      title: 'Cumple con la normativa',
      description: 'Mantén tu empresa en regla con facturas digitales que cumplen con todos los requisitos legales.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

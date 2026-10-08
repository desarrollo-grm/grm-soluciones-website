import SectionHeader from "@/src/components/commons/SectionHeader";

const Hero = () => {
  const timelineEvents = [
    {
      year: '1994',
      description: 'Fundación de SOMOS Systems'
    },
    {
      year: 'XXXX',
      description: 'Lorem ipsum dolor sit amet.'
    },
    {
      year: 'XXXX',
      description: 'Lorem ipsum dolor sit amet.'
    },
    {
      year: 'XXXX',
      description: 'Lorem ipsum dolor sit amet.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-light lg:min-h-[calc(100dvh-88px)]">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Nuestra Trayectoria"
          subtitle="Hitos que Marcaron el Camino"
          titleColor="secondary"
          alignment="center"
          headingLevel={1}
        />

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto items-center justify-center">
          {/* Left Side - Description */}
          <div className="text-base md:text-lg lg:text-xl leading-relaxed text-dark max-w-md flex-1">
            <p>
              En GRM contamos con <span className="text-accent font-semibold">más de 30 años</span> de experiencia ofreciendo soluciones tecnológicas integrales. 
              Nos especializamos en sistemas administrativos, contables y de gestión de pago, adaptándonos a las necesidades específicas de cada cliente.
            </p>
            <p>
              Nuestra trayectoria y alianzas nos posicionan como un canal  <span className="text-secondary font-semibold">confiable</span> en el mercado.
            </p>
          </div>

          {/* Right Side - Timeline */}
          <ul className="w-full max-w-sm flex-1">
            {timelineEvents.map((event, index) => (
              <li key={index} className="relative flex gap-6 pb- items-baseline last:pb-0">
                <div className="before:absolute before:left-[5px] before:h-full before:w-[2px] before:bg-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="bi bi-circle-fill fill-primary">
                    <circle cx="6" cy="6" r="6" />
                  </svg>
                </div>
                <div className="text-base md:text-lg lg:text-xl text-primary flex-1">
                  <p className="font-bold">{event.year}</p>
                  <p>{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;

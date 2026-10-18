import SectionHeader from "@/src/components/commons/SectionHeader";

const Hero = () => {
  const timelineEvents = [
    {
      year: '1994',
      description: 'Fundación de SOMOS Systems'
    },
    {
      year: '1995',
      description: 'Certificación como Canal Autorizado Saint'
    },
    {
      year: 'XXXX',
      description: 'Evolución a GRM Soluciones'
    },
    {
      year: 'XXXX',
      description: 'Expansión a Chile, Mexico y Panamá'
    },
    {
      year: 'XXXX',
      description: 'Lanzamiento del Condomio Sagues'
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

        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-20 max-w-5xl mx-auto items-center">
          {/* Left Side - Description */}
          <div className="text-base lg:text-lg leading-relaxed text-dark max-w-md flex-1">
            <p className="mb-4">
              En <span className="text-secondary font-semibold">G.R.M. Soluciones</span> somos el socio tecnológico de las organizaciones, uniendo dos áreas clave: <span className="text-accent font-semibold">la infraestructura informática y el rigor fiscal</span>.
            </p>
            <p className="mb-4">
              Acompañamos su <span className="text-secondary font-semibold">evolución digital</span> implementando sistemas administrativos, contables y de pago a medida, junto a la infraestructura técnica que los sostiene: redes, servidores y soporte preventivo.
            </p>
            <p>
              Frente a un entorno que <span className="text-accent font-semibold">cambia a gran velocidad</span>, nuestras tres décadas de trayectoria y alianzas estratégicas garantizan el respaldo regulatorio y operativo para <span className="text-secondary font-semibold">optimizar, proteger y hacer crecer su empresa</span>.
            </p>
          </div>

          {/* Right Side - Timeline */}
          <ul className="relative w-full max-w-md flex-1">
            {/* Vertical line */}
            <span
              aria-hidden="true"
              className="absolute left-[6px] top-2 bottom-[7px] w-[2px] bg-secondary"
            />
            {/* Line end arrow */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] bottom-0 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[7px] border-t-secondary"
            />

            {timelineEvents.map((event, index) => (
              <li
                key={index}
                className="relative flex items-center gap-4 pb-9 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-light ${
                    index % 2 === 0 ? 'bg-secondary' : 'bg-accent'
                  }`}
                />

                {/* Connector arrow (hidden on the first event and mobile) */}
                {index > 0 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden sm:block h-2 w-16 shrink-0 text-gray-400"
                  >
                    <path d="M60 4H4" />
                    <path d="M4 4l6-3M4 4l6 3" />
                  </svg>
                )}

                <p className="text-base md:text-lg lg:text-xl text-dark">
                  {event.year} - {event.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;

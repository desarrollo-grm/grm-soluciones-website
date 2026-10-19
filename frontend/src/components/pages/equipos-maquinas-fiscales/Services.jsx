import SectionHeader from "@/src/components/commons/SectionHeader";

const Services = () => {
  const services = [
    {
      icon: "/assets/icons/verified.svg",
      color: "bg-primary",
      title: "Fiscalización y Puesta en Marcha",
      description:
        "Configuración inicial e inicialización bajo los estándares y normativas legales vigentes del SENIAT.",
    },
    {
      icon: "/assets/icons/gear.svg",
      color: "bg-secondary",
      title: "Servicio Técnico y Reparación Autorizada",
      description:
        "Diagnóstico especializado y reparación con piezas y repuestos originales para impresoras fiscales y equipos de cómputo.",
    },
    {
      icon: "/assets/icons/shield.svg",
      color: "bg-accent",
      title: "Mantenimiento Preventivo",
      description:
        "Planes de soporte para prolongar la vida útil de tu parque fiscal, periféricos y servidores, evitando caídas del sistema.",
    },
    {
      icon: "/assets/icons/puzzle.svg",
      color: "bg-primary",
      title: "Asesoría y Proyectos a Medida",
      description:
        "Te ayudamos a seleccionar la arquitectura de hardware adecuada según el volumen de transacciones de tu negocio.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Servicios especializados y post-venta"
          subtitle="Respaldo experto durante todo el ciclo de vida de tus equipos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {services.map((service, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col sm:flex-row items-start gap-6 h-full"
            >
              <div
                className={`w-16 h-16 flex-shrink-0 ${service.color} rounded-full flex items-center justify-center shadow-md`}
              >
                <div
                  className="w-8 h-8 bg-white"
                  style={{
                    maskImage: `url(${service.icon})`,
                    WebkitMaskImage: `url(${service.icon})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  role="img"
                  aria-label={service.title}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl md:text-2xl font-bold text-dark">
                  {service.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

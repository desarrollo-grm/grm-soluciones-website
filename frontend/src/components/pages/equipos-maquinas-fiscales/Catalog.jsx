import SectionHeader from "@/src/components/commons/SectionHeader";

const Catalog = () => {
  const pillars = [
    {
      icon: "/assets/icons/invoice.svg",
      color: "bg-primary",
      title: "Equipos y Máquinas Fiscales",
      description:
        "Garantiza el cumplimiento tributario con los equipos más confiables del mercado. Distribución oficial, venta, fiscalización y repuestos.",
      itemsLabel: "Equipos",
      items: [
        "Cajas registradoras",
        "Impresoras fiscales de alta velocidad",
      ],
      brandsLabel: "Marcas homologadas",
      brands: [
        "Aclas",
        "Bematech",
        "Custom",
        "Hasar",
        "Bixolon",
        "Star",
        "Okidata",
        "Samsung",
        "HK-80",
      ],
    },
    {
      icon: "/assets/icons/hardware.svg",
      color: "bg-secondary",
      title: "Periféricos para Punto de Venta",
      description:
        "Optimiza la velocidad de cobro y el control de inventario en tu mostrador con hardware robusto y eficiente.",
      itemsLabel: "Equipamiento",
      items: [
        "Minicomputadores (Mini PCs)",
        "Escáneres de códigos de barra (1D/2D)",
        "Gavetas de dinero metálicas",
        "Visores de cliente",
      ],
    },
    {
      icon: "/assets/icons/data.svg",
      color: "bg-accent",
      title: "Infraestructura Informática",
      description:
        "Infraestructura informática diseñada para soportar los sistemas administrativos y la operación continua de tu empresa.",
      itemsLabel: "Equipamiento",
      items: [
        "Computadores All-in-One (AIO)",
        "Estaciones de trabajo",
        "Servidores para bases de datos",
        "Redes empresariales",
      ],
      brandsLabel: "Marcas",
      brands: ["Síragon", "Marcas líderes en tecnología"],
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Nuestro catálogo de hardware"
          subtitle="Tecnología confiable para tu operación comercial"
        />
        <p className="text-center font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
          Garantiza el cumplimiento tributario con los equipos más confiables
          del mercado. Distribución oficial, venta, fiscalización y repuestos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {pillars.map((pillar, index) => (
            <article
              key={index}
              className="bg-light rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col gap-5 h-full"
            >
              <div
                className={`w-16 h-16 ${pillar.color} rounded-full flex items-center justify-center shadow-md`}
              >
                <div
                  className="w-9 h-9 bg-white"
                  style={{
                    maskImage: `url(${pillar.icon})`,
                    WebkitMaskImage: `url(${pillar.icon})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  role="img"
                  aria-label={pillar.title}
                />
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-dark">
                {pillar.title}
              </h3>

              <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                {pillar.description}
              </p>

              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wide text-primary mb-3">
                  {pillar.itemsLabel}
                </h4>
                <ul className="flex flex-col gap-2">
                  {pillar.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 font-sans text-sm text-gray-700"
                    >
                      <span
                        className="w-4 h-4 mt-0.5 flex-shrink-0 bg-accent"
                        style={{
                          maskImage: "url(/assets/icons/check.svg)",
                          WebkitMaskImage: "url(/assets/icons/check.svg)",
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                        }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {pillar.brands && (
                <div className="mt-auto">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wide text-primary mb-3">
                    {pillar.brandsLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pillar.brands.map((brand, brandIndex) => (
                      <span
                        key={brandIndex}
                        className="bg-white text-gray-700 font-sans text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;

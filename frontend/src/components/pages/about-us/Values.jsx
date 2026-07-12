import SectionHeader from "/src/components/commons/SectionHeader";
import ServiceCard from "/src/components/commons/ServiceCard";

const Values = () => {
    return (
        <section className="bg-light py-16 px-4 flex items-center">
            <div className="container mx-auto">
                <SectionHeader 
                    title="Nuestros valores" 
                    subtitle="Los pilares que sostienen nuestro trabajo"
                    titleColor="secondary"
                    alignment="center"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <ServiceCard
                        service={{
                            icon: "/assets/icons/magnifying-glass.svg",
                            title: "Transparencia Radical",
                            description: "La verdad por delante y sin letra pequeña. Hablamos claro siempre.",
                        }}
                        color="secondary"
                    />
                    <ServiceCard
                        service={{
                            icon: "/assets/icons/lightning.svg",
                            title: "Agilidad Resolutiva",
                            description: "No damos vueltas, damos soluciones. Respuestas rápidas a retos complejos.",
                        }}
                        color="accent"
                    />
                    <ServiceCard
                        service={{
                            icon: "/assets/icons/star.svg",
                            title: "Excelencia en la Ejecución",
                            description: "Obsesionados con la calidad. Entregamos resultados impecables y robustos.",
                        }}
                        color="accent"
                    />
                    <ServiceCard
                        service={{
                            icon: "/assets/icons/gear.svg",
                            title: "Innovación con Propósito",
                            description: "Tecnología que suma valor real a tu negocio, no solo moda pasajera.",
                        }}
                        color="secondary"
                    />
                </div>
            </div>
        </section>
    );
};

export default Values;
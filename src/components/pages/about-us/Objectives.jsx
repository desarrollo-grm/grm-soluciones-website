import SectionHeader from "/src/components/commons/SectionHeader";
import ObjectiveCard from "/src/components/commons/ObjectiveCard";

const Objetivos = () => {
    return (
        <section className="bg-light py-16 px-4 min-h-[calc(100dvh-88px)] flex items-center">
            <div className="container mx-auto">
                <SectionHeader 
                    title="Nuestros objetivos" 
                    subtitle="Los pilares que sostienen nuestro trabajo"
                    titleColor="secondary"
                    alignment="center"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mt-20 justify-items-center">
                    <ObjectiveCard
                        icon="/assets/icons/mission.svg"
                        title="Nuestra misión"
                        description="Ser el motor tecnológico de nuestros clientes, brindando soluciones integrales que faciliten su éxito y tranquilidad."
                        color="accent"
                        imageSize={26}
                    />
                    <ObjectiveCard
                        icon="/assets/icons/vision.svg"
                        title="Nuestra visión"
                        description="Ser el referente líder en innovación tecnológica, redefiniendo los estándares de calidad y servicio en el mercado."
                        color="secondary"
                        imageSize={20}
                    />
                </div>
            </div>
        </section>
    );
};

export default Objetivos;

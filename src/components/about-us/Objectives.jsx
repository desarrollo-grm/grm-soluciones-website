import SectionHeader from "../commons/SectionHeader";
import ObjectiveCard from "../commons/ObjectiveCard";

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
                        description="Lorem ipsum dolor sit amet, dipiscing elit. Pellentesque auctor sed ante sed iaculis."
                        color="accent"
                    />
                    <ObjectiveCard
                        icon="/assets/icons/vision.svg"
                        title="Nuestra visión"
                        description="Lorem ipsum dolor sit amet, dipiscing elit. Pellentesque auctor sed ante sed iaculis."
                        color="secondary"
                    />
                </div>
            </div>
        </section>
    );
};

export default Objetivos;

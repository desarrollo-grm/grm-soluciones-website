import SectionHeader from "/src/components/commons/SectionHeader";
import ValueCard from "/src/components/commons/ValueCard";

const Values = () => {
    return (
        <section className="bg-light py-16 px-4 min-h-[calc(100dvh-88px)] flex items-center">
            <div className="container mx-auto">
                <SectionHeader 
                    title="Nuestros valores" 
                    subtitle="Los pilares que sostienen nuestro trabajo"
                    titleColor="secondary"
                    alignment="center"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <ValueCard
                        icon="/assets/icons/ethics.svg"
                        title="Ética"
                        color="secondary"
                    />
                    <ValueCard
                        icon="/assets/icons/responsibility.svg"
                        title="Responsabilidad"
                        color="accent"
                    />
                    <ValueCard
                        icon="/assets/icons/commitment.svg"
                        title="Compromiso"
                        color="accent"
                    />
                    <ValueCard
                        icon="/assets/icons/integrity.svg"
                        title="Integridad"
                        color="secondary"
                    />
                </div>
            </div>
        </section>
    );
};

export default Values;
import SectionHeader from "/src/components/commons/SectionHeader";
import ValueCard from "/src/components/commons/ValueCard";

const Features = () => {

    const features = [
        {
            icon:"/assets/icons/arithmetic.svg",
            title:"Información contable",
        },
        {
            icon:"/assets/icons/data.svg",
            title:"Visualización de datos",
        },
        {
            icon:"/assets/icons/invoice.svg",
            title:"Gestion de facturas",
        },
        {
            icon:"/assets/icons/bank.svg",
            title:"Gestion de pagos",
        },
        {
            icon:"/assets/icons/email.svg",
            title:"Mensajes y correos masivos",
        },
        {
            icon:"/assets/icons/shield.svg",
            title:"Homologados por el SENIAT",
        },
        {
            icon:"/assets/icons/magnifying-glass.svg",
            title:"Software 100% auditable",
        }
    ];

    return (
        <section className="bg-light py-16 px-6">
            <SectionHeader 
            title="Nuestra solución para centros comerciales"
            subtitle="Software de gestion de condominos"
            />
            <div className="container mx-auto flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[280px]">
                        <div className="h-[220px]">
                            <ValueCard
                                icon={feature.icon}
                                title={feature.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
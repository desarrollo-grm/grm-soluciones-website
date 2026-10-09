import SectionHeader from "@/src/components/commons/SectionHeader";
import ValueCard from "@/src/components/commons/ValueCard";

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
            title:"Gestión de facturas",
        },
        {
            icon:"/assets/icons/bank.svg",
            title:"Gestión de pagos",
        },
        {
            icon:"/assets/icons/email.svg",
            title:"Mensajes y correos masivos",
        }
    ];

    const colors = ["secondary", "accent", "primary"];

    return (
        <section className="bg-light lg:h-min-[calc(100dvh-88px)] py-12 px-6 flex flex-col justify-center">
            <SectionHeader 
            title="Nuestra solución para centros comerciales"
            subtitle="Software de gestión de condominios"
            headingLevel={1}
            />
            <div className="container mx-auto pb-6 xl:px-64 flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 xl:gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[280px]">
                        <div className="h-[180px]">
                            <ValueCard
                                icon={feature.icon}
                                title={feature.title}
                                color={colors[index % colors.length]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
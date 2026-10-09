import SectionHeader from "@/src/components/commons/SectionHeader";
import ObjectiveCard from "@/src/components/commons/ObjectiveCard";

const Beneficios = () => {

    const beneficios = [
        {
            icon:"/assets/icons/magnifying-glass.svg",
            title:"100 % auditable",
            description:"Nuestro sistema garantiza el funcionamiento correcto de las funcionalidades de auditoría y mantiene la integridad y trazabilidad de los datos en todo momento.",
            size:20
        },
        {
            icon:"/assets/icons/puzzle.svg",
            title:"Integración Total",
            description:"Integración con los procesos administrativos clave: cuentas por cobrar, cuentas por pagar, inventario, generación de documentos fiscales, banco y contabilidad, asegurando la coherencia de la data en toda su gestión.",
            size:20
        },
        {
            icon:"/assets/icons/shield.svg",
            title:"Homologado por el SENIAT",
            description:"Nuestra homologación del SENIAT garantiza que tu empresa mantenga el cumplimiento fiscal de forma permanente. Estamos homologados para generar facturas de forma libre y digital."
        }
    ]
    return (
        <section className="bg-light lg:h-min-[calc(100dvh-88px)] py-16 px-6 flex flex-col justify-center gap-6">
            <SectionHeader 
            title="Beneficios clave para su gestión"
            subtitle="Una solución simple, completa y robusta"
            />
            <div className="container mx-auto px-6 pb-6 flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6">
                {beneficios.map((beneficio, index) => (
                    <ObjectiveCard
                        key={index}
                        icon={beneficio.icon}
                        title={beneficio.title}
                        description={beneficio.description}
                        imageSize={beneficio.size}
                    ></ObjectiveCard>
                ))}
            </div>
        </section>
    );
};

export default Beneficios;
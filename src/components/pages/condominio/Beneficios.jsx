import SectionHeader from "/src/components/commons/SectionHeader";
import ObjectiveCard from "/src/components/commons/ObjectiveCard";

const Beneficios = () => {

    const beneficios = [
        {
            icon:"/assets/icons/magnifying-glass.svg",
            title:"100% Auditable",
            description:"Nuestro sistema asegura el correcto funcionamiento de las funcionalidades de auditoría, manteniendo la integridad y la trazabilidad de la data en todo momento.",
            size:20
        },
        {
            icon:"/assets/icons/puzzle.svg",
            title:"Integración Total",
            description:"Perfecta integración con los procesos administrativos clave: Cuentas por Cobrar, Cuentas por Pagar, Inventario, generación de todos los documentos fiscales, Banco y Contabilidad, asegurando la coherencia de la data en toda su gestión.",
            size:20
        },
        {
            icon:"/assets/icons/shield.svg",
            title:"Homologado por el SENIAT",
            description:"Bajo la homologación del SENIAT, garantizando que su empresa se mantenga en cumplimiento fiscal permanente. Estamos homologados para generar facturas en forma libre y digital."
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
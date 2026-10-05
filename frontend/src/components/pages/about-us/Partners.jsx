import SectionHeader from "@/src/components/commons/SectionHeader";
import LogoCard from "@/src/components/commons/LogoCard";
const Partners = ({ partners }) => {
    return (
        <section className="bg-light py-16 px-4 flex flex-col items-center justify-center">
            <SectionHeader title="Nuestros aliados comerciales"
            subtitle="Confian en nosotros para representarlos"
            titleColor="secondary"
            alignment="center"/>

            <div className="container mx-auto mt-12 flex justify-center gap-10 flex-wrap">
                {partners.map((partner, index) => (
                    <LogoCard 
                        key={index}
                        logoSrc={partner.logo}
                        altText={partner.name}
                        link={partner.link}
                        width="w-48 md:w-64"
                        height="h-32 md:h-40"
                    />
                ))}
            </div>
        </section>
    );
};

export default Partners;
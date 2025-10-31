import StatPill from "/src/components/commons/StatPill";
import CTAButton from "/src/components/commons/CTAButton";
import SectionHeader from "/src/components/commons/SectionHeader";

const ContactUs = () => {
    return (
        <section className="bg-light pt-20 pb-30">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <SectionHeader 
                        title="Hablemos de tu próximo proyecto"
                        subtitle="Tenemos soluciones para tu empresa"
                        titleColor="secondary"
                        alignment="center"
                    />

                    {/* Stats Pills */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
                        <StatPill 
                            number="+95" 
                            text="Clientes activos con plataformas Saint" 
                            bgColor="bg-primary"
                        />
                        <StatPill 
                            number="5" 
                            text="Centros comerciales con nuestro sistema" 
                            bgColor="bg-secondary"
                        />
                        <StatPill 
                            number="+351" 
                            text="Impresoras fiscales bajo mantenimiento anual" 
                            bgColor="bg-accent"
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <CTAButton onClick={() => window.location.href = '/contact'}>
                            Contáctanos
                        </CTAButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

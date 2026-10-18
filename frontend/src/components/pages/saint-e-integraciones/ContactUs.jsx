import CTAButton from "@/src/components/commons/CTAButton";

const ContactUs = () => {
    return (
        <section className="bg-light py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-primary rounded-3xl px-12 py-16 text-center shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                            ¿Listo para llevar tu gestión al siguiente nivel?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 font-sans mb-8 max-w-2xl mx-auto">
                            Conoce cómo Saint e integraciones pueden adaptarse a la operativa de tu empresa.
                            Agenda una demostración con nuestro equipo de expertos.
                        </p>
                        <div className="flex justify-center">
                            <CTAButton to="/contact">
                                Solicita una demo
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

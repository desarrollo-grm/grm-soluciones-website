import CTAButton from "@/src/components/commons/CTAButton";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="bg-light h-[calc(100dvh-88px)] flex items-end overflow-hidden">
            <div className="container mx-auto px-6 pb-0 flex items-start gap-8 h-full">
                {/* Left Side - Text Content */}
                <div className="flex-1 px-8 py-8 gap-6 flex flex-col justify-center h-full">
                    <h1 className="font-display text-secondary text-4xl md:text-5xl lg:text-6xl font-bold">
                        Soporte Técnico Especializado
                    </h1>
                    <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-dark">
                        Más que una solución, un acompañamiento para tu éxito
                    </h2>
                    <p className="text-g md:text-lg text-dark leading-relaxed">
                        Con el entendimiento y las necesidades de tu empresa en el centro, brindamos una asesoría integral y acompañada 
                        para garantizar el éxito continuo del uso de sus módulos administrativo, contable y de talento humano, 
                        así como de su infraestructura tecnológica.
                    </p>
                    <CTAButton to="/contact">
                        Solicita Información
                    </CTAButton>
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:flex h-full items-start justify-start flex-shrink-0">
                    <Image
                        src="/assets/images/soporte.webp" 
                        alt="Soporte y Asesorías" 
                        width={1478}
                        height={1333}
                        priority
                        className="h-full w-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;

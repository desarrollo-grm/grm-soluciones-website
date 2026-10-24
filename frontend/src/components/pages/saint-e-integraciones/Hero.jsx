import CTAButton from "@/src/components/commons/CTAButton";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="bg-light lg:min-h-[calc(100dvh-88px)] flex items-center overflow-hidden py-16 px-6">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                <div className="flex-1 flex flex-col gap-6 max-w-2xl">
                    <h1 className="font-display text-secondary text-5xl md:text-6xl lg:text-7xl font-bold">
                        Saint e Integraciones
                    </h1>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-dark">
                        Software administrativo, contable y de gestión
                    </h2>
                    <p className="text-lg md:text-xl text-dark leading-relaxed">
                        Somos representantes de casa matriz desde hace más de 31 años.
                        Implementamos, configuramos y adaptamos el ecosistema Saint para
                        potenciar la operación de tu empresa.
                    </p>
                    <CTAButton to="/contact">
                        Solicita Información
                    </CTAButton>
                </div>

                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 md:p-14 flex flex-col items-center gap-6">
                        <div className="relative w-full aspect-[16/9]">
                            <Image
                                src="/assets/images/saint.svg"
                                alt="Saint casa de software"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 576px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

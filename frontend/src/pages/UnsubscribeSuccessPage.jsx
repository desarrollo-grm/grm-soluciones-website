import Header from '/src/components/layout/Header';
import Footer from '/src/components/layout/Footer';
import CTAButton from '/src/components/commons/CTAButton';
import SectionHeader from '/src/components/commons/SectionHeader';

const quickActions = [
    {
        title: 'Volver al inicio',
        description: 'Explora los servicios y soluciones que ofrecemos en la página principal.',
        to: '/',
    },
    {
        title: 'Leer el blog',
        description: 'Si quieres seguir informado, revisa nuestras publicaciones más recientes.',
        to: '/blog',
    },
    {
        title: 'Contactar soporte',
        description: 'Si te desuscribiste por error, puedes escribirnos para ayudarte.',
        to: '/contact',
    },
];

const UnsubscribeSuccessPage = () => {
    return (
        <>
            <Header />
            <main className="bg-light overflow-hidden">
                <section className="relative isolate py-16 sm:py-20 lg:py-24">
                    <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-secondary/15 via-transparent to-transparent" />
                    <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
                    <div className="absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

                    <div className="container mx-auto px-6">
                        <div className="mx-auto max-w-5xl">
                            <SectionHeader
                                title="Te has dado de baja"
                                subtitle="Tu solicitud fue procesada correctamente."
                                titleColor="primary"
                                alignment="center"
                                margin="small"
                            />

                            <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur sm:p-10">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-8 w-8"
                                    >
                                        <path
                                            d="M20 6L9 17l-5-5"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <div className="mt-6 text-center">
                                    <h2 className="font-display text-2xl font-bold text-dark sm:text-3xl">
                                        Ya no recibirás correos de novedades por esta lista.
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dark/80 sm:text-lg">
                                        Si fue un error, puedes volver a suscribirte desde el sitio en cualquier momento.
                                        Mientras tanto, puedes seguir explorando nuestros servicios, artículos y canales de contacto.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {quickActions.map((action) => (
                                        <div
                                            key={action.title}
                                            className={`flex h-full flex-col rounded-2xl border border-primary/10 bg-light p-5 shadow-sm ${action.title === 'Contactar soporte' ? 'sm:col-span-2 sm:max-w-md sm:justify-self-center xl:col-span-1' : ''}`}
                                        >
                                            <h3 className="font-display text-lg font-semibold text-primary">
                                                {action.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-dark/75 flex-1">
                                                {action.description}
                                            </p>
                                            <div className="mt-5">
                                                <CTAButton to={action.to} fullWidth>
                                                    Ir ahora
                                                </CTAButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-2xl bg-primary/5 p-5 text-center">
                                    <p className="text-sm leading-6 text-dark/75 sm:text-base">
                                        ¿Necesitas ayuda con tu suscripción? Escríbenos a través de nuestro formulario de contacto
                                        y te respondemos desde allí.
                                    </p>
                                    <div className="mt-4 flex justify-center">
                                        <CTAButton to="/contact" fullWidth>
                                            Ir a contacto
                                        </CTAButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default UnsubscribeSuccessPage;
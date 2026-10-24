import CTAButton from '@/src/components/commons/CTAButton';
import SectionHeader from '@/src/components/commons/SectionHeader';

const quickActions = [
    {
        title: 'Ir al inicio',
        description: 'Vuelve a la página principal y conoce nuestras soluciones.',
        to: '/',
    },
    {
        title: 'Leer el blog',
        description: 'Encuentra artículos y novedades sobre nuestros servicios.',
        to: '/blog',
    },
    {
        title: 'Contáctanos',
        description: 'Si necesitas ayuda, escríbenos y te responderemos pronto.',
        to: '/contact',
    },
];

const NotFoundPage = ({
    title = 'Página no encontrada',
    subtitle = 'Lo sentimos, no pudimos encontrar lo que buscas.',
}) => {
    return (
        <>
            <main className="bg-light overflow-hidden">
                <section className="relative isolate py-16 sm:py-20 lg:py-24">
                    <div className="container mx-auto px-6">
                        <div className="mx-auto max-w-5xl">
                            <SectionHeader
                                title={title}
                                subtitle={subtitle}
                                titleColor="primary"
                                alignment="center"
                                margin="small"
                                headingLevel={1}
                            />

                            <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur sm:p-10">
                                <p
                                    aria-hidden="true"
                                    className="text-center font-display text-7xl font-bold leading-none text-secondary sm:text-8xl"
                                >
                                    404
                                </p>

                                <div className="mt-6 text-center">
                                    <h2 className="font-display text-2xl font-bold text-dark sm:text-3xl">
                                        El enlace puede estar roto o la página fue movida.
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dark/80 sm:text-lg">
                                        Revisa la dirección o utiliza los accesos rápidos para continuar navegando por el sitio.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {quickActions.map((action) => (
                                        <div
                                            key={action.title}
                                            className={`flex h-full flex-col rounded-2xl border border-primary/10 bg-light p-5 shadow-sm ${action.title === 'Contáctanos' ? 'sm:col-span-2 sm:max-w-md sm:justify-self-center xl:col-span-1' : ''}`}
                                        >
                                            <h3 className="font-display text-lg font-semibold text-primary">
                                                {action.title}
                                            </h3>
                                            <p className="mt-2 flex-1 text-sm leading-6 text-dark/75">
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
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default NotFoundPage;

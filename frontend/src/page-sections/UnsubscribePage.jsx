'use client'
import { useEffect, useState } from 'react';

import CTAButton from '@/src/components/commons/CTAButton';
import SectionHeader from '@/src/components/commons/SectionHeader';

const UnsubscribePage = () => {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const unsubscribeEndpoint = process.env.NEXT_PUBLIC_UNSUBSCRIPTION_ENDPOINT;

    //TODO: cual es el correo
    const conctactanos = '\nLamentamos las molestias. Contáctanos a ayuda@grm-soluciones.com, y te daremos de baja manualmente.';

    useEffect(() => {
        setToken(new URLSearchParams(window.location.search).get('token')?.trim() || '');
    }, []);

    const handleUnsubscribe = async () => {
        if (!token) {
            setStatus('error');
            setMessage('No se encontró un token válido en la URL.' + conctactanos);
            return;
        }

        if (!unsubscribeEndpoint) {
            setStatus('error');
            setMessage('La URL de desuscripción no está configurada en este momento.' + conctactanos);
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch(unsubscribeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error('No se pudo confirmar la baja.' 
                    + (data.error ? ` Detalles: ${data.error}` : '') 
                    + (data.message ? ` Mensaje: ${data.message}` : '')
                );
            }

            window.location.href = '/newsletter/unsubscribed-success';
        } catch (error) {
            console.error('Error during unsubscription:', error);
            setStatus('error');
            setMessage('No se pudo completar la baja.' + conctactanos);
        }
    };

    return (
        <>
            <main className="bg-light overflow-hidden">
                <section className="relative isolate py-16 sm:py-20 lg:py-24">
                    <div className="container mx-auto px-6">
                        <div className="mx-auto max-w-3xl">
                            <SectionHeader
                                title="Hasta luego, ¡esperamos verte pronto!"
                                subtitle="Confirma que quieres darte de baja de nuestros correos."
                                titleColor="primary"
                                alignment="center"
                                margin="small"
                            />

                            <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur sm:p-10">
                                <p className="text-center text-base leading-7 text-dark/80 sm:text-lg">
                                    Si quieres dejar de recibir nuestras comunicaciones, confirma tu desuscripción con el botón siguiente.
                                </p>

                                <div className="mt-8 flex justify-center">
                                    <CTAButton
                                        onClick={handleUnsubscribe}
                                        fullWidth
                                        disabled={status === 'loading' || !token}
                                        className="max-w-md"
                                    >
                                        {status === 'loading' ? 'Enviando...' : 'Confirmar baja'}
                                    </CTAButton>
                                </div>

                                {message ? (
                                    <p
                                        role="status"
                                        aria-live="polite"
                                        className={`mt-6 text-center text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}
                                    >
                                        {message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default UnsubscribePage;

'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function useNewsletterSubscription() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha() || {};
    const subscriptionApiUrl = process.env.NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT || '/api/subscribe';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setStatus('error');
            setMessage('Ingresa tu correo electrónico.');
            return;
        }

        if (!executeRecaptcha) {
            setStatus('error');
            setMessage('Hemos encontrado un problema. Intenta de nuevo más tarde.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const recaptchaToken = await executeRecaptcha('newsletter_subscription');
            const response = await fetch(subscriptionApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail, captchaToken: recaptchaToken }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setStatus('success');
                setMessage('Suscripción exitosa. Revisa tu bandeja para confirmar las novedades.');
                setEmail('');
                return;
            }

            if (response.status === 409) {
                setStatus('error');
                setMessage(data.error || 'Este correo ya está suscrito.');
                return;
            }

            if (response.status === 400) {
                setStatus('error');
                setMessage(data.error || 'Ingresa un correo válido.');
                return;
            }

            console.log('Error en la suscripción:', data.error);
            setStatus('error');
            setMessage(data.error || 'No pudimos completar la suscripción. Intenta de nuevo.');
        } catch {
            setStatus('error');
            setMessage('No pudimos conectar con el servidor. Intenta más tarde.');
        }
    };

    return {
        email,
        setEmail,
        status,
        message,
        handleSubmit,
    };
}

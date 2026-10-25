'use client';

import useNewsletterSubscription from '@/src/hooks/useNewsletterSubscription';

const MAX_EMAIL_LENGTH = 254;

export default function NewsletterForm({ variant = 'footer' }) {
    const { email, setEmail, status, message, isRecaptchaReady, handleSubmit } = useNewsletterSubscription();
    const isBlogVariant = variant === 'blog';

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className={isBlogVariant ? 'space-y-3' : 'flex max-w-full'}>
                <input
                    type="email"
                    placeholder={isBlogVariant ? 'correo@ejemplo.com' : 'Tu email'}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    maxLength={MAX_EMAIL_LENGTH}
                    aria-label="Correo electrónico para newsletter"
                    className={isBlogVariant
                        ? 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
                        : 'bg-light flex-1 min-w-0 px-4 py-2 rounded-l-full text-gray-800 focus:outline-none'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || !isRecaptchaReady}
                    className={isBlogVariant
                        ? 'w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors'
                        : 'bg-secondary hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed px-4 py-2 rounded-r-full text-sm font-semibold transition-colors whitespace-nowrap'}
                >
                    {status === 'loading' ? 'Enviando...' : isBlogVariant ? 'Suscríbete' : 'Subscríbete'}
                </button>
            </div>
            {message ? (
                <p
                    role="status"
                    aria-live="polite"
                    className={`text-sm ${isBlogVariant
                        ? status === 'success' ? 'text-green-600' : 'text-red-600'
                        : status === 'success' ? 'text-green-300' : 'text-red-300'}`}
                >
                    {message}
                </p>
            ) : null}
        </form>
    );
}

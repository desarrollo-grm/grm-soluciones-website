'use client';

import useNewsletterSubscription from '@/src/hooks/useNewsletterSubscription';

export default function NewsletterForm() {
    const { email, setEmail, status, message, handleSubmit } = useNewsletterSubscription();

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex max-w-full">
                <input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-label="Correo electrónico para newsletter"
                    className="bg-light flex-1 min-w-0 px-4 py-2 rounded-l-full text-gray-800 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-secondary hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed px-4 py-2 rounded-r-full text-sm font-semibold transition-colors whitespace-nowrap"
                >
                    {status === 'loading' ? 'Enviando...' : 'Subscríbete'}
                </button>
            </div>
            {message ? (
                <p
                    role="status"
                    aria-live="polite"
                    className={`text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}
                >
                    {message}
                </p>
            ) : null}
        </form>
    );
}

'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { products, categories } from '@/src/data/posts';

const BlogSidebar = ({ 
    searchTerm, 
    onSearchChange, 
    selectedProducts, 
    onProductsChange, 
    selectedCategories, 
    onCategoriesChange 
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha() || {};
    const subscriptionApiUrl = process.env.NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT || '/api/subscribe';

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        handleSubscribe(email);
    };

    const handleSubscribe = async (value) => {
        const trimmedEmail = value.trim();

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

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscador de artículos"
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                    <svg 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>
            </div>

            {/* Products and Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-4">
                    Productos y servicios
                </h3>
                <ul className="space-y-3">
                    {products.map((product, index) => (
                        <li key={index}>
                            <button 
                                onClick={() => onProductsChange(product.tag)}
                                className={`transition-colors text-left ${
                                    selectedProducts.includes(product.tag)
                                        ? 'text-secondary font-semibold'
                                        : 'text-dark/80 hover:text-secondary'
                                }`}
                            >
                                {product.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-4">
                    Categorías
                </h3>
                <ul className="space-y-3">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button 
                                onClick={() => onCategoriesChange(category)}
                                className={`transition-colors text-left ${
                                    selectedCategories.includes(category)
                                        ? 'text-secondary font-semibold'
                                        : 'text-dark/80 hover:text-secondary'
                                }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Newsletter
                </h3>
                <p className="text-dark/80 text-sm mb-4">
                    Mantente al tanto de todas las novedades
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
                    >
                        {status === 'loading' ? 'Enviando...' : 'Suscríbete'}
                    </button>
                </form>
                {message ? (
                    <p
                        role="status"
                        aria-live="polite"
                        className={`mt-3 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {message}
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default BlogSidebar;

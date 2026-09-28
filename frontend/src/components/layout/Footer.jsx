import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoGRM from '/assets/logo-grm.svg?react';
import { XIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '/assets/icons';
import { getAllForFooter } from '/src/data/services.js';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const subscriptionApiUrl = import.meta.env.VITE_SUBSCRIPTION_ENDPOINT;

    const handleSubscribe = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setStatus('error');
            setMessage('Ingresa tu correo electrónico.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch(subscriptionApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail }),
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

            setStatus('error');
            setMessage(data.error || 'No pudimos completar la suscripción. Intenta de nuevo.');
        } catch {
            setStatus('error');
            setMessage('No pudimos conectar con el servidor. Intenta más tarde.');
        }
    };

    return (
        <footer className="bg-primary text-white py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr] gap-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <img 
                            src="/assets/logo-grm.svg" 
                            alt="GRM Soluciones" 
                            className="h-32 mb-4 brightness-0 invert"
                        />
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <XIcon className="w-8 h-8" />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <InstagramIcon className="w-8 h-8" />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <LinkedInIcon className="w-8 h-8" />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <WhatsAppIcon className="w-8 h-8" />
                            </a>
                        </div>
                    </div>

                    {/* Navegación */}
                    <div className='hidden md:block'>
                        <h3 className="text-xl font-display font-bold mb-4">Navegación</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about-us" className="hover:underline">Conócenos</Link></li>
                            <li><a href="/#services" className="hover:underline">Productos</a></li>
                            <li><a href="/#services" className="hover:underline">Servicios</a></li>
                            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                            <li><Link to="/contact" className="hover:underline">Contáctanos</Link></li>
                        </ul>
                    </div>

                    {/* Servicios y productos */}
                    <div className='hidden md:block'>
                        <h3 className="text-xl font-display font-bold mb-4">Servicios y productos</h3>
                        <ul className="space-y-2">
                            {getAllForFooter().map((service, index) => (
                                <li key={index}>
                                    <Link to={service.link} className="hover:underline">
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contáctanos */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-4">Contáctanos</h3>
                        <div className="space-y-2 mb-6">
                            <p className="text-sm">Centro Ciudad Comercial Tamanaco, Torre A, Piso 8, Oficina 805, Caracas, Venezuela.</p>
                            <p className="text-sm">0412-233-43-98</p>
                            <a className="hover:underline" href="mailto:soporte@grm.net.ve"><p className="text-sm">soporte@grm.net.ve</p></a>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-display font-bold mb-3">Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="space-y-3">
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
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

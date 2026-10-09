import Link from 'next/link';
import Image from 'next/image';
import { XIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/assets/icons';
import { getAllForFooter } from '@/src/data/services.js';
import NewsletterForm from '@/src/components/layout/NewsletterForm';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr] gap-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Image
                            src="/assets/logo-grm.svg"
                            alt="GRM Soluciones" 
                            width={160}
                            height={128}
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
                            <li><Link href="/about-us" className="hover:underline">Conócenos</Link></li>
                            <li><a href="/#services" className="hover:underline">Productos</a></li>
                            <li><a href="/#services" className="hover:underline">Servicios</a></li>
                            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contáctanos</Link></li>
                        </ul>
                    </div>

                    {/* Servicios y productos */}
                    <div className='hidden md:block'>
                        <h3 className="text-xl font-display font-bold mb-4">Servicios y productos</h3>
                        <ul className="space-y-2">
                            {getAllForFooter().map((service, index) => (
                                <li key={index}>
                                    <Link href={service.link} className="hover:underline">
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
                            <NewsletterForm />
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-[10px] text-gray-300 leading-tight">
                    Este sitio está protegido por reCAPTCHA y aplican la{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-white">Política de Privacidad</a> y los{' '}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-white">Términos de Servicio</a> de Google.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

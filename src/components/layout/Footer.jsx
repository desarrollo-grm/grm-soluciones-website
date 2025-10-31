import { XIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '/assets/icons';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr] gap-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-start lg:items-center">
                        <img 
                            src="/assets/logo-grm.svg" 
                            alt="GRM Soluciones" 
                            className="h-32 mb-4"
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
                    <div>
                        <h3 className="text-xl font-display font-bold mb-4">Navegación</h3>
                        <ul className="space-y-2">
                            <li><a href="/about-us" className="hover:underline">Conócenos</a></li>
                            <li><a href="#" className="hover:underline">Productos</a></li>
                            <li><a href="#" className="hover:underline">Servicio</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="/contact" className="hover:underline">Contáctanos</a></li>
                        </ul>
                    </div>

                    {/* Servicios y productos */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-4">Servicios y productos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Saint e integraciones</a></li>
                            <li><a href="#" className="hover:underline">Facturación digital</a></li>
                            <li><a href="#" className="hover:underline">Condominio</a></li>
                            <li><a href="#" className="hover:underline">Equipos y máquinas fiscales</a></li>
                            <li><a href="#" className="hover:underline">Asesoría integral</a></li>
                            <li><a href="#" className="hover:underline">Soporte integral</a></li>
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
                            <h4 className="text-lg font-displayfont-bold mb-3">Newsletter</h4>
                            <div className="flex max-w-full">
                                <input 
                                    type="email" 
                                    placeholder="Tu email" 
                                    className="bg-light flex-1 min-w-0 px-4 py-2 rounded-l-full text-gray-800 focus:outline-none"
                                />
                                <button className="bg-secondary hover:bg-accent px-2 py-2 rounded-r-full text-sm font-semibold transition-colors whitespace-nowrap">
                                    Subscríbete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

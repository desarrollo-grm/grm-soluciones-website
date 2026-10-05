'use client';

import dynamic from 'next/dynamic';
import { MapMarkerIcon, PhoneIcon, EnvelopeIcon, LinkedInIcon, InstagramIcon, XIcon, WhatsAppIcon } from '@/assets/icons';

const Map = dynamic(() => import('@/src/components/commons/Map'), { ssr: false });

const ContactInfo = () => {
    // Google Maps link with your coordinates
    const googleMapsUrl = "https://www.google.com/maps/place/Centro+Ciudad+Comercial+Tamanaco+CCCT/@10.4851825,-66.8577697,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a58562d6be2f7:0x68c1b72d71c1d7d6!8m2!3d10.4851825!4d-66.8551894!16s%2Fg%2F11b60rx05d?entry=ttu&g_ep=EgoyMDI1MTAyOC4wIKXMDSoASAFQAw%3D%3D";
    
    return (
        <div className="bg-primary text-light p-6 rounded-lg flex flex-col gap-3 max-w-md w-full overflow-hidden xl:h-full">
            <h2 className="text-secondary text-xl font-bold flex-shrink-0">
                Información de contacto
            </h2>
            
            {/* Dirección */}
            <div className="flex gap-3 items-start flex-shrink-0">
                <MapMarkerIcon className="text-light mt-1 flex-shrink-0" size={18} />
                <div>
                    <h3 className="font-semibold mb-1 text-sm">Dirección</h3>
                    <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light/90 hover:text-light transition-colors hover:underline"
                    >
                        <p className="text-sm">CCCT, Torre A, Piso 8, Ofícina 805</p>
                        <p className="text-sm">Caracas, Venezuela</p>
                    </a>
                </div>
            </div>
            
            {/* Teléfono */}
            <div className="flex gap-3 items-start flex-shrink-0">
                <PhoneIcon className="text-light mt-1 flex-shrink-0" size={18} />
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold mb-1 text-sm">Teléfono</h3>
                    <a href="tel:+582129597141"
                    target='_blank'
                    rel='noopener noreferrer' 
                    className="text-light/90 hover:text-light hover:underline transition-colors text-sm">
                        +58 (212) 959-7141
                    </a>
                    <a href="tel:+584242139974"
                    target='_blank'
                    rel='noopener noreferrer' 
                    className="text-light/90 hover:text-light hover:underline transition-colors text-sm">
                        +58 (424) 213-9974
                    </a>
                </div>
            </div>
            
            {/* Email */}
            <div className="flex gap-3 items-start flex-shrink-0">
                <EnvelopeIcon className="text-light mt-1 flex-shrink-0" size={18} />
                <div>
                    <h3 className="font-semibold mb-1 text-sm">Email</h3>
                    <a href="mailto:contacto@grmsoluciones.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-light/90 hover:text-light hover:underline transition-colors text-sm">
                        contacto@grmsoluciones.com
                    </a>
                </div>
            </div>
            
            {/* Mapa */}
            <div className="w-full flex-1 bg-light rounded-lg overflow-hidden min-h-[100px] z-1">
                <Map latitude="10.4851825" longitude="-66.8577697" address="CCCT, Caracas, Venezuela" tileStyle="cartoLight"/>
            </div>
            
            {/* Redes Sociales */}
            <div className="flex gap-4 mt-4 flex-shrink-0">
                <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light hover:text-secondary transition-colors"
                    aria-label="X"
                >
                    <XIcon size={24} />
                </a>
                <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light hover:text-secondary transition-colors"
                    aria-label="Instagram"
                >
                    <InstagramIcon size={24} />
                </a>
                <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light hover:text-secondary transition-colors"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon size={24} />
                </a>
                <a 
                    href="https://wa.me/582125551234" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light hover:text-secondary transition-colors"
                    aria-label="WhatsApp"
                >
                    <WhatsAppIcon size={24} />
                </a>
            </div>
        </div>
    );
};

export default ContactInfo;
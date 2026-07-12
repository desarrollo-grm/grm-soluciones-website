const services = [
    {
        id: 1,
        title: "Saint e integraciones",
        description: "Somos representantes de casa matriz desde hace más de 31 años, ofreciendo soluciones administrativas y contables robustas y confiables para potenciar tu negocio.",
        bullets: [
            "Implementación y configuración",
            "Capacitación personalizada",
            "Soporte técnico especializado",
            "Desarrollos a la medida"
        ],
        icon: "/assets/icons/verified.svg",
        link: "/#services",
        type: "service",
        isFeatured: true
    },
    {
        id: 2,
        title: "Facturación digital",
        description: "Genera y gestiona tus facturas electrónicas.",
        bullets: [
            "Módulos de Saint",
            "Correos Masivos",
            "Mensajería de texto",
            "Integración de desarrollos"
        ],
        icon: "/assets/icons/facturacion.svg",
        link: "/facturacion-digital",
        type: "product",
        isFeatured: false
    },
    {
        id: 3,
        title: "Condominio",
        description: "Administración integral para propiedades horizontales.",
        bullets: [
            "Gestión de condominios",
            "Visualización de datos",
            "Automatización de tareas administrativas",
            "Comunicación masiva"
        ],
        icon: "/assets/icons/condominio.svg",
        link: "/condominio",
        type: "product",
        isFeatured: false
    },
    {
        id: 4,
        title: "Equipos y máquinas fiscales",
        description: "Soluciones de hardware para cumplimiento fiscal.",
        bullets: [
            "Venta y renta de equipos fiscales",
            "Mantenimiento y soporte técnico",
            "Actualización de software fiscal",
            "Asesoría en cumplimiento fiscal"
        ],
        icon: "/assets/icons/hardware.svg",
        link: "/#services",
        type: "product",
        isFeatured: false
    },
    {
        id: 5,
        title: "Soporte y asesoría",
        description: "Acompañamiento experto para tus operaciones.",
        bullets: [
            "Soporte remoto y en sitio",
            "Mantenimiento preventivo y correctivo",
            "Actualizaciones de software",
            "Capacitación técnica"
        ],
        icon: "/assets/icons/soporte.svg",
        link: "/soporte",
        type: "service",
        isFeatured: false
    }
];

// Helper function to get all services
export const getServices = () => services;

// Helper function to get products for navigation dropdown
export const getProductsForNav = () => {
    return services
        .filter(service => service.type === "product")
        .map(service => ({
            name: service.title,
            path: service.link
        }));
};

// Helper function to get services for navigation dropdown
export const getServicesForNav = () => {
    return services
        .filter(service => service.type === "service")
        .map(service => ({
            name: service.title,
            path: service.link
        }));
};

// Helper function to get all services for footer
export const getAllForFooter = () => {
    return services.map(service => ({
        title: service.title,
        link: service.link
    }));
};

// Helper function to get featured service
export const getFeaturedService = () => {
    return services.find(service => service.isFeatured === true);
};

// Helper function to get non-featured services
export const getNonFeaturedServices = () => {
    return services.filter(service => service.isFeatured === false);
};

export default services;
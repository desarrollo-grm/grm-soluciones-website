const clients = [
    {
        id: 1,
        name: "Alliott Group",
        logo: "/assets/clients/alliot.jpeg",
        link: "",
        isCC: false
    },
    {
        id: 2,
        name: "Avícola Mayupan",
        logo: "/assets/clients/avcolaMayupan.jpeg",
        link: "",
        isCC: false
    },
    {
        id: 3,
        name: "AVEC",
        logo: "/assets/clients/avec.jpg",
        link: "",
        isCC: false
    },
    {
        id: 4,
        name: "CCCT",
        logo: "/assets/clients/ccct.jpg",
        link: "",
        isCC: true
    },
    {
        id: 5,
        name: "C.C. Hyper Jumbo",
        logo: "/assets/clients/cchyperjumbo.png",
        link: "",
        isCC: true
    },
    {
        id: 7,
        name: "C.C. Parque Morichal",
        logo: "/assets/clients/ccparquemorichal.jpg",
        link: "",
        isCC: true
    },
    {
        id: 8,
        name: "C.C. Paseo Las Mercedes",
        logo: "/assets/clients/ccpaseolasmercedes.jpg",
        link: "",
        isCC: true
    },
    {
        id: 9,
        name: "Ciao Bella",
        logo: "/assets/clients/ciaobella.webp",
        link: "",
        isCC: false
    },
    {
        id: 10,
        name: "Componix",
        logo: "/assets/clients/componix.jpg",
        link: "",
        isCC: false
    },
    {
        id: 11,
        name: "C.C. Parque Los Aviadores",
        logo: "/assets/clients/CondominioParqueLosAviadores.png",
        link: "",
        isCC: true
    },
    {
        id: 12,
        name: "Confetti",
        logo: "/assets/clients/confetti.png",
        link: "",
        isCC: false
    },
    {
        id: 13,
        name: "Corporación Prag",
        logo: "/assets/clients/coorporacionPrag.jpg",
        link: "",
        isCC: false
    },
    {
        id: 14,
        name: "Farmarket",
        logo: "/assets/clients/farmarket.webp",
        link: "",
        isCC: false
    },
    {
        id: 15,
        name: "Ferretería Chapellín",
        logo: "/assets/clients/ferreteriachapellin.jpg",
        link: "",
        isCC: false
    },
    {
        id: 16,
        name: "Gases Industriales Del Este",
        logo: "/assets/clients/GasesIndustrialesDelEste.jpg",
        link: "",
        isCC: false
    },
    {
        id: 17,
        name: "Grupo Catecon",
        logo: "/assets/clients/GrupoCatecon.jpg",
        link: "",
        isCC: false
    },
    {
        id: 18,
        name: "Grupo N.S.M. 99",
        logo: "/assets/clients/GrupoN.S.M.99.avif",
        link: "",
        isCC: false
    },
    {
        id: 19,
        name: "Servicio Internacional DubbingS",
        logo: "/assets/clients/ids.webp",
        link: "",
        isCC: false
    },
    {
        id: 20,
        name: "Jengimiel",
        logo: "/assets/clients/jengimiel.webp",
        link: "",
        isCC: false
    },
    {
        id: 21,
        name: "Organización GBD",
        logo: "/assets/clients/OrganizacionGBD.jpeg",
        link: "",
        isCC: false
    },
    {
        id: 22,
        name: "C.C. Líder",
        logo: "/assets/clients/Picture2.png",
        link: "",
        isCC: true
    },
    {
        id: 24,
        name: "Tiendas ConstruTodo",
        logo: "/assets/clients/tiendasconstructodo.jpg",
        link: "",
        isCC: false
    }
];

const ccClients = clients.filter(client => client.isCC);

export default clients;
export { ccClients };

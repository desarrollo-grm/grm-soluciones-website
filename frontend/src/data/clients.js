const clients = [
    {
        id: 1,
        name: "Alliott Group",
        logo: "/assets/clients/alliot.webp",
        link: "",
        isCC: false
    },
    {
        id: 2,
        name: "Avícola Mayupan",
        logo: "/assets/clients/avcolaMayupan.webp",
        link: "",
        isCC: false
    },
    {
        id: 3,
        name: "AVEC",
        logo: "/assets/clients/avec.webp",
        link: "",
        isCC: false
    },
    {
        id: 4,
        name: "CCCT",
        logo: "/assets/clients/ccct.webp",
        link: "",
        isCC: true
    },
    {
        id: 5,
        name: "C.C. Hyper Jumbo",
        logo: "/assets/clients/cchyperjumbo.webp",
        link: "",
        isCC: true
    },
    {
        id: 7,
        name: "C.C. Parque Morichal",
        logo: "/assets/clients/ccparquemorichal.webp",
        link: "",
        isCC: true
    },
    {
        id: 8,
        name: "C.C. Paseo Las Mercedes",
        logo: "/assets/clients/ccpaseolasmercedes.webp",
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
        logo: "/assets/clients/componix.webp",
        link: "",
        isCC: false
    },
    {
        id: 11,
        name: "C.C. Parque Los Aviadores",
        logo: "/assets/clients/CondominioParqueLosAviadores.webp",
        link: "",
        isCC: true
    },
    {
        id: 12,
        name: "Confetti",
        logo: "/assets/clients/confetti.webp",
        link: "",
        isCC: false
    },
    {
        id: 13,
        name: "Corporación Prag",
        logo: "/assets/clients/coorporacionPrag.webp",
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
        logo: "/assets/clients/ferreteriachapellin.webp",
        link: "",
        isCC: false
    },
    {
        id: 16,
        name: "Gases Industriales Del Este",
        logo: "/assets/clients/GasesIndustrialesDelEste.webp",
        link: "",
        isCC: false
    },
    {
        id: 17,
        name: "Grupo Catecon",
        logo: "/assets/clients/GrupoCatecon.webp",
        link: "",
        isCC: false
    },
    {
        id: 18,
        name: "Grupo N.S.M. 99",
        logo: "/assets/clients/GrupoN.S.M.99.webp",
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
        logo: "/assets/clients/OrganizacionGBD.webp",
        link: "",
        isCC: false
    },
    {
        id: 22,
        name: "C.C. Líder",
        logo: "/assets/clients/Picture2.webp",
        link: "",
        isCC: true
    },
    {
        id: 24,
        name: "Tiendas ConstruTodo",
        logo: "/assets/clients/tiendasconstructodo.webp",
        link: "",
        isCC: false
    }
];

const ccClients = clients.filter(client => client.isCC);

export default clients;
export { ccClients };

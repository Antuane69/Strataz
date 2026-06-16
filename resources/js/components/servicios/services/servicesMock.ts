import type { Servicio } from "../interfaces";

export const serviciosMock: Servicio[] = [
    {
        id: 'alberca',
        name: 'Alberca',
        eyebrow: 'Relajación',
        description:
          'Contamos con alberca junto al mar, desde donde podrá disfrutar de la paz y tranquilidad de nuestras instalaciones, para su confort cuenta con cómodos camastros, palapas y regaderas, en un entorno de privacidad absoluta.',
        icon: 'pool',
        accent: '#1f6f79',
        tags: ['Vista al mar', 'Camastros'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/alberca_1.jpg',
                alt: 'Alberca del hotel frente al mar',
            },
            {
                type: 'image',
                src: '/imagenes/servicios/alberca_2.jpg',
                alt: 'Camastros junto a la alberca',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/servicios/alberca_3.jpg',
                alt: 'Video de prueba de la alberca',
            },
        ],
    },
    {
        id: 'estacionamiento',
        name: 'Estacionamiento',
        eyebrow: 'Comodidad',
        description:
            'El hotel Mesón de Mita cuenta con su área de estacionamiento privado gratuito las 24 horas del día. Recomendamos confirmar la disponibilidad del servicio al momento de realizar tu reservación.',
        icon: 'parking',
        accent: '#8a4b22',
        tags: ['Privado', '24 horas', 'Sin costo'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/estacionamiento_1.jpg',
                alt: 'Estacionamiento',
            },
        ],
    },
    {
        id: 'tienda-artesanias',
        name: 'Tienda de artesanías',
        eyebrow: 'Regalos',
        description:
            'En la parte frontal del hotel encontrara una tienda de artesanías para adquirir pequeños souvenirs que le recordaran su agradable estancia en este lugar.',
        icon: 'shop',
        accent: '#a33f1d',
        tags: ['Souvenirs', 'Artesanías'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/artesanias_1.jpg',
                alt: 'Tienda de artesanías',
            },
        ],
    },
    {
        id: 'playa',
        name: 'Islas Marietas',
        eyebrow: 'Tours',
        description:
            'Santuario de aves y mamíferos marinos. Es un paseo en lancha obligado, que garantiza una experiencia inolvidable a todos sus visitantes quienes disfrutarán al máximo de sus playas y un ambiente ecológico inigualable perfecto para hacer contacto con la naturaleza y las especies marinas.',
        icon: 'beach',
        accent: '#235d48',
        tags: ['Playa'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/islas_marietas.jpg',
                alt: 'Islas marietas',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                alt: 'Video de prueba de playa',
            },
        ],
    },


    {
        id: 'deportes',
        name: 'Deportes',
        eyebrow: 'Actividad física',
        description:
          'En nuestras playas podrá disfrutar de deportes acuáticos, como surf, paddle surf, boogie boarding, kayaking, snorkeling, buceo y pesca.',
        icon: 'sports',
        accent: '#1f6f79',
        tags: ['Surf', 'Paddle', "Buceo", "Pesca", "Kayaking", "Snorkeling", "Boogie boarding"],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/deportes_1.jpeg',
                alt: 'Deportes',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/servicios/alberca_3.jpg',
                alt: 'Video de prueba de la alberca',
            },
        ],
    },
    {
        id: 'restaurantes',
        name: 'Restaurantes',
        eyebrow: 'Comida',
        description:
            'Las instalaciones del Hotel Mesón de Mita son parte de la denominada playa “El Anclote” donde encontrará diez Restaurantes con diferentes ofertas de Menú para seleccionar; distinguiéndose entre ellos los mejores de la bahía.',
        icon: 'food',
        accent: '#8a4b22',
        tags: ['10 Restaurantes', 'En el anclote'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/restaurante_1.jpeg',
                alt: 'Restaurante',
            },
        ],
    },
    {
        id: 'Embarcaciones',
        name: 'Embarcaciones',
        eyebrow: 'Pesca',
        description:
            'El Embarcadero se encuentra próximo a nuestras instalaciones, donde se ofrecen excelentes servicios para paseos de recreo marino, pesca y el inigualable espectáculo de avistamiento de ballenas, durante los meses de Noviembre a Marzo.',
        icon: 'fish',
        accent: '#a33f1d',
        tags: ['Pesca de recreo', 'Avistamiento de ballenas'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/embarcaciones_1.jpg',
                alt: 'Embarcaciones',
            },
        ],
    },
    {
        id: 'transporte',
        name: 'Servicio de transporte',
        eyebrow: 'Transporte',
        description:
            'El servicio de taxi y transporte público se encuentra disponible en la zona los 365 días del año. Recomendamos confirmar en nuestra recepción los horarios de servicio en el periodo de tu estancia una vez te encuentres en el hotel.',
        icon: 'parking',
        accent: '#235d48',
        tags: ['Taxi', "365 dias del año"],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/transporte_1.jpg',
                alt: 'Islas marietas',
            },
        ],
    },
];
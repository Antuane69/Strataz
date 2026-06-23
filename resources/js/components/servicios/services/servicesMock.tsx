import type { Servicio } from '../interfaces';

export const serviciosMock: Servicio[] = [
    {
        id: 'alberca',
        name: 'Alberca',
        eyebrow: 'Relajacion',
        description:
          'Relajate en nuestra alberca y disfruta de momentos de descanso en un ambiente tranquilo, ideal para refrescarte despues de un dia de playa.',
        icon: 'pool',
        accent: '#1f6f79',
        tags: ['Vista al mar', 'Camastros'],
        media: [
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
            'Ofrecemos estacionamiento privado para mayor comodidad y tranquilidad durante tu visita.',
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
        id: 'acceso-camastros',
        name: 'Acceso directo a playa con area de camastros',
        eyebrow: 'Mar',
        description:
            'Disfruta la comodidad de estar a solo unos pasos del mar. Relajate en nuestra area de camastros mientras contemplas la brisa, el sonido de las olas y espectaculares atardeceres.',
        icon: 'beach',
        accent: '#a33f1d',
        tags: ['Mar', 'Relajacion'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/alberca_1.jpg',
                alt: 'Alberca del hotel frente al mar',
            },
        ],
    },
    {
        id: 'restaurante',
        name: 'Restaurante de desayunos y lunch "El Patio"',
        eyebrow: 'Comida',
        description:
            'Comienza tu dia con un delicioso desayuno o disfruta de un lunch fresco en un ambiente relajado y acogedor, ideal para complementar tu experiencia frente al mar.',
        icon: 'food',
        accent: '#235d48',
        tags: ['Desayuno'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/restaurante_1.jpeg',
                alt: 'Restaurante El Patio',
            },
            {
                type: 'image',
                src: '/imagenes/servicios/el_patio.jpeg',
                alt: 'Area de restaurante',
            },
        ],
    },
    {
        id: 'masajes',
        name: 'Area de masajes',
        eyebrow: 'Relajacion',
        description:
          'Consiente cuerpo y mente con un momento de relajacion. Disfruta de tratamientos disenados para renovar tu energia y elevar tu bienestar durante tu estancia.',
        icon: 'sparks',
        accent: '#1f6f79',
        tags: ['Masajes'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/spa_1.jpeg',
                alt: 'Area de masajes',
            },
        ],
    },
    {
        id: 'paddle',
        name: 'Renta de tablas de paddle, surf y kayak',
        eyebrow: 'Activacion fisica',
        description:
            'Vive la aventura en el mar con nuestras opciones de renta de equipo. Explora la costa, disfruta las olas y crea experiencias inolvidables en Punta de Mita.',
        icon: 'pool',
        accent: '#8a4b22',
        tags: ['Paddle', 'Surf', 'Kayak'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/surf_1.jpeg',
                alt: 'Renta de equipo acuatico',
            },
            {
                type: 'image',
                src: '/imagenes/servicios/surf_2.jpg',
                alt: 'Equipo para actividades en el mar',
            },
        ],
    },
    {
        id: 'bodas',
        name: 'Organizacion de bodas',
        eyebrow: 'Delicadeza',
        description:
            'Haz realidad la boda de tus suenos frente al mar. Nuestro equipo te acompana en cada detalle para crear una celebracion unica e inolvidable.',
        icon: 'boda',
        accent: '#a33f1d',
        tags: ['Boda de tus suenos'],
        media: [
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_1.jpg',
                alt: 'Montaje de boda frente al mar',
            },
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_2.jpg',
                alt: 'Celebracion de boda',
            },
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_3.jpg',
                alt: 'Decoracion para boda',
            },
        ],
    },
    {
        id: 'artesania',
        name: 'Boutique de artesania y regalos',
        eyebrow: 'Regalos',
        description:
            'Descubre artesanias y productos mexicanos unicos, ideales para llevar un recuerdo especial de tu visita.',
        icon: 'shop',
        accent: '#235d48',
        tags: ['Artesanias', 'Productos Mexicanos'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/artesanias_1.jpg',
                alt: 'Boutique de artesania y regalos',
            },
        ],
    },
    {
        id: 'transporte',
        name: 'Concierge y atencion personalizada',
        eyebrow: 'Recomendaciones',
        description:
            'Nuestro equipo esta listo para ayudarte a disfrutar al maximo tu estancia en Punta de Mita.\n\nTe apoyamos con:\n- Recomendaciones locales\n- Reservaciones en restaurantes\n- Tours y actividades\n- Transportacion privada\n- Celebraciones especiales\n- Renta de autos o carritos de golf',
        icon: 'consierge',
        accent: '#235d48',
        tags: ['Recomendaciones', 'Tours', 'Celebraciones'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/concierge.jpg',
                alt: 'Concierge y atencion personalizada',
            },
        ],
    },
];

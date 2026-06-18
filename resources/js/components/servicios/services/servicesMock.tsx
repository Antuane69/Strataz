import { Flex } from "antd";
import type { Servicio } from "../interfaces";

export const serviciosMock: Servicio[] = [
    {
        id: 'alberca',
        name: 'Alberca',
        eyebrow: 'Relajación',
        description:
          'Relájate en nuestra alberca y disfruta de momentos de descanso en un ambiente tranquilo, ideal para refrescarte después de un día de playa.',
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
        name: 'Acceso directo a playa con área de camastros',
        eyebrow: 'Mar',
        description:
            'Disfruta la comodidad de estar a solo unos pasos del mar. Relájate en nuestra área de camastros mientras contemplas la brisa, el sonido de las olas y espectaculares atardeceres.',
        icon: 'beach',
        accent: '#a33f1d',
        tags: ['Mar', 'Relajación'],
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
            'Comienza tu día con un delicioso desayuno o disfruta de un lunch fresco en un ambiente relajado y acogedor, ideal para complementar tu experiencia frente al mar.',
        icon: 'food',
        accent: '#235d48',
        tags: ['Desayuno'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/restaurante_1.jpeg',
                alt: 'Islas marietas',
            },
            {
                type: 'image',
                src: '/imagenes/servicios/el_patio.jpeg',
                alt: 'Video de prueba de playa',
            },
        ],
    },
    {
        id: 'masajes',
        name: 'Area de masajes',
        eyebrow: 'Relajación',
        description:
          'Consiente cuerpo y mente con un momento de relajación. Disfruta de tratamientos diseñados para renovar tu energía y elevar tu bienestar durante tu estancia.',
        icon: 'sparks',
        accent: '#1f6f79',
        tags: ['Masajes'],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/spa_1.jpeg',
                alt: 'Deportes',
            },
        ],
    },
    {
        id: 'paddle',
        name: 'Renta de tablas de paddle, surf y kayak',
        eyebrow: 'Activación física',
        description:
            'Vive la aventura en el mar con nuestras opciones de renta de equipo. Explora la costa, disfruta las olas y crea experiencias inolvidables en Punta de Mita.',
        icon: 'pool',
        accent: '#8a4b22',
        tags: ['Paddle', "Surf", "Kayak"],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/surf_1.jpeg',
                alt: 'Restaurante',
            },
            {
                type: 'image',
                src: '/imagenes/servicios/surf_2.jpg',
                alt: 'Restaurante',
            },
        ],
    },
    {
        id: 'bodas',
        name: 'Organización de bodas',
        eyebrow: 'Delicadeza',
        description:
            'Haz realidad la boda de tus sueños frente al mar. Nuestro equipo te acompaña en cada detalle para crear una celebración única e inolvidable.',
        icon: 'boda',
        accent: '#a33f1d',
        tags: ['Boda de tus sueños'],
        media: [
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_1.jpg',
                alt: 'Embarcaciones',
            },
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_2.jpg',
                alt: 'Embarcaciones',
            },
            {
                type: 'image',
                src: '/imagenes/bodas/bodas_3.jpg',
                alt: 'Embarcaciones',
            },
        ],
    },
    {
        id: 'artesania',
        name: 'Boutique de artesanía y regalos',
        eyebrow: 'Regalos',
        description:
            'Descubre artesanías y productos mexicanos únicos, ideales para llevar un recuerdo especial de tu visita.',
        icon: 'shop',
        accent: '#235d48',
        tags: ['Artesanías', "Productos Mexicanos"],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/artesanias_1.jpg',
                alt: 'Islas marietas',
            },
        ],
    },
    {
        id: 'transporte',
        name: 'Concierge y atención personalizada',
        eyebrow: 'Recomendaciones',
        description: (
          <Flex vertical gap={6}>
            <span>Nuestro equipo está listo para ayudarte a disfrutar al máximo tu estancia en Punta de Mita.</span>
            <span> Te apoyamos con: </span>
            <ul>
              <li>Recomendaciones locales </li>
              <li>Reservaciones en restaurantes </li>
              <li>Tours y actividades </li>
              <li>Transportación privada </li>
              <li>Celebraciones especiales </li>
              <li>Renta de autos o Carritos de golf </li>
            </ul>
          </Flex>
        ),
        icon: 'consierge',
        accent: '#235d48',
        tags: ['Recomendaciones', "Tours", "Celebraciones"],
        media: [
            {
                type: 'image',
                src: '/imagenes/servicios/concierge.jpg',
                alt: 'Islas marietas',
            },
        ],
    },
];
import type { Promotion } from '../interface';

export const promotions: Promotion[] = [
    {
        id: 'escapada-romantica-frente-al-mar',
        title: 'Escapada Romantica Frente al Mar',
        eyebrow: 'Para dos',
        category: 'parejas',
        image: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
        imageAlt: 'Playa frente al Hotel Meson de Mita',
        description:
            'Disfruten 2 noches inolvidables en Hotel Meson de Mita con una experiencia pensada para relajarse, reconectar y disfrutar juntos.',
        highlight: 'Paquete para 2 personas desde $7,999 MXN',
        priceHeading: 'Precio del paquete',
        priceGroups: [
            {
                prices: [
                    {
                        label: 'Paquete para 2 personas',
                        amount: '$7,999 MXN',
                        prefix: 'Desde',
                    },
                ],
            },
        ],
        validity: null,
        icon: 'couple',
        accent: '#1f6f79',
        tags: ['Vista al mar', 'Masaje', 'Desayuno incluido'],
        benefits: [
            '2 noches en Habitacion Vista al Mar',
            '1 masaje relajante de 60 minutos para 2 personas',
            'Desayuno incluido para 2 personas durante la estancia',
            '1 botella de vino espumoso Prosecco Martini',
        ],
        featured: true,
    },
    {
        id: 'celebra-con-nosotros',
        title: 'Celebra con Nosotros',
        eyebrow: 'Celebraciones',
        category: 'eventos',
        image: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
        imageAlt: 'Habitacion del hotel decorada para una celebracion especial',
        description:
            'Haz de tus momentos especiales una experiencia inolvidable frente al mar en Hotel Meson de Mita. Celebra cumpleanos, aniversarios o cualquier ocasion especial con un paquete disenado para sorprender.',
        highlight: 'Tarifas promocionales para 2 o 4 personas',
        priceHeading: 'Tarifas promocionales',
        priceGroups: [
            {
                prices: [
                    {
                        label: 'Paquete para 2 personas',
                        amount: '$3,699 MXN',
                        prefix: 'Desde',
                    },
                    {
                        label: 'Paquete para 4 personas',
                        amount: '$4,999 MXN',
                        prefix: 'Desde',
                    },
                ],
            },
        ],
        validity: 'Valido en temporada media y sujeto a disponibilidad',
        icon: 'gift',
        accent: '#a33f1d',
        tags: ['Cumpleanos', 'Aniversarios', 'Reserva directa'],
        benefits: [
            '1 noche de hospedaje',
            'Desayuno incluido',
            'Decoracion especial de habitacion con globos y letrero',
            'Pastel individual con vela decorado segun la ocasion',
            '1 botella de vino espumoso',
        ],
    },
    {
        id: 'paquete-aventura-frente-al-mar',
        title: 'Paquete Aventura Frente al Mar',
        eyebrow: 'Aventura',
        category: 'experiencias',
        image: '/imagenes/servicios/surf_1.jpeg',
        imageAlt: 'Clase de surf en Punta de Mita',
        description:
            'Vive una experiencia llena de adrenalina, diversion y conexion con el oceano en Hotel Meson de Mita. Ideal para parejas, amigos o familias que buscan disfrutar al maximo de Punta de Mita.',
        highlight: 'Tarifas promocionales para 2 o 4 personas',
        priceHeading: 'Tarifas promocionales',
        priceGroups: [
            {
                prices: [
                    {
                        label: 'Paquete para 2 personas',
                        amount: '$6,499 MXN',
                        prefix: 'Desde',
                    },
                    {
                        label: 'Paquete para 4 personas',
                        amount: '$11,999 MXN',
                        prefix: 'Desde',
                    },
                ],
            },
        ],
        validity: 'Valido en temporada media y sujeto a disponibilidad',
        icon: 'beach',
        accent: '#235d48',
        tags: ['Surf', 'Kayak', 'Desayuno incluido'],
        benefits: [
            '1 noche de hospedaje',
            'Desayuno incluido',
            'Leccion de surf de 2 horas con instructor experto',
            'Tabla Soft Top incluida durante la clase',
            '2 horas de uso de kayak',
        ],
    },
    {
        id: 'aventura-marina-los-arcos',
        title: 'Aventura Marina - Los Arcos',
        eyebrow: 'Experiencias marinas',
        category: 'experiencias',
        image: '/imagenes/recomendaciones/buceo.jpeg',
        imageAlt: 'Experiencia marina en la Bahia de Banderas',
        description:
            'Descubre una de las experiencias mas impresionantes de la Bahia con un tour inolvidable a Los Arcos de Puerto Vallarta. Explora aguas cristalinas, vida marina y paisajes espectaculares con una experiencia disenada para aventureros y amantes del oceano.',
        highlight: 'Snorkel y buceo con opciones para 2 o 4 personas',
        priceHeading: 'Experiencias disponibles',
        priceGroups: [
            {
                title: 'Snorkel con equipo incluido',
                prices: [
                    {
                        label: 'Para 2 personas',
                        amount: '$7,999 MXN',
                        prefix: 'Desde',
                    },
                    {
                        label: 'Para 4 personas',
                        amount: '$12,499 MXN',
                        prefix: 'Desde',
                    },
                ],
            },
            {
                title: 'Buceo con equipo incluido',
                prices: [
                    {
                        label: 'Para 2 personas',
                        amount: '$10,999 MXN',
                        prefix: 'Desde',
                    },
                    {
                        label: 'Para 4 personas',
                        amount: '$18,499 MXN',
                        prefix: 'Desde',
                    },
                ],
            },
        ],
        validity: 'Valido en temporada media y sujeto a disponibilidad',
        icon: 'beach',
        accent: '#1f5f65',
        tags: ['Los Arcos', 'Snorkel', 'Buceo'],
        benefits: [
            '1 noche de hospedaje',
            'Desayuno incluido',
            'Transportacion redonda a Puerto Vallarta',
            'Tour a Los Arcos',
        ],
    },
    {
        id: 'reserva-anticipada',
        title: 'Reserva Anticipada',
        eyebrow: 'Planea con tiempo',
        category: 'estancias',
        image: '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
        imageAlt: 'Vista de alberca y hotel en Punta de Mita',
        description:
            'Planea con tiempo y ahorra. Reserva con al menos 30 dias de anticipacion y recibe hasta 20% de descuento en tu hospedaje. Desayuno incluido en tarifa.',
        highlight: 'Hasta 20% de descuento en hospedaje',
        priceHeading: 'Beneficio',
        priceGroups: [
            {
                prices: [
                    {
                        label: 'Descuento en hospedaje',
                        amount: '20% OFF',
                        prefix: 'Hasta',
                    },
                ],
            },
        ],
        validity: 'Reserva con al menos 30 dias de anticipacion',
        icon: 'night',
        accent: '#8a4b22',
        tags: ['Reserva anticipada', 'Desayuno incluido', 'Hospedaje'],
        benefits: [
            'Hasta 20% de descuento en tu hospedaje',
            'Desayuno incluido en tarifa',
            'Ideal para planear tu viaje con tiempo',
        ],
    },
];

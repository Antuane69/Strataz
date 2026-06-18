import type {
    Habitacion,
    HabitacionRoomAmenity,
    HotelInfo,
} from '../interfaces';

export const hotelInfo: HotelInfo = {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    paymentPolicy:
        'Se requiere un anticipo del 50% del costo total de hospedaje para garantizar reservaciones de 2 o mas noches. \n\n Se requiere el pago anticipado del costo total de hospedaje para garantizar reservaciones de 1 noche. \n\n El pago restante de hospedaje se solicitara en recepción al momento de hacer su registro en recepción.',
    cancellationPolicy: {
        description:
            'Todas las cancelaciones deberán solicitarse por escrito y vía telefónica con el área de reservaciones y se realizarán bajo las siguientes condiciones. En caso de cancelación 1 semana o más antes de su llegada, será posible recibir un porcentaje de su déposito como reembolso o un crédito para una futura visita.',
        description_end:
            'La salida prematura del hotel se tomará como cancelación y no habrá reembolsos. En el desafortunado caso de que un viajero enferme durante su estancia o se vea en la necesidad de recortar sus vacaciones son su responsabilidad.',
        rows: [
            {
                weeksBeforeArrival: '4 semanas o más',
                refund: '90%',
                credit: '100%',
            },
            {
                weeksBeforeArrival: '3 semanas',
                refund: '75%',
                credit: '90%',
            },
            {
                weeksBeforeArrival: '2 semanas',
                refund: '50%',
                credit: '90%',
            },
            {
                weeksBeforeArrival: '1 semana',
                refund: '25%',
                credit: '75%',
            },
            {
                weeksBeforeArrival: 'Menos de 1 semana',
                refund: 'No',
                credit: 'No',
            },
        ],
    },
    noShowPolicy:
        'En caso de no presentarse el día de su reservación sin previo aviso, la habitación podrá asignarse a otro huésped y no habrá reembolso.',
    extraGuestPolicy:
        'Se aceptará como máximo 1 persona extra en cada una de las habitaciones Cuádruple o Cuádruple con cocineta cubriendo un costo adicional por noche a la tarifa de hospedaje. Es importante tomar en cuenta que el hotel no cuenta con camas extra para instalar dentro de las habitaciones.',
};

const commonRoomAmenities: HabitacionRoomAmenity[] = [
    {
        type: 'ac',
        name: 'Aire acondicionado',
        description: 'Ambiente fresco y confortable durante toda tu estancia.',
    },
    {
        type: 'smart-tv',
        name: 'Smart TV',
        description:
            'Entretenimiento y contenido favorito desde la habitación.',
    },
    {
        type: 'wifi',
        name: 'Wifi gratuito',
        description:
            'Conexión rápida y estable incluida para tus dispositivos.',
    },
    {
        type: 'safe',
        name: 'Caja de seguridad',
        description: 'Resguarda tus objetos de valor con tranquilidad.',
    },
    {
        type: 'fan',
        name: 'Ventilador de techo o portátil',
        description: 'Circulación de aire natural para mayor comodidad.',
    },
    {
        type: 'private-bath',
        name: 'Baño privado',
        description: 'Baño completo para tu privacidad y comodidad.',
    },
    {
        type: 'cleaning',
        name: 'Servicio diario de limpieza',
        description: 'Habitaciones limpias y listas para descansar.',
    },
    {
        type: 'towels',
        name: 'Toallas',
        description: 'Toallas suaves disponibles durante tu estancia.',
    },
    {
        type: 'bath-kit',
        name: 'Kit de baño',
        description: 'Jabón y shampoo incluidos para tu cuidado.',
    },
];

const suiteMarAmenities: HabitacionRoomAmenity[] = [
    {
        type: 'terrace',
        name: 'Terraza privada con vista al mar',
        description: 'Un espacio privado para disfrutar la vista al mar.',
    },
    {
        type: 'minibar',
        name: 'Frigobar',
        description: 'Ideal para mantener bebidas y snacks frescos.',
    },
    {
        type: 'coffee',
        name: 'Cafetera',
        description: 'Café en tu habitación para iniciar el día con calma.',
    },
    {
        type: 'iron',
        name: 'Plancha y burro',
        description: 'Accesorios disponibles dentro de la suite.',
    },
    {
        type: 'pool-towels',
        name: 'Toallas alberca',
        description: 'Toallas listas para disfrutar las áreas de alberca.',
    },
    {
        type: 'hair-dryer',
        name: 'Secadora de cabello',
        description: 'Secadora incluida para mayor comodidad.',
    },
    {
        type: 'makeup-mirror',
        name: 'Espejo aumento',
        description: 'Detalle práctico para tu arreglo personal.',
    },
];

const kitchenetteAmenities: HabitacionRoomAmenity[] = [
    {
        type: 'stove',
        name: 'Estufa 2 quemadores',
        description: 'Para preparar alimentos sencillos durante tu estancia.',
    },
    {
        type: 'minibar',
        name: 'Frigobar',
        description: 'Espacio frío para bebidas y alimentos pequeños.',
    },
    {
        type: 'kitchenware',
        name: 'Utensilios básicos de cocina',
        description: 'Equipo básico de cocina para 4 personas.',
    },
];

const requestAmenities: HabitacionRoomAmenity[] = [
    {
        type: 'hair-dryer',
        name: 'Secadora de cabello',
        description: 'Sujeta a disponibilidad, solicítala en recepción.',
    },
    {
        type: 'iron',
        name: 'Plancha y burro',
        description: 'Sujetos a disponibilidad, solicítalos en recepción.',
    },
];

export const habitaciones: Habitacion[] = [
    {
        id: 'doble-estandar',
        name: 'Habitación Estándar',
        eyebrow: 'Cómoda y fresca',
        shortDescription: 'Con cama Matrimonial o Queen.',
        description:
            'Esta habitación ofrece lo esencial para descansar bien entre salidas a la playa, recorridos por Punta de Mita y tardes en la alberca.',
        capacity: '2 personas',
        bed: 'Matrimonial O Queen',
        size: 'Distribución práctica',
        imageStats: {
            beds: 1,
            maxGuests: 2,
        },
        images: [
            {
                src: '/imagenes/habitaciones/habitacion_doble.jpg',
                alt: 'Habitación doble con cama matrimonial o queen',
            },
            {
                src: '/imagenes/habitaciones/habitacion_doble_2.jpg',
                alt: 'Baño privado con regadera',
            },
        ],
        highlights: [
            '2 Huéspedes',
            'Cama matrimonial o Cama Queen',
            'Aire acondicionado',
            'Baño privado con regadera',
            'Caja de seguridad',
        ],
        roomAmenities: commonRoomAmenities,
        requestAmenities,
        amenities: [
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
    {
        id: 'doble-vista-mar',
        name: 'Suite Mar',
        eyebrow: 'Vista al mar',
        shortDescription: 'Con cama King.',
        description:
            'Una habitación luminosa y tranquila para parejas o viajeros que buscan despertar cerca del mar. Combina techo tipo palapa, detalles de madera y una terraza privada ideal para bajar el ritmo después de la playa.',
        capacity: '2 personas',
        bed: 'King',
        size: 'Amplia estancia con terraza',
        imageStats: {
            beds: 1,
            maxGuests: 2,
        },
        images: [
            {
                src: '/imagenes/habitaciones/habitacion_doble_mar.jpg',
                alt: 'Habitación doble con cama queen y vista hacia la terraza',
            },
        ],
        highlights: [
            'Terraza con vista al mar',
            'Aire acondicionado',
            'Baño privado con regadera',
            'Caja de seguridad',
            'TV',
        ],
        roomAmenities: [...commonRoomAmenities, ...suiteMarAmenities],
        amenities: [
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
            { type: 'ocean', label: 'Vista al mar' },
        ],
    },
    {
        id: 'cuadruple-sencilla',
        name: 'Habitación Doble',
        eyebrow: 'Para compartir',
        shortDescription: 'Con dos camas Matrimoniales.',
        description:
            'La habitación perfecta para un grupo de amigos o familiares que quieren mantenerse cerca.',
        capacity: '4 personas',
        bed: 'Dos camas Matrimoniales',
        size: 'Espacio familiar',
        imageStats: {
            beds: 2,
            maxGuests: 4,
        },
        images: [
            {
                src: '/imagenes/habitaciones/habitacion_cuadruple.jpg',
                alt: 'Habitación cuadruple con dos camas',
            },
        ],
        highlights: [
            'Para 4 huéspedes',
            'Dos camas Matrimoniales',
            'Aire acondicionado',
            'Baño privado con regadera',
            'Caja de seguridad',
        ],
        roomAmenities: commonRoomAmenities,
        requestAmenities,
        amenities: [
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
    {
        id: 'triple-familiar',
        name: 'Habitación Doble con Cocineta',
        eyebrow: 'Para compartir',
        shortDescription: 'Con dos camas Queen.',
        description:
            'Una habitación flexible para familias y amigos con cocineta.',
        capacity: '4 personas',
        bed: 'Dos camas Queen',
        size: 'Espacio familiar',
        imageStats: {
            beds: 2,
            maxGuests: 4,
        },
        images: [
            {
                src: '/imagenes/habitaciones/habitacion_cuadruple_cocina.jpg',
                alt: 'Habitación cuadruple con cocina',
            },
        ],
        highlights: [
            'Para 4 huéspedes',
            '2 camas Matrimoniales',
            'Aire acondicionado',
            'Baño privado con regadera',
            'Caja de seguridad',
            'Cocineta equipada con utensilios básicos de cocina para 4 personas',
        ],
        roomAmenities: [...commonRoomAmenities, ...kitchenetteAmenities],
        requestAmenities,
        amenities: [
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
];

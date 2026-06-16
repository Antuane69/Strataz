import type { Habitacion, HotelInfo } from '../interfaces';

export const hotelInfo: HotelInfo = {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    paymentPolicy:
        'Se requiere un depósito del 50% del total a cubrir por hospedaje para garantizar reservación. El 50% restante se cubrirá en recepción a su llegada.',
    cancellationPolicy: {
        description:
            'Todas las cancelaciones deberán solicitarse por escrito y vía telefónica con el área de reservaciones y se realizarán bajo las siguientes condiciones. En caso de cancelación 1 semana o más antes de su llegada, será posible recibir un porcentaje de su déposito como reembolso o un crédito para una futura visita.',
        description_end: "La salida prematura del hotel se tomará como cancelación y no habrá reembolsos. En el desafortunado caso de que un viajero enferme durante su estancia o se vea en la necesidad de recortar sus vacaciones son su responsabilidad.",
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

export const habitaciones: Habitacion[] = [
    {
        id: 'doble-estandar',
        name: 'Habitación doble',
        eyebrow: 'Cómoda y fresca',
        shortDescription:
            'Con cama Matrimonial o Queen.',
        description:
            'Esta habitación ofrece lo esencial para descansar bien entre salidas a la playa, recorridos por Punta de Mita y tardes en la alberca.',
        capacity: '2 personas',
        bed: 'Matrimonial O Queen',
        size: 'Distribución práctica',
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
        included: [
            'Amenidades de baño gratuitas',
            'Cunas gratuitas (previa solicitud)',
            'Limpieza de habitaciones diaria',
            'Secadora de cabello (previa solicitud)',
            'Se ofrecen toallas',
            'Servicio de televisión satelital',
            'Ventilador de techo o portátil',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Matrimonial o Queen' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
    {
        id: 'doble-vista-mar',
        name: 'Habitación doble con vista al mar',
        eyebrow: 'Vista al mar',
        shortDescription:
            'Con cama Matrimonial o Queen.',
        description:
            'Una habitación luminosa y tranquila para parejas o viajeros que buscan despertar cerca del mar. Combina techo tipo palapa, detalles de madera y una terraza privada ideal para bajar el ritmo después de la playa.',
        capacity: '2 personas',
        bed: 'Matrimonial o Queen',
        size: 'Amplia estancia con terraza',
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
        included: [
          'Amenidades de baño',
          'Limpieza de habitación diaria',
          'Cunas gratuitas (previa solicitud)',
          'Secadora de cabello (previa solicitud)',
          'Se ofrecen toallas',
          'Servicio de televisión satelital',
          'Ventilador de techo o portátil',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Matrimonial o Queen' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
            { type: 'ocean', label: 'Vista al mar' },
        ],
    },
            {
        id: 'triple-familiar',
        name: 'Habitación triple',
        eyebrow: 'Para compartir',
        shortDescription:
            'Con una cama Matrimonial y una cama Individual.',
        description:
            'Una habitación flexible para quienes viajan acompañados y quieren mantenerse cerca sin sacrificar comodidad.',
        capacity: '3 personas',
        bed: 'Dos camas (Matrimonial e Individual)',
        size: 'Espacio familiar',
        images: [
            {
                src: '/imagenes/habitaciones/habitacion_triple.jpg',
                alt: 'Habitación triple con dos camas',
            },
        ],
        highlights: [
            'Hasta 3 huéspedes',
            'Cama Matrimonial e Individual',
            'Aire acondicionado',
            'Baño privado con regadera',
            'Caja de seguridad',
        ],
        included: [
            'Amenidades de baño',
            'Limpieza de habitaciones diaria',
            'Se ofrecen toallas',
            'Servicio de televisión satelital',
            'Cunas gratuitas (previa solicitud)',
            'Secadora de cabello (previa solicitud)',
            'Ventilador de techo o portátil',
        ],
        amenities: [
            { type: 'capacity', label: '3 huéspedes' },
            { type: 'bed', label: 'Matrimonial e Individual' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
    {
        id: 'cuadruple-sencilla',
        name: 'Habitación cuadruple',
        eyebrow: 'Para compartir',
        shortDescription:
            'Con dos camas Matrimoniales.',
        description:
            'La habitación perfecta para un grupo de amigos o familiares que quieren mantenerse cerca.',
        capacity: '4 personas',
        bed: 'Dos camas matrimoniales',
        size: 'Espacio familiar',
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
        included: [
            'Amenidades de baño',
            'Limpieza de habitaciones diaria',
            'Se ofrecen toallas',
            'Servicio de televisión satelital',
            'Cunas gratuitas (previa solicitud)',
            'Secadora de cabello (previa solicitud)',
            'Ventilador de techo o portátil',
        ],
        amenities: [
            { type: 'capacity', label: '4 huéspedes' },
            { type: 'bed', label: '2 camas Matrimoniales' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
    {
        id: 'triple-familiar',
        name: 'Habitación cuadruple con cocineta',
        eyebrow: 'Para compartir',
        shortDescription:
            'Con dos camas Matrimoniales.',
        description:
            'Una habitación flexible para familias y amigos con cocineta.',
        capacity: '4 personas',
        bed: 'Dos camas Matrimoniales',
        size: 'Espacio familiar',
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
        included: [
            'Amenidades de baño',
            'Limpieza de habitaciones diaria',
            'Se ofrecen toallas',
            'Servicio de televisión satelital',
            'Cunas gratuitas (previa solicitud)',
            'Secadora de cabello (previa solicitud)',
            'Ventilador de techo o portátil',
        ],
        amenities: [
            { type: 'capacity', label: '4 huéspedes' },
            { type: 'bed', label: '2 camas Matrimoniales' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño con regadera' },
        ],
    },
];

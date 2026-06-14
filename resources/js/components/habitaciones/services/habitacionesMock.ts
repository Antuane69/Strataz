import type { Habitacion, HotelInfo } from '../interfaces';

export const hotelInfo: HotelInfo = {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    paymentPolicy:
        'Se requiere un depósito del 50% del total a cubrir por hospedaje para garantizar reservación. El 50% restante se cubrirá en recepción a su llegada.',
    cancellationPolicy: {
        description:
            'Todas las cancelaciones deberán solicitarse por escrito y vía telefónica con el área de reservaciones. El beneficio aplicable se calcula según la anticipación a la fecha de llegada.',
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
            'Una opción práctica para descansar con cama matrimonial, baño privado, aire acondicionado y TV.',
        description:
            'Pensada para estancias relajadas y funcionales, esta habitación ofrece lo esencial para descansar bien entre salidas a la playa, recorridos por Punta de Mita y tardes en la alberca.',
        capacity: '2 personas',
        bed: 'Matrimonial',
        size: 'Distribución práctica',
        images: [
            {
                src: '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
                alt: 'Habitación doble estándar con cama matrimonial',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
                alt: 'Baño privado con regadera',
            },
            {
                src: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Áreas comunes del hotel',
            },
        ],
        highlights: [
            'Cama matrimonial',
            'Aire acondicionado',
            'Baño privado',
            'Cerca de áreas comunes',
        ],
        included: [
            'Cama matrimonial',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a alberca y áreas comunes',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Matrimonial' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño' },
        ],
    },
    {
        id: 'doble-vista-mar',
        name: 'Habitación doble con vista al mar',
        eyebrow: 'Vista al mar',
        shortDescription:
            'Cama matrimonial o queen, aire acondicionado, TV y una terraza para descansar frente a Punta de Mita.',
        description:
            'Una habitación luminosa y tranquila para parejas o viajeros que buscan despertar cerca del mar. Combina techo tipo palapa, detalles de madera y una terraza privada ideal para bajar el ritmo después de la playa.',
        capacity: '2 personas',
        bed: 'Matrimonial o queen',
        size: 'Amplia estancia con terraza',
        images: [
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-05.jpg',
                alt: 'Habitación doble con cama queen y vista hacia la terraza',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
                alt: 'Terraza de habitación doble con vista al mar',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
                alt: 'Baño privado de habitación doble',
            },
        ],
        highlights: [
            'Vista al mar desde terraza',
            'Aire acondicionado',
            'Baño privado',
            'TV en habitación',
        ],
        included: [
            'Terraza o balcón',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a áreas comunes del hotel',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Queen' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'ocean', label: 'Vista' },
        ],
    },
    {
        id: 'triple-familiar',
        name: 'Habitación triple',
        eyebrow: 'Para compartir',
        shortDescription:
            'Dos camas, baño privado, aire acondicionado y espacio cómodo para viajes en familia o amigos.',
        description:
            'Una habitación flexible para quienes viajan acompañados y quieren mantenerse cerca sin sacrificar comodidad. Su distribución permite guardar equipaje, descansar y salir rápido hacia la playa o la alberca.',
        capacity: '3 personas',
        bed: 'Dos camas',
        size: 'Espacio familiar',
        images: [
            {
                src: '/imagenes/galeria/habitacion-triple-hotel-meson-punta-de-mita-03.jpg',
                alt: 'Habitación triple con dos camas',
            },
            {
                src: '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
                alt: 'Detalle de cama en habitación del hotel',
            },
            {
                src: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                alt: 'Playa frente al hotel',
            },
        ],
        highlights: [
            'Hasta 3 huéspedes',
            'Dos camas',
            'Aire acondicionado',
            'Baño privado',
        ],
        included: [
            'Dos camas',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a playa cercana y áreas comunes',
        ],
        amenities: [
            { type: 'capacity', label: '3 huéspedes' },
            { type: 'bed', label: '2 camas' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño' },
        ],
    },
];

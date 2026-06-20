<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class HabitacionesPageDefaults
{
    public const SLUG = 'habitaciones';

    public const TITLE = 'Habitaciones';

    /**
     * @return array{slug: string, title: string, content: array<string, mixed>, is_published: bool, published_at: Carbon}
     */
    public static function attributes(): array
    {
        return [
            'slug' => self::SLUG,
            'title' => self::TITLE,
            'content' => self::content(),
            'is_published' => true,
            'published_at' => now(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function content(): array
    {
        return [
            'version' => 1,
            'locales' => [
                'es' => [
                    'page_title' => 'Habitaciones',
                    'intro_title' => 'Habitaciones',
                    'intro_body' => 'El hotel Meson de Mita cuenta con 25 comodas habitaciones dentro de un ambiente de relax rodeado de jardines con alberca junto al mar. Las habitaciones cada una con propia personalidad, son espaciosas llenas de luz y color ademas de emitir un ambiente de confort y estilo mexicano. La proximidad que mantiene el hotel con la playa, la vista espectacular de las Islas Marietas y la tranquilidad del entorno, se mezclan en armonia para hacer de este sitio el paraiso terrenal.',
                    'card_cta' => 'Ver detalles +',
                    'details_label' => 'Ver detalles',
                    'main_amenities_label' => 'Amenidades principales',
                    'image_preview_label' => 'Ver imagen',
                    'feature_heading' => 'Caracteristicas',
                    'room_amenities_title' => 'Amenidades en tu habitacion',
                    'room_amenities_body' => 'Todo lo que necesitas para una estancia comoda y placentera.',
                    'request_amenities_title' => 'Accesorios bajo solicitud',
                    'request_amenities_body' => 'Sujetos a disponibilidad, solicitalos en recepcion.',
                    'policies_title' => 'Politicas de reservacion',
                    'policies_subtitle' => 'Todo lo necesario para tu estancia',
                    'schedule_policy_title' => 'Horarios',
                    'payment_policy_title' => 'Politica de pago',
                    'cancellation_policy_title' => 'Politica de cancelacion',
                    'no_show_policy_title' => 'Politica de no show',
                    'extra_guest_policy_title' => 'Personas extra',
                    'arrival_weeks_label' => 'Semanas antes de llegada',
                    'refund_label' => 'Reembolso',
                    'credit_label' => 'Credito',
                    'check_in_label' => 'Check-in',
                    'check_out_label' => 'Check-out',
                    'reserve_cta' => 'Reservar',
                    'call_cta' => 'Llamar al hotel',
                    'bed_singular' => 'cama',
                    'bed_plural' => 'camas',
                    'guest_singular' => 'huesped',
                    'guest_plural' => 'huespedes',
                    'guest_capacity_prefix' => 'Hasta',
                ],
                'en' => [
                    'page_title' => 'Rooms',
                    'intro_title' => 'Rooms',
                    'intro_body' => 'Hotel Meson de Mita offers 25 comfortable rooms in a relaxed setting surrounded by gardens and an oceanfront pool. Each room has its own personality, with spacious, bright interiors, colorful details, and a warm Mexican style. The hotel proximity to the beach, the view of the Marietas Islands, and the peaceful surroundings come together for an easy seaside stay.',
                    'card_cta' => 'View details +',
                    'details_label' => 'View details',
                    'main_amenities_label' => 'Main amenities',
                    'image_preview_label' => 'View image',
                    'feature_heading' => 'Features',
                    'room_amenities_title' => 'In-room amenities',
                    'room_amenities_body' => 'Everything you need for a comfortable and pleasant stay.',
                    'request_amenities_title' => 'Available on request',
                    'request_amenities_body' => 'Subject to availability, please request them at the front desk.',
                    'policies_title' => 'Reservation policies',
                    'policies_subtitle' => 'Everything you need for your stay',
                    'schedule_policy_title' => 'Schedule',
                    'payment_policy_title' => 'Payment policy',
                    'cancellation_policy_title' => 'Cancellation policy',
                    'no_show_policy_title' => 'No-show policy',
                    'extra_guest_policy_title' => 'Extra guests',
                    'arrival_weeks_label' => 'Weeks before arrival',
                    'refund_label' => 'Refund',
                    'credit_label' => 'Credit',
                    'check_in_label' => 'Check-in',
                    'check_out_label' => 'Check-out',
                    'reserve_cta' => 'Book now',
                    'call_cta' => 'Call the hotel',
                    'bed_singular' => 'bed',
                    'bed_plural' => 'beds',
                    'guest_singular' => 'guest',
                    'guest_plural' => 'guests',
                    'guest_capacity_prefix' => 'Up to',
                ],
            ],
            'hotel_info' => [
                'check_in' => '2:00 PM',
                'check_out' => '12:00 PM',
                'payment_policy' => self::text(
                    'Se requiere un anticipo del 50% del costo total de hospedaje para garantizar reservaciones de 2 o mas noches.'."\n\n".'Se requiere el pago anticipado del costo total de hospedaje para garantizar reservaciones de 1 noche.'."\n\n".'El pago restante de hospedaje se solicitara en recepcion al momento de hacer su registro.',
                    'A 50% deposit of the total stay is required to guarantee reservations of 2 nights or more.'."\n\n".'Full prepayment is required to guarantee reservations of 1 night.'."\n\n".'The remaining lodging balance will be requested at the front desk during check-in.'
                ),
                'cancellation_policy' => [
                    'description' => self::text(
                        'Todas las cancelaciones deberan solicitarse por escrito y via telefonica con el area de reservaciones. En caso de cancelacion 1 semana o mas antes de su llegada, podra recibir un porcentaje de su deposito como reembolso o credito para una futura visita.',
                        'All cancellations must be requested in writing and by phone with the reservations team. If cancellation is made 1 week or more before arrival, a percentage of the deposit may be available as a refund or credit for a future stay.'
                    ),
                    'description_end' => self::text(
                        'La salida prematura del hotel se tomara como cancelacion y no habra reembolsos.',
                        'Early departure from the hotel will be treated as a cancellation and no refunds will be issued.'
                    ),
                    'rows' => [
                        [
                            'weeks_before_arrival' => self::text('4 semanas o mas', '4 weeks or more'),
                            'refund' => '90%',
                            'credit' => '100%',
                        ],
                        [
                            'weeks_before_arrival' => self::text('3 semanas', '3 weeks'),
                            'refund' => '75%',
                            'credit' => '90%',
                        ],
                        [
                            'weeks_before_arrival' => self::text('2 semanas', '2 weeks'),
                            'refund' => '50%',
                            'credit' => '90%',
                        ],
                        [
                            'weeks_before_arrival' => self::text('1 semana', '1 week'),
                            'refund' => '25%',
                            'credit' => '75%',
                        ],
                        [
                            'weeks_before_arrival' => self::text('Menos de 1 semana', 'Less than 1 week'),
                            'refund' => 'No',
                            'credit' => 'No',
                        ],
                    ],
                ],
                'no_show_policy' => self::text(
                    'En caso de no presentarse el dia de su reservacion sin previo aviso, la habitacion podra asignarse a otro huesped y no habra reembolso.',
                    'If a guest does not arrive on the reservation date without prior notice, the room may be assigned to another guest and no refund will be issued.'
                ),
                'extra_guest_policy' => self::text(
                    'Se aceptara como maximo 1 persona extra en cada una de las habitaciones cuadruple o cuadruple con cocineta cubriendo un costo adicional por noche. El hotel no cuenta con camas extra para instalar dentro de las habitaciones.',
                    'A maximum of 1 extra person may be accepted in each quadruple room or quadruple room with kitchenette for an additional nightly cost. The hotel does not provide extra beds inside the rooms.'
                ),
            ],
            'rooms' => self::rooms(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function rooms(): array
    {
        return [
            [
                'id' => 'doble-estandar',
                'order' => 1,
                'is_active' => true,
                'name' => self::text('Habitacion Estandar', 'Standard Room'),
                'eyebrow' => self::text('Comoda y fresca', 'Comfortable and fresh'),
                'short_description' => self::text('Con cama matrimonial o queen.', 'With one full or queen bed.'),
                'description' => self::text(
                    'Esta habitacion ofrece lo esencial para descansar bien entre salidas a la playa, recorridos por Punta de Mita y tardes en la alberca.',
                    'This room offers the essentials for resting between beach outings, Punta de Mita strolls, and afternoons by the pool.'
                ),
                'capacity' => self::text('2 personas', '2 people'),
                'bed' => self::text('Matrimonial o Queen', 'Full or Queen'),
                'size' => self::text('Distribucion practica', 'Practical layout'),
                'image_stats' => [
                    'beds' => 1,
                    'max_guests' => 2,
                ],
                'media' => [
                    self::media('doble-estandar-1', 'image', '/imagenes/habitaciones/habitacion_doble.jpg', 'Habitacion doble con cama matrimonial o queen', 'Standard room with full or queen bed'),
                    self::media('doble-estandar-2', 'image', '/imagenes/habitaciones/habitacion_doble_2.jpg', 'Bano privado con regadera', 'Private bathroom with shower'),
                ],
                'highlights' => [
                    self::text('2 huespedes', '2 guests'),
                    self::text('Cama matrimonial o cama Queen', 'Full or Queen bed'),
                    self::text('Aire acondicionado', 'Air conditioning'),
                    self::text('Bano privado con regadera', 'Private bathroom with shower'),
                    self::text('Caja de seguridad', 'Safety box'),
                ],
                'room_amenities' => self::commonRoomAmenities(),
                'request_amenities' => self::requestAmenities(),
                'amenities' => [
                    self::amenity('ac', 'A/C', 'A/C'),
                    self::amenity('tv', 'TV', 'TV'),
                    self::amenity('bath', 'Bano con regadera', 'Bathroom with shower'),
                ],
            ],
            [
                'id' => 'doble-vista-mar',
                'order' => 2,
                'is_active' => true,
                'name' => self::text('Suite Mar', 'Ocean Suite'),
                'eyebrow' => self::text('Vista al mar', 'Ocean view'),
                'short_description' => self::text('Con cama King.', 'With one King bed.'),
                'description' => self::text(
                    'Una habitacion luminosa y tranquila para parejas o viajeros que buscan despertar cerca del mar. Combina techo tipo palapa, detalles de madera y una terraza privada ideal para bajar el ritmo despues de la playa.',
                    'A bright, calm room for couples or travelers who want to wake up near the ocean. It combines palapa-style ceilings, wood details, and a private terrace made for slowing down after the beach.'
                ),
                'capacity' => self::text('2 personas', '2 people'),
                'bed' => self::text('King', 'King'),
                'size' => self::text('Amplia estancia con terraza', 'Spacious stay with terrace'),
                'image_stats' => [
                    'beds' => 1,
                    'max_guests' => 2,
                ],
                'media' => [
                    self::media('doble-vista-mar-1', 'image', '/imagenes/habitaciones/habitacion_doble_mar.jpg', 'Habitacion doble con cama king y vista hacia la terraza', 'Ocean suite with king bed and terrace view'),
                ],
                'highlights' => [
                    self::text('Terraza con vista al mar', 'Ocean-view terrace'),
                    self::text('Aire acondicionado', 'Air conditioning'),
                    self::text('Bano privado con regadera', 'Private bathroom with shower'),
                    self::text('Caja de seguridad', 'Safety box'),
                    self::text('TV', 'TV'),
                ],
                'room_amenities' => [
                    ...self::commonRoomAmenities(),
                    ...self::suiteMarAmenities(),
                ],
                'request_amenities' => [],
                'amenities' => [
                    self::amenity('ac', 'A/C', 'A/C'),
                    self::amenity('tv', 'TV', 'TV'),
                    self::amenity('bath', 'Bano con regadera', 'Bathroom with shower'),
                    self::amenity('ocean', 'Vista al mar', 'Ocean view'),
                ],
            ],
            [
                'id' => 'cuadruple-sencilla',
                'order' => 3,
                'is_active' => true,
                'name' => self::text('Habitacion Doble', 'Double Room'),
                'eyebrow' => self::text('Para compartir', 'For sharing'),
                'short_description' => self::text('Con dos camas matrimoniales.', 'With two full beds.'),
                'description' => self::text(
                    'La habitacion perfecta para un grupo de amigos o familiares que quieren mantenerse cerca.',
                    'A practical room for a group of friends or family who want to stay close together.'
                ),
                'capacity' => self::text('4 personas', '4 people'),
                'bed' => self::text('Dos camas matrimoniales', 'Two full beds'),
                'size' => self::text('Espacio familiar', 'Family-friendly space'),
                'image_stats' => [
                    'beds' => 2,
                    'max_guests' => 4,
                ],
                'media' => [
                    self::media('cuadruple-sencilla-1', 'image', '/imagenes/habitaciones/habitacion_cuadruple.jpg', 'Habitacion cuadruple con dos camas', 'Quadruple room with two beds'),
                ],
                'highlights' => [
                    self::text('Para 4 huespedes', 'For 4 guests'),
                    self::text('Dos camas matrimoniales', 'Two full beds'),
                    self::text('Aire acondicionado', 'Air conditioning'),
                    self::text('Bano privado con regadera', 'Private bathroom with shower'),
                    self::text('Caja de seguridad', 'Safety box'),
                ],
                'room_amenities' => self::commonRoomAmenities(),
                'request_amenities' => self::requestAmenities(),
                'amenities' => [
                    self::amenity('ac', 'A/C', 'A/C'),
                    self::amenity('tv', 'TV', 'TV'),
                    self::amenity('bath', 'Bano con regadera', 'Bathroom with shower'),
                ],
            ],
            [
                'id' => 'triple-familiar',
                'order' => 4,
                'is_active' => true,
                'name' => self::text('Habitacion Doble con Cocineta', 'Double Room with Kitchenette'),
                'eyebrow' => self::text('Para compartir', 'For sharing'),
                'short_description' => self::text('Con dos camas Queen.', 'With two Queen beds.'),
                'description' => self::text(
                    'Una habitacion flexible para familias y amigos con cocineta.',
                    'A flexible room for families and friends with a kitchenette.'
                ),
                'capacity' => self::text('4 personas', '4 people'),
                'bed' => self::text('Dos camas Queen', 'Two Queen beds'),
                'size' => self::text('Espacio familiar', 'Family-friendly space'),
                'image_stats' => [
                    'beds' => 2,
                    'max_guests' => 4,
                ],
                'media' => [
                    self::media('triple-familiar-1', 'image', '/imagenes/habitaciones/habitacion_cuadruple_cocina.jpg', 'Habitacion cuadruple con cocina', 'Quadruple room with kitchenette'),
                ],
                'highlights' => [
                    self::text('Para 4 huespedes', 'For 4 guests'),
                    self::text('2 camas Queen', '2 Queen beds'),
                    self::text('Aire acondicionado', 'Air conditioning'),
                    self::text('Bano privado con regadera', 'Private bathroom with shower'),
                    self::text('Caja de seguridad', 'Safety box'),
                    self::text('Cocineta equipada con utensilios basicos para 4 personas', 'Kitchenette with basic utensils for 4 people'),
                ],
                'room_amenities' => [
                    ...self::commonRoomAmenities(),
                    ...self::kitchenetteAmenities(),
                ],
                'request_amenities' => self::requestAmenities(),
                'amenities' => [
                    self::amenity('ac', 'A/C', 'A/C'),
                    self::amenity('tv', 'TV', 'TV'),
                    self::amenity('bath', 'Bano con regadera', 'Bathroom with shower'),
                ],
            ],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function commonRoomAmenities(): array
    {
        return [
            self::roomAmenity('ac', 'Aire acondicionado', 'Air conditioning', 'Ambiente fresco y confortable durante toda tu estancia.', 'A fresh and comfortable room throughout your stay.'),
            self::roomAmenity('smart-tv', 'Smart TV', 'Smart TV', 'Entretenimiento y contenido favorito desde la habitacion.', 'Entertainment and favorite content from your room.'),
            self::roomAmenity('wifi', 'Wifi gratuito', 'Free Wi-Fi', 'Conexion rapida y estable incluida para tus dispositivos.', 'Fast, stable connection included for your devices.'),
            self::roomAmenity('safe', 'Caja de seguridad', 'Safety box', 'Resguarda tus objetos de valor con tranquilidad.', 'Keep valuables protected with peace of mind.'),
            self::roomAmenity('fan', 'Ventilador de techo o portatil', 'Ceiling or portable fan', 'Circulacion de aire natural para mayor comodidad.', 'Natural air circulation for added comfort.'),
            self::roomAmenity('private-bath', 'Bano privado', 'Private bathroom', 'Bano completo para tu privacidad y comodidad.', 'Full bathroom for privacy and comfort.'),
            self::roomAmenity('cleaning', 'Servicio diario de limpieza', 'Daily housekeeping', 'Habitaciones limpias y listas para descansar.', 'Clean rooms ready for rest.'),
            self::roomAmenity('towels', 'Toallas', 'Towels', 'Toallas suaves disponibles durante tu estancia.', 'Soft towels available during your stay.'),
            self::roomAmenity('bath-kit', 'Kit de bano', 'Bath kit', 'Jabon y shampoo incluidos para tu cuidado.', 'Soap and shampoo included for your care.'),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function suiteMarAmenities(): array
    {
        return [
            self::roomAmenity('terrace', 'Terraza privada con vista al mar', 'Private ocean-view terrace', 'Un espacio privado para disfrutar la vista al mar.', 'A private space to enjoy the ocean view.'),
            self::roomAmenity('minibar', 'Frigobar', 'Minibar', 'Ideal para mantener bebidas y snacks frescos.', 'Ideal for keeping drinks and snacks fresh.'),
            self::roomAmenity('coffee', 'Cafetera', 'Coffee maker', 'Cafe en tu habitacion para iniciar el dia con calma.', 'Coffee in your room for an easy start to the day.'),
            self::roomAmenity('iron', 'Plancha y burro', 'Iron and ironing board', 'Accesorios disponibles dentro de la suite.', 'Accessories available inside the suite.'),
            self::roomAmenity('pool-towels', 'Toallas alberca', 'Pool towels', 'Toallas listas para disfrutar las areas de alberca.', 'Towels ready for the pool areas.'),
            self::roomAmenity('hair-dryer', 'Secadora de cabello', 'Hair dryer', 'Secadora incluida para mayor comodidad.', 'Hair dryer included for added comfort.'),
            self::roomAmenity('makeup-mirror', 'Espejo aumento', 'Magnifying mirror', 'Detalle practico para tu arreglo personal.', 'A practical detail for getting ready.'),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function kitchenetteAmenities(): array
    {
        return [
            self::roomAmenity('stove', 'Estufa 2 quemadores', 'Two-burner stove', 'Para preparar alimentos sencillos durante tu estancia.', 'For preparing simple meals during your stay.'),
            self::roomAmenity('minibar', 'Frigobar', 'Minibar', 'Espacio frio para bebidas y alimentos pequenos.', 'Cold space for drinks and small food items.'),
            self::roomAmenity('kitchenware', 'Utensilios basicos de cocina', 'Basic kitchenware', 'Equipo basico de cocina para 4 personas.', 'Basic kitchen equipment for 4 people.'),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function requestAmenities(): array
    {
        return [
            self::roomAmenity('hair-dryer', 'Secadora de cabello', 'Hair dryer', 'Sujeta a disponibilidad, solicitala en recepcion.', 'Subject to availability, request it at the front desk.'),
            self::roomAmenity('iron', 'Plancha y burro', 'Iron and ironing board', 'Sujetos a disponibilidad, solicitalos en recepcion.', 'Subject to availability, request them at the front desk.'),
        ];
    }

    /**
     * @return array{es: string, en: string}
     */
    private static function text(string $es, string $en): array
    {
        return [
            'es' => $es,
            'en' => $en,
        ];
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}}
     */
    private static function media(string $id, string $type, string $src, string $altEs, string $altEn): array
    {
        return [
            'id' => $id,
            'type' => $type,
            'src' => $src,
            'poster' => null,
            'alt' => self::text($altEs, $altEn),
        ];
    }

    /**
     * @return array{type: string, label: array{es: string, en: string}}
     */
    private static function amenity(string $type, string $labelEs, string $labelEn): array
    {
        return [
            'type' => $type,
            'label' => self::text($labelEs, $labelEn),
        ];
    }

    /**
     * @return array{type: string, name: array{es: string, en: string}, description: array{es: string, en: string}}
     */
    private static function roomAmenity(
        string $type,
        string $nameEs,
        string $nameEn,
        string $descriptionEs,
        string $descriptionEn,
    ): array {
        return [
            'type' => $type,
            'name' => self::text($nameEs, $nameEn),
            'description' => self::text($descriptionEs, $descriptionEn),
        ];
    }
}

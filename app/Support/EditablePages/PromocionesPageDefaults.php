<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class PromocionesPageDefaults
{
    public const SLUG = 'promociones';

    public const TITLE = 'Promociones';

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
                    'page_title' => 'Promociones',
                    'intro_title' => 'Promociones',
                    'intro_body' => 'Promociones de temporada, beneficios por reserva directa y planes pensados para parejas, familias y celebraciones. Disfruta de unas vacaciones perfectas en el Hotel Mesón de Mita.',
                    'all_tab_label' => 'Todas',
                    'multiple_options_label' => 'opciones',
                    'default_price_label' => 'Promocion',
                    'default_price_heading' => 'Precio',
                    'available_options_heading' => 'Opciones disponibles',
                    'contact_kicker' => 'Buscas una fecha especifica?',
                    'contact_title' => 'Pregunta por promociones vigentes',
                    'contact_body' => 'Las promociones pueden cambiar por temporada, ocupacion y tipo de habitacion. Reservaciones puede ayudarte a encontrar la mejor opción disponible.',
                    'email_cta' => 'Escribir al hotel',
                    'phone_cta' => 'Llamar ahora',
                ],
                'en' => [
                    'page_title' => 'Promotions',
                    'intro_title' => 'Promotions',
                    'intro_body' => 'Seasonal promotions, direct booking benefits, and plans designed for couples, families, and celebrations. Enjoy a perfect vacation at Hotel Meson de Mita.',
                    'all_tab_label' => 'All',
                    'multiple_options_label' => 'options',
                    'default_price_label' => 'Promotion',
                    'default_price_heading' => 'Price',
                    'available_options_heading' => 'Available options',
                    'contact_kicker' => 'Looking for a specific date?',
                    'contact_title' => 'Ask about current promotions',
                    'contact_body' => 'Promotions may change by season, occupancy, and room type. Reservations can help you find the best available option.',
                    'email_cta' => 'Email the hotel',
                    'phone_cta' => 'Call now',
                ],
            ],
            'highlight_items' => [
                self::highlightItem('badge-percent', 'Tarifas especiales', 'Special rates'),
                self::highlightItem('palmtree', 'A pasos de la playa', 'Steps from the beach'),
                self::highlightItem('phone', 'Reserva directa', 'Direct booking'),
            ],
            'tabs' => [
                self::tab('parejas', 'Parejas', 'Couples'),
                self::tab('familias', 'Familias', 'Families'),
                self::tab('estancias', 'Estancias', 'Stays'),
                self::tab('experiencias', 'Experiencias', 'Experiences'),
                self::tab('eventos', 'Eventos', 'Events'),
            ],
            'contact' => [
                'email_href' => 'mailto:reservaciones@hotelmesondemita.com',
                'phone_href' => 'tel:+523292916330',
            ],
            'promotions' => self::promotions(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function promotions(): array
    {
        return [
            self::promotion(
                'escapada-romantica-frente-al-mar',
                1,
                true,
                true,
                'Escapada Romantica Frente al Mar',
                'Romantic Oceanfront Getaway',
                'Para dos',
                'For two',
                'parejas',
                '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                'Playa frente al Hotel Meson de Mita',
                'Beach in front of Hotel Meson de Mita',
                'Disfruten 2 noches inolvidables en Hotel Meson de Mita con una experiencia pensada para relajarse, reconectar y disfrutar juntos.',
                'Enjoy 2 unforgettable nights at Hotel Meson de Mita with an experience designed to relax, reconnect, and enjoy together.',
                'Paquete para 2 personas desde $7,999 MXN',
                'Package for 2 people from $7,999 MXN',
                'Precio del paquete',
                'Package price',
                null,
                null,
                'couple',
                '#1f6f79',
                [
                    self::text('Vista al mar', 'Ocean view'),
                    self::text('Masaje', 'Massage'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                ],
                [
                    self::text('2 noches en Habitación Vista al Mar', '2 nights in an Ocean View Room'),
                    self::text('1 masaje relajante de 60 minutos para 2 personas', '1 relaxing 60-minute massage for 2 people'),
                    self::text('Desayuno incluido para 2 personas durante la estancia', 'Breakfast included for 2 people during the stay'),
                    self::text('1 botella de vino espumoso Prosecco Martini', '1 bottle of Martini Prosecco sparkling wine'),
                ],
                [
                    self::priceGroup(null, null, [
                        self::price('Paquete para 2 personas', 'Package for 2 people', '$7,999 MXN', 'Desde', 'From'),
                    ]),
                ],
            ),
            self::promotion(
                'celebra-con-nosotros',
                2,
                true,
                false,
                'Celebra con Nosotros',
                'Celebrate With Us',
                'Celebraciones',
                'Celebrations',
                'eventos',
                '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
                'Habitación del hotel decorada para una celebración especial',
                'Hotel room decorated for a special celebration',
                'Haz de tus momentos especiales una experiencia inolvidable frente al mar en Hotel Mesón de Mita. Celebra cumpleanos, aniversarios o cualquier ocasión especial con un paquete disenado para sorprender.',
                'Turn special moments into an unforgettable oceanfront experience at Hotel Meson de Mita. Celebrate birthdays, anniversaries, or any special occasion with a package designed to surprise.',
                'Tarifas promocionales para 2 o 4 personas',
                'Promotional rates for 2 or 4 people',
                'Tarifas promocionales',
                'Promotional rates',
                'Válido en temporada media y sujeto a disponibilidad',
                'Valid in mid season and subject to availability',
                'gift',
                '#a33f1d',
                [
                    self::text('Cumpleaños', 'Birthdays'),
                    self::text('Aniversarios', 'Anniversaries'),
                    self::text('Reserva directa', 'Direct booking'),
                ],
                [
                    self::text('1 noche de hospedaje', '1 night stay'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                    self::text('Decoración especial de habitación con globos y letrero', 'Special room decor with balloons and sign'),
                    self::text('Pastel individual con vela decorado segun la ocasión', 'Individual cake with candle decorated for the occasion'),
                    self::text('1 botella de vino espumoso', '1 bottle of sparkling wine'),
                ],
                [
                    self::priceGroup(null, null, [
                        self::price('Paquete para 2 personas', 'Package for 2 people', '$3,699 MXN', 'Desde', 'From'),
                        self::price('Paquete para 4 personas', 'Package for 4 people', '$4,999 MXN', 'Desde', 'From'),
                    ]),
                ],
            ),
            self::promotion(
                'paquete-aventura-frente-al-mar',
                3,
                true,
                false,
                'Paquete Aventura Frente al Mar',
                'Oceanfront Adventure Package',
                'Aventura',
                'Adventure',
                'experiencias',
                '/imagenes/servicios/surf_1.jpeg',
                'Clase de surf en Punta de Mita',
                'Surf lesson in Punta de Mita',
                'Vive una experiencia llena de adrenalina, diversion y conexion con el oceano en Hotel Meson de Mita. Ideal para parejas, amigos o familias que buscan disfrutar al maximo de Punta de Mita.',
                'Live an experience full of adrenaline, fun, and connection with the ocean at Hotel Meson de Mita. Ideal for couples, friends, or families looking to enjoy Punta de Mita to the fullest.',
                'Tarifas promocionales para 2 o 4 personas',
                'Promotional rates for 2 or 4 people',
                'Tarifas promocionales',
                'Promotional rates',
                'Válido en temporada media y sujeto a disponibilidad',
                'Valid in mid season and subject to availability',
                'beach',
                '#235d48',
                [
                    self::text('Surf', 'Surf'),
                    self::text('Kayak', 'Kayak'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                ],
                [
                    self::text('1 noche de hospedaje', '1 night stay'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                    self::text('Lección de surf de 2 horas con instructor experto', '2-hour surf lesson with an expert instructor'),
                    self::text('Tabla Soft Top incluida durante la clase', 'Soft Top board included during the lesson'),
                    self::text('2 horas de uso de kayak', '2 hours of kayak use'),
                ],
                [
                    self::priceGroup(null, null, [
                        self::price('Paquete para 2 personas', 'Package for 2 people', '$6,499 MXN', 'Desde', 'From'),
                        self::price('Paquete para 4 personas', 'Package for 4 people', '$11,999 MXN', 'Desde', 'From'),
                    ]),
                ],
            ),
            self::promotion(
                'aventura-marina-los-arcos',
                4,
                true,
                false,
                'Aventura Marina - Los Arcos',
                'Marine Adventure - Los Arcos',
                'Experiencias marinas',
                'Marine experiences',
                'experiencias',
                '/imagenes/recomendaciones/buceo.jpeg',
                'Experiencia marina en la Bahía de Banderas',
                'Marine experience in Banderas Bay',
                'Descubre una de las experiencias mas impresionantes de la Bahía con un tour inolvidable a Los Arcos de Puerto Vallarta. Explora aguas cristalinas, vida marina y paisajes espectaculares con una experiencia disenada para aventureros y amantes del océano.',
                'Discover one of the bay most impressive experiences with an unforgettable tour to Los Arcos in Puerto Vallarta. Explore clear waters, marine life, and spectacular scenery with an experience designed for adventurers and ocean lovers.',
                'Snorkel y buceo con opciones para 2 o 4 personas',
                'Snorkel and diving options for 2 or 4 people',
                'Experiencias disponibles',
                'Available experiences',
                'Válido en temporada media y sujeto a disponibilidad',
                'Valid in mid season and subject to availability',
                'beach',
                '#1f5f65',
                [
                    self::text('Los Arcos', 'Los Arcos'),
                    self::text('Snorkel', 'Snorkel'),
                    self::text('Buceo', 'Diving'),
                ],
                [
                    self::text('1 noche de hospedaje', '1 night stay'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                    self::text('Transportación redonda a Puerto Vallarta', 'Round transportation to Puerto Vallarta'),
                    self::text('Tour a Los Arcos', 'Los Arcos tour'),
                ],
                [
                    self::priceGroup('Snorkel con equipo incluido', 'Snorkel with equipment included', [
                        self::price('Para 2 personas', 'For 2 people', '$7,999 MXN', 'Desde', 'From'),
                        self::price('Para 4 personas', 'For 4 people', '$12,499 MXN', 'Desde', 'From'),
                    ]),
                    self::priceGroup('Buceo con equipo incluido', 'Diving with equipment included', [
                        self::price('Para 2 personas', 'For 2 people', '$10,999 MXN', 'Desde', 'From'),
                        self::price('Para 4 personas', 'For 4 people', '$18,499 MXN', 'Desde', 'From'),
                    ]),
                ],
            ),
            self::promotion(
                'reserva-anticipada',
                5,
                true,
                false,
                'Reserva Anticipada',
                'Early Booking',
                'Planea con tiempo',
                'Plan ahead',
                'estancias',
                '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
                'Vista de alberca y hotel en Punta de Mita',
                'Pool and hotel view in Punta de Mita',
                'Planea con tiempo y ahorra. Reserva con al menos 30 dias de anticipación y recibe hasta 20% de descuento en tu hospedaje. Desayuno incluido en tarifa.',
                'Plan ahead and save. Book at least 30 days in advance and receive up to 20% off your stay. Breakfast included in the rate.',
                'Hasta 20% de descuento en hospedaje',
                'Up to 20% off lodging',
                'Beneficio',
                'Benefit',
                'Reserva con al menos 30 dias de anticipación',
                'Book at least 30 days in advance',
                'night',
                '#8a4b22',
                [
                    self::text('Reserva anticipada', 'Early booking'),
                    self::text('Desayuno incluido', 'Breakfast included'),
                    self::text('Hospedaje', 'Lodging'),
                ],
                [
                    self::text('Hasta 20% de descuento en tu hospedaje', 'Up to 20% off your stay'),
                    self::text('Desayuno incluido en tarifa', 'Breakfast included in the rate'),
                    self::text('Ideal para planear tu viaje con tiempo', 'Ideal for planning your trip ahead'),
                ],
                [
                    self::priceGroup(null, null, [
                        self::price('Descuento en hospedaje', 'Lodging discount', '20% OFF', 'Hasta', 'Up to'),
                    ]),
                ],
            ),
        ];
    }

    /**
     * @param  array<int, array{es: string, en: string}>  $tags
     * @param  array<int, array{es: string, en: string}>  $benefits
     * @param  array<int, array<string, mixed>>  $priceGroups
     * @return array<string, mixed>
     */
    private static function promotion(
        string $id,
        int $order,
        bool $isActive,
        bool $featured,
        string $titleEs,
        string $titleEn,
        string $eyebrowEs,
        string $eyebrowEn,
        string $category,
        string $image,
        string $imageAltEs,
        string $imageAltEn,
        string $descriptionEs,
        string $descriptionEn,
        string $highlightEs,
        string $highlightEn,
        string $priceHeadingEs,
        string $priceHeadingEn,
        ?string $validityEs,
        ?string $validityEn,
        string $icon,
        string $accent,
        array $tags,
        array $benefits,
        array $priceGroups,
    ): array {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => $isActive,
            'featured' => $featured,
            'title' => self::text($titleEs, $titleEn),
            'eyebrow' => self::text($eyebrowEs, $eyebrowEn),
            'category' => $category,
            'image' => [
                'id' => $id.'-image',
                'type' => 'image',
                'src' => $image,
                'poster' => null,
                'alt' => self::text($imageAltEs, $imageAltEn),
            ],
            'description' => self::text($descriptionEs, $descriptionEn),
            'highlight' => self::text($highlightEs, $highlightEn),
            'price_heading' => self::text($priceHeadingEs, $priceHeadingEn),
            'validity' => self::text($validityEs ?? '', $validityEn ?? ''),
            'icon' => $icon,
            'accent' => $accent,
            'tags' => $tags,
            'benefits' => $benefits,
            'price_groups' => $priceGroups,
        ];
    }

    /**
     * @return array{key: string, label: array{es: string, en: string}}
     */
    private static function tab(string $key, string $labelEs, string $labelEn): array
    {
        return [
            'key' => $key,
            'label' => self::text($labelEs, $labelEn),
        ];
    }

    /**
     * @return array{icon: string, label: array{es: string, en: string}}
     */
    private static function highlightItem(string $icon, string $labelEs, string $labelEn): array
    {
        return [
            'icon' => $icon,
            'label' => self::text($labelEs, $labelEn),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $prices
     * @return array{title: array{es: string, en: string}, description: array{es: string, en: string}, prices: array<int, array<string, mixed>>}
     */
    private static function priceGroup(?string $titleEs, ?string $titleEn, array $prices, ?string $descriptionEs = null, ?string $descriptionEn = null): array
    {
        return [
            'title' => self::text($titleEs ?? '', $titleEn ?? ''),
            'description' => self::text($descriptionEs ?? '', $descriptionEn ?? ''),
            'prices' => $prices,
        ];
    }

    /**
     * @return array{label: array{es: string, en: string}, amount: string, prefix: array{es: string, en: string}, note: array{es: string, en: string}}
     */
    private static function price(string $labelEs, string $labelEn, string $amount, ?string $prefixEs = null, ?string $prefixEn = null, ?string $noteEs = null, ?string $noteEn = null): array
    {
        return [
            'label' => self::text($labelEs, $labelEn),
            'amount' => $amount,
            'prefix' => self::text($prefixEs ?? '', $prefixEn ?? ''),
            'note' => self::text($noteEs ?? '', $noteEn ?? ''),
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
}

<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class ServiciosPageDefaults
{
    public const SLUG = 'servicios';

    public const TITLE = 'Servicios';

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
                    'page_title' => 'Servicios',
                    'intro_title' => 'Servicios',
                    'intro_body' => 'Amenidades sencillas, utiles y pensadas para que tu estancia se sienta cómoda desde que llegas.',
                ],
                'en' => [
                    'page_title' => 'Services',
                    'intro_title' => 'Services',
                    'intro_body' => 'Simple, useful amenities designed to make your stay feel comfortable from the moment you arrive.',
                ],
            ],
            'trust_items' => [
                self::trustItem('shield', 'Estacionamiento privado', 'Private parking'),
                self::trustItem('pool', 'Alberca junto al mar', 'Oceanfront pool'),
                self::trustItem('shop', 'Souvenirs y artesanias', 'Souvenirs and crafts'),
            ],
            'services' => self::services(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function services(): array
    {
        return [
            self::service(
                'alberca',
                1,
                'Alberca',
                'Pool',
                'Relajacion',
                'Relaxation',
                'Relájate en nuestra alberca y disfruta de momentos de descanso en un ambiente tranquilo, ideal para refrescarte despues de un dia de playa.',
                'Relax in our pool and enjoy restful moments in a calm setting, ideal for cooling off after a beach day.',
                'pool',
                '#1f6f79',
                [
                    self::text('Vista al mar', 'Ocean view'),
                    self::text('Camastros', 'Lounge chairs'),
                ],
                [
                    self::media('alberca-1', 'image', '/imagenes/servicios/alberca_2.jpg', null, 'Camastros junto a la alberca', 'Lounge chairs by the pool'),
                    self::media('alberca-2', 'video', '/videos/video_prueba1.mp4', '/imagenes/servicios/alberca_3.jpg', 'Video de prueba de la alberca', 'Pool video'),
                ],
            ),
            self::service(
                'estacionamiento',
                2,
                'Estacionamiento',
                'Parking',
                'Comodidad',
                'Convenience',
                'Ofrecemos estacionamiento privado para mayor comodidad y tranquilidad durante tu visita.',
                'We offer private parking for added comfort and peace of mind during your visit.',
                'parking',
                '#8a4b22',
                [
                    self::text('Privado', 'Private'),
                    self::text('24 horas', '24 hours'),
                    self::text('Sin costo', 'Included'),
                ],
                [
                    self::media('estacionamiento-1', 'image', '/imagenes/servicios/estacionamiento_1.jpg', null, 'Estacionamiento', 'Parking area'),
                ],
            ),
            self::service(
                'acceso-camastros',
                3,
                'Acceso directo a playa con area de camastros',
                'Direct beach access with lounge chair area',
                'Mar',
                'Ocean',
                'Disfruta la comodidad de estar a solo unos pasos del mar. Relájate en nuestra area de camastros mientras contemplas la brisa, el sonido de las olas y espectaculares atardeceres.',
                'Enjoy being just steps from the ocean. Relax in our lounge chair area while taking in the breeze, the sound of the waves, and beautiful sunsets.',
                'beach',
                '#a33f1d',
                [
                    self::text('Mar', 'Ocean'),
                    self::text('Relajacion', 'Relaxation'),
                ],
                [
                    self::media('acceso-camastros-1', 'image', '/imagenes/servicios/alberca_1.jpg', null, 'Alberca del hotel frente al mar', 'Hotel pool facing the ocean'),
                ],
            ),
            self::service(
                'restaurante',
                4,
                'Restaurante de desayunos y lunch "El Patio"',
                'Breakfast and lunch restaurant "El Patio"',
                'Comida',
                'Food',
                'Comienza tu dia con un delicioso desayuno o disfruta de un lunch fresco en un ambiente relajado y acogedor, ideal para complementar tu experiencia frente al mar.',
                'Start your day with a delicious breakfast or enjoy a fresh lunch in a relaxed, welcoming setting that complements your seaside stay.',
                'food',
                '#235d48',
                [
                    self::text('Desayuno', 'Breakfast'),
                ],
                [
                    self::media('restaurante-1', 'image', '/imagenes/servicios/restaurante_1.jpeg', null, 'Restaurante El Patio', 'El Patio restaurant'),
                    self::media('restaurante-2', 'image', '/imagenes/servicios/el_patio.jpeg', null, 'Area de restaurante', 'Restaurant area'),
                ],
            ),
            self::service(
                'masajes',
                5,
                'Area de masajes',
                'Massage area',
                'Relajación',
                'Relaxation',
                'Consiente cuerpo y mente con un momento de relajación. Disfruta de tratamientos disenados para renovar tu energía y elevar tu bienestar durante tu estancia.',
                'Treat body and mind to a relaxing moment. Enjoy treatments designed to restore your energy and elevate your wellbeing during your stay.',
                'sparks',
                '#1f6f79',
                [
                    self::text('Masajes', 'Massages'),
                ],
                [
                    self::media('masajes-1', 'image', '/imagenes/servicios/spa_1.jpeg', null, 'Area de masajes', 'Massage area'),
                ],
            ),
            self::service(
                'paddle',
                6,
                'Renta de tablas de paddle, surf y kayak',
                'Paddle board, surfboard, and kayak rentals',
                'Activación fisica',
                'Activity',
                'Vive la aventura en el mar con nuestras opciones de renta de equipo. Explora la costa, disfruta las olas y crea experiencias inolvidables en Punta de Mita.',
                'Enjoy ocean adventure with our equipment rental options. Explore the coast, ride the waves, and create unforgettable moments in Punta de Mita.',
                'pool',
                '#8a4b22',
                [
                    self::text('Paddle', 'Paddle'),
                    self::text('Surf', 'Surf'),
                    self::text('Kayak', 'Kayak'),
                ],
                [
                    self::media('paddle-1', 'image', '/imagenes/servicios/surf_1.jpeg', null, 'Renta de equipo acuatico', 'Water equipment rental'),
                    self::media('paddle-2', 'image', '/imagenes/servicios/surf_2.jpg', null, 'Equipo para actividades en el mar', 'Ocean activity equipment'),
                ],
            ),
            self::service(
                'bodas',
                7,
                'Organización de bodas',
                'Wedding planning',
                'Delicadeza',
                'Care',
                'Haz realidad la boda de tus suenos frente al mar. Nuestro equipo te acompaña en cada detalle para crear una celebración única e inolvidable.',
                'Bring your oceanfront wedding to life. Our team supports every detail to create a unique and unforgettable celebration.',
                'boda',
                '#a33f1d',
                [
                    self::text('Boda de tus suenos', 'Dream wedding'),
                ],
                [
                    self::media('bodas-1', 'image', '/imagenes/bodas/bodas_1.jpg', null, 'Montaje de boda frente al mar', 'Oceanfront wedding setup'),
                    self::media('bodas-2', 'image', '/imagenes/bodas/bodas_2.jpg', null, 'Celebración de boda', 'Wedding celebration'),
                    self::media('bodas-3', 'image', '/imagenes/bodas/bodas_3.jpg', null, 'Decoracion para boda', 'Wedding decoration'),
                ],
            ),
            self::service(
                'artesanía',
                8,
                'Boutique de artesanía y regalos',
                'Craft and gift boutique',
                'Regalos',
                'Gifts',
                'Descubre artesanias y productos mexicanos unicos, ideales para llevar un recuerdo especial de tu visita.',
                'Discover unique Mexican crafts and products, perfect for taking home a special memory from your visit.',
                'shop',
                '#235d48',
                [
                    self::text('Artesanias', 'Crafts'),
                    self::text('Productos Mexicanos', 'Mexican products'),
                ],
                [
                    self::media('artesanía-1', 'image', '/imagenes/servicios/artesanias_1.jpg', null, 'Boutique de artesanía y regalos', 'Craft and gift boutique'),
                ],
            ),
            self::service(
                'transporte',
                9,
                'Concierge y atención personalizada',
                'Concierge and personalized service',
                'Recomendaciones',
                'Recommendations',
                "Nuestro equipo esta listo para ayudarte a disfrutar al máximo tu estancia en Punta de Mita.\n\nTe apoyamos con:\n- Recomendaciones locales\n- Reservaciones en restaurantes\n- Tours y actividades\n- Transportación privada\n- Celebraciones especiales\n- Renta de autos o carritos de golf",
                "Our team is ready to help you make the most of your stay in Punta de Mita.\n\nWe can help with:\n- Local recommendations\n- Restaurant reservations\n- Tours and activities\n- Private transportation\n- Special celebrations\n- Car or golf cart rentals",
                'consierge',
                '#235d48',
                [
                    self::text('Recomendaciones', 'Recommendations'),
                    self::text('Tours', 'Tours'),
                    self::text('Celebraciones', 'Celebrations'),
                ],
                [
                    self::media('transporte-1', 'image', '/imagenes/servicios/concierge.jpg', null, 'Concierge y atención personalizada', 'Concierge and personalized service'),
                ],
            ),
        ];
    }

    /**
     * @param  array<int, array{es: string, en: string}>  $tags
     * @param  array<int, array<string, mixed>>  $media
     * @return array<string, mixed>
     */
    private static function service(
        string $id,
        int $order,
        string $nameEs,
        string $nameEn,
        string $eyebrowEs,
        string $eyebrowEn,
        string $descriptionEs,
        string $descriptionEn,
        string $icon,
        string $accent,
        array $tags,
        array $media,
    ): array {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'name' => self::text($nameEs, $nameEn),
            'eyebrow' => self::text($eyebrowEs, $eyebrowEn),
            'description' => self::text($descriptionEs, $descriptionEn),
            'icon' => $icon,
            'accent' => $accent,
            'tags' => $tags,
            'media' => $media,
        ];
    }

    /**
     * @return array{icon: string, label: array{es: string, en: string}}
     */
    private static function trustItem(string $icon, string $labelEs, string $labelEn): array
    {
        return [
            'icon' => $icon,
            'label' => self::text($labelEs, $labelEn),
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
     * @return array{id: string, type: string, src: string, poster: string|null, alt: array{es: string, en: string}}
     */
    private static function media(
        string $id,
        string $type,
        string $src,
        ?string $poster,
        string $altEs,
        string $altEn,
    ): array {
        return [
            'id' => $id,
            'type' => $type,
            'src' => $src,
            'poster' => $poster,
            'alt' => self::text($altEs, $altEn),
        ];
    }
}

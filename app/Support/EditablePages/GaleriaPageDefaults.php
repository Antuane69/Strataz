<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class GaleriaPageDefaults
{
    public const SLUG = 'galeria';

    public const TITLE = 'Galeria';

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
                    'page_title' => 'Galeria',
                    'intro_title' => 'Galeria',
                    'intro_body' => 'Playa, habitaciones, celebraciones y rincones para imaginar tu proxima estancia en Punta de Mita.',
                    'toolbar_title' => 'Explora Nuestras Instalaciones',
                    'photo_singular' => 'foto',
                    'photo_plural' => 'fotos',
                    'all_tab_label' => 'Todos',
                ],
                'en' => [
                    'page_title' => 'Gallery',
                    'intro_title' => 'Gallery',
                    'intro_body' => 'Beach, rooms, celebrations, and spaces to imagine your next stay in Punta de Mita.',
                    'toolbar_title' => 'Explore Our Spaces',
                    'photo_singular' => 'photo',
                    'photo_plural' => 'photos',
                    'all_tab_label' => 'All',
                ],
            ],
            'tabs' => [
                self::tab('areas-comunes', 'Areas comunes', 'Common areas'),
                self::tab('alberca', 'Alberca', 'Pool'),
                self::tab('playa', 'Playa', 'Beach'),
                self::tab('bodas', 'Bodas', 'Weddings'),
                self::tab('habitacion-doble', 'Habitación doble', 'Double room'),
                self::tab('habitacion-triple', 'Habitación triple', 'Triple room'),
            ],
            'images' => self::images(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function images(): array
    {
        return [
            self::image('vista-hotel', 1, '/imagenes/galeria/dashboard.jpg', 'Vista del hotel con alberca y palmeras frente al mar', 'Hotel view with pool and palm trees by the ocean', 'Hotel frente al mar', 'Oceanfront hotel', 'areas-comunes', 'feature'),
            self::image('areas-palapa', 2, '/imagenes/galeria/areas_comunes_03.jpg', 'Area comun con techo de palapa y recepción del hotel', 'Common area with palapa roof and hotel reception', 'Recepcion y palapa', 'Reception and palapa', 'areas-comunes', 'tall'),
            self::image('jardin-palmeras', 3, '/imagenes/galeria/background.webp', 'Palmeras y espacios abiertos del Hotel Meson de Mita', 'Palm trees and open spaces at Hotel Meson de Mita', 'Rincones tropicales', 'Tropical corners', 'areas-comunes', 'wide'),
            self::image('alberca-camastros', 4, '/imagenes/galeria/alberca-punta-de-mita-02.jpg', 'Alberca con camastros en Punta de Mita', 'Pool with lounge chairs in Punta de Mita', 'Alberca para descansar', 'Pool for relaxing', 'alberca', 'feature'),
            self::image('alberca-mar', 5, '/imagenes/galeria/alberca-punta-de-mita-04.jpg', 'Alberca del hotel junto al mar', 'Hotel pool by the ocean', 'Alberca junto al mar', 'Pool by the ocean', 'alberca', 'normal'),
            self::image('playa-frente-hotel', 6, '/imagenes/galeria/playa-meson-punta-mita-012.jpg', 'Playa frente al hotel en Punta de Mita', 'Beach in front of the hotel in Punta de Mita', 'Playa a unos pasos', 'Beach steps away', 'playa', 'wide'),
            self::image('playa-rocas', 7, '/imagenes/galeria/playa-meson-punta-mita-05.jpg', 'Vista de la playa y costa de Punta de Mita', 'View of the beach and Punta de Mita coast', 'Costa de Punta de Mita', 'Punta de Mita coast', 'playa', 'normal'),
            self::image('playa-atardecer', 8, '/imagenes/galeria/playa_04.jpg', 'Playa de Punta de Mita con vista al mar', 'Punta de Mita beach with ocean view', 'Camino al mar', 'Path to the ocean', 'playa', 'tall'),
            self::image('playa-palmeras', 9, '/imagenes/galeria/playa_05-1.jpg', 'Costa con palmeras cerca del hotel', 'Coast with palm trees near the hotel', 'Palmeras y bahia', 'Palms and bay', 'playa', 'normal'),
            self::image('playa-azul', 10, '/imagenes/galeria/playa_13.jpg', 'Mar azul en Punta de Mita', 'Blue ocean in Punta de Mita', 'Bahia tranquila', 'Calm bay', 'playa', 'wide'),
            self::image('boda-playa', 11, '/imagenes/galeria/bodas-Punta-Mita-Hotel-Meson-Mita.jpg', 'Boda frente al mar en Hotel Meson de Mita', 'Oceanfront wedding at Hotel Meson de Mita', 'Ceremonia frente al mar', 'Oceanfront ceremony', 'bodas', 'feature'),
            self::image('boda-musica', 12, '/imagenes/galeria/musica-Bodas-Playa-Punta-Mita-Hotel-Meson-Mita.jpg', 'Musica para boda en la playa', 'Music for a beach wedding', 'Recepcion con musica', 'Reception with music', 'bodas', 'normal'),
            self::image('boda-catering', 13, '/imagenes/galeria/punta-Mita-Weddings-Catering-Hotel-Meson-Mita-1.jpg', 'Catering para boda en Punta de Mita', 'Wedding catering in Punta de Mita', 'Detalles para invitados', 'Details for guests', 'bodas', 'wide'),
            self::image('doble-estandar', 14, '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg', 'Habitacion doble estandar del hotel', 'Standard double room at the hotel', 'Habitacion doble', 'Double room', 'habitacion-doble', 'normal'),
            self::image('doble-terraza', 15, '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg', 'Habitacion doble con terraza en Punta de Mita', 'Double room with terrace in Punta de Mita', 'Terraza privada', 'Private terrace', 'habitacion-doble', 'tall'),
            self::image('doble-vista', 16, '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-05.jpg', 'Habitacion doble con vista hacia la terraza', 'Double room with terrace view', 'Descanso luminoso', 'Bright rest', 'habitacion-doble', 'normal'),
            self::image('doble-bano', 17, '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg', 'Baño privado de habitacion doble', 'Private bathroom in a double room', 'Detalles interiores', 'Interior details', 'habitacion-doble', 'wide'),
            self::image('triple-familiar', 18, '/imagenes/galeria/habitacion-triple-hotel-meson-punta-de-mita-03.jpg', 'Habitacion triple familiar con dos camas', 'Family triple room with two beds', 'Habitacion triple', 'Triple room', 'habitacion-triple', 'feature'),
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
     * @return array<string, mixed>
     */
    private static function image(string $id, int $order, string $src, string $altEs, string $altEn, string $titleEs, string $titleEn, string $category, string $variant): array
    {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'image' => [
                'id' => $id.'-image',
                'type' => 'image',
                'src' => $src,
                'poster' => null,
                'alt' => self::text($altEs, $altEn),
            ],
            'title' => self::text($titleEs, $titleEn),
            'category' => $category,
            'variant' => $variant,
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

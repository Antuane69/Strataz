<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class BodasPageDefaults
{
    public const SLUG = 'bodas';

    public const TITLE = 'Bodas';

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
                    'page_title' => 'Bodas',
                    'hero_title' => 'Bodas en la playa, Hotel en Punta de Mita.',
                    'hero_subtitle' => 'Haz realidad la celebración de tus suenos.',
                    'hero_description' => 'Ponemos a tu disposición un coordinador de bodas personal, quien se encargara de que todo luzca como siempre has sonado, desde organización, decoración y selección del menú que deleitará a tus invitados. Conoce nuestros paquetes o personaliza tu evento perfecto.',
                    'reserve_cta' => 'RESERVAR',
                    'drawer_kicker' => 'Reserva tu fecha',
                    'drawer_title' => 'Cuéntanos sobre tu boda',
                    'drawer_description' => 'Déjanos tus datos y el primer boceto de tu celebración.',
                    'name_label' => 'Nombre',
                    'name_placeholder' => 'Tu nombre',
                    'email_label' => 'Correo',
                    'email_placeholder' => 'correo@ejemplo.com',
                    'phone_label' => 'Telefono',
                    'phone_placeholder' => '+52',
                    'message_label' => 'Mensaje',
                    'message_placeholder' => 'Cuéntanos fecha tentativa, número de invitados o el estilo que imaginas.',
                    'submit_label' => 'Enviar solicitud',
                ],
                'en' => [
                    'page_title' => 'Weddings',
                    'hero_title' => 'Beach weddings at Hotel Meson de Mita.',
                    'hero_subtitle' => 'Bring your dream celebration to life.',
                    'hero_description' => 'We provide a personal wedding coordinator who will make every detail look just as you imagined, from planning and decor to the menu selection your guests will enjoy. Explore our packages or customize your perfect event.',
                    'reserve_cta' => 'BOOK NOW',
                    'drawer_kicker' => 'Reserve your date',
                    'drawer_title' => 'Tell us about your wedding',
                    'drawer_description' => 'Leave your details and the first sketch of your celebration.',
                    'name_label' => 'Name',
                    'name_placeholder' => 'Your name',
                    'email_label' => 'Email',
                    'email_placeholder' => 'email@example.com',
                    'phone_label' => 'Phone',
                    'phone_placeholder' => '+52',
                    'message_label' => 'Message',
                    'message_placeholder' => 'Tell us your tentative date, guest count, or the style you imagine.',
                    'submit_label' => 'Send request',
                ],
            ],
            'background_media' => self::media('bodas-background', 'image', '/imagenes/galeria/background.webp', null, 'Fondo de bodas', 'Wedding background', 'Fondo'),
            'highlights' => [
                self::highlight('calendar-heart', 'Coordinación personal', 'Personal coordination'),
                self::highlight('message-circle', 'Evento personalizado', 'Personalized event'),
            ],
            'media' => [
                self::media('bodas-1', 'image', '/imagenes/bodas/bodas_1.jpg', null, 'Pareja de novios caminando frente al mar', 'Couple walking by the ocean', 'Ceremonias en el espigon', 'Pier ceremonies'),
                self::media('bodas-video-1', 'video', '/imagenes/bodas/bodas_8.mp4', '/imagenes/bodas/bodas_1.jpg', 'Boda frente al mar', 'Oceanfront wedding', 'Ceremonia frente al mar', 'Oceanfront ceremony'),
                self::media('bodas-2', 'image', '/imagenes/bodas/bodas_2.jpg', null, 'Decoracion personalizada para boda', 'Custom wedding decor', 'Decoración personalizada', 'Custom decor'),
                self::media('bodas-3', 'image', '/imagenes/bodas/bodas_3.jpg', null, 'Ceremonia frente al mar', 'Ceremony by the ocean', 'Ceremonias frente al mar', 'Oceanfront ceremonies'),
                self::media('bodas-4', 'image', '/imagenes/bodas/bodas_4.jpg', null, 'Area con música en vivo', 'Live music area', 'Area con musica en vivo', 'Live music area'),
                self::media('bodas-5', 'image', '/imagenes/bodas/bodas_5.jpg', null, 'Música en vivo para bodas', 'Live music for weddings', 'Musica en vivo', 'Live music'),
                self::media('bodas-6', 'image', '/imagenes/bodas/bodas_6.jpg', null, 'Bebidas especiales para bodas', 'Special wedding drinks', 'Bebidas especiales', 'Special drinks'),
                self::media('bodas-7', 'image', '/imagenes/bodas/bodas_7.jpg', null, 'Decoracion personalizada', 'Custom decoration', 'Decoración personalizada', 'Custom decoration'),
            ],
        ];
    }

    /**
     * @return array{icon: string, label: array{es: string, en: string}}
     */
    private static function highlight(string $icon, string $labelEs, string $labelEn): array
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
     * @return array{id: string, type: string, src: string, poster: string|null, alt: array{es: string, en: string}, label: array{es: string, en: string}}
     */
    private static function media(
        string $id,
        string $type,
        string $src,
        ?string $poster,
        string $altEs,
        string $altEn,
        string $labelEs,
        ?string $labelEn = null,
    ): array {
        return [
            'id' => $id,
            'type' => $type,
            'src' => $src,
            'poster' => $poster,
            'alt' => self::text($altEs, $altEn),
            'label' => self::text($labelEs, $labelEn ?? $labelEs),
        ];
    }
}

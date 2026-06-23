<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class FaqPageDefaults
{
    public const SLUG = 'faq';

    public const TITLE = 'FAQ';

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
            'contact_email' => 'reservaciones@hotelmesondemita.com',
            'locales' => [
                'es' => [
                    'page_title' => 'FAQ',
                    'hero_background_label' => 'FAQ',
                    'hero_title' => 'Preguntas frecuentes',
                    'question_card_kicker' => 'Otra duda?',
                    'question_card_title' => 'Cuéntanos qué necesitas saber',
                    'question_card_body' => 'Si tu pregunta no aparece aquí, envíanos el detalle y te responderemos por correo.',
                    'question_card_button' => 'Preguntar ahora',
                    'drawer_kicker' => 'Pregunta específica',
                    'drawer_title' => 'Envíanos tu duda',
                    'drawer_body' => 'Comparte tus datos y el equipo de Hotel Mesón de Mita te responderá lo antes posible.',
                    'form_name_label' => 'Nombre',
                    'form_name_placeholder' => 'Tu nombre',
                    'form_name_required' => 'Escribe tu nombre.',
                    'form_email_label' => 'Correo',
                    'form_email_placeholder' => 'correo@ejemplo.com',
                    'form_email_required' => 'Escribe tu correo.',
                    'form_email_invalid' => 'Escribe un correo válido.',
                    'form_phone_label' => 'Teléfono',
                    'form_phone_placeholder' => '+52',
                    'form_message_label' => 'Pregunta',
                    'form_message_placeholder' => 'Escribe aquí la duda que quieres resolver.',
                    'form_message_required' => 'Cuéntanos tu duda.',
                    'form_submit_label' => 'Enviar pregunta',
                    'mail_subject' => 'Duda desde FAQ',
                ],
                'en' => [
                    'page_title' => 'FAQ',
                    'hero_background_label' => 'FAQ',
                    'hero_title' => 'Frequently asked questions',
                    'question_card_kicker' => 'Another question?',
                    'question_card_title' => 'Tell us what you need to know',
                    'question_card_body' => 'If your question is not listed here, send us the details and we will reply by email.',
                    'question_card_button' => 'Ask now',
                    'drawer_kicker' => 'Specific question',
                    'drawer_title' => 'Send us your question',
                    'drawer_body' => 'Share your details and the Hotel Meson de Mita team will get back to you as soon as possible.',
                    'form_name_label' => 'Name',
                    'form_name_placeholder' => 'Your name',
                    'form_name_required' => 'Write your name.',
                    'form_email_label' => 'Email',
                    'form_email_placeholder' => 'email@example.com',
                    'form_email_required' => 'Write your email.',
                    'form_email_invalid' => 'Write a valid email.',
                    'form_phone_label' => 'Phone',
                    'form_phone_placeholder' => '+52',
                    'form_message_label' => 'Question',
                    'form_message_placeholder' => 'Write the question you want us to answer.',
                    'form_message_required' => 'Tell us your question.',
                    'form_submit_label' => 'Send question',
                    'mail_subject' => 'Question from FAQ',
                ],
            ],
            'faqs' => [
                self::faq('playa', 1, 'El hotel se ubica sobre la playa?', 'Nos localizamos sobre la playa Anclote; nuestra área de alberca tiene acceso directo a la sección de playa delimitada para uso del hotel, la cual cuenta con camastros para uso exclusivo de nuestros huéspedes.', 'Is the hotel located on the beach?', 'We are located on Anclote beach; our pool area has direct access to the beach section reserved for hotel guests, with lounge chairs available for their use.'),
                self::faq('check-in-check-out', 2, 'Cuál es el horario de check-in y check-out?', 'El check-in es a partir de las 2:00 PM y el check-out se realiza a las 12:00 PM. Si necesitas apoyo con tu llegada o salida, nuestro equipo puede orientarte antes de tu estancia.', 'What are the check-in and check-out times?', 'Check-in starts at 2:00 PM and check-out is at 12:00 PM. If you need help with arrival or departure, our team can guide you before your stay.'),
                self::faq('horario-alberca', 3, 'Cuál es el horario de alberca?', 'La alberca está disponible para huéspedes del hotel. Al llegar, recepción puede confirmarte el horario vigente y cualquier indicación especial para el uso del área.', 'What are the pool hours?', 'The pool is available for hotel guests. Upon arrival, reception can confirm the current schedule and any special guidelines for the area.'),
                self::faq('tienda-cerca', 4, 'Hay alguna tienda cerca?', 'Sí. En la zona de El Anclote encontrarás tiendas, restaurantes y servicios locales a pocos pasos del hotel.', 'Is there a store nearby?', 'Yes. In the El Anclote area you will find shops, restaurants, and local services just a few steps from the hotel.'),
                self::faq('estacionamiento', 5, 'El hotel cuenta con estacionamiento?', 'El equipo de recepción puede ayudarte con la información disponible para estacionamiento y acceso al hotel de acuerdo con tu fecha de visita.', 'Does the hotel have parking?', 'The reception team can help you with the available parking and hotel access information according to your visit date.'),
                self::faq('disponibilidad', 6, 'Cómo puedo consultar disponibilidad?', 'Puedes usar la barra de reservación del sitio o escribirnos directamente para confirmar fechas, tipo de habitación y detalles de tu estancia.', 'How can I check availability?', 'You can use the booking bar on the site or write to us directly to confirm dates, room type, and stay details.'),
                self::faq('politica-cancelacion', 7, 'Cuál es la política de cancelación?', 'Las políticas pueden variar según la fecha y el tipo de reserva. En la sección de habitaciones puedes revisar la tabla de cancelaciones dentro de la información del hotel.', 'What is the cancellation policy?', 'Policies may vary depending on the date and reservation type. In the rooms section, you can review the cancellation table within the hotel information.'),
            ],
        ];
    }

    /**
     * @return array{id: string, order: int, is_active: bool, question: array{es: string, en: string}, answer: array{es: string, en: string}}
     */
    private static function faq(string $id, int $order, string $questionEs, string $answerEs, string $questionEn, string $answerEn): array
    {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'question' => self::text($questionEs, $questionEn),
            'answer' => self::text($answerEs, $answerEn),
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

import type { FaqItem, FaqPageText } from '../interfaces';

export const faqText: FaqPageText = {
    page_title: 'FAQ',
    hero_background_label: 'FAQ',
    hero_title: 'Preguntas frecuentes',
    question_card_kicker: 'Otra duda?',
    question_card_title: 'Cuéntanos qué necesitas saber',
    question_card_body:
        'Si tu pregunta no aparece aquí, envíanos el detalle y te responderemos por correo.',
    question_card_button: 'Preguntar ahora',
    drawer_kicker: 'Pregunta específica',
    drawer_title: 'Envíanos tu duda',
    drawer_body:
        'Comparte tus datos y el equipo de Hotel Mesón de Mita te responderá lo antes posible.',
    form_name_label: 'Nombre',
    form_name_placeholder: 'Tu nombre',
    form_name_required: 'Escribe tu nombre.',
    form_email_label: 'Correo',
    form_email_placeholder: 'correo@ejemplo.com',
    form_email_required: 'Escribe tu correo.',
    form_email_invalid: 'Escribe un correo válido.',
    form_phone_label: 'Teléfono',
    form_phone_placeholder: '+52',
    form_message_label: 'Pregunta',
    form_message_placeholder: 'Escribe aquí la duda que quieres resolver.',
    form_message_required: 'Cuéntanos tu duda.',
    form_submit_label: 'Enviar pregunta',
    mail_subject: 'Duda desde FAQ',
};

export const faqItems: FaqItem[] = [
    {
        id: 'playa',
        question: 'El hotel se ubica sobre la playa?',
        answer: 'Nos localizamos sobre la playa Anclote; nuestra área de alberca tiene acceso directo a la sección de playa delimitada para uso del hotel, la cual cuenta con camastros para uso exclusivo de nuestros huéspedes.',
    },
    {
        id: 'check-in-check-out',
        question: 'Cuál es el horario de check-in y check-out?',
        answer: 'El check-in es a partir de las 2:00 PM y el check-out se realiza a las 12:00 PM. Si necesitas apoyo con tu llegada o salida, nuestro equipo puede orientarte antes de tu estancia.',
    },
    {
        id: 'horario-alberca',
        question: 'Cuál es el horario de alberca?',
        answer: 'La alberca está disponible para huéspedes del hotel. Al llegar, recepción puede confirmarte el horario vigente y cualquier indicación especial para el uso del área.',
    },
];

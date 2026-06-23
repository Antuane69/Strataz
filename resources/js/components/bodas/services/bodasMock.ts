import type { BodasHighlight, BodasMedia, BodasPageText } from '../interfaces';

export const bodasText: BodasPageText = {
    page_title: 'Bodas',
    hero_title: 'Bodas en la playa, Hotel en Punta de Mita.',
    hero_subtitle: 'Haz realidad la celebracion de tus suenos.',
    hero_description:
        'Ponemos a tu disposicion un coordinador de bodas personal, quien se encargara de que todo luzca como siempre has sonado, desde organizacion, decoracion y seleccion del menu que deleitara a tus invitados. Conoce nuestros paquetes o personaliza tu evento perfecto.',
    reserve_cta: 'RESERVAR',
    drawer_kicker: 'Reserva tu fecha',
    drawer_title: 'Cuentanos sobre tu boda',
    drawer_description:
        'Dejanos tus datos y el primer boceto de tu celebracion.',
    name_label: 'Nombre',
    name_placeholder: 'Tu nombre',
    email_label: 'Correo',
    email_placeholder: 'correo@ejemplo.com',
    phone_label: 'Telefono',
    phone_placeholder: '+52',
    message_label: 'Mensaje',
    message_placeholder:
        'Cuentanos fecha tentativa, numero de invitados o el estilo que imaginas.',
    submit_label: 'Enviar solicitud',
};

export const bodasBackground: BodasMedia = {
    id: 'bodas-background',
    type: 'image',
    src: '/imagenes/galeria/background.webp',
    alt: 'Fondo de bodas',
    label: 'Fondo',
};

export const bodasHighlights: BodasHighlight[] = [
    {
        icon: 'calendar-heart',
        label: 'Coordinacion personal',
    },
    {
        icon: 'message-circle',
        label: 'Evento personalizado',
    },
];

export const bodasMedia: BodasMedia[] = [
    {
        id: 'bodas-1',
        type: 'image',
        src: '/imagenes/bodas/bodas_1.jpg',
        alt: 'Pareja de novios caminando frente al mar',
        label: 'Ceremonias en el espigon',
    },
    {
        id: 'bodas-video-1',
        type: 'video',
        src: '/imagenes/bodas/bodas_8.mp4',
        poster: '/imagenes/bodas/bodas_1.jpg',
        alt: 'Boda frente al mar',
        label: 'Ceremonia frente al mar',
    },
    {
        id: 'bodas-2',
        type: 'image',
        src: '/imagenes/bodas/bodas_2.jpg',
        alt: 'Decoracion personalizada para boda',
        label: 'Decoracion personalizada',
    },
    {
        id: 'bodas-3',
        type: 'image',
        src: '/imagenes/bodas/bodas_3.jpg',
        alt: 'Ceremonia frente al mar',
        label: 'Ceremonias frente al mar',
    },
    {
        id: 'bodas-4',
        type: 'image',
        src: '/imagenes/bodas/bodas_4.jpg',
        alt: 'Area con musica en vivo',
        label: 'Area con musica en vivo',
    },
    {
        id: 'bodas-5',
        type: 'image',
        src: '/imagenes/bodas/bodas_5.jpg',
        alt: 'Musica en vivo para bodas',
        label: 'Musica en vivo',
    },
    {
        id: 'bodas-6',
        type: 'image',
        src: '/imagenes/bodas/bodas_6.jpg',
        alt: 'Bebidas especiales para bodas',
        label: 'Bebidas especiales',
    },
    {
        id: 'bodas-7',
        type: 'image',
        src: '/imagenes/bodas/bodas_7.jpg',
        alt: 'Decoracion personalizada',
        label: 'Decoracion personalizada',
    },
];

import type { Recommendation } from '../interfaces';

export const recommendations: Recommendation[] = [
    {
        id: 'islas-marietas',
        title: 'Visita las Islas Marietas',
        eyebrow: 'Naturaleza y snorkel',
        image: '/imagenes/recomendaciones/marietas_1.jpg',
        imageAlt: 'Mar azul cerca de Punta de Mita',
        distance: 'Aprox. 10 km',
        duration: 'Medio dia',
        intro: 'Las Islas Marietas se localizan frente a las costas de Punta de Mita. Es un pequeno archipielago protegido, ideal para quienes buscan naturaleza, mar y paisajes memorables.',
        sections: [
            {
                title: 'Que puedes hacer',
                paragraphs: [],
                bullets: [
                    'Practicar snorkel en arrecifes con gran variedad de vida marina.',
                    'Explorar cuevas y formaciones rocosas con guia autorizado.',
                    'Disfrutar paseos en lancha con vistas al Pacifico.',
                ],
            },
            {
                title: 'Recomendaciones',
                paragraphs: [
                    'Al ser una zona protegida, conviene reservar con anticipacion y seguir las indicaciones de conservacion durante toda la visita.',
                ],
                bullets: [
                    'Usa bloqueador biodegradable.',
                    'No toques ni alimentes fauna silvestre.',
                ],
            },
        ],
    },
    {
        id: 'avistamiento-ballenas',
        title: 'Avistamiento de ballenas',
        eyebrow: 'Temporada especial',
        image: '/imagenes/recomendaciones/ballenas_1.jpg',
        imageAlt: 'Ballena en la Bahia de Banderas',
        distance: 'Tours desde la bahia',
        duration: '2 a 4 horas',
        intro: 'Durante temporada, la bahia ofrece la posibilidad de ver ballenas jorobadas. Es una experiencia tranquila, emocionante y muy ligada al paisaje marino de la zona.',
        sections: [
            {
                title: 'Cuando buscarlo',
                paragraphs: [
                    'Pregunta por disponibilidad de tours durante tu estancia, ya que depende de temporada y condiciones del mar.',
                ],
                bullets: [],
            },
            {
                title: 'Recomendaciones',
                paragraphs: [],
                bullets: [
                    'Reserva con operadores responsables.',
                    'Lleva camara, gorra y proteccion solar.',
                    'Sigue siempre las indicaciones del guia.',
                ],
            },
        ],
    },
    {
        id: 'el-anclote',
        title: 'Paseo sobre Av. El Anclote',
        eyebrow: 'Restaurantes y playa',
        image: '/imagenes/recomendaciones/anclote.jpg',
        imageAlt: 'Vista de playa en Punta de Mita',
        distance: 'A unos pasos',
        duration: 'Libre',
        intro: 'El Anclote es una zona comoda para caminar, comer frente al mar y sentir el ritmo tranquilo de Punta de Mita. Es una buena opcion para una tarde sin prisas.',
        sections: [
            {
                title: 'Que hacer',
                paragraphs: [],
                bullets: [
                    'Caminar por la playa al atardecer.',
                    'Probar mariscos y cocina local.',
                    'Buscar tiendas pequenas y espacios para tomar cafe.',
                ],
            },
            {
                title: 'Para disfrutarlo mejor',
                paragraphs: [
                    'Ve con calma. El encanto esta en recorrerlo sin un plan rigido y detenerte donde el ambiente te guste.',
                ],
                bullets: [],
            },
        ],
    },
    {
        id: 'playa-el-anclote',
        title: 'Playa El Anclote',
        eyebrow: 'Mar tranquilo',
        image: '/imagenes/recomendaciones/playa_anclote.jpg',
        imageAlt: 'Playa El Anclote en Punta de Mita',
        distance: 'A unos pasos',
        duration: 'Libre',
        intro: 'Playa El Anclote es una de las playas mas accesibles desde el hotel. Su ambiente relajado funciona para nadar, caminar o pasar un rato frente al mar.',
        sections: [
            {
                title: 'Plan recomendado',
                paragraphs: [],
                bullets: [
                    'Llegar temprano para disfrutar con menos movimiento.',
                    'Caminar por la orilla y mirar las embarcaciones.',
                    'Cerrar con una comida cerca de la playa.',
                ],
            },
            {
                title: 'Considera',
                paragraphs: [
                    'Lleva sandalias comodas, agua y proteccion solar. En temporada alta puede tener mas actividad.',
                ],
                bullets: [],
            },
        ],
    },
    {
        id: 'surf',
        title: 'Surf',
        eyebrow: 'Olas y aventura',
        image: '/imagenes/recomendaciones/surf.jpg',
        imageAlt: 'Persona surfeando cerca de Punta de Mita',
        distance: 'Cerca de Punta de Mita',
        duration: '2 a 3 horas',
        intro: 'La zona ofrece playas con olas para diferentes niveles. Puedes tomar una clase, practicar con guia o simplemente disfrutar el ambiente surf de la costa.',
        sections: [
            {
                title: 'Ideal para',
                paragraphs: [],
                bullets: [
                    'Tomar una clase si estas empezando.',
                    'Practicar en una playa con ambiente natural.',
                    'Vivir una manana activa frente al mar.',
                ],
            },
            {
                title: 'Tip local',
                paragraphs: [
                    'Pregunta por condiciones de oleaje y por instructores recomendados antes de salir.',
                ],
                bullets: [],
            },
        ],
    },
    {
        id: 'buceo',
        title: 'Buceo en aguas del Pacifico',
        eyebrow: 'Vida marina',
        image: '/imagenes/recomendaciones/buceo.jpeg',
        imageAlt: 'Buceo en aguas cristalinas del Pacifico',
        distance: 'Tours desde la zona',
        duration: 'Medio dia',
        intro: 'Explora aguas calidas y cristalinas con experiencias de snorkel o buceo. Es una gran forma de conocer el lado marino de la Bahia de Banderas.',
        sections: [
            {
                title: 'Como vivirlo',
                paragraphs: [],
                bullets: [
                    'Reserva con operadores certificados.',
                    'Confirma si el tour incluye equipo.',
                    'Lleva traje de bano, toalla y ropa ligera.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Viajeros que buscan una experiencia de agua mas inmersiva y segura con acompanamiento profesional.',
                ],
                bullets: [],
            },
        ],
    },
];

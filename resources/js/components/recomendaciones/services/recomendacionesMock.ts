import type { Recommendation } from "../interfaces";

export const recommendations: Recommendation[] = [
    {
        id: 'islas-marietas',
        title: 'Visita las Islas Marietas',
        eyebrow: 'Naturaleza y snorkel',
        image: '/imagenes/recomendaciones/marietas_1.jpg',
        imageAlt: 'Mar azul cerca de Punta de Mita',
        distance: 'Aprox. 10 km',
        duration: 'Medio día',
        intro: 'Las Islas Marietas se localizan frente a las costas de Punta de Mita, en la Riviera Nayarit. Es un pequeño archipiélago protegido por dos islas y varios islotes, ideal para quienes buscan naturaleza, mar y paisajes memorables.',
        sections: [
            {
                title: 'Qué puedes hacer',
                bullets: [
                    'Practicar snorkel en arrecifes con gran variedad de vida marina.',
                    'Explorar cuevas y formaciones rocosas con guía autorizado.',
                    'Disfrutar paseos en lancha con vistas al Pacífico.',
                ],
            },
            {
                title: 'Recomendaciones',
                paragraphs: [
                    'Al ser una zona protegida, conviene reservar con anticipación y seguir las indicaciones de conservación durante toda la visita.',
                ],
                bullets: [
                    'No tirar basura.',
                    'No tocar ni alimentar fauna silvestre.',
                    'Usar bloqueador biodegradable.',
                ],
            },
        ],
    },
    {
        id: 'playa-la-lancha',
        title: 'Avistamiento de ballenas',
        eyebrow: 'Olas tranquilas',
        image: '/imagenes/recomendaciones/ballenas_1.jpg',
        imageAlt: 'Playa al atardecer en Riviera Nayarit',
        distance: 'Cerca de Punta de Mita',
        duration: '2 a 3 horas',
        intro: 'La Lancha es una de las playas favoritas para surfear cerca de Punta de Mita. Su ambiente relajado y sus olas consistentes la vuelven una gran opción para clases, práctica o una mañana frente al mar.',
        sections: [
            {
                title: 'Ideal para',
                bullets: [
                    'Tomar una clase de surf si estás empezando.',
                    'Caminar por una playa con ambiente natural.',
                    'Disfrutar una mañana tranquila antes de volver al hotel.',
                ],
            },
            {
                title: 'Tip local',
                paragraphs: [
                    'Lleva agua, sombrero y sandalias cómodas. El acceso suele sentirse más natural y menos urbano que otras playas de la zona.',
                ],
            },
        ],
    },
    {
        id: 'el-anclote',
        title: 'Paseo sobre av Anclote y sus alrededores',
        eyebrow: 'Restaurantes y playa',
        image: '/imagenes/recomendaciones/anclote.jpg',
        imageAlt: 'Vista de playa en Punta de Mita',
        distance: 'A unos pasos',
        duration: 'Libre',
        intro: 'El Anclote es una zona cómoda para caminar, comer frente al mar y sentir el ritmo tranquilo de Punta de Mita. Es una buena opción para una tarde sin prisas.',
        sections: [
            {
                title: 'Qué hacer',
                bullets: [
                    'Caminar por la playa al atardecer.',
                    'Probar mariscos y cocina local.',
                    'Buscar tiendas pequeñas y espacios para tomar café.',
                ],
            },
            {
                title: 'Para disfrutarlo mejor',
                paragraphs: [
                    'Ve con calma, el encanto está en recorrerlo sin un plan rígido y detenerte donde el ambiente te guste.',
                ],
            },
        ],
    },
    {
        id: 'playa_anclote',
        title: 'Playa el Anclote',
        eyebrow: 'Color y pueblo surf',
        image: '/imagenes/recomendaciones/playa_anclote.jpg',
        imageAlt: 'Costa de Riviera Nayarit',
        distance: 'Aprox. 35 min',
        duration: 'Medio día',
        intro: 'Sayulita es un pueblo costero con mucha vida, tiendas, comida, playa y un ambiente bohemio. Funciona muy bien como paseo de medio día desde Punta de Mita.',
        sections: [
            {
                title: 'Plan recomendado',
                bullets: [
                    'Llegar por la mañana para caminar con menos calor.',
                    'Recorrer tiendas locales y galerías pequeñas.',
                    'Comer algo casual antes de volver a Punta de Mita.',
                ],
            },
            {
                title: 'Considera',
                paragraphs: [
                    'Suele tener más movimiento que Punta de Mita, así que es ideal si buscas un cambio de energía durante tu estancia.',
                ],
            },
        ],
    },
    {
        id: 'surf',
        title: 'Surf',
        eyebrow: 'Temporada especial',
        image: '/imagenes/recomendaciones/surf.jpg',
        imageAlt: 'Bahía de Punta de Mita',
        distance: 'Tours desde la bahía',
        duration: '2 a 4 horas',
        intro: 'Durante temporada, la bahía ofrece la posibilidad de ver ballenas jorobadas. Es una experiencia tranquila, emocionante y muy ligada al paisaje marino de la zona.',
        sections: [
            {
                title: 'Cuándo buscarlo',
                paragraphs: [
                    'Pregunta por disponibilidad de tours durante tu estancia, ya que depende de temporada y condiciones del mar.',
                ],
            },
            {
                title: 'Recomendaciones',
                bullets: [
                    'Reservar con operadores responsables.',
                    'Llevar cámara, gorra y protección solar.',
                    'Seguir siempre las indicaciones del guía.',
                ],
            },
        ],
    },
    {
        id: 'buceo',
        title: 'Bucea en las cálidas y cristalinas aguas del pacífico',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/recomendaciones/buceo.jpeg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Practica pesca deportiva',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Caminatas',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Tirolesas, paseos en cuatrimoto o rzr y paseos a caballo',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Golf',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Visita los pueblitos cercanos',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Conciéntete con un masaje',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Conoce playas semi-vírgenes',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
        {
        id: 'atardecer',
        title: 'Prueba la gastronomía de la zona',
        eyebrow: 'Plan sencillo',
        image: '/imagenes/galeria/playa_13.jpg',
        imageAlt: 'Mar abierto al atardecer',
        distance: 'Muy cerca',
        duration: '1 hora',
        intro: 'A veces el mejor plan no necesita traslado. Una caminata al atardecer, el sonido del mar y una cena tranquila pueden ser suficientes para recordar Punta de Mita.',
        sections: [
            {
                title: 'Cómo vivirlo',
                bullets: [
                    'Sal con tiempo para encontrar un buen punto de vista.',
                    'Lleva ropa ligera y cómoda.',
                    'Cierra el día con una cena cerca del mar.',
                ],
            },
            {
                title: 'Ideal para',
                paragraphs: [
                    'Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.',
                ],
            },
        ],
    },
];
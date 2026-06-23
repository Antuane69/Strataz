<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class RecomendacionesPageDefaults
{
    public const SLUG = 'recomendaciones';

    public const TITLE = 'Recomendaciones';

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
                    'page_title' => 'Recomendaciones',
                    'intro_title' => 'Recomendaciones',
                    'intro_body' => 'Punta de Mita es un pueblito pequeño, pero con mucho encanto. En Hotel Mesón de Mita queremos ayudarte a aprovechar al máximo los atractivos de la zona y vivir unas vacaciones llenas de experiencias memorables.',
                ],
                'en' => [
                    'page_title' => 'Recommendations',
                    'intro_title' => 'Recommendations',
                    'intro_body' => 'Punta de Mita is a small town with plenty of charm. At Hotel Mesón de Mita, we want to help you make the most of the area and enjoy a stay full of memorable experiences.',
                ],
            ],
            'recommendations' => self::recommendations(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function recommendations(): array
    {
        return [
            self::recommendation(
                'islas-marietas',
                1,
                'Visita las Islas Marietas',
                'Visit the Marietas Islands',
                'Naturaleza y snorkel',
                'Nature and snorkeling',
                '/imagenes/recomendaciones/marietas_1.jpg',
                'Mar azul cerca de Punta de Mita',
                'Blue ocean near Punta de Mita',
                'Aprox. 10 km',
                'Approx. 10 km',
                'Medio día',
                'Half day',
                'Las Islas Marietas se localizan frente a las costas de Punta de Mita. Es un pequeno archipielago protegido, ideal para quienes buscan naturaleza, mar y paisajes memorables.',
                'The Marietas Islands sit off the coast of Punta de Mita. This small protected archipelago is ideal for nature, ocean, and memorable scenery.',
                [
                    self::section('Que puedes hacer', 'What you can do', [], [
                        self::text('Practicar snorkel en arrecifes con gran variedad de vida marina.', 'Snorkel around reefs with rich marine life.'),
                        self::text('Explorar cuevas y formaciones rocosas con guía autorizado.', 'Explore caves and rock formations with an authorized guide.'),
                        self::text('Disfrutar paseos en lancha con vistas al Pacífico.', 'Enjoy boat rides with Pacific Ocean views.'),
                    ]),
                    self::section('Recomendaciones', 'Tips', [
                        self::text('Al ser una zona protegida, conviene reservar con anticipación y seguir las indicaciones de conservación durante toda la visita.', 'Because this is a protected area, it is best to book in advance and follow conservation guidelines throughout the visit.'),
                    ], [
                        self::text('Usa bloqueador biodegradable.', 'Use biodegradable sunscreen.'),
                        self::text('No toques ni alimentes fauna silvestre.', 'Do not touch or feed wildlife.'),
                    ]),
                ],
            ),
            self::recommendation(
                'avistamiento-ballenas',
                2,
                'Avistamiento de ballenas',
                'Whale watching',
                'Temporada especial',
                'Seasonal experience',
                '/imagenes/recomendaciones/ballenas_1.jpg',
                'Ballena en la Bahía de Banderas',
                'Whale in Banderas Bay',
                'Tours desde la bahía',
                'Tours from the bay',
                '2 a 4 horas',
                '2 to 4 hours',
                'Durante temporada, la bahía ofrece la posibilidad de ver ballenas jorobadas. Es una experiencia tranquila, emocionante y muy ligada al paisaje marino de la zona.',
                'During the season, the bay offers the chance to see humpback whales. It is a calm, exciting experience deeply connected to the local seascape.',
                [
                    self::section('Cuando buscarlo', 'When to go', [
                        self::text('Pregunta por disponibilidad de tours durante tu estancia, ya que depende de temporada y condiciones del mar.', 'Ask about tour availability during your stay, since it depends on the season and ocean conditions.'),
                    ], []),
                    self::section('Recomendaciones', 'Tips', [], [
                        self::text('Reserva con operadores responsables.', 'Book with responsible operators.'),
                        self::text('Lleva cámara, gorra y proteccion solar.', 'Bring a camera, hat, and sun protection.'),
                        self::text('Sigue siempre las indicaciones del guía.', 'Always follow your guide instructions.'),
                    ]),
                ],
            ),
            self::recommendation(
                'el-anclote',
                3,
                'Paseo sobre Av. El Anclote',
                'Walk along Av. El Anclote',
                'Restaurantes y playa',
                'Restaurants and beach',
                '/imagenes/recomendaciones/anclote.jpg',
                'Vista de playa en Punta de Mita',
                'Beach view in Punta de Mita',
                'A unos pasos',
                'Steps away',
                'Libre',
                'Flexible',
                'El Anclote es una zona cómoda para caminar, comer frente al mar y sentir el ritmo tranquilo de Punta de Mita. Es una buena opción para una tarde sin prisas.',
                'El Anclote is an easy area for walking, dining by the ocean, and feeling Punta de Mita relaxed rhythm. It is a good option for an unhurried afternoon.',
                [
                    self::section('Que hacer', 'What to do', [], [
                        self::text('Caminar por la playa al atardecer.', 'Walk along the beach at sunset.'),
                        self::text('Probar mariscos y cocina local.', 'Try seafood and local cuisine.'),
                        self::text('Buscar tiendas pequenas y espacios para tomar cáfe.', 'Visit small shops and casual coffee spots.'),
                    ]),
                    self::section('Para disfrutarlo mejor', 'How to enjoy it', [
                        self::text('Ve con calma. El encanto esta en recorrerlo sin un plan rigido y detenerte donde el ambiente te guste.', 'Take it slowly. The charm is in wandering without a strict plan and stopping wherever the atmosphere feels right.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'playa-el-anclote',
                4,
                'Playa El Anclote',
                'El Anclote Beach',
                'Mar tranquilo',
                'Calm ocean',
                '/imagenes/recomendaciones/playa_anclote.jpg',
                'Playa El Anclote en Punta de Mita',
                'El Anclote Beach in Punta de Mita',
                'A unos pasos',
                'Steps away',
                'Libre',
                'Flexible',
                'Playa El Anclote es una de las playas más accesibles desde el hotel. Su ambiente relajado funciona para nadar, caminar o pasar un rato frente al mar.',
                'El Anclote Beach is one of the easiest beaches to reach from the hotel. Its relaxed atmosphere works well for swimming, walking, or spending time by the ocean.',
                [
                    self::section('Plan recomendado', 'Recommended plan', [], [
                        self::text('Llegar temprano para disfrutar con menos movimiento.', 'Arrive early to enjoy a quieter setting.'),
                        self::text('Caminar por la orilla y mirar las embarcaciones.', 'Walk along the shore and watch the boats.'),
                        self::text('Cerrar con una comida cerca de la playa.', 'Finish with a meal close to the beach.'),
                    ]),
                    self::section('Considera', 'Keep in mind', [
                        self::text('Lleva sandalias cómodas, agua y proteccion solar. En temporada alta puede tener más actividad.', 'Bring comfortable sandals, water, and sun protection. It can be busier during high season.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'surf',
                5,
                'Surf',
                'Surf',
                'Olas y aventura',
                'Waves and adventure',
                '/imagenes/recomendaciones/surf.jpg',
                'Persona surfeando cerca de Punta de Mita',
                'Person surfing near Punta de Mita',
                'Cerca de Punta de Mita',
                'Near Punta de Mita',
                '2 a 3 horas',
                '2 to 3 hours',
                'La zona ofrece playas con olas para diferentes niveles. Puedes tomar una clase, practicar con guía o simplemente disfrutar el ambiente surf de la costa.',
                'The area offers beaches with waves for different levels. You can take a lesson, practice with a guide, or simply enjoy the surf atmosphere along the coast.',
                [
                    self::section('Ideal para', 'Ideal for', [], [
                        self::text('Tomar una clase si estas empezando.', 'Taking a lesson if you are starting out.'),
                        self::text('Practicar en una playa con ambiente natural.', 'Practicing on a beach with a natural feel.'),
                        self::text('Vivir una manana activa frente al mar.', 'Enjoying an active morning by the ocean.'),
                    ]),
                    self::section('Tip local', 'Local tip', [
                        self::text('Pregunta por condiciones de oleaje y por instructores recomendados antes de salir.', 'Ask about wave conditions and recommended instructors before heading out.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'buceo',
                6,
                'Buceo en aguas del Pacífico',
                'Diving in Pacific waters',
                'Vida marina',
                'Marine life',
                '/imagenes/recomendaciones/buceo.jpeg',
                'Buceo en aguas cristalinas del Pacífico',
                'Diving in clear Pacific waters',
                'Tours desde la zona',
                'Tours from the area',
                'Medio día',
                'Half day',
                'Explora aguas cálidas y cristalinas con experiencias de snorkel o buceo. Es una gran forma de conocer el lado marino de la Bahía de Banderas.',
                'Explore warm, clear waters with snorkeling or diving experiences. It is a great way to discover the marine side of Banderas Bay.',
                [
                    self::section('Como vivirlo', 'How to enjoy it', [], [
                        self::text('Reserva con operadores certificados.', 'Book with certified operators.'),
                        self::text('Confirma si el tour incluye equipo.', 'Confirm whether equipment is included.'),
                        self::text('Lleva traje de baño, toalla y ropa ligera.', 'Bring a swimsuit, towel, and light clothing.'),
                    ]),
                    self::section('Ideal para', 'Ideal for', [
                        self::text('Viajeros que buscan una experiencia de agua más inmersiva y segura con acompanamiento profesional.', 'Travelers looking for a more immersive and safe water experience with professional support.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'pesca-deportiva',
                7,
                'Practica pesca deportiva',
                'Sport fishing',
                'Mar abierto',
                'Open ocean',
                '/imagenes/galeria/playa_13.jpg',
                'Mar abierto al atardecer',
                'Open ocean at sunset',
                'Salidas desde la bahía',
                'Departures from the bay',
                'Medio día',
                'Half day',
                'La pesca deportiva es una actividad clásica de la costa. Con el operador correcto puedes vivir una salida tranquila, segura y conectada con el mar.',
                'Sport fishing is a classic coastal activity. With the right operator, you can enjoy a calm, safe outing connected to the ocean.',
                [
                    self::section('Antes de reservar', 'Before booking', [], [
                        self::text('Pregunta por permisos, equipo y horarios disponibles.', 'Ask about permits, equipment, and available schedules.'),
                        self::text('Confirma el tamano de la embarcacion y el cupo.', 'Confirm the boat size and capacity.'),
                    ]),
                    self::section('Recomendaciones', 'Tips', [
                        self::text('Lleva agua, gorra, proteccion solar y pregunta si debes llevar alimentos ligeros.', 'Bring water, a hat, sun protection, and ask whether you should bring light snacks.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'caminatas',
                8,
                'Caminatas',
                'Walks',
                'Plan sencillo',
                'Easy plan',
                '/imagenes/galeria/playa_04.jpg',
                'Playa para caminar en Punta de Mita',
                'Beach for walking in Punta de Mita',
                'Muy cerca',
                'Very close',
                'Libre',
                'Flexible',
                'A veces el mejor plan es caminar sin prisa. La costa, las calles cercanas y los atardeceres hacen que un paseo sencillo se vuelva especial.',
                'Sometimes the best plan is an unhurried walk. The coast, nearby streets, and sunsets can turn a simple stroll into something special.',
                [
                    self::section('Como vivirlo', 'How to enjoy it', [], [
                        self::text('Sal con tiempo para encontrar un buen punto de vista.', 'Head out with enough time to find a good viewpoint.'),
                        self::text('Lleva ropa ligera y calzado comodo.', 'Wear light clothing and comfortable shoes.'),
                        self::text('Cierra el día con una cena cerca del mar.', 'End the day with dinner near the ocean.'),
                    ]),
                    self::section('Ideal para', 'Ideal for', [
                        self::text('Parejas, familias o viajeros que quieren bajar el ritmo y disfrutar el destino sin complicarse.', 'Couples, families, or travelers who want to slow down and enjoy the destination without overplanning.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'aventura-tierra',
                9,
                'Tirolesas, cuatrimotos y paseos a caballo',
                'Zip lines, ATVs, and horseback rides',
                'Aventura en tierra',
                'Land adventure',
                '/imagenes/galeria/playa_05-1.jpg',
                'Paisaje natural cerca de Punta de Mita',
                'Natural scenery near Punta de Mita',
                'Consulta traslados',
                'Ask about transportation',
                'Medio día',
                'Half day',
                'Si quieres cambiar de ritmo, hay actividades de aventura en tierra que combinan naturaleza, movimiento y vistas de la region.',
                'If you want a change of pace, land adventure activities combine nature, movement, and views of the region.',
                [
                    self::section('Opciones populares', 'Popular options', [], [
                        self::text('Tirolesas entre paisajes naturales.', 'Zip lines through natural landscapes.'),
                        self::text('Paseos en cuatrimoto o RZR.', 'ATV or RZR rides.'),
                        self::text('Paseos a caballo con guías locales.', 'Horseback rides with local guides.'),
                    ]),
                    self::section('Antes de salir', 'Before heading out', [
                        self::text('Confirma edad minima, seguros, horarios y tipo de traslado antes de reservar.', 'Confirm minimum age, insurance, schedules, and transportation details before booking.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'golf',
                10,
                'Golf',
                'Golf',
                'Deporte y paisaje',
                'Sport and scenery',
                '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
                'Paisaje costero en Punta de Mita',
                'Coastal scenery in Punta de Mita',
                'Consulta disponibilidad',
                'Ask about availability',
                'Medio día',
                'Half day',
                'La zona de Punta de Mita cuenta con opciones de golf reconocidas por su paisaje costero. Es un plan ideal para quienes buscan deporte y calma.',
                'The Punta de Mita area offers golf options known for coastal scenery. It is an ideal plan for travelers looking for sport and calm.',
                [
                    self::section('Para organizarlo', 'How to plan it', [], [
                        self::text('Pregunta por horarios de salida disponibles.', 'Ask about available tee times.'),
                        self::text('Consulta requisitos de vestimenta y renta de equipo.', 'Check dress code requirements and equipment rental.'),
                    ]),
                    self::section('Tip', 'Tip', [
                        self::text('Reserva con anticipación en temporada alta para encontrar mejores horarios.', 'Book in advance during high season to find better times.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'pueblos-cercanos',
                11,
                'Visita los pueblitos cercanos',
                'Visit nearby towns',
                'Cultura local',
                'Local culture',
                '/imagenes/galeria/playa-meson-punta-mita-05.jpg',
                'Costa de Riviera Nayarit',
                'Riviera Nayarit coast',
                'Desde 20 min',
                'From 20 min',
                'Medio día',
                'Half day',
                'Cerca de Punta de Mita hay pueblos costeros con comida, tiendas, playa y un ritmo distinto. Son buenos paseos para conocer más de la Riviera Nayarit.',
                'Near Punta de Mita there are coastal towns with food, shops, beaches, and a different rhythm. They are good outings for discovering more of Riviera Nayarit.',
                [
                    self::section('Plan recomendado', 'Recommended plan', [], [
                        self::text('Salir por la manana para caminar con menos calor.', 'Leave in the morning to walk with less heat.'),
                        self::text('Recorrer tiendas locales y espacios pequenos.', 'Visit local shops and small spots.'),
                        self::text('Comer algo casual antes de volver al hotel.', 'Have a casual meal before returning to the hotel.'),
                    ]),
                    self::section('Considera', 'Keep in mind', [
                        self::text('Cada pueblo tiene su propia energía. Pregunta en recepción cual encaja mejor con tu plan del día.', 'Each town has its own energy. Ask reception which one best fits your plan for the day.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'masaje',
                12,
                'Consentirte con un masaje',
                'Treat yourself to a massage',
                'Descanso',
                'Rest',
                '/imagenes/galeria/areas_comunes_03.jpg',
                'Área tranquila del Hotel Mesón de Mita',
                'Quiet area at Hotel Mesón de Mita',
                'En el hotel',
                'At the hotel',
                '1 hora',
                '1 hour',
                'Un masaje es una forma sencilla de pausar el viaje, relajar el cuerpo y volver a disfrutar la playa con más energía.',
                'A massage is an easy way to pause your trip, relax your body, and return to the beach with renewed energy.',
                [
                    self::section('Como reservar', 'How to book', [], [
                        self::text('Pregunta por horarios disponibles durante tu estancia.', 'Ask about available times during your stay.'),
                        self::text('Reserva con anticipación si viajas en fin de semana.', 'Book ahead if you are traveling on a weekend.'),
                    ]),
                    self::section('Ideal para', 'Ideal for', [
                        self::text('Viajeros que buscan descanso despues de actividades de playa, tours o caminatas.', 'Travelers looking to rest after beach activities, tours, or walks.'),
                    ], []),
                ],
            ),
            self::recommendation(
                'gastronomia-zona',
                13,
                'Prueba la gastronomia de la zona',
                'Try the local cuisine',
                'Sabores locales',
                'Local flavors',
                '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                'Playa frente al Hotel Mesón de Mita',
                'Beach in front of Hotel Mesón de Mita',
                'A unos pasos',
                'Steps away',
                'Libre',
                'Flexible',
                'La cocina de la zona combina mariscos, antojos mexicanos y restaurantes frente al mar. Es una parte esencial de disfrutar Punta de Mita.',
                'The local food scene combines seafood, Mexican favorites, and restaurants by the ocean. It is an essential part of enjoying Punta de Mita.',
                [
                    self::section('Que probar', 'What to try', [], [
                        self::text('Mariscos frescos y pescado del día.', 'Fresh seafood and catch of the day.'),
                        self::text('Opciones casuales cerca de El Anclote.', 'Casual options near El Anclote.'),
                        self::text('Una cena tranquila al atardecer.', 'A relaxed dinner at sunset.'),
                    ]),
                    self::section('Tip local', 'Local tip', [
                        self::text('Pregunta por recomendaciones actualizadas, ya que horarios y disponibilidad pueden cambiar por temporada.', 'Ask for updated recommendations, since hours and availability may change by season.'),
                    ], []),
                ],
            ),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $sections
     * @return array<string, mixed>
     */
    private static function recommendation(
        string $id,
        int $order,
        string $titleEs,
        string $titleEn,
        string $eyebrowEs,
        string $eyebrowEn,
        string $image,
        string $imageAltEs,
        string $imageAltEn,
        string $distanceEs,
        string $distanceEn,
        string $durationEs,
        string $durationEn,
        string $introEs,
        string $introEn,
        array $sections,
    ): array {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'title' => self::text($titleEs, $titleEn),
            'eyebrow' => self::text($eyebrowEs, $eyebrowEn),
            'image' => [
                'id' => $id.'-image',
                'type' => 'image',
                'src' => $image,
                'poster' => null,
                'alt' => self::text($imageAltEs, $imageAltEn),
            ],
            'distance' => self::text($distanceEs, $distanceEn),
            'duration' => self::text($durationEs, $durationEn),
            'intro' => self::text($introEs, $introEn),
            'sections' => $sections,
        ];
    }

    /**
     * @param  array<int, array{es: string, en: string}>  $paragraphs
     * @param  array<int, array{es: string, en: string}>  $bullets
     * @return array{title: array{es: string, en: string}, paragraphs: array<int, array{es: string, en: string}>, bullets: array<int, array{es: string, en: string}>}
     */
    private static function section(string $titleEs, string $titleEn, array $paragraphs, array $bullets): array
    {
        return [
            'title' => self::text($titleEs, $titleEn),
            'paragraphs' => $paragraphs,
            'bullets' => $bullets,
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

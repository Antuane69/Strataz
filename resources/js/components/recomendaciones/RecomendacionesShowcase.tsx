import { Drawer } from 'antd';
import { Clock, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import './recomendaciones.css';

type RecommendationSection = {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
};

type Recommendation = {
    id: string;
    title: string;
    eyebrow: string;
    image: string;
    imageAlt: string;
    distance: string;
    duration: string;
    intro: string;
    sections: RecommendationSection[];
};

const recommendations: Recommendation[] = [
    {
        id: 'islas-marietas',
        title: 'Visita las Islas Marietas',
        eyebrow: 'Naturaleza y snorkel',
        image: '/galeria/playa_13.jpg',
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
        title: 'Surf en Playa La Lancha',
        eyebrow: 'Olas tranquilas',
        image: '/galeria/playa_04.jpg',
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
        title: 'Camina por El Anclote',
        eyebrow: 'Restaurantes y playa',
        image: '/galeria/playa-meson-punta-mita-05.jpg',
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
        id: 'sayulita',
        title: 'Escapada a Sayulita',
        eyebrow: 'Color y pueblo surf',
        image: '/galeria/playa_05-1.jpg',
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
        id: 'ballenas',
        title: 'Avistamiento de ballenas',
        eyebrow: 'Temporada especial',
        image: '/galeria/playa-meson-punta-mita-012.jpg',
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
        id: 'atardecer',
        title: 'Atardecer en la playa',
        eyebrow: 'Plan sencillo',
        image: '/galeria/playa_13.jpg',
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

function RecommendationCard({
    recommendation,
    onSelect,
}: {
    recommendation: Recommendation;
    onSelect: (recommendation: Recommendation) => void;
}) {
    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(recommendation);
        }
    };

    return (
        <article
            className="recomendacion-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelect(recommendation)}
            onKeyDown={handleKeyDown}
            aria-label={`Ver recomendación: ${recommendation.title}`}
        >
            <div className="recomendacion-card-image-wrap">
                <img
                    src={recommendation.image}
                    alt={recommendation.imageAlt}
                    className="recomendacion-card-image"
                    loading="lazy"
                />
                <span>{recommendation.eyebrow}</span>
            </div>

            <div className="recomendacion-card-body">
                <h2>{recommendation.title}</h2>
            </div>
        </article>
    );
}

function RecommendationDrawer({
    recommendation,
    open,
    onClose,
}: {
    recommendation?: Recommendation;
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            width="min(720px, 100vw)"
            placement="right"
            destroyOnHidden
            closable={false}
            title={null}
            className="recomendacion-drawer"
            rootClassName="recomendacion-drawer-root"
        >
            {recommendation && (
                <div className="recomendacion-drawer-content">
                    <button
                        type="button"
                        className="recomendacion-drawer-close"
                        onClick={onClose}
                        aria-label="Cerrar recomendación"
                    >
                        <X size={20} />
                    </button>

                    <section
                        className="recomendacion-drawer-hero"
                        aria-label={recommendation.title}
                    >
                        <img
                            src={recommendation.image}
                            alt={recommendation.imageAlt}
                            className="recomendacion-drawer-image"
                        />
                    </section>

                    <section className="recomendacion-drawer-main">
                        <div className="recomendacion-drawer-title">
                            <p>{recommendation.eyebrow}</p>
                            <h2>{recommendation.title}</h2>
                        </div>

                        <div className="recomendacion-meta">
                            <span>
                                <MapPin size={18} />
                                {recommendation.distance}
                            </span>
                            <span>
                                <Clock size={18} />
                                {recommendation.duration}
                            </span>
                        </div>

                        <p className="recomendacion-intro">
                            {recommendation.intro}
                        </p>

                        <div className="recomendacion-sections">
                            {recommendation.sections.map((section) => (
                                <div
                                    key={section.title}
                                    className="recomendacion-section"
                                >
                                    <h3>{section.title}</h3>

                                    {section.paragraphs?.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}

                                    {section.bullets && (
                                        <ul>
                                            {section.bullets.map((bullet) => (
                                                <li key={bullet}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </Drawer>
    );
}

export default function RecomendacionesShowcase() {
    const [selectedRecommendation, setSelectedRecommendation] = useState<
        Recommendation | undefined
    >();

    return (
        <section className="recomendaciones-section">
            <div className="recomendaciones-intro">
                <p>Recomendaciones</p>
                <h1>Qué hacer cerca de Punta de Mita</h1>
                <span>
                    Planes sencillos para descubrir mar, pueblos cercanos y
                    rincones naturales durante tu estancia.
                </span>
            </div>

            <div className="recomendaciones-grid">
                {recommendations.map((recommendation) => (
                    <RecommendationCard
                        key={recommendation.id}
                        recommendation={recommendation}
                        onSelect={setSelectedRecommendation}
                    />
                ))}
            </div>

            <RecommendationDrawer
                recommendation={selectedRecommendation}
                open={Boolean(selectedRecommendation)}
                onClose={() => setSelectedRecommendation(undefined)}
            />
        </section>
    );
}

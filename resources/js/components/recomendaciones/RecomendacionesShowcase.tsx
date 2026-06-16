import { Drawer } from 'antd';
import { Clock, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Recommendation } from './interfaces';
import { recommendations } from './services/recomendacionesMock';

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
                {/* <span>{recommendation.eyebrow}</span> */}
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
                {/* <p>Recomendaciones</p> */}
                <h1>Recomendaciones</h1>
                <span>
                  Punta de Mita es un pueblito bastante pequeño, pero con mucho encanto, te enamoraras de su playa y sus hermosos atardeceres. En Hotel Mesón de Mita queremos asegurarnos de que durante tu estancia aproveches al máximo de todos los atractivos disponibles en la zona y vivas unas vacaciones llenas de bonitas experiencias.
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

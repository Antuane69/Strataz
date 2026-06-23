import { Drawer } from 'antd';
import { Clock, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type {
    Recommendation,
    RecomendacionesPageContent,
} from './interfaces';
import { mapRecomendacionesContent } from './services/mapRecomendacionesContent';

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
            aria-label={`Ver recomendacion: ${recommendation.title}`}
        >
            <div className="recomendacion-card-image-wrap">
                <img
                    src={recommendation.image}
                    alt={recommendation.imageAlt}
                    className="recomendacion-card-image"
                    loading="lazy"
                />
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
    scoped = false,
    getDrawerContainer,
}: {
    recommendation?: Recommendation;
    open: boolean;
    onClose: () => void;
    scoped?: boolean;
    getDrawerContainer?: () => HTMLElement | null;
}) {
    const drawerContainer = scoped ? getDrawerContainer?.() : undefined;

    return (
        <Drawer
            open={open}
            onClose={onClose}
            width={scoped ? 'min(560px, 100%)' : 'min(720px, 100vw)'}
            placement="right"
            destroyOnHidden
            getContainer={scoped ? drawerContainer ?? false : undefined}
            rootStyle={scoped ? { position: 'absolute' } : undefined}
            maskStyle={scoped ? { position: 'absolute' } : undefined}
            closable={false}
            title={null}
            className={`recomendacion-drawer ${
                scoped ? 'recomendacion-drawer-scoped' : ''
            }`}
            rootClassName={`recomendacion-drawer-root ${
                scoped ? 'recomendacion-drawer-root-scoped' : ''
            }`}
        >
            {recommendation && (
                <div className="recomendacion-drawer-content">
                    <button
                        type="button"
                        className="recomendacion-drawer-close"
                        onClick={onClose}
                        aria-label="Cerrar recomendacion"
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

                                    {section.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}

                                    {section.bullets.length > 0 && (
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

type RecomendacionesShowcaseProps = {
    content?: RecomendacionesPageContent | null;
    locale?: string | null;
    drawerScope?: 'page' | 'preview';
    getDrawerContainer?: () => HTMLElement | null;
    onDrawerOpenChange?: (open: boolean) => void;
};

export default function RecomendacionesShowcase({
    content,
    locale,
    drawerScope = 'page',
    getDrawerContainer,
    onDrawerOpenChange,
}: RecomendacionesShowcaseProps) {
    const [selectedRecommendation, setSelectedRecommendation] = useState<
        Recommendation | undefined
    >();
    const mappedContent = mapRecomendacionesContent(content, locale);
    const isDrawerOpen = Boolean(selectedRecommendation);

    useEffect(() => {
        onDrawerOpenChange?.(isDrawerOpen);

        return () => {
            onDrawerOpenChange?.(false);
        };
    }, [isDrawerOpen, onDrawerOpenChange]);

    return (
        <section className="recomendaciones-section">
            <div className="recomendaciones-intro">
                <h1>{mappedContent.text.intro_title}</h1>
                <span>{mappedContent.text.intro_body}</span>
            </div>

            <div className="recomendaciones-grid">
                {mappedContent.recommendations.map((recommendation) => (
                    <RecommendationCard
                        key={recommendation.id}
                        recommendation={recommendation}
                        onSelect={setSelectedRecommendation}
                    />
                ))}
            </div>

            <RecommendationDrawer
                recommendation={selectedRecommendation}
                open={isDrawerOpen}
                onClose={() => setSelectedRecommendation(undefined)}
                scoped={drawerScope === 'preview'}
                getDrawerContainer={getDrawerContainer}
            />
        </section>
    );
}

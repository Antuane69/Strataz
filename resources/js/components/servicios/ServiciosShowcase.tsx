import { Carousel, Image, Tag } from 'antd';
import {
    CarFront,
    ConciergeBell,
    Fish,
    Gem,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Utensils,
    Volleyball,
    Waves,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import type { Servicio, ServicioIcon, ServicioMedia, ServiciosPageContent, ServicioTrustIcon } from './interfaces';
import { mapServiciosContent } from './services/mapServiciosContent';

const serviceIcons: Record<ServicioIcon, ComponentType<{ size?: number }>> = {
    pool: Waves,
    parking: CarFront,
    shop: ShoppingBag,
    beach: Sparkles,
    sports: Volleyball,
    food: Utensils,
    fish: Fish,
    sparks: Sparkles,
    boda: Gem,
    consierge: ConciergeBell,
};

const trustIcons: Record<ServicioTrustIcon, ComponentType<{ size?: number }>> = {
    shield: ShieldCheck,
    pool: Waves,
    shop: ShoppingBag,
};

function ServicioMediaItem({
    media,
    className,
    controls = false,
}: {
    media: ServicioMedia;
    className: string;
    controls?: boolean;
}) {
    if (media.type === 'video') {
        return (
            <video
                className={className}
                src={media.src}
                poster={media.poster ?? undefined}
                autoPlay={!controls}
                muted={!controls}
                loop={!controls}
                playsInline
                preload="metadata"
                controls={controls}
            />
        );
    }

    return (
        <img
            src={media.src}
            alt={media.alt}
            className={className}
            loading="lazy"
        />
    );
}

function ServicioDescription({ value }: { value: string }) {
    const lines = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    const bulletLines = lines.filter((line) => line.startsWith('- '));
    const textLines = lines.filter((line) => !line.startsWith('- '));

    return (
        <>
            {textLines.map((line) => (
                <p key={line}>{line}</p>
            ))}

            {bulletLines.length > 0 && (
                <ul>
                    {bulletLines.map((line) => (
                        <li key={line}>{line.replace(/^- /, '')}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

function ServicioCard({
    servicio,
    onPreview,
}: {
    servicio: Servicio;
    onPreview: (servicio: Servicio, mediaIndex: number) => void;
}) {
    const Icon = serviceIcons[servicio.icon];

    return (
        <article
            className="servicio-card"
            style={{ '--servicio-accent': servicio.accent } as CSSProperties}
        >
            <div className="servicio-media-panel">
                <Carousel
                    arrows
                    autoplay
                    autoplaySpeed={5200}
                    draggable
                    className="servicio-carousel"
                >
                    {servicio.media.map((media, mediaIndex) => (
                        <div key={`${servicio.id}-${media.src}`}>
                            <button
                                type="button"
                                className="servicio-media-button"
                                onClick={() => onPreview(servicio, mediaIndex)}
                                aria-label={`Ver ${media.alt}`}
                            >
                                <ServicioMediaItem
                                    media={media}
                                    className="servicio-media"
                                />
                            </button>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="servicio-card-content">
                <div className="servicio-card-heading">
                    <span className="servicio-icon">
                        <Icon size={22} />
                    </span>
                    <div>
                        <p>{servicio.eyebrow}</p>
                        <h2>{servicio.name}</h2>
                    </div>
                </div>

                <div className="servicio-description">
                    <ServicioDescription value={servicio.description} />
                </div>

                <div
                    className="servicio-tags"
                    aria-label="Detalles del servicio"
                >
                    {servicio.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            </div>
        </article>
    );
}

type ServiciosShowcaseProps = {
  content?: ServiciosPageContent | null;
  locale?: string | null;
};

export default function ServiciosShowcase({ content, locale }: ServiciosShowcaseProps = {}) {
    const [previewServicio, setPreviewServicio] = useState<
        Servicio | undefined
    >();
    const [previewIndex, setPreviewIndex] = useState(0);
    const { servicios, text, trustItems } = mapServiciosContent(content, locale);

    const openPreview = (servicio: Servicio, mediaIndex: number) => {
        setPreviewServicio(servicio);
        setPreviewIndex(mediaIndex);
    };

    const previewItems =
        previewServicio?.media.map((media) => ({
            src:
                media.type === 'video'
                    ? (media.poster ?? media.src)
                    : media.src,
            alt: media.alt,
        })) ?? [];

    return (
        <Image.PreviewGroup
            items={previewItems}
            preview={{
                open: Boolean(previewServicio),
                current: previewIndex,
                onOpenChange: (isOpen) => {
                    if (!isOpen) {
                        setPreviewServicio(undefined);
                    }
                },
                onChange: (current) => setPreviewIndex(current),
                imageRender: (originalNode, { current }) => {
                    const media = previewServicio?.media[current];

                    if (!media || media.type === 'image') {
                        return originalNode;
                    }

                    return (
                        <video
                            key={`${previewServicio.id}-${media.src}-${current}`}
                            className="servicio-preview-media"
                            src={media.src}
                            poster={media.poster ?? undefined}
                            controls
                            autoPlay
                            playsInline
                            preload="metadata"
                        />
                    );
                },
            }}
        >
            <section className="servicios-section">
                <div className="servicios-intro">
                    <h1>{text.intro_title}</h1>
                    <span>{text.intro_body}</span>
                </div>

                <div
                    className="servicios-trust-row"
                    aria-label="Resumen de servicios"
                >
                    {trustItems.map((item) => {
                        const Icon = trustIcons[item.icon];

                        return (
                            <span key={`${item.icon}-${item.label}`}>
                                <Icon size={18} />
                                {item.label}
                            </span>
                        );
                    })}
                </div>

                <div className="servicios-grid">
                    {servicios.map((servicio) => (
                        <ServicioCard
                            key={servicio.id}
                            servicio={servicio}
                            onPreview={openPreview}
                        />
                    ))}
                </div>
            </section>
        </Image.PreviewGroup>
    );
}

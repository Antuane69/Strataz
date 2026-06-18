import { Carousel, Image, Tag } from 'antd';
import {
    CarFront,
    Fish,
    Gift,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Utensils,
    Volleyball,
    Waves,
    Gem,
    ConciergeBell
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import type { Servicio, ServicioIcon, ServicioMedia } from './interfaces';
import { serviciosMock } from './services/servicesMock';

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
    consierge: ConciergeBell
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
                poster={media.poster}
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
                                {/* <span className="servicio-media-overlay">
                                    {media.type === 'video' ? (
                                        <Play size={18} />
                                    ) : (
                                        <ImageIcon size={18} />
                                    )}
                                    Ver{' '}
                                    {media.type === 'video'
                                        ? 'video'
                                        : 'imagen'}
                                </span> */}
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
                    {servicio.description}
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

export default function ServiciosShowcase() {
    const [previewServicio, setPreviewServicio] = useState<
        Servicio | undefined
    >();
    const [previewIndex, setPreviewIndex] = useState(0);

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
                            poster={media.poster}
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
                    {/* <p>Servicios</p> */}
                    <h1>Servicios</h1>
                    <span>
                        Amenidades sencillas, útiles y pensadas para que tu
                        estancia se sienta cómoda desde que llegas.
                    </span>
                </div>

                <div
                    className="servicios-trust-row"
                    aria-label="Resumen de servicios"
                >
                    <span>
                        <ShieldCheck size={18} />
                        Estacionamiento privado
                    </span>
                    <span>
                        <Waves size={18} />
                        Alberca junto al mar
                    </span>
                    <span>
                        <Gift size={18} />
                        Souvenirs y artesanías
                    </span>
                </div>

                <div className="servicios-grid">
                    {serviciosMock.map((servicio) => (
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

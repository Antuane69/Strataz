import { Button, Carousel, Modal, Tag } from 'antd';
import {
    CarFront,
    ChevronRight,
    Gift,
    Image as ImageIcon,
    Play,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Waves,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';

type ServicioIcon = 'pool' | 'parking' | 'shop' | 'beach';

type ServicioMedia = {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
};

type Servicio = {
    id: string;
    name: string;
    eyebrow: string;
    description: string;
    icon: ServicioIcon;
    accent: string;
    tags: string[];
    media: ServicioMedia[];
};

const serviceIcons: Record<ServicioIcon, ComponentType<{ size?: number }>> = {
    pool: Waves,
    parking: CarFront,
    shop: ShoppingBag,
    beach: Sparkles,
};

const servicios: Servicio[] = [
    {
        id: 'alberca',
        name: 'Alberca junto al mar',
        eyebrow: 'Relajación',
        description:
            'Contamos con alberca junto al mar, desde donde podrás disfrutar de la paz y tranquilidad de nuestras instalaciones.',
        icon: 'pool',
        accent: '#1f6f79',
        tags: ['Vista al mar', 'Camastros', 'Ambiente tranquilo'],
        media: [
            {
                type: 'image',
                src: '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
                alt: 'Alberca del hotel frente al mar',
            },
            {
                type: 'image',
                src: '/imagenes/galeria/alberca-punta-de-mita-02.jpg',
                alt: 'Camastros junto a la alberca',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/galeria/dashboard.jpg',
                alt: 'Video de prueba de la alberca',
            },
        ],
    },
    {
        id: 'estacionamiento',
        name: 'Estacionamiento',
        eyebrow: 'Comodidad',
        description:
            'El hotel cuenta con área de estacionamiento privado gratuito las 24 horas del día. Recomendamos confirmar disponibilidad del servicio.',
        icon: 'parking',
        accent: '#8a4b22',
        tags: ['Privado', '24 horas', 'Sin costo'],
        media: [
            {
                type: 'image',
                src: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Área de recepción del hotel',
            },
            {
                type: 'image',
                src: '/imagenes/galeria/playa_05-1.jpg',
                alt: 'Exterior del hotel en Punta de Mita',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Video de prueba del estacionamiento',
            },
        ],
    },
    {
        id: 'tienda-artesanias',
        name: 'Tienda de artesanías',
        eyebrow: 'Detalles locales',
        description:
            'En la parte frontal del hotel encontrarás una tienda de artesanías para adquirir pequeños souvenirs que recuerden tu estancia.',
        icon: 'shop',
        accent: '#a33f1d',
        tags: ['Souvenirs', 'Artesanías', 'Regalos'],
        media: [
            {
                type: 'image',
                src: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Pasillo y área frontal del hotel',
            },
            {
                type: 'image',
                src: '/imagenes/galeria/bodas-Punta-Mita-Hotel-Meson-Mita.jpg',
                alt: 'Detalles del hotel en Punta de Mita',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Video de prueba de tienda de artesanías',
            },
        ],
    },
    {
        id: 'playa',
        name: 'Playa a unos pasos',
        eyebrow: 'Punta de Mita',
        description:
            'Disfruta la cercanía con la playa para caminar, descansar bajo las palmeras y vivir el ritmo tranquilo de la bahía.',
        icon: 'beach',
        accent: '#235d48',
        tags: ['Caminatas', 'Palmeras', 'Bahía'],
        media: [
            {
                type: 'image',
                src: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                alt: 'Playa cerca del hotel',
            },
            {
                type: 'image',
                src: '/imagenes/galeria/playa_13.jpg',
                alt: 'Vista del mar en Punta de Mita',
            },
            {
                type: 'video',
                src: '/videos/video_prueba1.mp4',
                poster: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                alt: 'Video de prueba de playa',
            },
        ],
    },
];

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
                                <span className="servicio-media-overlay">
                                    {media.type === 'video' ? (
                                        <Play size={18} />
                                    ) : (
                                        <ImageIcon size={18} />
                                    )}
                                    Ver{' '}
                                    {media.type === 'video'
                                        ? 'video'
                                        : 'imagen'}
                                </span>
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

                <p className="servicio-description">{servicio.description}</p>

                <div
                    className="servicio-tags"
                    aria-label="Detalles del servicio"
                >
                    {servicio.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>

                <Button
                    type="text"
                    className="servicio-preview-action"
                    onClick={() => onPreview(servicio, 0)}
                    icon={<ChevronRight size={17} />}
                    iconPosition="end"
                >
                    Ver galería
                </Button>
            </div>
        </article>
    );
}

function ServicioPreview({
    servicio,
    initialIndex,
    onClose,
}: {
    servicio?: Servicio;
    initialIndex: number;
    onClose: () => void;
}) {
    return (
        <Modal
            open={Boolean(servicio)}
            onCancel={onClose}
            footer={null}
            centered
            width="min(960px, calc(100vw - 32px))"
            className="servicio-preview-modal"
            destroyOnHidden
        >
            {servicio && (
                <div className="servicio-preview">
                    <div className="servicio-preview-title">
                        <p>{servicio.eyebrow}</p>
                        <h2>{servicio.name}</h2>
                    </div>

                    <Carousel
                        arrows
                        draggable
                        initialSlide={initialIndex}
                        className="servicio-preview-carousel"
                    >
                        {servicio.media.map((media) => (
                            <div key={`preview-${servicio.id}-${media.src}`}>
                                <ServicioMediaItem
                                    media={media}
                                    className="servicio-preview-media"
                                    controls={media.type === 'video'}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
        </Modal>
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

    return (
        <section className="servicios-section">
            <div className="servicios-intro">
                <p>Servicios</p>
                <h1>Todo listo para disfrutar Punta de Mita</h1>
                <span>
                    Amenidades sencillas, útiles y pensadas para que tu estancia
                    se sienta cómoda desde que llegas.
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
                {servicios.map((servicio) => (
                    <ServicioCard
                        key={servicio.id}
                        servicio={servicio}
                        onPreview={openPreview}
                    />
                ))}
            </div>

            <ServicioPreview
                servicio={previewServicio}
                initialIndex={previewIndex}
                onClose={() => setPreviewServicio(undefined)}
            />
        </section>
    );
}

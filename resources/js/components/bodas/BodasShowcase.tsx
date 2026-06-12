import { Button, Carousel, Drawer, Form, Input, Modal } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import {
    CalendarHeart,
    Image as ImageIcon,
    Mail,
    MessageCircle,
    Phone,
    Play,
    Sparkles,
    UserRound,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type BodasMedia = {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
    label: string;
};

const bodasMedia: BodasMedia[] = [
    {
        type: 'image',
        src: '/imagenes/galeria/bodas-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Pareja de novios caminando frente al mar',
        label: 'Ceremonias frente al mar',
    },
    {
        type: 'image',
        src: '/imagenes/galeria/musica-Bodas-Playa-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Recepción de boda con música en vivo',
        label: 'Recepciones al atardecer',
    },
    {
        type: 'image',
        src: '/imagenes/galeria/punta-Mita-Weddings-Catering-Hotel-Meson-Mita-1.jpg',
        alt: 'Catering para boda en Punta de Mita',
        label: 'Menús para tus invitados',
    },
    {
        type: 'video',
        src: '/videos/video_prueba1.mp4',
        poster: '/imagenes/galeria/musica-Bodas-Playa-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Video de prueba para bodas en el hotel',
        label: 'Momentos en movimiento',
    },
];

const bodasBackgroundPath = '/imagenes/galeria/background.webp';

function BodasMediaItem({
    media,
    active = false,
    paused = false,
    className,
    controls = false,
    onVideoEnded,
}: {
    media: BodasMedia;
    active?: boolean;
    paused?: boolean;
    className: string;
    controls?: boolean;
    onVideoEnded?: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (media.type !== 'video' || controls) {
            return;
        }

        const video = videoRef.current;

        if (!video) {
            return;
        }

        if (!active || paused) {
            video.pause();
            video.currentTime = 0;

            return;
        }

        video.currentTime = 0;

        void video.play().catch(() => undefined);
    }, [active, controls, media.src, media.type, paused]);

    if (media.type === 'video') {
        return (
            <video
                ref={videoRef}
                className={className}
                src={media.src}
                poster={media.poster}
                muted={!controls}
                playsInline
                preload="metadata"
                controls={controls}
                onEnded={onVideoEnded}
                onError={onVideoEnded}
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

function BodasCarousel({
    paused,
    onPreview,
}: {
    paused: boolean;
    onPreview: (index: number) => void;
}) {
    const carouselRef = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeMedia = bodasMedia[currentSlide];

    useEffect(() => {
        if (paused || activeMedia.type === 'video') {
            return;
        }

        const timer = window.setTimeout(() => {
            carouselRef.current?.next();
        }, 5800);

        return () => window.clearTimeout(timer);
    }, [activeMedia.type, currentSlide, paused]);

    const goNext = () => {
        carouselRef.current?.next();
    };

    return (
        <div className="bodas-carousel-card">
            <Carousel
                ref={carouselRef}
                arrows
                draggable
                afterChange={setCurrentSlide}
                className="bodas-carousel"
            >
                {bodasMedia.map((media, index) => (
                    <div key={`${media.type}-${media.src}`}>
                        <button
                            type="button"
                            className="bodas-media-button"
                            onClick={() => onPreview(index)}
                            aria-label={`Ver ${media.alt}`}
                        >
                            <BodasMediaItem
                                media={media}
                                active={index === currentSlide}
                                paused={paused}
                                className="bodas-media"
                                onVideoEnded={goNext}
                            />
                            <span className="bodas-media-label">
                                {media.type === 'video' ? (
                                    <Play size={17} />
                                ) : (
                                    <ImageIcon size={17} />
                                )}
                                {media.label}
                            </span>
                        </button>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

function BodasPreview({
    initialIndex,
    open,
    onClose,
}: {
    initialIndex: number;
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width="min(980px, calc(100vw - 32px))"
            className="bodas-preview-modal"
            destroyOnHidden
        >
            <Carousel
                arrows
                draggable
                initialSlide={initialIndex}
                className="bodas-preview-carousel"
            >
                {bodasMedia.map((media) => (
                    <div key={`preview-${media.src}`}>
                        <BodasMediaItem
                            media={media}
                            className="bodas-preview-media"
                            controls={media.type === 'video'}
                        />
                    </div>
                ))}
            </Carousel>
        </Modal>
    );
}

function BodasReservaDrawer({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            width="min(520px, 100vw)"
            placement="right"
            className="bodas-reserva-drawer"
            title={null}
            destroyOnHidden
        >
            <div className="bodas-form-intro">
                <p>Reserva tu fecha</p>
                <h2>Cuéntanos sobre tu boda</h2>
                <span>
                    Déjanos tus datos y el primer boceto de tu celebración. Este
                    formulario es visual por ahora.
                </span>
            </div>

            <Form layout="vertical" className="bodas-form" requiredMark={false}>
                <Form.Item label="Nombre">
                    <Input
                        size="large"
                        prefix={<UserRound size={18} />}
                        placeholder="Tu nombre"
                    />
                </Form.Item>

                <Form.Item label="Correo">
                    <Input
                        size="large"
                        prefix={<Mail size={18} />}
                        placeholder="correo@ejemplo.com"
                    />
                </Form.Item>

                <Form.Item label="Teléfono">
                    <Input
                        size="large"
                        prefix={<Phone size={18} />}
                        placeholder="+52"
                    />
                </Form.Item>

                <Form.Item label="Mensaje">
                    <Input.TextArea
                        rows={5}
                        size="large"
                        placeholder="Cuéntanos fecha tentativa, número de invitados o el estilo que imaginas."
                    />
                </Form.Item>

                <Button type="primary" size="large" block htmlType="button">
                    Enviar solicitud
                </Button>
            </Form>
        </Drawer>
    );
}

export default function BodasShowcase() {
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openPreview = (index: number) => {
        setPreviewIndex(index);
        setIsPreviewOpen(true);
    };

    return (
        <section className="bodas-section">
            <div className="bodas-background" aria-hidden="true">
                <img
                    src={bodasBackgroundPath}
                    alt=""
                    className="bodas-background-image"
                />
            </div>

            <div className="bodas-shell">
                <div className="bodas-copy">
                    <p className="bodas-kicker">
                        <Sparkles size={18} />
                        Celebraciones frente al mar
                    </p>

                    <h1>
                        Bodas en la playa, Hotel en Punta de Mita.
                        <span>Haz realidad la celebración de tus sueños.</span>
                    </h1>

                    <p className="bodas-description">
                        Ponemos a tu disposición un coordinador de bodas
                        personal, quien se encargará de que todo luzca como
                        siempre has soñado, desde organización, decoración y
                        selección del menú que deleitará a tus invitados. Conoce
                        nuestros paquetes o personaliza tu evento perfecto.
                    </p>

                    <div
                        className="bodas-highlights"
                        aria-label="Servicios para bodas"
                    >
                        <span>
                            <CalendarHeart size={18} />
                            Coordinación personal
                        </span>
                        <span>
                            <MessageCircle size={18} />
                            Evento personalizado
                        </span>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        className="bodas-reservar-button"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        RESERVAR
                    </Button>
                </div>

                <BodasCarousel paused={isPreviewOpen} onPreview={openPreview} />
            </div>

            <BodasPreview
                initialIndex={previewIndex}
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />

            <BodasReservaDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </section>
    );
}

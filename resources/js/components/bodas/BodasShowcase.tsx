import { Button, Carousel, Drawer, Form, Image, Input } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import {
    CalendarHeart,
    Image as ImageIcon,
    Mail,
    MessageCircle,
    Phone,
    Play,
    UserRound,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import type { BodasHighlightIcon, BodasMedia, BodasPageContent, BodasPageText } from './interfaces';
import { mapBodasContent } from './services/mapBodasContent';

const highlightIcons: Record<BodasHighlightIcon, ComponentType<{ size?: number }>> = {
    'calendar-heart': CalendarHeart,
    'message-circle': MessageCircle,
};

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
                poster={media.poster ?? undefined}
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
    mediaItems,
    paused,
    onPreview,
}: {
    mediaItems: BodasMedia[];
    paused: boolean;
    onPreview: (index: number) => void;
}) {
    const carouselRef = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeMedia = mediaItems[currentSlide] ?? mediaItems[0];

    useEffect(() => {
        if (!activeMedia || paused || activeMedia.type === 'video') {
            return;
        }

        const timer = window.setTimeout(() => {
            carouselRef.current?.next();
        }, 5800);

        return () => window.clearTimeout(timer);
    }, [activeMedia, currentSlide, paused]);

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
                {mediaItems.map((media, index) => (
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

function BodasReservaDrawer({
    open,
    onClose,
    text,
}: {
    open: boolean;
    onClose: () => void;
    text: BodasPageText;
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
                <p>{text.drawer_kicker}</p>
                <h2>{text.drawer_title}</h2>
                <span>{text.drawer_description}</span>
            </div>

            <Form layout="vertical" className="bodas-form" requiredMark={false}>
                <Form.Item label={text.name_label}>
                    <Input
                        size="large"
                        prefix={<UserRound size={18} />}
                        placeholder={text.name_placeholder}
                    />
                </Form.Item>

                <Form.Item label={text.email_label}>
                    <Input
                        size="large"
                        prefix={<Mail size={18} />}
                        placeholder={text.email_placeholder}
                    />
                </Form.Item>

                <Form.Item label={text.phone_label}>
                    <Input
                        size="large"
                        prefix={<Phone size={18} />}
                        placeholder={text.phone_placeholder}
                    />
                </Form.Item>

                <Form.Item label={text.message_label}>
                    <Input.TextArea
                        rows={5}
                        size="large"
                        placeholder={text.message_placeholder}
                    />
                </Form.Item>

                <Button type="primary" size="large" block htmlType="button">
                    {text.submit_label}
                </Button>
            </Form>
        </Drawer>
    );
}

type BodasShowcaseProps = {
  content?: BodasPageContent | null;
  locale?: string | null;
};

export default function BodasShowcase({ content, locale }: BodasShowcaseProps = {}) {
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { background, highlights, media, text } = mapBodasContent(content, locale);

    const openPreview = (index: number) => {
        setPreviewIndex(index);
        setIsPreviewOpen(true);
    };

    const previewItems = media.map((item) => ({
        src: item.type === 'video' ? (item.poster ?? item.src) : item.src,
        alt: item.alt,
    }));

    return (
        <Image.PreviewGroup
            items={previewItems}
            preview={{
                open: isPreviewOpen,
                current: previewIndex,
                onOpenChange: (isOpen) => setIsPreviewOpen(isOpen),
                onChange: (current) => setPreviewIndex(current),
                imageRender: (originalNode, { current }) => {
                    const item = media[current];

                    if (!item || item.type === 'image') {
                        return originalNode;
                    }

                    return (
                        <video
                            key={`${item.src}-${current}`}
                            className="bodas-preview-media"
                            src={item.src}
                            poster={item.poster ?? undefined}
                            controls
                            autoPlay
                            playsInline
                            preload="metadata"
                        />
                    );
                },
            }}
        >
            <section className="bodas-section">
                <div className="bodas-background" aria-hidden="true">
                    {background.type === 'video' ? (
                        <video
                            src={background.src}
                            poster={background.poster ?? undefined}
                            className="bodas-background-image"
                            muted
                            loop
                            autoPlay
                            playsInline
                        />
                    ) : (
                        <img
                            src={background.src}
                            alt={background.alt}
                            className="bodas-background-image"
                        />
                    )}
                </div>

                <div className="bodas-shell">
                    <div className="bodas-copy">
                        <h1>
                            {text.hero_title}
                            <span>{text.hero_subtitle}</span>
                        </h1>

                        <p className="bodas-description">
                            {text.hero_description}
                        </p>

                        <div
                            className="bodas-highlights"
                            aria-label="Servicios para bodas"
                        >
                            {highlights.map((highlight) => {
                                const Icon = highlightIcons[highlight.icon];

                                return (
                                    <span key={`${highlight.icon}-${highlight.label}`}>
                                        <Icon size={18} />
                                        {highlight.label}
                                    </span>
                                );
                            })}
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            className="bodas-reservar-button"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            {text.reserve_cta}
                        </Button>
                    </div>

                    <BodasCarousel
                        mediaItems={media}
                        paused={isPreviewOpen}
                        onPreview={openPreview}
                    />
                </div>

                <BodasReservaDrawer
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    text={text}
                />
            </section>
        </Image.PreviewGroup>
    );
}

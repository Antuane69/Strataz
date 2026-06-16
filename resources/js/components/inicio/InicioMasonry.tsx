import { Link } from '@inertiajs/react';
import { Masonry } from 'antd';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
    bodas,
    galeria,
    habitaciones,
    promociones,
    recomendaciones,
    servicios,
} from '@/routes/public';

type MasonryVariant = 'normal' | 'wide' | 'tall' | 'feature';

type HomeAccessCard = {
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    image: string;
    alt: string;
    href: ReturnType<typeof habitaciones>;
    variant: MasonryVariant;
    accent: string;
    cta: string;
};

const accessCards: HomeAccessCard[] = [
    {
        id: 'habitaciones',
        title: 'Habitaciones',
        eyebrow: 'Descanso',
        description:
            'Espacios comodos para parejas, familias y grupos que quieren despertar cerca del mar.',
        image: '/imagenes/habitaciones/habitacion_doble_mar.jpg',
        alt: 'Habitacion con vista al mar del Hotel Meson de Mita',
        href: habitaciones(),
        variant: 'feature',
        accent: '#1f6f79',
        cta: 'Ver habitaciones',
    },
    {
        id: 'servicios',
        title: 'Servicios',
        eyebrow: 'Comodidad',
        description:
            'Alberca, estacionamiento, playa cercana y detalles utiles para una estancia tranquila.',
        image: '/imagenes/servicios/alberca_1.jpg',
        alt: 'Alberca y servicios del Hotel Meson de Mita',
        href: servicios(),
        variant: 'normal',
        accent: '#235d48',
        cta: 'Explorar servicios',
    },
    {
        id: 'promociones',
        title: 'Promociones',
        eyebrow: 'Reserva directa',
        description:
            'Beneficios de temporada y paquetes para escapadas de playa, parejas y familias.',
        image: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
        alt: 'Playa frente al Hotel Meson de Mita',
        href: promociones(),
        variant: 'wide',
        accent: '#d55c01',
        cta: 'Ver promociones',
    },
    {
        id: 'bodas',
        title: 'Bodas',
        eyebrow: 'Frente al mar',
        description:
            'Celebraciones intimas con ambiente costero, apoyo de coordinacion y escenarios naturales.',
        image: '/imagenes/bodas/bodas_1.jpg',
        alt: 'Boda en la playa en Hotel Meson de Mita',
        href: bodas(),
        variant: 'tall',
        accent: '#8a3d65',
        cta: 'Planear boda',
    },
    {
        id: 'recomendaciones',
        title: 'Recomendaciones',
        eyebrow: 'Punta de Mita',
        description:
            'Playas, Islas Marietas, surf y experiencias cercanas para vivir mas alla del hotel.',
        image: '/imagenes/recomendaciones/marietas_1.jpg',
        alt: 'Islas Marietas cerca de Punta de Mita',
        href: recomendaciones(),
        variant: 'normal',
        accent: '#1f5f65',
        cta: 'Descubrir la zona',
    },
    {
        id: 'galeria',
        title: 'Galeria',
        eyebrow: 'Instalaciones',
        description:
            'Un recorrido visual por playa, habitaciones, alberca, rincones del hotel y eventos.',
        image: '/imagenes/galeria/dashboard.jpg',
        alt: 'Vista general del Hotel Meson de Mita',
        href: galeria(),
        variant: 'wide',
        accent: '#832a19',
        cta: 'Abrir galeria',
    },
];

export default function InicioMasonry() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const playVideo = () => {
            video.muted = true;
            void video.play().catch(() => undefined);
        };

        if (!('IntersectionObserver' in window)) {
            playVideo();

            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    playVideo();

                    return;
                }

                video.pause();
            },
            { threshold: 0.38 },
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="inicio-masonry-section">
            <div className="inicio-masonry-intro">
                <p>Tu estancia empieza aqui</p>
                <h2>Explora Meson de Mita</h2>
                <span>
                    Elige el camino que quieres tomar: descansar frente al mar,
                    descubrir servicios, revisar promociones o imaginar tu
                    celebracion en la playa.
                </span>
            </div>

            <Masonry
                columns={{ xs: 1, sm: 2, lg: 3 }}
                gutter={[22, 22]}
                className="inicio-masonry"
                items={accessCards.map((card) => ({
                    key: card.id,
                    data: card,
                }))}
                itemRender={({ data }) => (
                    <Link
                        href={data.href}
                        className="inicio-access-link"
                        aria-label={`Ir a ${data.title}`}
                    >
                        <figure
                            className={`inicio-access-tile inicio-access-tile-${data.variant}`}
                            style={
                                {
                                    '--inicio-tile-accent': data.accent,
                                } as CSSProperties
                            }
                        >
                            <img
                                src={data.image}
                                alt={data.alt}
                                className="inicio-access-image"
                                loading="lazy"
                            />

                            <figcaption className="inicio-access-content">
                                <span className="inicio-access-eyebrow">
                                    {data.eyebrow}
                                </span>

                                <div>
                                    <h3>{data.title}</h3>
                                    <p>{data.description}</p>
                                </div>

                                <span className="inicio-access-cta">
                                    {data.cta}
                                    <ArrowRight size={17} />
                                </span>
                            </figcaption>
                        </figure>
                    </Link>
                )}
            />

            <section
                className="inicio-video-section"
                aria-label="Video introductorio del hotel"
            >
                <div className="inicio-video-copy">
                    <p>Video introductorio</p>
                    <h2>Conoce el hotel</h2>
                </div>

                <div className="inicio-video-frame">
                    <video
                        ref={videoRef}
                        className="inicio-hotel-video"
                        src="/imagenes/bodas/bodas_8.mp4"
                        poster="/imagenes/bodas/bodas_1.jpg"
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        preload="metadata"
                    />
                </div>
            </section>
        </section>
    );
}

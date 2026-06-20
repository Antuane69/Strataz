import { Head, Link } from '@inertiajs/react';
import {
    CarFront,
    Coffee,
    Droplets,
    Snowflake,
    Waves,
    Wifi,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import InicioMasonry from '@/components/inicio/InicioMasonry';
import { habitaciones } from '@/routes/public';

const bookingUrl =
    'https://www.booking.com/searchresults.html?ss=Hotel+Meson+de+Mita%2C+Punta+de+Mita%2C+Nayarit%2C+Mexico';

type HeroSlide = {
    eyebrow: string;
    title: string;
    description: string;
};

const heroSlides: HeroSlide[] = [
    {
        eyebrow: '',
        title: 'HOTEL MESÓN DE MITA',
        description: 'Tu hotel frente al mar en Punta de Mita.',
    },
    {
        eyebrow: 'DISFRUTA LOS COLORES ÚNICOS DEL PACÍFICO',
        title: 'Atardeceres inolvidables frente al mar',
        description:
            'Disfruta de vistas espectaculares y los colores únicos del Pacífico desde nuestra playa.',
    },
    {
        eyebrow: 'NATURALEZA, SNORKEL Y AVENTURA CERCA DEL HOTEL',
        title: 'A minutos de las islas marietas',
        description:
            'Explora uno de los destinos naturales más impresionantes de la región, ideal para snorkel, tours y aventura.',
    },
    {
        eyebrow: 'COMIENZA TU DÍA CON SABOR A PUNTA DE MITA',
        title: 'Desayuno incluido disponible',
        description:
            'Comienza tu día con un delicioso desayuno y disfruta aún más tu estancia en Punta de Mita.',
    },
];

type AmenityCard = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const amenityCards: AmenityCard[] = [
    {
        title: 'Frente al mar',
        description: 'Acceso directo a la playa',
        icon: Waves,
    },
    {
        title: 'Alberca',
        description: 'Relájate en nuestra piscina frente al mar',
        icon: Droplets,
    },
    {
        title: 'WiFi gratis',
        description: 'Conexión de alta velocidad en todo el hotel',
        icon: Wifi,
    },
    {
        title: 'Aire acondicionado',
        description: 'Habitaciones frescas y confortables',
        icon: Snowflake,
    },
    {
        title: 'Restaurante de desayunos',
        description: 'Comienza tu día con un delicioso desayuno',
        icon: Coffee,
    },
    {
        title: 'Estacionamiento',
        description: 'Estacionamiento privado gratuito',
        icon: CarFront,
    },
];

function InicioAmenities() {
    return (
        <section
            className="inicio-amenities-section"
            aria-labelledby="inicio-amenities-title"
        >
            <img
                src="/imagenes/galeria/playa-meson-punta-mita-012.jpg"
                alt=""
                className="inicio-amenities-beach"
                loading="lazy"
                aria-hidden="true"
            />

            <div className="inicio-amenities-content">
                <div className="inicio-amenities-intro">
                    <p>Disfruta de servicios pensados para tu comodidad</p>
                    <h2 id="inicio-amenities-title">
                        <span className="inicio-amenities-title-main">
                            Todo lo que necesitas,
                        </span>
                        <span className="inicio-amenities-title-script">
                            frente al mar
                        </span>
                    </h2>
                    {/* <span>
                        Tu experiencia comienza aquí, descubre todo lo que
                        tenemos para ti: Descanso junto al mar, Servicios y
                        actividades para disfrutar Punta de Mita, Promociones
                        exclusivas y Celebraciones especiales frente a la playa.
                    </span> */}
                </div>

                <div
                    className="inicio-amenities-grid"
                    aria-label="Amenidades del hotel"
                >
                    {amenityCards.map((amenity) => {
                        const Icon = amenity.icon;

                        return (
                            <article
                                className="inicio-amenity-card"
                                key={amenity.title}
                            >
                                <span className="inicio-amenity-icon">
                                    <Icon size={42} strokeWidth={1.7} />
                                </span>
                                <h3>{amenity.title}</h3>
                                <p>{amenity.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default function Inicio() {
    return (
        <>
            <Head title="Inicio" />

            <main className="inicio-page">
                <section className="inicio-hero" aria-label="Meson de Mita">
                    <img
                        src="/imagenes/galeria/dashboard.jpg"
                        alt="Hotel Meson de Mita frente al mar"
                        className="inicio-hero-image"
                    />

                    <div className="inicio-hero-content">
                        <div className="inicio-hero-slides">
                            {heroSlides.map((slide, index) => (
                                <article
                                    className="inicio-hero-slide"
                                    key={slide.eyebrow}
                                >
                                    <p className="inicio-hero-kicker">
                                        {slide.eyebrow}
                                    </p>
                                    {index === 0 ? (
                                        <h1>{slide.title}</h1>
                                    ) : (
                                        <h2>{slide.title}</h2>
                                    )}
                                    <span>{slide.description}</span>
                                </article>
                            ))}
                        </div>

                        <div className="inicio-hero-actions">
                            <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inicio-hero-primary-action"
                            >
                                Reservar ahora
                            </a>
                            <Link
                                href={habitaciones()}
                                className="inicio-hero-secondary-action"
                            >
                                Ver habitaciones
                            </Link>
                        </div>
                    </div>
                </section>

                <InicioAmenities />

                <InicioMasonry />
            </main>
        </>
    );
}

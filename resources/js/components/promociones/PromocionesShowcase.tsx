import { Button, Tag } from 'antd';
import {
    BadgePercent,
    CalendarDays,
    Gift,
    Heart,
    Mail,
    Moon,
    Palmtree,
    Phone,
    Sparkles,
    UsersRound,
    Waves,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';

type PromotionCategory =
    | 'todos'
    | 'parejas'
    | 'familias'
    | 'estancias'
    | 'eventos';

type PromotionIcon = 'beach' | 'couple' | 'family' | 'night' | 'event' | 'gift';

type Promotion = {
    id: string;
    title: string;
    eyebrow: string;
    category: Exclude<PromotionCategory, 'todos'>;
    image: string;
    imageAlt: string;
    description: string;
    highlight: string;
    dealValue: string;
    dealLabel: string;
    validity: string;
    icon: PromotionIcon;
    accent: string;
    tags: string[];
    benefits: string[];
    featured?: boolean;
};

type PromotionTab = {
    key: PromotionCategory;
    label: string;
};

const promotionIcons: Record<
    PromotionIcon,
    ComponentType<{ size?: number }>
> = {
    beach: Waves,
    couple: Heart,
    family: UsersRound,
    night: Moon,
    event: Sparkles,
    gift: Gift,
};

const promotionTabs: PromotionTab[] = [
    { key: 'todos', label: 'Todas' },
    { key: 'parejas', label: 'Parejas' },
    { key: 'familias', label: 'Familias' },
    { key: 'estancias', label: 'Estancias' },
    { key: 'eventos', label: 'Eventos' },
];

const promotions: Promotion[] = [
    {
        id: 'escapada-mar',
        title: 'Escapada frente al mar',
        eyebrow: 'Promoción destacada',
        category: 'parejas',
        image: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
        imageAlt: 'Playa frente al Hotel Mesón de Mita',
        description:
            'Una estancia tranquila para bajar el ritmo, caminar por la playa y despertar cerca del mar.',
        highlight: 'Hasta 20% de descuento',
        dealValue: '20% OFF',
        dealLabel: 'entre semana',
        validity: 'Domingo a jueves',
        icon: 'beach',
        accent: '#1f6f79',
        tags: ['Vista al mar', 'Entre semana', 'Sujeto a disponibilidad'],
        benefits: [
            'Tarifa especial en habitación doble',
            'Salida tardía según disponibilidad',
            'Atención directa por reservaciones',
        ],
        featured: true,
    },
    {
        id: 'romance-punta-mita',
        title: 'Plan romance en Punta de Mita',
        eyebrow: 'Para dos',
        category: 'parejas',
        image: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
        imageAlt: 'Habitación doble con terraza del hotel',
        description:
            'Ideal para una escapada de pareja con habitación cómoda y tardes cerca de la bahía.',
        highlight: 'Detalle de bienvenida',
        dealValue: '$1,850',
        dealLabel: 'desde por noche',
        validity: 'Fechas seleccionadas',
        icon: 'couple',
        accent: '#a33f1d',
        tags: ['Parejas', 'Habitación doble', 'Reserva directa'],
        benefits: [
            'Habitación doble para dos personas',
            'Detalle especial al llegar',
            'Apoyo para organizar una cena cercana',
        ],
    },
    {
        id: 'familia-playa',
        title: 'Familia junto a la playa',
        eyebrow: 'Viajes en grupo',
        category: 'familias',
        image: '/imagenes/galeria/habitacion-triple-hotel-meson-punta-de-mita-03.jpg',
        imageAlt: 'Habitación triple familiar',
        description:
            'Una opción sencilla para compartir habitación, aprovechar la alberca y salir caminando al mar.',
        highlight: 'Tarifa familiar',
        dealValue: '$2,650',
        dealLabel: 'habitación triple',
        validity: 'Temporada baja',
        icon: 'family',
        accent: '#235d48',
        tags: ['Hasta 3 huéspedes', 'Alberca', 'Playa cercana'],
        benefits: [
            'Tarifa preferente en habitación triple',
            'Acceso a áreas comunes y alberca',
            'Estacionamiento sujeto a disponibilidad',
        ],
    },
    {
        id: 'tercera-noche',
        title: 'Quédate una noche más',
        eyebrow: 'Estancias largas',
        category: 'estancias',
        image: '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
        imageAlt: 'Alberca del hotel junto al mar',
        description:
            'Para quienes quieren quedarse sin prisa y disfrutar más días de Punta de Mita.',
        highlight: 'Beneficio en 3 noches',
        dealValue: '3x2',
        dealLabel: 'noches selectas',
        validity: 'Reserva anticipada',
        icon: 'night',
        accent: '#8a4b22',
        tags: ['3 noches', 'Descanso', 'Reserva anticipada'],
        benefits: [
            'Mejor tarifa al reservar más noches',
            'Flexibilidad de habitación según disponibilidad',
            'Contacto directo para ajustar fechas',
        ],
    },
    {
        id: 'bodas-eventos',
        title: 'Celebración frente al mar',
        eyebrow: 'Bodas y eventos',
        category: 'eventos',
        image: '/imagenes/galeria/bodas-Punta-Mita-Hotel-Meson-Mita.jpg',
        imageAlt: 'Boda frente al mar en Punta de Mita',
        description:
            'Un punto de partida para quienes imaginan una celebración íntima cerca de la playa.',
        highlight: 'Cotización especial',
        dealValue: '$18,000',
        dealLabel: 'desde evento íntimo',
        validity: 'Fechas por confirmar',
        icon: 'event',
        accent: '#7f3f77',
        tags: ['Bodas', 'Grupos', 'Coordinación'],
        benefits: [
            'Contacto con coordinación de eventos',
            'Opciones para grupos pequeños',
            'Seguimiento personalizado por fecha',
        ],
    },
    {
        id: 'reserva-directa',
        title: 'Beneficio por reserva directa',
        eyebrow: 'Exclusivo web',
        category: 'estancias',
        image: '/imagenes/galeria/areas_comunes_03.jpg',
        imageAlt: 'Área común y recepción del hotel',
        description:
            'Pregunta por promociones disponibles al reservar directamente con el hotel.',
        highlight: 'Mejor atención directa',
        dealValue: '10% OFF',
        dealLabel: 'reserva directa',
        validity: 'Todo el año',
        icon: 'gift',
        accent: '#d55c01',
        tags: ['Web', 'Teléfono', 'Correo'],
        benefits: [
            'Comunicación directa con reservaciones',
            'Confirmación personalizada',
            'Opciones según temporada y ocupación',
        ],
    },
];

function getPromotionCount(category: PromotionCategory): number {
    if (category === 'todos') {
        return promotions.length;
    }

    return promotions.filter((promotion) => promotion.category === category)
        .length;
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
    const Icon = promotionIcons[promotion.icon];

    return (
        <article
            className={`promocion-card ${
                promotion.featured ? 'promocion-card-featured' : ''
            }`}
            style={{ '--promocion-accent': promotion.accent } as CSSProperties}
        >
            <div className="promocion-card-media">
                <img
                    src={promotion.image}
                    alt={promotion.imageAlt}
                    loading="lazy"
                />
                <div className="promocion-deal-badge">
                    <strong>{promotion.dealValue}</strong>
                    <small>{promotion.dealLabel}</small>
                </div>
                <span className="promocion-eyebrow-badge">
                    <Icon size={17} />
                    {promotion.eyebrow}
                </span>
            </div>

            <div className="promocion-card-body">
                <div className="promocion-card-heading">
                    <p>{promotion.highlight}</p>
                    <h2>{promotion.title}</h2>
                </div>

                <p className="promocion-description">{promotion.description}</p>

                <div className="promocion-meta">
                    <span>
                        <CalendarDays size={17} />
                        {promotion.validity}
                    </span>
                </div>

                <ul className="promocion-benefits">
                    {promotion.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                    ))}
                </ul>

                <div className="promocion-tags">
                    {promotion.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>

                {/* <Button
                    type={promotion.featured ? 'primary' : 'default'}
                    size="large"
                    href="/contacto"
                    className="promocion-action"
                    icon={<ChevronRight size={17} />}
                    iconPosition="end"
                >
                    Consultar promoción
                </Button> */}
            </div>
        </article>
    );
}

export default function PromocionesShowcase() {
    const [activeCategory, setActiveCategory] =
        useState<PromotionCategory>('todos');

    const filteredPromotions = useMemo(() => {
        if (activeCategory === 'todos') {
            return promotions;
        }

        return promotions.filter(
            (promotion) => promotion.category === activeCategory,
        );
    }, [activeCategory]);

    return (
        <section className="promociones-section">
            <div className="promociones-intro">
                {/* <p>Promociones</p> */}
                <h1>Promociones</h1>
                <span>
                    Promociones de temporada, beneficios por reserva directa y
                    planes pensados para parejas, familias y celebraciones.
                    Disfruta de unas vacaciones perfectas en el{' '}
                    <b>Hotel Mesón de Mita.</b>
                </span>
            </div>

            <div className="promociones-highlight-row">
                <span>
                    <BadgePercent size={18} />
                    Tarifas especiales
                </span>
                <span>
                    <Palmtree size={18} />A pasos de la playa
                </span>
                <span>
                    <Phone size={18} />
                    Reserva directa
                </span>
            </div>

            <div
                className="promociones-tabs"
                role="tablist"
                aria-label="Filtrar promociones"
            >
                {promotionTabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                    >
                        <span>{tab.label}</span>
                        <strong>{getPromotionCount(tab.key)}</strong>
                    </button>
                ))}
            </div>

            <div className="promociones-grid">
                {filteredPromotions.map((promotion) => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                ))}
            </div>

            <div className="promociones-contact-strip">
                <div>
                    <p>¿Buscas una fecha específica?</p>
                    <h2>Pregunta por promociones vigentes</h2>
                    <span>
                        Las promociones pueden cambiar por temporada, ocupación
                        y tipo de habitación. Reservaciones puede ayudarte a
                        encontrar la mejor opción disponible.
                    </span>
                </div>

                <div className="promociones-contact-actions">
                    <Button
                        type="primary"
                        size="large"
                        href="mailto:reservaciones@hotelmesondemita.com"
                        icon={<Mail size={18} style={{ color: 'white' }} />}
                    >
                        <span className="text-white!">Escribir al hotel</span>
                    </Button>
                    <Button size="large" href="tel:+523292916330">
                        Llamar ahora
                    </Button>
                </div>
            </div>
        </section>
    );
}

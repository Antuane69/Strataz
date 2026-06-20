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
import type {
    Promotion,
    PromotionCategory,
    PromotionIcon,
    PromotionTab,
} from './interface';
import { promotions } from './services/promocionesMock';

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
    { key: 'experiencias', label: 'Experiencias' },
    { key: 'eventos', label: 'Eventos' },
];

function getPromotionCount(category: PromotionCategory): number {
    if (category === 'todos') {
        return promotions.length;
    }

    return promotions.filter((promotion) => promotion.category === category)
        .length;
}

function getPromotionPriceGroups(
    promotion: Promotion,
): NonNullable<Promotion['priceGroups']> {
    if (promotion.priceGroups?.length) {
        return promotion.priceGroups;
    }

    return [
        {
            prices: [
                {
                    label: promotion.dealLabel ?? 'Promocion',
                    amount: promotion.dealValue ?? promotion.highlight,
                },
            ],
        },
    ];
}

function formatPriceAmount({
    amount,
    prefix,
}: {
    amount: string;
    prefix?: string;
}) {
    return prefix ? `${prefix} ${amount}` : amount;
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
    const Icon = promotionIcons[promotion.icon];
    const priceGroups = getPromotionPriceGroups(promotion);
    const prices = priceGroups.flatMap((group) => group.prices);
    const primaryPrice = prices[0] ?? {
        label: 'Promocion',
        amount: promotion.highlight,
    };
    const hasMultiplePrices = prices.length > 1;

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
                    <strong>{formatPriceAmount(primaryPrice)}</strong>
                    <small>
                        {hasMultiplePrices
                            ? `${prices.length} opciones`
                            : primaryPrice.label}
                    </small>
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

                {promotion.validity && (
                    <div className="promocion-meta">
                        <span>
                            <CalendarDays size={17} />
                            {promotion.validity}
                        </span>
                    </div>
                )}

                <section
                    className="promocion-pricing"
                    aria-label={`Precios de ${promotion.title}`}
                >
                    <p className="promocion-pricing-heading">
                        {promotion.priceHeading ??
                            (hasMultiplePrices
                                ? 'Opciones disponibles'
                                : 'Precio')}
                    </p>
                    <div className="promocion-price-groups">
                        {priceGroups.map((group, groupIndex) => (
                            <div
                                className="promocion-price-group"
                                key={`${promotion.id}-${group.title ?? groupIndex}`}
                            >
                                {group.title && <h3>{group.title}</h3>}
                                {group.description && (
                                    <p className="promocion-price-description">
                                        {group.description}
                                    </p>
                                )}
                                <div className="promocion-price-list">
                                    {group.prices.map((price) => (
                                        <div
                                            className="promocion-price-row"
                                            key={`${promotion.id}-${group.title ?? 'precio'}-${price.label}-${price.amount}`}
                                        >
                                            <span>{price.label}</span>
                                            <strong>
                                                {formatPriceAmount(price)}
                                            </strong>
                                            {price.note && (
                                                <small>{price.note}</small>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

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

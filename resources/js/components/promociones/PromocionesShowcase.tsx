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
import { useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import type {
    PromocionesPageContent,
    PromocionesPageText,
    Promotion,
    PromotionCategory,
    PromotionHighlightIcon,
    PromotionIcon,
} from './interface';
import { mapPromocionesContent } from './services/mapPromocionesContent';

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

const highlightIcons: Record<PromotionHighlightIcon, ComponentType<{ size?: number }>> = {
    'badge-percent': BadgePercent,
    palmtree: Palmtree,
    phone: Phone,
};

function getPromotionCount(
    category: PromotionCategory,
    promotions: Promotion[],
): number {
    if (category === 'todos') {
        return promotions.length;
    }

    return promotions.filter((promotion) => promotion.category === category)
        .length;
}

function getPromotionPriceGroups(
    promotion: Promotion,
    text: PromocionesPageText,
): NonNullable<Promotion['priceGroups']> {
    if (promotion.priceGroups?.length) {
        return promotion.priceGroups;
    }

    return [
        {
            prices: [
                {
                    label: text.default_price_label,
                    amount: promotion.highlight,
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

function PromotionCard({
    promotion,
    text,
}: {
    promotion: Promotion;
    text: PromocionesPageText;
}) {
    const Icon = promotionIcons[promotion.icon];
    const priceGroups = getPromotionPriceGroups(promotion, text);
    const prices = priceGroups.flatMap((group) => group.prices);
    const primaryPrice = prices[0] ?? {
        label: text.default_price_label,
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
                            ? `${prices.length} ${text.multiple_options_label}`
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
                        {promotion.priceHeading ||
                            (hasMultiplePrices
                                ? text.available_options_heading
                                : text.default_price_heading)}
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
            </div>
        </article>
    );
}

type PromocionesShowcaseProps = {
  content?: PromocionesPageContent | null;
  locale?: string | null;
};

export default function PromocionesShowcase({ content, locale }: PromocionesShowcaseProps = {}) {
    const [activeCategory, setActiveCategory] =
        useState<PromotionCategory>('todos');
    const {
        contact,
        highlightItems,
        promotions,
        tabs,
        text,
    } = mapPromocionesContent(content, locale);

    const filteredPromotions = activeCategory === 'todos'
        ? promotions
        : promotions.filter(
            (promotion) => promotion.category === activeCategory,
        );

    return (
        <section className="promociones-section">
            <div className="promociones-intro">
                <h1>{text.intro_title}</h1>
                <span>{text.intro_body}</span>
            </div>

            <div className="promociones-highlight-row">
                {highlightItems.map((item) => {
                    const Icon = highlightIcons[item.icon];

                    return (
                        <span key={`${item.icon}-${item.label}`}>
                            <Icon size={18} />
                            {item.label}
                        </span>
                    );
                })}
            </div>

            <div
                className="promociones-tabs"
                role="tablist"
                aria-label="Filtrar promociones"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                    >
                        <span>{tab.label}</span>
                        <strong>{getPromotionCount(tab.key, promotions)}</strong>
                    </button>
                ))}
            </div>

            <div className="promociones-grid">
                {filteredPromotions.map((promotion) => (
                    <PromotionCard
                        key={promotion.id}
                        promotion={promotion}
                        text={text}
                    />
                ))}
            </div>

            <div className="promociones-contact-strip">
                <div>
                    <p>{text.contact_kicker}</p>
                    <h2>{text.contact_title}</h2>
                    <span>{text.contact_body}</span>
                </div>

                <div className="promociones-contact-actions">
                    <Button
                        type="primary"
                        size="large"
                        href={contact.emailHref}
                        icon={<Mail size={18} style={{ color: 'white' }} />}
                    >
                        <span className="text-white!">{text.email_cta}</span>
                    </Button>
                    <Button size="large" href={contact.phoneHref}>
                        {text.phone_cta}
                    </Button>
                </div>
            </div>
        </section>
    );
}

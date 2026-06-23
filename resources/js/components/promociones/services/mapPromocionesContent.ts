import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type { PromocionesPageContent, PromocionesPageText, Promotion, PromotionHighlightItem, PromotionPrice, PromotionPriceGroup, PromotionTab } from '../interface';
import { promotions } from './promocionesMock';

type MappedPromocionesContent = {
  locale: LocaleCode;
  text: PromocionesPageText;
  highlightItems: PromotionHighlightItem[];
  tabs: PromotionTab[];
  promotions: Promotion[];
  contact: {
    emailHref: string;
    phoneHref: string;
  };
};

const fallbackText: PromocionesPageText = {
    page_title: 'Promociones',
    intro_title: 'Promociones',
    intro_body:
        'Promociones de temporada, beneficios por reserva directa y planes pensados para parejas, familias y celebraciones. Disfruta de unas vacaciones perfectas en el Hotel Meson de Mita.',
    all_tab_label: 'Todas',
    multiple_options_label: 'opciones',
    default_price_label: 'Promocion',
    default_price_heading: 'Precio',
    available_options_heading: 'Opciones disponibles',
    contact_kicker: 'Buscas una fecha especifica?',
    contact_title: 'Pregunta por promociones vigentes',
    contact_body:
        'Las promociones pueden cambiar por temporada, ocupacion y tipo de habitacion. Reservaciones puede ayudarte a encontrar la mejor opcion disponible.',
    email_cta: 'Escribir al hotel',
    phone_cta: 'Llamar ahora',
};

const fallbackHighlightItems: PromotionHighlightItem[] = [
    {
        icon: 'badge-percent',
        label: 'Tarifas especiales',
    },
    {
        icon: 'palmtree',
        label: 'A pasos de la playa',
    },
    {
        icon: 'phone',
        label: 'Reserva directa',
    },
];

const fallbackTabs: PromotionTab[] = [
    { key: 'todos', label: 'Todas' },
    { key: 'parejas', label: 'Parejas' },
    { key: 'familias', label: 'Familias' },
    { key: 'estancias', label: 'Estancias' },
    { key: 'experiencias', label: 'Experiencias' },
    { key: 'eventos', label: 'Eventos' },
];

export function mapPromocionesContent(
    content?: PromocionesPageContent | null,
    locale?: string | null,
): MappedPromocionesContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: fallbackText,
            highlightItems: fallbackHighlightItems,
            tabs: fallbackTabs,
            promotions,
            contact: {
                emailHref: 'mailto:reservaciones@hotelmesondemita.com',
                phoneHref: 'tel:+523292916330',
            },
        };
    }

    const text = content.locales[activeLocale] ?? content.locales.es ?? fallbackText;

    return {
        locale: activeLocale,
        text,
        highlightItems: content.highlight_items.map((item) => ({
            icon: item.icon,
            label: localizedText(item.label, activeLocale),
        })),
        tabs: [
            {
                key: 'todos',
                label: text.all_tab_label,
            },
            ...content.tabs.map((tab) => ({
                key: tab.key,
                label: localizedText(tab.label, activeLocale),
            })),
        ],
        promotions: content.promotions
            .filter((promotion) => promotion.is_active)
            .sort((first, second) => first.order - second.order)
            .map((promotion): Promotion => ({
                id: promotion.id,
                title: localizedText(promotion.title, activeLocale),
                eyebrow: localizedText(promotion.eyebrow, activeLocale),
                category: promotion.category,
                image: promotion.image.src,
                imageAlt: localizedText(promotion.image.alt, activeLocale),
                description: localizedText(promotion.description, activeLocale),
                highlight: localizedText(promotion.highlight, activeLocale),
                priceHeading: localizedText(
                    promotion.price_heading,
                    activeLocale,
                ),
                priceGroups: promotion.price_groups.map(
                    (group): PromotionPriceGroup => ({
                        title: localizedText(group.title, activeLocale),
                        description: localizedText(
                            group.description,
                            activeLocale,
                        ),
                        prices: group.prices.map(
                            (price): PromotionPrice => ({
                                label: localizedText(
                                    price.label,
                                    activeLocale,
                                ),
                                amount: price.amount,
                                prefix: localizedText(
                                    price.prefix,
                                    activeLocale,
                                ),
                                note: localizedText(price.note, activeLocale),
                            }),
                        ),
                    }),
                ),
                validity: localizedText(promotion.validity, activeLocale) || null,
                icon: promotion.icon,
                accent: promotion.accent,
                tags: promotion.tags.map((tag) =>
                    localizedText(tag, activeLocale),
                ),
                benefits: promotion.benefits.map((benefit) =>
                    localizedText(benefit, activeLocale),
                ),
                featured: promotion.featured,
            })),
        contact: {
            emailHref: content.contact.email_href,
            phoneHref: content.contact.phone_href,
        },
    };
}

import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type { Servicio, ServiciosPageContent, ServiciosPageText, ServicioTrustItem } from '../interfaces';
import { serviciosMock } from './servicesMock';

type MappedServiciosContent = {
  locale: LocaleCode;
  text: ServiciosPageText;
  trustItems: ServicioTrustItem[];
  servicios: Servicio[];
};

const fallbackText: ServiciosPageText = {
    page_title: 'Servicios',
    intro_title: 'Servicios',
    intro_body:
        'Amenidades sencillas, utiles y pensadas para que tu estancia se sienta comoda desde que llegas.',
};

const fallbackTrustItems: ServicioTrustItem[] = [
    {
        icon: 'shield',
        label: 'Estacionamiento privado',
    },
    {
        icon: 'pool',
        label: 'Alberca junto al mar',
    },
    {
        icon: 'shop',
        label: 'Souvenirs y artesanias',
    },
];

export function mapServiciosContent(
    content?: ServiciosPageContent | null,
    locale?: string | null,
): MappedServiciosContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: fallbackText,
            trustItems: fallbackTrustItems,
            servicios: serviciosMock,
        };
    }

    return {
        locale: activeLocale,
        text:
            content.locales[activeLocale] ?? content.locales.es ?? fallbackText,
        trustItems: content.trust_items.map((item) => ({
            icon: item.icon,
            label: localizedText(item.label, activeLocale),
        })),
        servicios: content.services
            .filter((servicio) => servicio.is_active)
            .sort((first, second) => first.order - second.order)
            .map(
                (servicio): Servicio => ({
                    id: servicio.id,
                    name: localizedText(servicio.name, activeLocale),
                    eyebrow: localizedText(servicio.eyebrow, activeLocale),
                    description: localizedText(
                        servicio.description,
                        activeLocale,
                    ),
                    icon: servicio.icon,
                    accent: servicio.accent,
                    tags: servicio.tags.map((tag) =>
                        localizedText(tag, activeLocale),
                    ),
                    media: servicio.media.map((media) => ({
                        id: media.id,
                        type: media.type,
                        src: media.src,
                        poster: media.poster,
                        alt: localizedText(media.alt, activeLocale),
                    })),
                }),
            ),
    };
}

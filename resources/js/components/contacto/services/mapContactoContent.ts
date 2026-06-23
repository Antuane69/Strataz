import { BusFront, CarFront, Mail, MapPin, Phone, Plane } from 'lucide-react';
import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type {
    ArrivalIconName,
    ArrivalRoute,
    ContactIconName,
    ContactInfo,
    ContactoPageContent,
    ContactoPageText,
    IconComponent,
} from '../interfaces';
import {
    arrivalRoutes,
    contactInfo,
    contactoText,
    mapEmbedUrl,
    mapsUrl,
} from './contactosMock';

const contactIcons: Record<ContactIconName, IconComponent> = {
    mail: Mail,
    'map-pin': MapPin,
    phone: Phone,
};

const arrivalIcons: Record<ArrivalIconName, IconComponent> = {
    bus: BusFront,
    car: CarFront,
    plane: Plane,
};

type MappedContactoContent = {
    locale: LocaleCode;
    text: ContactoPageText;
    mapsUrl: string;
    mapEmbedUrl: string;
    contactInfo: ContactInfo[];
    arrivalRoutes: ArrivalRoute[];
};

export function mapContactoContent(
    content?: ContactoPageContent | null,
    locale?: string | null,
): MappedContactoContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: contactoText,
            mapsUrl,
            mapEmbedUrl,
            contactInfo,
            arrivalRoutes,
        };
    }

    return {
        locale: activeLocale,
        text:
            content.locales[activeLocale] ?? content.locales.es ?? contactoText,
        mapsUrl: content.maps_url,
        mapEmbedUrl: content.map_embed_url,
        contactInfo: content.contact_items
            .filter((item) => item.is_active)
            .sort((first, second) => first.order - second.order)
            .map((item) => ({
                id: item.id,
                label: localizedText(item.label, activeLocale),
                lines: item.lines
                    .map((line) => localizedText(line, activeLocale))
                    .filter(Boolean),
                href: item.href,
                external: item.external,
                icon: contactIcons[item.icon] ?? MapPin,
            })),
        arrivalRoutes: content.arrival_routes
            .filter((route) => route.is_active)
            .sort((first, second) => first.order - second.order)
            .map((route) => ({
                id: route.id,
                eyebrow: localizedText(route.eyebrow, activeLocale),
                title: localizedText(route.title, activeLocale),
                description: localizedText(route.description, activeLocale),
                footer: localizedText(route.footer, activeLocale),
                companies: route.companies
                    .map((company) => localizedText(company, activeLocale))
                    .filter(Boolean),
                icon: arrivalIcons[route.icon] ?? BusFront,
                steps: route.steps
                    .map((step) => localizedText(step, activeLocale))
                    .filter(Boolean),
            })),
    };
}

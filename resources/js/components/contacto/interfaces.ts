import type { ComponentType } from 'react';
import type { LocalizedString } from '@/types';

export type IconComponent = ComponentType<{ size?: number }>;

export type ContactIconName = 'mail' | 'map-pin' | 'phone';

export type ArrivalIconName = 'bus' | 'car' | 'plane';

export type ContactInfo = {
    id: string;
    label: string;
    lines: string[];
    href: string;
    external?: boolean;
    icon: IconComponent;
};

export type ArrivalRoute = {
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
    footer?: string;
    companies: string[];
    icon: IconComponent;
    steps: string[];
};

export type ContactoPageText = {
    page_title: string;
    hero_title: string;
    hero_body: string;
    contact_info_aria_label: string;
    map_kicker: string;
    map_title: string;
    map_body: string;
    map_cta_label: string;
    map_iframe_title: string;
    arrival_title: string;
    arrival_body: string;
    airlines_intro: string;
};

export type EditableContactInfo = {
    id: string;
    order: number;
    is_active: boolean;
    icon: ContactIconName;
    label: LocalizedString;
    lines: LocalizedString[];
    href: string;
    external: boolean;
};

export type EditableArrivalRoute = {
    id: string;
    order: number;
    is_active: boolean;
    icon: ArrivalIconName;
    eyebrow: LocalizedString;
    title: LocalizedString;
    description: LocalizedString;
    footer: LocalizedString;
    companies: LocalizedString[];
    steps: LocalizedString[];
};

export type ContactoPageContent = {
    version: number;
    maps_url: string;
    map_embed_url: string;
    locales: Record<'es' | 'en', ContactoPageText>;
    contact_items: EditableContactInfo[];
    arrival_routes: EditableArrivalRoute[];
};

export type EditablePagePayload = {
    id: number;
    slug: string;
    title: string;
    content: ContactoPageContent;
    is_published: boolean;
    updated_at?: string | null;
};

export type FormData = {
    _method: 'put';
    title: string;
    is_published: boolean;
    content: ContactoPageContent;
};

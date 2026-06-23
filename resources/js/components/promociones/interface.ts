import type { EditableMedia, LocalizedString } from '@/types';

export type PromotionCategory =
    | 'todos'
    | 'parejas'
    | 'familias'
    | 'estancias'
    | 'eventos'
    | 'experiencias';

export type EditablePromotionCategory = Exclude<PromotionCategory, 'todos'>;

export type PromotionIcon =
    | 'beach'
    | 'couple'
    | 'family'
    | 'night'
    | 'event'
    | 'gift';

export type PromotionHighlightIcon = 'badge-percent' | 'palmtree' | 'phone';

export type PromotionPrice = {
    label: string;
    amount: string;
    prefix?: string;
    note?: string;
};

export type PromotionPriceGroup = {
    title?: string;
    description?: string;
    prices: PromotionPrice[];
};

export type Promotion = {
    id: string;
    title: string;
    eyebrow: string;
    category: EditablePromotionCategory;
    image: string;
    imageAlt: string;
    description: string;
    highlight: string;
    priceHeading?: string;
    priceGroups?: PromotionPriceGroup[];
    validity: string | null;
    icon: PromotionIcon;
    accent: string;
    tags: string[];
    benefits: string[];
    featured?: boolean;
};

export type PromotionTab = {
    key: PromotionCategory;
    label: string;
};

export type PromotionHighlightItem = {
    icon: PromotionHighlightIcon;
    label: string;
};

export type PromocionesPageText = {
    page_title: string;
    intro_title: string;
    intro_body: string;
    all_tab_label: string;
    multiple_options_label: string;
    default_price_label: string;
    default_price_heading: string;
    available_options_heading: string;
    contact_kicker: string;
    contact_title: string;
    contact_body: string;
    email_cta: string;
    phone_cta: string;
};

export type EditablePromotionPrice = {
    label: LocalizedString;
    amount: string;
    prefix: LocalizedString;
    note: LocalizedString;
};

export type EditablePromotionPriceGroup = {
    title: LocalizedString;
    description: LocalizedString;
    prices: EditablePromotionPrice[];
};

export type EditablePromotionHighlightItem = {
    icon: PromotionHighlightIcon;
    label: LocalizedString;
};

export type EditablePromotionTab = {
    key: EditablePromotionCategory;
    label: LocalizedString;
};

export type EditablePromotion = {
    id: string;
    order: number;
    is_active: boolean;
    featured: boolean;
    title: LocalizedString;
    eyebrow: LocalizedString;
    category: EditablePromotionCategory;
    image: EditableMedia;
    description: LocalizedString;
    highlight: LocalizedString;
    price_heading: LocalizedString;
    validity: LocalizedString;
    icon: PromotionIcon;
    accent: string;
    tags: LocalizedString[];
    benefits: LocalizedString[];
    price_groups: EditablePromotionPriceGroup[];
};

export type PromocionesPageContent = {
    version: number;
    locales: Record<'es' | 'en', PromocionesPageText>;
    highlight_items: EditablePromotionHighlightItem[];
    tabs: EditablePromotionTab[];
    contact: {
        email_href: string;
        phone_href: string;
    };
    promotions: EditablePromotion[];
};

export type EditablePagePayload = {
  id: number;
  slug: string;
  title: string;
  content: PromocionesPageContent;
  is_published: boolean;
  updated_at?: string | null;
};

export type UploadConfig = {
  accept: string;
  max_size_mb: number;
};

export type MediaUploadGroup = {
  promotion_id: string;
  media_id: string;
  name: string;
  file: File;
};

export type FormData = {
  _method: 'put';
  title: string;
  is_published: boolean;
  content: PromocionesPageContent;
  media_uploads: MediaUploadGroup[];
};

export type PromotionCategory =
    | 'todos'
    | 'parejas'
    | 'familias'
    | 'estancias'
    | 'eventos'
    | 'experiencias';

export type PromotionIcon =
    | 'beach'
    | 'couple'
    | 'family'
    | 'night'
    | 'event'
    | 'gift';

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
    category: Exclude<PromotionCategory, 'todos'>;
    image: string;
    imageAlt: string;
    description: string;
    highlight: string;
    dealValue?: string;
    dealLabel?: string;
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

export type ServicioIcon = 'pool' | 'parking' | 'shop' | 'beach' | 'sports' | "food" | "fish" | "sparks" | "boda" | "consierge";

export type ServicioMedia = {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
};

import type { ReactNode } from 'react';

export type Servicio = {
    id: string;
    name: string;
    eyebrow: string;
    description: ReactNode;
    icon: ServicioIcon;
    accent: string;
    tags: string[];
    media: ServicioMedia[];
};
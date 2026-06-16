export type ServicioIcon = 'pool' | 'parking' | 'shop' | 'beach' | 'sports' | "food" | "fish";

export type ServicioMedia = {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
};

export type Servicio = {
    id: string;
    name: string;
    eyebrow: string;
    description: string;
    icon: ServicioIcon;
    accent: string;
    tags: string[];
    media: ServicioMedia[];
};
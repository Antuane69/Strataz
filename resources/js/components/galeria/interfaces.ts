import type { EditableMedia, LocalizedString } from '@/types';

export type GalleryCategory = 'todos' | string;

export type EditableGalleryCategory = Exclude<GalleryCategory, 'todos'>;

export type MasonryVariant = 'normal' | 'wide' | 'tall' | 'feature';

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    title: string;
    category: EditableGalleryCategory;
    categoryLabel: string;
    variant: MasonryVariant;
};

export type GalleryTab = {
    key: GalleryCategory;
    label: string;
};

export type GaleriaPageText = {
    page_title: string;
    intro_title: string;
    intro_body: string;
    toolbar_title: string;
    photo_singular: string;
    photo_plural: string;
    all_tab_label: string;
};

export type EditableGalleryTab = {
    key: EditableGalleryCategory;
    label: LocalizedString;
};

export type EditableGalleryImage = {
    id: string;
    order: number;
    is_active: boolean;
    image: EditableMedia;
    title: LocalizedString;
    category: EditableGalleryCategory;
    variant: MasonryVariant;
};

export type GaleriaPageContent = {
    version: number;
    locales: Record<'es' | 'en', GaleriaPageText>;
    tabs: EditableGalleryTab[];
    images: EditableGalleryImage[];
};

export type EditablePagePayload = {
    id: number;
    slug: string;
    title: string;
    content: GaleriaPageContent;
    is_published: boolean;
    updated_at?: string | null;
};

export type UploadConfig = {
    accept: string;
    max_size_mb: number;
};

export type MediaUploadGroup = {
    gallery_image_id: string;
    media_id: string;
    name: string;
    file: File;
};

export type FormData = {
    _method: 'put';
    title: string;
    is_published: boolean;
    content: GaleriaPageContent;
    media_uploads: MediaUploadGroup[];
};

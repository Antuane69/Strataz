import type { EditableMedia, LocalizedString } from '@/types';

export type RecommendationSection = {
    title: string;
    paragraphs: string[];
    bullets: string[];
};

export type Recommendation = {
    id: string;
    title: string;
    eyebrow: string;
    image: string;
    imageAlt: string;
    distance: string;
    duration: string;
    intro: string;
    sections: RecommendationSection[];
};

export type RecomendacionesPageText = {
    page_title: string;
    intro_title: string;
    intro_body: string;
};

export type EditableRecommendationSection = {
    title: LocalizedString;
    paragraphs: LocalizedString[];
    bullets: LocalizedString[];
};

export type EditableRecommendation = {
    id: string;
    order: number;
    is_active: boolean;
    title: LocalizedString;
    eyebrow: LocalizedString;
    image: EditableMedia;
    distance: LocalizedString;
    duration: LocalizedString;
    intro: LocalizedString;
    sections: EditableRecommendationSection[];
};

export type RecomendacionesPageContent = {
    version: number;
    locales: Record<'es' | 'en', RecomendacionesPageText>;
    recommendations: EditableRecommendation[];
};

export type EditablePagePayload = {
    id: number;
    slug: string;
    title: string;
    content: RecomendacionesPageContent;
    is_published: boolean;
    updated_at?: string | null;
};

export type UploadConfig = {
    accept: string;
    max_size_mb: number;
};

export type MediaUploadGroup = {
    recommendation_id: string;
    media_id: string;
    name: string;
    file: File;
};

export type FormData = {
    _method: 'put';
    title: string;
    is_published: boolean;
    content: RecomendacionesPageContent;
    media_uploads: MediaUploadGroup[];
};

import type { LocalizedString } from '@/types';

export type BodasHighlightIcon = 'calendar-heart' | 'message-circle';

export type BodasMedia = {
    id?: string;
    type: 'image' | 'video';
    src: string;
    poster?: string | null;
    alt: string;
    label: string;
};

export type BodasPageText = {
    page_title: string;
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    reserve_cta: string;
    drawer_kicker: string;
    drawer_title: string;
    drawer_description: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    message_label: string;
    message_placeholder: string;
    submit_label: string;
};

export type BodasHighlight = {
    icon: BodasHighlightIcon;
    label: string;
};

export type EditableBodasMedia = {
    id: string;
    type: 'image' | 'video';
    src: string;
    poster?: string | null;
    alt: LocalizedString;
    label: LocalizedString;
};

export type EditableBodasHighlight = {
    icon: BodasHighlightIcon;
    label: LocalizedString;
};

export type BodasPageContent = {
    version: number;
    locales: Record<'es' | 'en', BodasPageText>;
    background_media: EditableBodasMedia;
    highlights: EditableBodasHighlight[];
    media: EditableBodasMedia[];
};

export type EditablePagePayload = {
  id: number;
  slug: string;
  title: string;
  content: BodasPageContent;
  is_published: boolean;
  updated_at?: string | null;
};

export type UploadConfig = {
  accept: string;
  max_size_mb: number;
};

export type MediaUploadGroup = {
  target: 'background' | 'media';
  media_id: string;
  name: string;
  file: File;
};

export type FormData = {
  _method: 'put';
  title: string;
  is_published: boolean;
  content: BodasPageContent;
  media_uploads: MediaUploadGroup[];
};

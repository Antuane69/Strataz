import type { EditableMedia, LocalizedString } from '@/types';

export type ServicioIcon = 'pool' | 'parking' | 'shop' | 'beach' | 'sports' | 'food' | 'fish' | 'sparks' | 'boda' | 'consierge';

export type ServicioTrustIcon = 'shield' | 'pool' | 'shop';

export type ServicioMedia = {
    id?: string;
    type: 'image' | 'video';
    src: string;
    poster?: string | null;
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

export type ServiciosPageText = {
    page_title: string;
    intro_title: string;
    intro_body: string;
};

export type ServicioTrustItem = {
    icon: ServicioTrustIcon;
    label: string;
};

export type EditableServicioTrustItem = {
    icon: ServicioTrustIcon;
    label: LocalizedString;
};

export type EditableServicio = {
    id: string;
    order: number;
    is_active: boolean;
    name: LocalizedString;
    eyebrow: LocalizedString;
    description: LocalizedString;
    icon: ServicioIcon;
    accent: string;
    tags: LocalizedString[];
    media: EditableMedia[];
};

export type ServiciosPageContent = {
    version: number;
    locales: Record<'es' | 'en', ServiciosPageText>;
    trust_items: EditableServicioTrustItem[];
    services: EditableServicio[];
};

export type EditablePagePayload = {
  id: number;
  slug: string;
  title: string;
  content: ServiciosPageContent;
  is_published: boolean;
  updated_at?: string | null;
};

export type UploadConfig = {
  accept: string;
  max_size_mb: number;
};

export type MediaUploadGroup = {
  service_id: string;
  media_id: string;
  name: string;
  file: File;
};

export type FormData = {
  _method: 'put';
  title: string;
  is_published: boolean;
  content: ServiciosPageContent;
  media_uploads: MediaUploadGroup[];
};

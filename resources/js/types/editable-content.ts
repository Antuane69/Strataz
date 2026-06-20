export type LocaleCode = 'es' | 'en';

export type LocalizedString = Record<LocaleCode, string>;

export type EditableMediaType = 'image' | 'video';

export type EditableMedia = {
    id: string;
    type: EditableMediaType;
    src: string;
    poster?: string | null;
    alt: LocalizedString;
};

export type LocalizedStringMap = Record<string, string>;

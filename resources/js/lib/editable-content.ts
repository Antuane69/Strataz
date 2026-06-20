import type { LocaleCode, LocalizedString } from '@/types';

export const supportedLocales: LocaleCode[] = ['es', 'en'];

export const localeLabels: Record<LocaleCode, string> = {
    es: 'Espanol',
    en: 'English',
};

export function normalizeLocale(locale?: string | null): LocaleCode {
    return locale === 'en' ? 'en' : 'es';
}

export function emptyLocalizedString(): LocalizedString {
    return {
        es: '',
        en: '',
    };
}

export function localizedText(
    value: LocalizedString | undefined | null,
    locale: LocaleCode,
    fallbackLocale: LocaleCode = 'es',
): string {
    if (!value) {
        return '';
    }

    return value[locale] || value[fallbackLocale] || value.en || value.es || '';
}

export function cloneEditableContent<T>(content: T): T {
    return JSON.parse(JSON.stringify(content)) as T;
}

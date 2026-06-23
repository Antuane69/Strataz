import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type { BodasHighlight, BodasMedia, BodasPageContent, BodasPageText } from '../interfaces';
import { bodasBackground, bodasHighlights, bodasMedia, bodasText } from './bodasMock';

type MappedBodasContent = {
  locale: LocaleCode;
  text: BodasPageText;
  background: BodasMedia;
  highlights: BodasHighlight[];
  media: BodasMedia[];
};

export function mapBodasContent(content?: BodasPageContent | null, locale?: string | null): MappedBodasContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: bodasText,
            background: bodasBackground,
            highlights: bodasHighlights,
            media: bodasMedia,
        };
    }

    return {
        locale: activeLocale,
        text: content.locales[activeLocale] ?? content.locales.es ?? bodasText,
        background: {
            id: content.background_media.id,
            type: content.background_media.type,
            src: content.background_media.src,
            poster: content.background_media.poster,
            alt: localizedText(content.background_media.alt, activeLocale),
            label: localizedText(content.background_media.label, activeLocale),
        },
        highlights: content.highlights.map((highlight) => ({
            icon: highlight.icon,
            label: localizedText(highlight.label, activeLocale),
        })),
        media: content.media.map((media) => ({
            id: media.id,
            type: media.type,
            src: media.src,
            poster: media.poster,
            alt: localizedText(media.alt, activeLocale),
            label: localizedText(media.label, activeLocale),
        })),
    };
}

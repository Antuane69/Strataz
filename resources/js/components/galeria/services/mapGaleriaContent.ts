import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type {
    GaleriaPageContent,
    GaleriaPageText,
    GalleryImage,
    GalleryTab,
} from '../interfaces';
import { galeriaText, galleryImages, galleryTabs } from './galeriaMock';

type MappedGaleriaContent = {
    locale: LocaleCode;
    text: GaleriaPageText;
    tabs: GalleryTab[];
    images: GalleryImage[];
};

export function mapGaleriaContent(
    content?: GaleriaPageContent | null,
    locale?: string | null,
): MappedGaleriaContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: galeriaText,
            tabs: galleryTabs,
            images: galleryImages,
        };
    }

    const text = content.locales[activeLocale] ?? content.locales.es ?? galeriaText;
    const categoryLabels = new Map(
        content.tabs.map((tab) => [
            tab.key,
            localizedText(tab.label, activeLocale),
        ]),
    );

    return {
        locale: activeLocale,
        text,
        tabs: [
            {
                key: 'todos',
                label: text.all_tab_label,
            },
            ...content.tabs.map((tab) => ({
                key: tab.key,
                label: localizedText(tab.label, activeLocale),
            })),
        ],
        images: content.images
            .filter((image) => image.is_active)
            .sort((first, second) => first.order - second.order)
            .map((image): GalleryImage => ({
                id: image.id,
                src: image.image.src,
                alt: localizedText(image.image.alt, activeLocale),
                title: localizedText(image.title, activeLocale),
                category: image.category,
                categoryLabel: categoryLabels.get(image.category) ?? image.category,
                variant: image.variant,
            })),
    };
}

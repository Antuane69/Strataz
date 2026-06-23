import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type {
    Recommendation,
    RecomendacionesPageContent,
    RecomendacionesPageText,
} from '../interfaces';
import { recommendations } from './recomendacionesMock';

type MappedRecomendacionesContent = {
    locale: LocaleCode;
    text: RecomendacionesPageText;
    recommendations: Recommendation[];
};

const fallbackText: RecomendacionesPageText = {
    page_title: 'Recomendaciones',
    intro_title: 'Recomendaciones',
    intro_body:
        'Punta de Mita es un pueblito pequeno, pero con mucho encanto. En Hotel Meson de Mita queremos ayudarte a aprovechar al maximo los atractivos de la zona y vivir unas vacaciones llenas de experiencias memorables.',
};

export function mapRecomendacionesContent(
    content?: RecomendacionesPageContent | null,
    locale?: string | null,
): MappedRecomendacionesContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: fallbackText,
            recommendations,
        };
    }

    return {
        locale: activeLocale,
        text:
            content.locales[activeLocale] ??
            content.locales.es ??
            fallbackText,
        recommendations: content.recommendations
            .filter((recommendation) => recommendation.is_active)
            .sort((first, second) => first.order - second.order)
            .map(
                (recommendation): Recommendation => ({
                    id: recommendation.id,
                    title: localizedText(recommendation.title, activeLocale),
                    eyebrow: localizedText(
                        recommendation.eyebrow,
                        activeLocale,
                    ),
                    image: recommendation.image.src,
                    imageAlt: localizedText(
                        recommendation.image.alt,
                        activeLocale,
                    ),
                    distance: localizedText(
                        recommendation.distance,
                        activeLocale,
                    ),
                    duration: localizedText(
                        recommendation.duration,
                        activeLocale,
                    ),
                    intro: localizedText(recommendation.intro, activeLocale),
                    sections: recommendation.sections.map((section) => ({
                        title: localizedText(section.title, activeLocale),
                        paragraphs: section.paragraphs.map((paragraph) =>
                            localizedText(paragraph, activeLocale),
                        ),
                        bullets: section.bullets.map((bullet) =>
                            localizedText(bullet, activeLocale),
                        ),
                    })),
                }),
            ),
    };
}

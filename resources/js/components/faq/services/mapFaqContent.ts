import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type { FaqItem, FaqPageContent, FaqPageText } from '../interfaces';
import { faqItems, faqText } from './faqMock';

type MappedFaqContent = {
    locale: LocaleCode;
    text: FaqPageText;
    contactEmail: string;
    items: FaqItem[];
};

export function mapFaqContent(
    content?: FaqPageContent | null,
    locale?: string | null,
): MappedFaqContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: faqText,
            contactEmail: 'reservaciones@hotelmesondemita.com',
            items: faqItems,
        };
    }

    return {
        locale: activeLocale,
        text: content.locales[activeLocale] ?? content.locales.es ?? faqText,
        contactEmail: content.contact_email,
        items: content.faqs
            .filter((item) => item.is_active)
            .sort((first, second) => first.order - second.order)
            .map((item) => ({
                id: item.id,
                question: localizedText(item.question, activeLocale),
                answer: localizedText(item.answer, activeLocale),
            })),
    };
}

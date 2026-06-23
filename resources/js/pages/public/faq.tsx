import { Head } from '@inertiajs/react';
import FaqShowcase from '@/components/faq/FaqShowcase';
import type { FaqPageContent } from '@/components/faq/interfaces';
import { mapFaqContent } from '@/components/faq/services/mapFaqContent';

interface FaqProps {
    pageContent?: FaqPageContent | null;
    locale?: string;
}

export default function Faq({ pageContent, locale }: FaqProps) {
    const { text } = mapFaqContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <FaqShowcase content={pageContent} locale={locale} />
        </>
    );
}

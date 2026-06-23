import { Head } from '@inertiajs/react';
import type { RecomendacionesPageContent } from '@/components/recomendaciones/interfaces';
import RecomendacionesShowcase from '@/components/recomendaciones/RecomendacionesShowcase';
import { mapRecomendacionesContent } from '@/components/recomendaciones/services/mapRecomendacionesContent';

interface RecomendacionesProps {
    pageContent?: RecomendacionesPageContent | null;
    locale?: string;
}

export default function Recomendaciones({
    pageContent,
    locale,
}: RecomendacionesProps) {
    const { text } = mapRecomendacionesContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <RecomendacionesShowcase
                    content={pageContent}
                    locale={locale}
                />
            </main>
        </>
    );
}

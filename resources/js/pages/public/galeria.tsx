import { Head } from '@inertiajs/react';
import GaleriaShowcase from '@/components/galeria/GaleriaShowcase';
import type { GaleriaPageContent } from '@/components/galeria/interfaces';
import { mapGaleriaContent } from '@/components/galeria/services/mapGaleriaContent';

interface GaleriaProps {
    pageContent?: GaleriaPageContent | null;
    locale?: string;
}

export default function Galeria({ pageContent, locale }: GaleriaProps) {
    const { text } = mapGaleriaContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <GaleriaShowcase content={pageContent} locale={locale} />
            </main>
        </>
    );
}

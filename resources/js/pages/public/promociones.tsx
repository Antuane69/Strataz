import { Head } from '@inertiajs/react';
import type { PromocionesPageContent } from '@/components/promociones/interface';
import PromocionesShowcase from '@/components/promociones/PromocionesShowcase';
import { mapPromocionesContent } from '@/components/promociones/services/mapPromocionesContent';

interface PromocionesProps {
  pageContent?: PromocionesPageContent | null;
  locale?: string;
};

export default function Promociones({ pageContent, locale }: PromocionesProps) {
    const { text } = mapPromocionesContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <PromocionesShowcase content={pageContent} locale={locale} />
            </main>
        </>
    );
}

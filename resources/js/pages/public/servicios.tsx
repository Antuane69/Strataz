import { Head } from '@inertiajs/react';
import type { ServiciosPageContent } from '@/components/servicios/interfaces';
import { mapServiciosContent } from '@/components/servicios/services/mapServiciosContent';
import ServiciosShowcase from '@/components/servicios/ServiciosShowcase';

interface ServiciosProps {
  pageContent?: ServiciosPageContent | null;
  locale?: string;
};

export default function Servicios({ pageContent, locale }: ServiciosProps) {
    const { text } = mapServiciosContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <ServiciosShowcase content={pageContent} locale={locale} />
            </main>
        </>
    );
}

import { Head } from '@inertiajs/react';
import BodasShowcase from '@/components/bodas/BodasShowcase';
import type { BodasPageContent } from '@/components/bodas/interfaces';
import { mapBodasContent } from '@/components/bodas/services/mapBodasContent';

interface BodasProps {
  pageContent?: BodasPageContent | null;
  locale?: string;
};

export default function Bodas({ pageContent, locale }: BodasProps) {
    const { text } = mapBodasContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <BodasShowcase content={pageContent} locale={locale} />
            </main>
        </>
    );
}

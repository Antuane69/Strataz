import { Head } from '@inertiajs/react';
import ContactoShowcase from '@/components/contacto/ContactoShowcase';
import type { ContactoPageContent } from '@/components/contacto/interfaces';
import { mapContactoContent } from '@/components/contacto/services/mapContactoContent';

interface ContactoProps {
    pageContent?: ContactoPageContent | null;
    locale?: string;
}

export default function Contacto({ pageContent, locale }: ContactoProps) {
    const { text } = mapContactoContent(pageContent, locale);

    return (
        <>
            <Head title={text.page_title} />

            <main>
                <ContactoShowcase content={pageContent} locale={locale} />
            </main>
        </>
    );
}

import { Head } from '@inertiajs/react';
import ContactoShowcase from '@/components/contacto/ContactoShowcase';

export default function Contacto() {
    return (
        <>
            <Head title="Contacto y ubicación" />

            <main>
                <ContactoShowcase />
            </main>
        </>
    );
}

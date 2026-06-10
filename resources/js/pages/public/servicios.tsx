import { Head } from '@inertiajs/react';
import ServiciosShowcase from '@/components/servicios/ServiciosShowcase';

export default function Servicios() {
    return (
        <>
            <Head title="Servicios" />

            <main>
                <ServiciosShowcase />
            </main>
        </>
    );
}

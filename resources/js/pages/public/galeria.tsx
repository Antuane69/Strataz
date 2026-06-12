import { Head } from '@inertiajs/react';
import GaleriaShowcase from '@/components/galeria/GaleriaShowcase';

export default function Galeria() {
    return (
        <>
            <Head title="Galería" />

            <main>
                <GaleriaShowcase />
            </main>
        </>
    );
}

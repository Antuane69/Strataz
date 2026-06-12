import { Head } from '@inertiajs/react';
import PromocionesShowcase from '@/components/promociones/PromocionesShowcase';

export default function Promociones() {
    return (
        <>
            <Head title="Promociones" />

            <main>
                <PromocionesShowcase />
            </main>
        </>
    );
}

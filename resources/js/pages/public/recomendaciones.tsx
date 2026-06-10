import { Head } from '@inertiajs/react';
import RecomendacionesShowcase from '@/components/recomendaciones/RecomendacionesShowcase';

export default function Recomendaciones() {
    return (
        <>
            <Head title="Recomendaciones" />

            <main>
                <RecomendacionesShowcase />
            </main>
        </>
    );
}

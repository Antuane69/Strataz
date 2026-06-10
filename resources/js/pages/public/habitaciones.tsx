import { Head } from '@inertiajs/react';
import HabitacionesShowcase from '@/components/habitaciones/HabitacionesShowcase';

export default function Habitaciones() {
    return (
        <>
            <Head title="Habitaciones" />

            <main>
                <HabitacionesShowcase />
            </main>
        </>
    );
}

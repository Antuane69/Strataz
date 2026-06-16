import { Head } from '@inertiajs/react';
import InicioMasonry from '@/components/inicio/InicioMasonry';

export default function Inicio() {
    return (
        <>
            <Head title="Inicio" />

            <main className="inicio-page">
                <section className="inicio-hero" aria-label="Meson de Mita">
                    <img
                        src="/imagenes/galeria/dashboard.jpg"
                        alt="Hotel Meson de Mita frente al mar"
                        className="inicio-hero-image"
                    />

                    <div className="inicio-hero-content">
                        <p className="inicio-hero-kicker">
                            Hotel
                        </p>
                        <h1>MESON DE MITA</h1>
                        <span>Playa y descanso</span>
                    </div>
                </section>

                <InicioMasonry />
            </main>
        </>
    );
}

import { Head } from '@inertiajs/react';
import InicioMasonry from '@/components/inicio/InicioMasonry';
import './inicio.css';

export default function Inicio() {
    return (
        <>
            <Head title="Inicio" />

            <main className="inicio-page">
                <section className="inicio-hero" aria-label="Meson de Mita">
                    <img
                        src="/galeria/dashboard.jpg"
                        alt="Hotel Meson de Mita"
                        className="inicio-hero-image"
                    />

                    <div className="inicio-hero-content">
                        <p className="inicio-hero-kicker">Hotel</p>
                        <h1>MESON DE MITA</h1>
                    </div>
                </section>

                <InicioMasonry />
            </main>
        </>
    );
}

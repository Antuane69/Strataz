import { Head } from '@inertiajs/react';
import { Hand, HeartPulse, ShieldCheck } from 'lucide-react';
import type { ComponentType } from 'react';

type ProtocolItem = {
    title: string;
    body: string;
    Icon: ComponentType<{ size?: number }>;
};

const protocols: ProtocolItem[] = [
    {
        title: 'Protocolo de prevención',
        body: 'Encontrarás gel antibacterial para desinfección de manos en recepción y áreas comunes, con señalización adicional para recordar los protocolos importantes de salud e higiene, como el lavado de manos, el distanciamiento físico y las recomendaciones preventivas durante la estancia.',
        Icon: Hand,
    },
    {
        title: 'Limpieza y desinfección',
        body: 'Reforzamos los procedimientos de limpieza en habitaciones, recepción, pasillos, sanitarios y áreas comunes, poniendo especial atención en superficies de contacto frecuente y usando productos adecuados para mantener espacios limpios y seguros.',
        Icon: ShieldCheck,
    },
    {
        title: 'Cuidado de huéspedes y personal',
        body: 'Nuestro equipo se mantiene atento a las recomendaciones de las autoridades sanitarias locales y nacionales. Promovemos medidas de higiene, seguimiento preventivo y atención oportuna para cuidar el bienestar de huéspedes, colaboradores y visitantes.',
        Icon: HeartPulse,
    },
];

export default function ProtocolosCovid() {
    return (
        <>
            <Head title="Protocolos COVID-19" />

            <main className="protocolos-covid-section">
                <section className="protocolos-covid-hero">
                    <p></p>
                    <h1>Protocolos, procedimientos y medidas preventivas sobre el COVID 19</h1>
                    <span>
                        A causa de la contingencia sanitaria por COVID-19 que
                        hemos experimentado a nivel mundial, es importante
                        protegernos.
                    </span>
                </section>

                <section
                    className="protocolos-covid-content"
                    aria-label="Protocolos COVID-19 del hotel"
                >
                    <div className="protocolos-covid-intro">
                        <p>
                            En Hotel Mesón de Mita la salud, la seguridad y el
                            bienestar de nuestros huéspedes y personal son
                            nuestra prioridad número uno.
                        </p>
                        <p>
                            Nos encontramos monitoreando y dando seguimiento a
                            las recomendaciones emitidas por la Organización
                            Mundial de la Salud (OMS), los Centros para el
                            Control de Enfermedades (CDC) y las autoridades
                            sanitarias locales y nacionales para garantizar un
                            entorno limpio y seguro para todos.
                        </p>
                    </div>

                    <div className="protocolos-covid-summary">
                        <h2>Resumen de medidas implementadas</h2>
                    </div>

                    <div className="protocolos-covid-list">
                        {protocols.map(({ title, body, Icon }) => (
                            <article key={title} className="protocol-card">
                                <span className="protocol-card-icon">
                                    <Icon size={22} />
                                </span>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

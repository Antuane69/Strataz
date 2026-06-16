import { ExternalLink, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import type { ContactInfo } from './interfaces';
import { arrivalRoutes } from './services/contactosMock';

const mapsUrl =
    'https://www.google.com.mx/maps/place/HOTEL+MESON+DE+MITA/@20.7718392,-105.5196837,17z/data=!3m1!4b1!4m8!3m7!1s0x8421134f5a0645e3:0xc48cf5e4f110a5b3!5m2!4m1!1i2!8m2!3d20.7718342!4d-105.517495';

const mapEmbedUrl =
    'https://www.google.com/maps?q=20.7718342,-105.517495&z=17&output=embed';

const contactInfo: ContactInfo[] = [
    {
        id: 'ubicacion',
        label: 'Ubicación',
        lines: ['Ave El Anclote 200', '63734 Punta de Mita, Nayarit.'],
        href: mapsUrl,
        external: true,
        icon: MapPin,
    },
    {
        id: 'telefono',
        label: 'Teléfono',
        lines: ['+52 329 291 6330', '+52 329 291 5161'],
        href: 'tel:+523292916330',
        icon: Phone,
    },
    {
        id: 'contacto',
        label: 'Contacto',
        lines: ['reservaciones@hotelmesondemita.com'],
        href: 'mailto:reservaciones@hotelmesondemita.com',
        icon: Mail,
    },
];

export default function ContactoShowcase() {
    return (
        <section className="contacto-section">
            <div className="contacto-hero">
                {/* <p>Contacto</p> */}
                <h1>Contacto y Ubicación</h1>
                <span>
                    Encuéntranos en el corazón de Punta de Mita, a unos pasos de
                    la playa y de la zona de El Anclote.
                </span>
            </div>

            <div className="contacto-info-bar" aria-label="Datos de contacto">
                {contactInfo.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer' : undefined}
                            className="contacto-info-item"
                        >
                            <span className="contacto-info-icon">
                                <Icon size={20} />
                            </span>
                            <span className="contacto-info-copy">
                                <span>{item.label}</span>
                                {item.lines.map((line) => (
                                    <strong key={`${item.id}-${line}`}>
                                        {line}
                                    </strong>
                                ))}
                            </span>
                        </a>
                    );
                })}
            </div>

            <div className="contacto-map-section">
                <div className="contacto-map-copy">
                    <p>
                        <Navigation size={18} />
                        Hotel Mesón de Mita
                    </p>
                    <h2>Estamos sobre Ave El Anclote</h2>
                    <span>
                        Este mapa marca la ubicación del hotel para que puedas
                        encontrarnos sin ningun problema.
                    </span>
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                        Abrir ruta en Google Maps
                        <ExternalLink size={16} />
                    </a>
                </div>

                <div className="contacto-map-frame">
                    <iframe
                        src={mapEmbedUrl}
                        title="Mapa de Hotel Mesón de Mita"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="contacto-arrival-section">
                <div className="contacto-arrival-intro">
                    <h2>Cómo llegar al hotel</h2>
                    {/* <span>
                        Estos bloques dejan lista la estructura para que puedas
                        cambiar el texto final por las instrucciones oficiales.
                    </span> */}
                </div>

                <div className="contacto-arrival-grid">
                    {arrivalRoutes.map((route) => {
                        const Icon = route.icon;

                        return (
                            <article
                                key={route.id}
                                className="contacto-arrival-card"
                            >
                                <div className="contacto-arrival-heading">
                                    <span>
                                        <Icon size={22} />
                                    </span>
                                    <div>
                                        <p>{route.eyebrow}</p>
                                        <h3>{route.title}</h3>
                                    </div>
                                </div>

                                {route.description && (
                                    <span className="contacto-arrival-description">
                                        {route.description}
                                    </span>
                                )}

                                {route.companias && (
                                    <>
                                        <span>
                                            Compañías aéreas que operan en el
                                            Aeropuerto Internacional Gustavo
                                            Díaz Ordaz:
                                        </span>
                                        <ol>
                                            {route.companias.map((compania) => (
                                                <li
                                                    key={`${route.id}-${compania}`}
                                                >
                                                    {compania}
                                                </li>
                                            ))}
                                        </ol>
                                    </>
                                )}

                                {route.footer && <span>{route.footer}</span>}

                                {route.steps && (
                                    <ol>
                                        {route.steps.map((step) => (
                                            <li key={`${route.id}-${step}`}>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

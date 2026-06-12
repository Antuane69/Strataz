import { Button } from 'antd';
import {
    BusFront,
    CarFront,
    ChevronRight,
    ExternalLink,
    Mail,
    MapPin,
    Navigation,
    Phone,
    Plane,
} from 'lucide-react';
import type { ComponentType } from 'react';

type IconComponent = ComponentType<{ size?: number }>;

type ContactInfo = {
    id: string;
    label: string;
    lines: string[];
    href: string;
    external?: boolean;
    icon: IconComponent;
};

type ArrivalRoute = {
    id: string;
    eyebrow: string;
    title: string;
    icon: IconComponent;
    steps: string[];
};

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

const arrivalRoutes: ArrivalRoute[] = [
    {
        id: 'via-aerea',
        eyebrow: 'Vía aérea',
        title: 'Desde el aeropuerto',
        icon: Plane,
        steps: [
            'Llega al Aeropuerto Internacional de Puerto Vallarta.',
            'Toma transporte privado, taxi autorizado o auto rentado hacia Punta de Mita.',
            'Sigue la ruta por Bahía de Banderas hasta incorporarte a la zona de El Anclote.',
            'Al entrar a Ave El Anclote, avanza hasta el número 200.',
        ],
    },
    {
        id: 'auto',
        eyebrow: 'Vía terrestre',
        title: 'En coche o autopista',
        icon: CarFront,
        steps: [
            'Conduce por la carretera hacia Cruz de Huanacaxtle y Punta de Mita.',
            'Continúa siguiendo los señalamientos a El Anclote.',
            'Antes de llegar a la playa, ubica Ave El Anclote y avanza al acceso del hotel.',
            'Puedes usar el mapa para abrir la ruta exacta desde tu punto de salida.',
        ],
    },
    {
        id: 'autobus',
        eyebrow: 'Transporte público',
        title: 'En autobús o camión',
        icon: BusFront,
        steps: [
            'Desde Puerto Vallarta, busca la ruta con dirección a Punta de Mita.',
            'Baja cerca de la zona de El Anclote o en el punto más próximo al hotel.',
            'Camina hacia Ave El Anclote o toma un taxi local para el tramo final.',
            'Confirma horarios y paradas el día de tu viaje.',
        ],
    },
];

export default function ContactoShowcase() {
    const handleContactRequest = () => {
        window.dispatchEvent(new CustomEvent('meson:open-contact-drawer'));
    };

    return (
        <section className="contacto-section">
            <div className="contacto-hero">
                <p>Contacto</p>
                <h1>Ubicaciones</h1>
                <span>
                    Encuéntranos en el corazón de Punta de Mita, a unos pasos
                    de la playa y de la zona de El Anclote.
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

                <Button
                    type="primary"
                    size="large"
                    className="contacto-drawer-button"
                    icon={<ChevronRight size={17} />}
                    iconPosition="end"
                    onClick={handleContactRequest}
                >
                    Contactar
                </Button>
            </div>

            <div className="contacto-map-section">
                <div className="contacto-map-copy">
                    <p>
                        <Navigation size={18} />
                        Hotel Mesón de Mita
                    </p>
                    <h2>Estamos sobre Ave El Anclote</h2>
                    <span>
                        Este mapa marca la ubicación del hotel para que tus
                        huéspedes puedan abrir la ruta desde Google Maps sin
                        salir perdidos entre indicaciones largas.
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
                    <p>Cómo llegar</p>
                    <h2>Rutas simples para llegar al hotel</h2>
                    <span>
                        Estos bloques dejan lista la estructura para que puedas
                        cambiar el texto final por las instrucciones oficiales.
                    </span>
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

                                <ol>
                                    {route.steps.map((step) => (
                                        <li key={`${route.id}-${step}`}>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

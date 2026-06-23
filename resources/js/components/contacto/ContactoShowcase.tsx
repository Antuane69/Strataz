import { ExternalLink, Navigation } from 'lucide-react';
import type { ContactoPageContent } from './interfaces';
import { mapContactoContent } from './services/mapContactoContent';

type ContactoShowcaseProps = {
    content?: ContactoPageContent | null;
    locale?: string | null;
};

export default function ContactoShowcase({
    content,
    locale,
}: ContactoShowcaseProps) {
    const mappedContent = mapContactoContent(content, locale);

    return (
        <section className="contacto-section">
            <div className="contacto-hero">
                <h1>{mappedContent.text.hero_title}</h1>
                <span>{mappedContent.text.hero_body}</span>
            </div>

            <div
                className="contacto-info-bar"
                aria-label={mappedContent.text.contact_info_aria_label}
            >
                {mappedContent.contactInfo.map((item) => {
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
                        {mappedContent.text.map_kicker}
                    </p>
                    <h2>{mappedContent.text.map_title}</h2>
                    <span>{mappedContent.text.map_body}</span>
                    <a
                        href={mappedContent.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {mappedContent.text.map_cta_label}
                        <ExternalLink size={16} />
                    </a>
                </div>

                <div className="contacto-map-frame">
                    <iframe
                        src={mappedContent.mapEmbedUrl}
                        title={mappedContent.text.map_iframe_title}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="contacto-arrival-section">
                <div className="contacto-arrival-intro">
                    <h2>{mappedContent.text.arrival_title}</h2>
                    {mappedContent.text.arrival_body && (
                        <span>{mappedContent.text.arrival_body}</span>
                    )}
                </div>

                <div className="contacto-arrival-grid">
                    {mappedContent.arrivalRoutes.map((route) => {
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

                                {route.companies.length > 0 && (
                                    <>
                                        <span>
                                            {mappedContent.text.airlines_intro}
                                        </span>
                                        <ol>
                                            {route.companies.map((company) => (
                                                <li
                                                    key={`${route.id}-${company}`}
                                                >
                                                    {company}
                                                </li>
                                            ))}
                                        </ol>
                                    </>
                                )}

                                {route.footer && <span>{route.footer}</span>}

                                {route.steps.length > 0 && (
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

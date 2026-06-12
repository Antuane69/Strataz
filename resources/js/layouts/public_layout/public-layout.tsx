import { Link, usePage } from '@inertiajs/react';
import { Flex, Image, Layout, Menu } from 'antd';
import { useState } from 'react';
import type { ReactNode } from 'react';
import PublicBookingBar from '@/components/public-booking-bar';

const { Header, Content, Footer } = Layout;

function Flag({ country }: { country: 'mex' | 'us' }) {
    return (
        <Flex align="center" gap={6}>
            <img
                src={`/flags/${country}_flag.svg`}
                alt={country === 'mex' ? 'Espanol' : 'English'}
                className="language-flag"
            />
            <span>{country === 'mex' ? 'Espanol' : 'English'}</span>
        </Flex>
    );
}

export default function PublicLayout({ children }: { children: ReactNode }) {
    const page = usePage();
    const currentPath = page.url.split('?')[0];
    const [locale, setLocale] = useState<string>('es');

    const items = [
        { key: '/', label: <Link href="/">INICIO</Link> },
        {
            key: '/habitaciones',
            label: <Link href="/habitaciones">HABITACIONES</Link>,
        },
        { key: '/servicios', label: <Link href="/servicios">SERVICIOS</Link> },
        {
            key: '/promociones',
            label: <Link href="/promociones">PROMOCIONES</Link>,
        },
        { key: '/bodas', label: <Link href="/bodas">BODAS</Link> },
        {
            key: '/recomendaciones',
            label: <Link href="/recomendaciones">RECOMENDACIONES</Link>,
        },
        { key: '/galeria', label: <Link href="/galeria">GALERIA</Link> },
        {
            key: '/contacto',
            label: <Link href="/contacto">CONTACTO | UBICACION</Link>,
        },
    ];

    return (
        <Layout className="min-h-screen bg-white">
            <Header className="public-site-header sticky top-0 z-20 flex items-center gap-6 px-6 shadow-sm">
                <Link href="/" className="text-lg font-semibold">
                    <Image
                        preview={false}
                        src="/logos/mesonDeMitaHeader.jpg"
                        className="imagen-header"
                    />
                </Link>

                <Menu
                    mode="horizontal"
                    items={items}
                    selectedKeys={[currentPath]}
                    className="public-site-menu"
                />

                <button
                    type="button"
                    className={`public-language-toggle ${
                        locale === 'en' ? 'is-english' : ''
                    }`}
                    onClick={() =>
                        setLocale((current) =>
                            current === 'en' ? 'es' : 'en',
                        )
                    }
                    aria-label="Cambiar idioma"
                >
                    <span className="public-language-toggle-thumb" />
                    <span className="public-language-toggle-content">
                        <Flag country={locale === 'en' ? 'us' : 'mex'} />
                    </span>
                </button>
            </Header>

            <div className="public-booking-boundary">
                <PublicBookingBar />

                <Content className="content-body">{children}</Content>
            </div>

            <Footer className="public-site-footer">
                <div className="public-site-footer-grid">
                    <section className="public-site-footer-column">
                        <h3>Acerca de</h3>
                        <p>
                            El <strong>Hotel Mesón de Mita</strong>, se
                            encuentra en la zona norte de Bahía de Banderas, en
                            el corazón de los mega desarrollos de Punta de Mita,
                            a tan solo 45 minutos del Aeropuerto Internacional y
                            la central de autobuses de Puerto Vallarta.
                        </p>
                    </section>

                    <section className="public-site-footer-column">
                        <h3>Contacto</h3>
                        <p>
                            Ave El Anclote 200, 63734 Punta de Mita, Nay.
                            <br />
                            +52 329 291 6330
                            <br />
                            +52 329 291 5161
                            <br />
                            reservaciones@hotelmesondemita.com
                        </p>
                    </section>

                    <section className="public-site-footer-column">
                        <h3>Ayuda</h3>
                        <p>
                            <Link href="/faq">FAQ's</Link>
                            <Link href="/faq">Protocolos COVID-19</Link>
                        </p>
                    </section>
                </div>
            </Footer>
        </Layout>
    );
}

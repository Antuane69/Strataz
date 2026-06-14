import { Button, Carousel, Divider, Drawer, Image, Tag } from 'antd';
import {
    BedDouble,
    Coffee,
    MapPin,
    ShowerHead,
    Snowflake,
    Tv,
    UsersRound,
    Waves,
    Wifi,
    X,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, KeyboardEvent } from 'react';
import type {
    Habitacion,
    HabitacionAmenity,
    HotelCancellationPolicy,
} from './interfaces';
import { habitaciones, hotelInfo } from './services/habitacionesMock';

const amenityIcons: Record<
    HabitacionAmenity,
    ComponentType<{ size?: number }>
> = {
    capacity: UsersRound,
    bed: BedDouble,
    ac: Snowflake,
    tv: Tv,
    wifi: Wifi,
    ocean: Waves,
    bath: ShowerHead,
    coffee: Coffee,
    terrace: MapPin,
};

function AmenityIcon({
    amenity,
}: {
    amenity: Habitacion['amenities'][number];
}) {
    const Icon = amenityIcons[amenity.type];

    return (
        <span className="habitacion-amenity">
            <Icon size={17} />
            <span>{amenity.label}</span>
        </span>
    );
}

function HabitacionCard({
    habitacion,
    onSelect,
}: {
    habitacion: Habitacion;
    onSelect: (habitacion: Habitacion) => void;
}) {
    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(habitacion);
        }
    };

    return (
        <article
            className="habitacion-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelect(habitacion)}
            onKeyDown={handleKeyDown}
            aria-label={`Ver detalles de ${habitacion.name}`}
        >
            <div className="habitacion-card-image-wrap">
                <img
                    src={habitacion.images[0].src}
                    alt={habitacion.images[0].alt}
                    className="habitacion-card-image"
                    loading="lazy"
                />
                {/* <span className="habitacion-card-eyebrow">
                    {habitacion.eyebrow}
                </span> */}
            </div>

            <div className="habitacion-card-body">
                <h2>{habitacion.name}</h2>
                <p>{habitacion.shortDescription}</p>

                <div
                    className="habitacion-amenities"
                    aria-label="Amenidades principales"
                >
                    {habitacion.amenities.map((amenity) => (
                        <AmenityIcon
                            key={`${habitacion.id}-${amenity.type}`}
                            amenity={amenity}
                        />
                    ))}
                </div>

                <span className="habitacion-card-link">Ver detalles +</span>
            </div>
        </article>
    );
}

function CancellationPolicyTable({
    policy,
}: {
    policy: HotelCancellationPolicy;
}) {
    return (
        <div className="habitacion-detail-section">
            <div className="habitacion-cancellation-heading">
                <h3>Política de cancelaciones</h3>
                <span>Depósito de reservación</span>
            </div>

            <p className="habitacion-drawer-description">
                {policy.description}
            </p>

            <div className="habitacion-cancellation-table-wrap">
                <table className="habitacion-cancellation-table">
                    <thead>
                        <tr>
                            <th scope="col">Semanas antes de llegada</th>
                            <th scope="col">Reembolso</th>
                            <th scope="col">Crédito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policy.rows.map((row) => (
                            <tr key={row.weeksBeforeArrival}>
                                <th scope="row">{row.weeksBeforeArrival}</th>
                                <td>{row.refund}</td>
                                <td>{row.credit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function HabitacionDrawer({
    habitacion,
    open,
    onClose,
}: {
    habitacion?: Habitacion;
    open: boolean;
    onClose: () => void;
}) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    const openImagePreview = (index: number) => {
        setPreviewIndex(index);
        setPreviewOpen(true);
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            width="min(700px, 100vw)"
            placement="right"
            destroyOnHidden
            className="habitacion-drawer"
            rootClassName="habitacion-drawer-root"
            closable={false}
            title={null}
        >
            {habitacion && (
                <div className="habitacion-drawer-content">
                    <button
                        type="button"
                        className="habitacion-drawer-close"
                        onClick={onClose}
                        aria-label="Cerrar detalles"
                    >
                        <X size={20} />
                    </button>

                    <section
                        className="habitacion-drawer-hero"
                        aria-label={habitacion.name}
                    >
                        <Image.PreviewGroup
                            items={habitacion.images.map((image) => ({
                                src: image.src,
                                alt: image.alt,
                            }))}
                            preview={{
                                open: previewOpen,
                                current: previewIndex,
                                onOpenChange: (isOpen) =>
                                    setPreviewOpen(isOpen),
                                onChange: (current) => setPreviewIndex(current),
                            }}
                        >
                            <Carousel
                                autoplay
                                arrows
                                draggable
                                className="habitacion-carousel"
                            >
                                {habitacion.images.map((image, index) => (
                                    <div key={image.src}>
                                        <button
                                            type="button"
                                            className="habitacion-hero-preview-button"
                                            onClick={() =>
                                                openImagePreview(index)
                                            }
                                            aria-label={`Abrir imagen ${index + 1} de ${habitacion.name}`}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="habitacion-hero-image"
                                            />
                                            <span>Ver imagen</span>
                                        </button>
                                    </div>
                                ))}
                            </Carousel>
                        </Image.PreviewGroup>
                    </section>

                    <section className="habitacion-drawer-main">
                        <div className="habitacion-drawer-title">
                            {/* <p>{habitacion.eyebrow}</p> */}
                            <h2>{habitacion.name}</h2>
                        </div>

                        {/* <div className="habitacion-drawer-summary">
                            <div>
                                <UsersRound size={20} />
                                <span>{habitacion.capacity}</span>
                            </div>
                            <div>
                                <BedDouble size={20} />
                                <span>{habitacion.bed}</span>
                            </div>
                            <div>
                                <Maximize2 size={20} />
                                <span>{habitacion.size}</span>
                            </div>
                        </div> */}

                        <p className="habitacion-drawer-description">
                            {habitacion.description}
                        </p>

                        <Divider />

                        <div className="habitacion-detail-section">
                            <h3>Características</h3>
                            <div className="habitacion-highlight-list">
                                {habitacion.highlights.map((highlight) => (
                                    <Tag
                                        key={highlight}
                                        className="habitacion-highlight-tag"
                                    >
                                        {highlight}
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        <div className="habitacion-detail-section">
                            <h3>Amenidades</h3>
                            <ul className="habitacion-included-list">
                                {habitacion.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="habitacion-detail-section">
                            <h3>Información del hotel</h3>
                            <div className="habitacion-stay-info-grid">
                                <div>
                                    <span>Entrada</span>
                                    <strong>{hotelInfo.checkIn}</strong>
                                </div>
                                <div>
                                    <span>Salida</span>
                                    <strong>{hotelInfo.checkOut}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="habitacion-detail-section">
                            <h3>Política de pagos</h3>
                            <p className="habitacion-drawer-description">
                                {hotelInfo.paymentPolicy}
                            </p>
                        </div>

                        <CancellationPolicyTable
                            policy={hotelInfo.cancellationPolicy}
                        />

                        <div className="habitacion-detail-section">
                            <h3>No arribo</h3>
                            <p className="habitacion-drawer-description">
                                {hotelInfo.noShowPolicy}
                            </p>
                        </div>

                        <div className="habitacion-detail-section">
                            <h3>Personas extra</h3>
                            <p className="habitacion-drawer-description">
                                {hotelInfo.extraGuestPolicy}
                            </p>
                        </div>

                        <div className="habitacion-drawer-actions">
                            <Button
                                type="primary"
                                size="large"
                                href="/contacto"
                            >
                                Reservar
                            </Button>
                            <Button size="large" href="tel:+523292916330">
                                Llamar al hotel
                            </Button>
                        </div>
                    </section>
                </div>
            )}
        </Drawer>
    );
}

export default function HabitacionesShowcase() {
    const [selectedHabitacion, setSelectedHabitacion] = useState<
        Habitacion | undefined
    >();

    return (
        <section className="habitaciones-section">
            <div className="habitaciones-intro">
                {/* <p>Habitaciones</p> */}
                <h1>Habitaciones</h1>
                <span>
                    El hotel Mesón de Mita cuenta con 25 cómodas habitaciones
                    dentro de un ambiente de relax rodeado de jardines con
                    alberca junto al mar. Las habitaciones cada una con propia
                    personalidad, son espaciosas llenas de luz y color además de
                    emitir un ambiente de confort y estilo mexicano. La
                    proximidad que mantiene el hotel con la playa, la vista
                    espectacular de las Islas Marietas y la tranquilidad del
                    entorno, se mezclan en armonía para hacer de este sitio el
                    paraíso terrenal.
                </span>
            </div>

            <div className="habitaciones-grid">
                {habitaciones.map((habitacion) => (
                    <HabitacionCard
                        key={habitacion.id}
                        habitacion={habitacion}
                        onSelect={setSelectedHabitacion}
                    />
                ))}
            </div>

            <HabitacionDrawer
                habitacion={selectedHabitacion}
                open={Boolean(selectedHabitacion)}
                onClose={() => setSelectedHabitacion(undefined)}
            />
        </section>
    );
}

import { Button, Carousel, Divider, Drawer, Image, Tag } from 'antd';
import {
    AirVent,
    Ban,
    BedDouble,
    CalendarDays,
    Clock3,
    Coffee,
    CreditCard,
    DoorOpen,
    Droplets,
    Fan,
    Flame,
    HandPlatter,
    Info,
    MapPin,
    Monitor,
    PackageCheck,
    Refrigerator,
    ScanFace,
    ShowerHead,
    Snowflake,
    Sparkles,
    Shirt,
    Tv,
    Utensils,
    UsersRound,
    Vault,
    Waves,
    Wifi,
    X,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, KeyboardEvent, ReactNode } from 'react';
import type {
    Habitacion,
    HabitacionAmenity,
    HabitacionRoomAmenityIcon,
    HotelCancellationPolicy,
    HotelInfo,
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

const roomAmenityIcons: Record<
    HabitacionRoomAmenityIcon,
    ComponentType<{ size?: number }>
> = {
    ac: AirVent,
    'smart-tv': Monitor,
    wifi: Wifi,
    safe: Vault,
    fan: Fan,
    'private-bath': ShowerHead,
    cleaning: Sparkles,
    towels: HandPlatter,
    'bath-kit': Droplets,
    terrace: Waves,
    minibar: Refrigerator,
    coffee: Coffee,
    iron: Shirt,
    'pool-towels': PackageCheck,
    'hair-dryer': AirVent,
    'makeup-mirror': ScanFace,
    stove: Flame,
    kitchenware: Utensils,
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

function RoomAmenityCard({
    amenity,
    compact = false,
}: {
    amenity: Habitacion['roomAmenities'][number];
    compact?: boolean;
}) {
    const Icon = roomAmenityIcons[amenity.type];

    return (
        <article
            className={`habitacion-room-amenity-card ${
                compact ? 'habitacion-room-amenity-card-compact' : ''
            }`}
        >
            <span className="habitacion-room-amenity-icon">
                <Icon size={32} />
            </span>
            <div>
                <h4>{amenity.name}</h4>
                <p>{amenity.description}</p>
            </div>
        </article>
    );
}

function RoomAmenitiesSection({ habitacion }: { habitacion: Habitacion }) {
    return (
        <section
            className="habitacion-room-amenities-section"
            aria-labelledby={`${habitacion.id}-room-amenities-title`}
        >
            <div className="habitacion-room-amenities-heading">
                {/* <Sparkles size={18} /> */}
                <h3 id={`${habitacion.id}-room-amenities-title`}>
                    Amenidades en tu habitación
                </h3>
                <p>
                    Todo lo que necesitas para una estancia cómoda y placentera.
                </p>
            </div>

            <div className="habitacion-room-amenities-grid">
                {habitacion.roomAmenities.map((amenity) => (
                    <RoomAmenityCard
                        key={`${habitacion.id}-${amenity.type}-${amenity.name}`}
                        amenity={amenity}
                    />
                ))}
            </div>

            {habitacion.requestAmenities &&
                habitacion.requestAmenities.length > 0 && (
                    <div className="habitacion-room-amenities-request">
                        <div className="habitacion-room-amenities-request-heading">
                            <Info size={18} />
                            <div>
                                <strong>Accesorios bajo solicitud</strong>
                                <span>
                                    Sujetos a disponibilidad, solicítalos en
                                    recepción.
                                </span>
                            </div>
                        </div>
                        <div className="habitacion-room-amenities-request-grid">
                            {habitacion.requestAmenities.map((amenity) => (
                                <RoomAmenityCard
                                    key={`${habitacion.id}-request-${amenity.type}-${amenity.name}`}
                                    amenity={amenity}
                                    compact
                                />
                            ))}
                        </div>
                    </div>
                )}
        </section>
    );
}

function formatBedCount(count: number) {
    return `${count} ${count === 1 ? 'cama' : 'camas'}`;
}

function formatGuestCapacity(count: number) {
    return `Hasta ${count} ${count === 1 ? 'huésped' : 'huéspedes'}`;
}

function splitPolicyText(text: string) {
    return text
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
}

function PolicyTextRows({ text }: { text: string }) {
    const rows = splitPolicyText(text);

    return (
        <div className="habitacion-policy-text-rows">
            {rows.map((row, index) => (
                <p key={`${row}-${index}`}>{row}</p>
            ))}
        </div>
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
    const bedCountLabel = formatBedCount(habitacion.imageStats.beds);
    const guestCapacityLabel = formatGuestCapacity(
        habitacion.imageStats.maxGuests,
    );

    return (
        <article
            className="habitacion-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelect(habitacion)}
            onKeyDown={handleKeyDown}
            aria-label={`Ver detalles de ${habitacion.name}. ${bedCountLabel}. ${guestCapacityLabel}.`}
        >
            <div className="habitacion-card-image-wrap">
                <img
                    src={habitacion.images[0].src}
                    alt={habitacion.images[0].alt}
                    className="habitacion-card-image"
                    loading="lazy"
                />
                <div className="habitacion-card-image-stats" aria-hidden="true">
                    <span className="habitacion-card-image-stat">
                        <BedDouble size={16} />
                        <span>{bedCountLabel}</span>
                    </span>
                    <span className="habitacion-card-image-stat">
                        <UsersRound size={16} />
                        <span>{guestCapacityLabel}</span>
                    </span>
                </div>
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
    );
}

function PolicyCard({
    title,
    icon: Icon,
    tone = 'teal',
    className = '',
    children,
}: {
    title: string;
    icon: ComponentType<{ size?: number }>;
    tone?: 'teal' | 'gold' | 'coral' | 'blue';
    className?: string;
    children: ReactNode;
}) {
    return (
        <article
            className={`habitacion-policy-card habitacion-policy-card-${tone} ${className}`}
        >
            <div className="habitacion-policy-card-heading">
                <span className="habitacion-policy-icon">
                    <Icon size={22} />
                </span>
                <h4>{title}</h4>
            </div>
            {children}
        </article>
    );
}

function HotelPolicies({ info }: { info: HotelInfo }) {
    return (
        <section
            className="habitacion-policy-board"
            aria-labelledby="habitacion-policy-board-title"
        >
            <div className="habitacion-policy-board-heading">
                <h3 id="habitacion-policy-board-title">
                    Políticas de reservación
                </h3>
                <span>Todo lo necesario para tu estancia</span>
            </div>

            <div className="habitacion-policy-grid">
                <PolicyCard title="Horarios" icon={Clock3}>
                    <div className="habitacion-policy-time-list">
                        <div>
                            <DoorOpen size={20} />
                            <span>Check-in</span>
                            <strong>{info.checkIn}</strong>
                        </div>
                        <div>
                            <DoorOpen size={20} />
                            <span>Check-out</span>
                            <strong>{info.checkOut}</strong>
                        </div>
                    </div>
                </PolicyCard>

                <PolicyCard
                    title="Política de pago"
                    icon={CreditCard}
                    tone="gold"
                >
                    <PolicyTextRows text={info.paymentPolicy} />
                </PolicyCard>

                <PolicyCard
                    title="Política de cancelación"
                    icon={CalendarDays}
                    className="habitacion-policy-card-wide"
                >
                    <PolicyTextRows
                        text={info.cancellationPolicy.description}
                    />
                    <CancellationPolicyTable policy={info.cancellationPolicy} />
                    <div className="habitacion-policy-note">
                        <Info size={18} />
                        <PolicyTextRows
                            text={info.cancellationPolicy.description_end}
                        />
                    </div>
                </PolicyCard>

                <PolicyCard title="Política de no show" icon={Ban} tone="coral">
                    <PolicyTextRows text={info.noShowPolicy} />
                </PolicyCard>

                <PolicyCard
                    title="Personas extra"
                    icon={UsersRound}
                    tone="blue"
                >
                    <PolicyTextRows text={info.extraGuestPolicy} />
                </PolicyCard>
            </div>
        </section>
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
            width="min(700px, 180vw)"
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

                        <br/>
                        
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

                        <Divider />

                        <RoomAmenitiesSection habitacion={habitacion} />

                        <HotelPolicies info={hotelInfo} />

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

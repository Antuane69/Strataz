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
    HabitacionImage,
    HabitacionesPageContent,
    HabitacionesPageText,
    HabitacionRoomAmenityIcon,
    HotelCancellationPolicy,
    HotelInfo,
} from './interfaces';
import { mapHabitacionesContent } from './services/mapHabitacionesContent';

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

function HabitacionMedia({
    media,
    className,
    controls = false,
}: {
    media: HabitacionImage;
    className: string;
    controls?: boolean;
}) {
    if (media.type === 'video') {
        return (
            <video
                className={className}
                src={media.src}
                poster={media.poster ?? undefined}
                controls={controls}
                muted={!controls}
                playsInline
                preload="metadata"
            />
        );
    }

    return <img src={media.src} alt={media.alt} className={className} />;
}

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

function RoomAmenitiesSection({
    habitacion,
    text,
}: {
    habitacion: Habitacion;
    text: HabitacionesPageText;
}) {
    return (
        <section
            className="habitacion-room-amenities-section"
            aria-labelledby={`${habitacion.id}-room-amenities-title`}
        >
            <div className="habitacion-room-amenities-heading">
                {/* <Sparkles size={18} /> */}
                <h3 id={`${habitacion.id}-room-amenities-title`}>
                    {text.room_amenities_title}
                </h3>
                <p>{text.room_amenities_body}</p>
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
                                <strong>{text.request_amenities_title}</strong>
                                <span>{text.request_amenities_body}</span>
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

function formatBedCount(count: number, text: HabitacionesPageText) {
    return `${count} ${count === 1 ? text.bed_singular : text.bed_plural}`;
}

function formatGuestCapacity(count: number, text: HabitacionesPageText) {
    return `${text.guest_capacity_prefix} ${count} ${
        count === 1 ? text.guest_singular : text.guest_plural
    }`;
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
    text,
}: {
    habitacion: Habitacion;
    onSelect: (habitacion: Habitacion) => void;
    text: HabitacionesPageText;
}) {
    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(habitacion);
        }
    };
    const bedCountLabel = formatBedCount(habitacion.imageStats.beds, text);
    const guestCapacityLabel = formatGuestCapacity(
        habitacion.imageStats.maxGuests,
        text,
    );
    const coverMedia = habitacion.images[0];

    return (
        <article
            className="habitacion-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelect(habitacion)}
            onKeyDown={handleKeyDown}
            aria-label={`${text.details_label} ${habitacion.name}. ${bedCountLabel}. ${guestCapacityLabel}.`}
        >
            <div className="habitacion-card-image-wrap">
                <HabitacionMedia
                    media={coverMedia}
                    className="habitacion-card-image"
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
                    aria-label={text.main_amenities_label}
                >
                    {habitacion.amenities.map((amenity) => (
                        <AmenityIcon
                            key={`${habitacion.id}-${amenity.type}`}
                            amenity={amenity}
                        />
                    ))}
                </div>

                <span className="habitacion-card-link">{text.card_cta}</span>
            </div>
        </article>
    );
}

function CancellationPolicyTable({
    policy,
    text,
}: {
    policy: HotelCancellationPolicy;
    text: HabitacionesPageText;
}) {
    return (
        <div className="habitacion-cancellation-table-wrap">
            <table className="habitacion-cancellation-table">
                <thead>
                    <tr>
                        <th scope="col">{text.arrival_weeks_label}</th>
                        <th scope="col">{text.refund_label}</th>
                        <th scope="col">{text.credit_label}</th>
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

function HotelPolicies({
    info,
    text,
}: {
    info: HotelInfo;
    text: HabitacionesPageText;
}) {
    return (
        <section
            className="habitacion-policy-board"
            aria-labelledby="habitacion-policy-board-title"
        >
            <div className="habitacion-policy-board-heading">
                <h3 id="habitacion-policy-board-title">
                    {text.policies_title}
                </h3>
                <span>{text.policies_subtitle}</span>
            </div>

            <div className="habitacion-policy-grid">
                <PolicyCard title={text.schedule_policy_title} icon={Clock3}>
                    <div className="habitacion-policy-time-list">
                        <div>
                            <DoorOpen size={20} />
                            <span>{text.check_in_label}</span>
                            <strong>{info.checkIn}</strong>
                        </div>
                        <div>
                            <DoorOpen size={20} />
                            <span>{text.check_out_label}</span>
                            <strong>{info.checkOut}</strong>
                        </div>
                    </div>
                </PolicyCard>

                <PolicyCard
                    title={text.payment_policy_title}
                    icon={CreditCard}
                    tone="gold"
                >
                    <PolicyTextRows text={info.paymentPolicy} />
                </PolicyCard>

                <PolicyCard
                    title={text.cancellation_policy_title}
                    icon={CalendarDays}
                    className="habitacion-policy-card-wide"
                >
                    <PolicyTextRows
                        text={info.cancellationPolicy.description}
                    />
                    <CancellationPolicyTable
                        policy={info.cancellationPolicy}
                        text={text}
                    />
                    <div className="habitacion-policy-note">
                        <Info size={18} />
                        <PolicyTextRows
                            text={info.cancellationPolicy.description_end}
                        />
                    </div>
                </PolicyCard>

                <PolicyCard
                    title={text.no_show_policy_title}
                    icon={Ban}
                    tone="coral"
                >
                    <PolicyTextRows text={info.noShowPolicy} />
                </PolicyCard>

                <PolicyCard
                    title={text.extra_guest_policy_title}
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
    hotelInfo,
    text,
    scoped = false,
}: {
    habitacion?: Habitacion;
    open: boolean;
    onClose: () => void;
    hotelInfo: HotelInfo;
    text: HabitacionesPageText;
    scoped?: boolean;
}) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const previewImages =
        habitacion?.images.filter((image) => image.type !== 'video') ?? [];

    const openImagePreview = (image: HabitacionImage) => {
        const index = previewImages.findIndex(
            (preview) => preview.src === image.src,
        );

        setPreviewIndex(Math.max(index, 0));
        setPreviewOpen(true);
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            width={scoped ? 'min(560px, 100%)' : 'min(700px, 180vw)'}
            placement="right"
            destroyOnHidden
            getContainer={scoped ? false : undefined}
            rootStyle={scoped ? { position: 'absolute' } : undefined}
            maskStyle={scoped ? { position: 'absolute' } : undefined}
            className={`habitacion-drawer ${
                scoped ? 'habitacion-drawer-scoped' : ''
            }`}
            rootClassName={`habitacion-drawer-root ${
                scoped ? 'habitacion-drawer-root-scoped' : ''
            }`}
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
                            items={previewImages.map((image) => ({
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
                                {habitacion.images.map((image) => (
                                    <div key={image.id ?? image.src}>
                                        {image.type === 'video' ? (
                                            <HabitacionMedia
                                                media={image}
                                                className="habitacion-hero-image"
                                                controls
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                className="habitacion-hero-preview-button"
                                                onClick={() =>
                                                    openImagePreview(image)
                                                }
                                                aria-label={`${text.image_preview_label} ${habitacion.name}`}
                                            >
                                                <HabitacionMedia
                                                    media={image}
                                                    className="habitacion-hero-image"
                                                />
                                                <span>
                                                    {text.image_preview_label}
                                                </span>
                                            </button>
                                        )}
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

                        <br />

                        <div className="habitacion-detail-section">
                            <h3>{text.feature_heading}</h3>
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

                        <RoomAmenitiesSection
                            habitacion={habitacion}
                            text={text}
                        />

                        <HotelPolicies info={hotelInfo} text={text} />

                        <div className="habitacion-drawer-actions">
                            <Button
                                type="primary"
                                size="large"
                                href="/contacto"
                            >
                                {text.reserve_cta}
                            </Button>
                            <Button size="large" href="tel:+523292916330">
                                {text.call_cta}
                            </Button>
                        </div>
                    </section>
                </div>
            )}
        </Drawer>
    );
}

type HabitacionesShowcaseProps = {
    content?: HabitacionesPageContent | null;
    locale?: string | null;
    drawerScope?: 'page' | 'preview';
};

export default function HabitacionesShowcase({
    content,
    locale,
    drawerScope = 'page',
}: HabitacionesShowcaseProps = {}) {
    const [selectedHabitacion, setSelectedHabitacion] = useState<
        Habitacion | undefined
    >();
    const mappedContent = mapHabitacionesContent(content, locale);
    const { habitaciones, hotelInfo, text } = mappedContent;

    return (
        <section className="habitaciones-section">
            <div className="habitaciones-intro">
                {/* <p>{text.page_title}</p> */}
                <h1>{text.intro_title}</h1>
                <span>{text.intro_body}</span>
            </div>

            <div className="habitaciones-grid">
                {habitaciones.map((habitacion) => (
                    <HabitacionCard
                        key={habitacion.id}
                        habitacion={habitacion}
                        onSelect={setSelectedHabitacion}
                        text={text}
                    />
                ))}
            </div>

            <HabitacionDrawer
                habitacion={selectedHabitacion}
                open={Boolean(selectedHabitacion)}
                onClose={() => setSelectedHabitacion(undefined)}
                hotelInfo={hotelInfo}
                text={text}
                scoped={drawerScope === 'preview'}
            />
        </section>
    );
}

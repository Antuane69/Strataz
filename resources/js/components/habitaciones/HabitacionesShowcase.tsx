import { Button, Carousel, Divider, Drawer, Tag } from 'antd';
import {
    BedDouble,
    Coffee,
    MapPin,
    Maximize2,
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

type HabitacionAmenity =
    | 'capacity'
    | 'bed'
    | 'ac'
    | 'tv'
    | 'wifi'
    | 'ocean'
    | 'bath'
    | 'coffee'
    | 'terrace';

type HabitacionImage = {
    src: string;
    alt: string;
};

type Habitacion = {
    id: string;
    name: string;
    eyebrow: string;
    shortDescription: string;
    description: string;
    capacity: string;
    bed: string;
    size: string;
    images: HabitacionImage[];
    highlights: string[];
    included: string[];
    amenities: {
        type: HabitacionAmenity;
        label: string;
    }[];
};

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

const habitaciones: Habitacion[] = [
    {
        id: 'doble-vista-mar',
        name: 'Habitación doble con vista al mar',
        eyebrow: 'Vista al mar',
        shortDescription:
            'Cama matrimonial o queen, aire acondicionado, TV y una terraza para descansar frente a Punta de Mita.',
        description:
            'Una habitación luminosa y tranquila para parejas o viajeros que buscan despertar cerca del mar. Combina techo tipo palapa, detalles de madera y una terraza privada ideal para bajar el ritmo después de la playa.',
        capacity: '2 personas',
        bed: 'Matrimonial o queen',
        size: 'Amplia estancia con terraza',
        images: [
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-05.jpg',
                alt: 'Habitación doble con cama queen y vista hacia la terraza',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
                alt: 'Terraza de habitación doble con vista al mar',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
                alt: 'Baño privado de habitación doble',
            },
        ],
        highlights: [
            'Vista al mar desde terraza',
            'Aire acondicionado',
            'Baño privado',
            'TV en habitación',
        ],
        included: [
            'Terraza o balcón',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a áreas comunes del hotel',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Queen' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'ocean', label: 'Vista' },
        ],
    },
    {
        id: 'doble-estandar',
        name: 'Habitación doble estándar',
        eyebrow: 'Cómoda y fresca',
        shortDescription:
            'Una opción práctica para descansar con cama matrimonial, baño privado, aire acondicionado y TV.',
        description:
            'Pensada para estancias relajadas y funcionales, esta habitación ofrece lo esencial para descansar bien entre salidas a la playa, recorridos por Punta de Mita y tardes en la alberca.',
        capacity: '2 personas',
        bed: 'Matrimonial',
        size: 'Distribución práctica',
        images: [
            {
                src: '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
                alt: 'Habitación doble estándar con cama matrimonial',
            },
            {
                src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
                alt: 'Baño privado con regadera',
            },
            {
                src: '/imagenes/galeria/areas_comunes_03.jpg',
                alt: 'Áreas comunes del hotel',
            },
        ],
        highlights: [
            'Cama matrimonial',
            'Aire acondicionado',
            'Baño privado',
            'Cerca de áreas comunes',
        ],
        included: [
            'Cama matrimonial',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a alberca y áreas comunes',
        ],
        amenities: [
            { type: 'capacity', label: '2 huéspedes' },
            { type: 'bed', label: 'Matrimonial' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño' },
        ],
    },
    {
        id: 'triple-familiar',
        name: 'Habitación triple familiar',
        eyebrow: 'Para compartir',
        shortDescription:
            'Dos camas, baño privado, aire acondicionado y espacio cómodo para viajes en familia o amigos.',
        description:
            'Una habitación flexible para quienes viajan acompañados y quieren mantenerse cerca sin sacrificar comodidad. Su distribución permite guardar equipaje, descansar y salir rápido hacia la playa o la alberca.',
        capacity: '3 personas',
        bed: 'Dos camas',
        size: 'Espacio familiar',
        images: [
            {
                src: '/imagenes/galeria/habitacion-triple-hotel-meson-punta-de-mita-03.jpg',
                alt: 'Habitación triple con dos camas',
            },
            {
                src: '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
                alt: 'Detalle de cama en habitación del hotel',
            },
            {
                src: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
                alt: 'Playa frente al hotel',
            },
        ],
        highlights: [
            'Hasta 3 huéspedes',
            'Dos camas',
            'Aire acondicionado',
            'Baño privado',
        ],
        included: [
            'Dos camas',
            'Aire acondicionado',
            'Televisión',
            'Baño privado',
            'Amenidades de baño',
            'Acceso a playa cercana y áreas comunes',
        ],
        amenities: [
            { type: 'capacity', label: '3 huéspedes' },
            { type: 'bed', label: '2 camas' },
            { type: 'ac', label: 'A/C' },
            { type: 'tv', label: 'TV' },
            { type: 'bath', label: 'Baño' },
        ],
    },
];

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
                <span className="habitacion-card-eyebrow">
                    {habitacion.eyebrow}
                </span>
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

function HabitacionDrawer({
    habitacion,
    open,
    onClose,
}: {
    habitacion?: Habitacion;
    open: boolean;
    onClose: () => void;
}) {
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
                        <Carousel
                            autoplay
                            arrows
                            draggable
                            className="habitacion-carousel"
                        >
                            {habitacion.images.map((image) => (
                                <div key={image.src}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="habitacion-hero-image"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </section>

                    <section className="habitacion-drawer-main">
                        <div className="habitacion-drawer-title">
                            <p>{habitacion.eyebrow}</p>
                            <h2>{habitacion.name}</h2>
                        </div>

                        <div className="habitacion-drawer-summary">
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
                        </div>

                        <p className="habitacion-drawer-description">
                            {habitacion.description}
                        </p>

                        <Divider />

                        <div className="habitacion-detail-section">
                            <h3>Lo más destacado</h3>
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
                            <h3>Qué incluye</h3>
                            <ul className="habitacion-included-list">
                                {habitacion.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="habitacion-drawer-actions">
                            <Button
                                type="primary"
                                size="large"
                                href="/contacto"
                            >
                                Consultar disponibilidad
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
                <p>Habitaciones</p>
                <h1>Descansa cerca del mar</h1>
                <span>
                    Espacios cómodos para parejas, familias y escapadas
                    tranquilas en Punta de Mita.
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

import { Image, Masonry } from 'antd';
import { Images } from 'lucide-react';
import { useMemo, useState } from 'react';

type GalleryCategory =
    | 'todos'
    | 'areas-comunes'
    | 'alberca'
    | 'playa'
    | 'bodas'
    | 'habitacion-doble'
    | 'habitacion-triple';

type MasonryVariant = 'normal' | 'wide' | 'tall' | 'feature';

type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    title: string;
    category: Exclude<GalleryCategory, 'todos'>;
    categoryLabel: string;
    variant: MasonryVariant;
};

type GalleryTab = {
    key: GalleryCategory;
    label: string;
};

const galleryTabs: GalleryTab[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'areas-comunes', label: 'Áreas comunes' },
    { key: 'alberca', label: 'Alberca' },
    { key: 'playa', label: 'Playa' },
    { key: 'bodas', label: 'Bodas' },
    { key: 'habitacion-doble', label: 'Habitación doble' },
    { key: 'habitacion-triple', label: 'Habitación triple' },
];

const galleryImages: GalleryImage[] = [
    {
        id: 'vista-hotel',
        src: '/imagenes/galeria/dashboard.jpg',
        alt: 'Vista del hotel con alberca y palmeras frente al mar',
        title: 'Hotel frente al mar',
        category: 'areas-comunes',
        categoryLabel: 'Áreas comunes',
        variant: 'feature',
    },
    {
        id: 'areas-palapa',
        src: '/imagenes/galeria/areas_comunes_03.jpg',
        alt: 'Área común con techo de palapa y recepción del hotel',
        title: 'Recepción y palapa',
        category: 'areas-comunes',
        categoryLabel: 'Áreas comunes',
        variant: 'tall',
    },
    {
        id: 'jardin-palmeras',
        src: '/imagenes/galeria/background.webp',
        alt: 'Palmeras y espacios abiertos del Hotel Mesón de Mita',
        title: 'Rincones tropicales',
        category: 'areas-comunes',
        categoryLabel: 'Áreas comunes',
        variant: 'wide',
    },
    {
        id: 'alberca-camastros',
        src: '/imagenes/galeria/alberca-punta-de-mita-02.jpg',
        alt: 'Alberca con camastros en Punta de Mita',
        title: 'Alberca para descansar',
        category: 'alberca',
        categoryLabel: 'Alberca',
        variant: 'feature',
    },
    {
        id: 'alberca-mar',
        src: '/imagenes/galeria/alberca-punta-de-mita-04.jpg',
        alt: 'Alberca del hotel junto al mar',
        title: 'Alberca junto al mar',
        category: 'alberca',
        categoryLabel: 'Alberca',
        variant: 'normal',
    },
    {
        id: 'playa-frente-hotel',
        src: '/imagenes/galeria/playa-meson-punta-mita-012.jpg',
        alt: 'Playa frente al hotel en Punta de Mita',
        title: 'Playa a unos pasos',
        category: 'playa',
        categoryLabel: 'Playa',
        variant: 'wide',
    },
    {
        id: 'playa-rocas',
        src: '/imagenes/galeria/playa-meson-punta-mita-05.jpg',
        alt: 'Vista de la playa y costa de Punta de Mita',
        title: 'Costa de Punta de Mita',
        category: 'playa',
        categoryLabel: 'Playa',
        variant: 'normal',
    },
    {
        id: 'playa-atardecer',
        src: '/imagenes/galeria/playa_04.jpg',
        alt: 'Playa de Punta de Mita con vista al mar',
        title: 'Camino al mar',
        category: 'playa',
        categoryLabel: 'Playa',
        variant: 'tall',
    },
    {
        id: 'playa-palmeras',
        src: '/imagenes/galeria/playa_05-1.jpg',
        alt: 'Costa con palmeras cerca del hotel',
        title: 'Palmeras y bahía',
        category: 'playa',
        categoryLabel: 'Playa',
        variant: 'normal',
    },
    {
        id: 'playa-azul',
        src: '/imagenes/galeria/playa_13.jpg',
        alt: 'Mar azul en Punta de Mita',
        title: 'Bahía tranquila',
        category: 'playa',
        categoryLabel: 'Playa',
        variant: 'wide',
    },
    {
        id: 'boda-playa',
        src: '/imagenes/galeria/bodas-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Boda frente al mar en Hotel Mesón de Mita',
        title: 'Ceremonia frente al mar',
        category: 'bodas',
        categoryLabel: 'Bodas',
        variant: 'feature',
    },
    {
        id: 'boda-musica',
        src: '/imagenes/galeria/musica-Bodas-Playa-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Música para boda en la playa',
        title: 'Recepción con música',
        category: 'bodas',
        categoryLabel: 'Bodas',
        variant: 'normal',
    },
    {
        id: 'boda-catering',
        src: '/imagenes/galeria/punta-Mita-Weddings-Catering-Hotel-Meson-Mita-1.jpg',
        alt: 'Catering para boda en Punta de Mita',
        title: 'Detalles para invitados',
        category: 'bodas',
        categoryLabel: 'Bodas',
        variant: 'wide',
    },
    {
        id: 'doble-estandar',
        src: '/imagenes/galeria/double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
        alt: 'Habitación doble estándar del hotel',
        title: 'Habitación doble',
        category: 'habitacion-doble',
        categoryLabel: 'Habitación doble',
        variant: 'normal',
    },
    {
        id: 'doble-terraza',
        src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
        alt: 'Habitación doble con terraza en Punta de Mita',
        title: 'Terraza privada',
        category: 'habitacion-doble',
        categoryLabel: 'Habitación doble',
        variant: 'tall',
    },
    {
        id: 'doble-vista',
        src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-05.jpg',
        alt: 'Habitación doble con vista hacia la terraza',
        title: 'Descanso luminoso',
        category: 'habitacion-doble',
        categoryLabel: 'Habitación doble',
        variant: 'normal',
    },
    {
        id: 'doble-bano',
        src: '/imagenes/galeria/habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
        alt: 'Baño privado de habitación doble',
        title: 'Detalles interiores',
        category: 'habitacion-doble',
        categoryLabel: 'Habitación doble',
        variant: 'wide',
    },
    {
        id: 'triple-familiar',
        src: '/imagenes/galeria/habitacion-triple-hotel-meson-punta-de-mita-03.jpg',
        alt: 'Habitación triple familiar con dos camas',
        title: 'Habitación triple',
        category: 'habitacion-triple',
        categoryLabel: 'Habitación triple',
        variant: 'feature',
    },
];

function getTabCount(category: GalleryCategory): number {
    if (category === 'todos') {
        return galleryImages.length;
    }

    return galleryImages.filter((image) => image.category === category).length;
}

export default function GaleriaShowcase() {
    const [activeCategory, setActiveCategory] =
        useState<GalleryCategory>('todos');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'todos') {
            return galleryImages;
        }

        return galleryImages.filter((image) => image.category === activeCategory);
    }, [activeCategory]);

    const changeCategory = (category: GalleryCategory) => {
        setActiveCategory(category);
        setPreviewOpen(false);
        setPreviewIndex(0);
    };

    const openPreview = (index: number) => {
        setPreviewIndex(index);
        setPreviewOpen(true);
    };

    return (
        <section className="galeria-section">
            <div className="galeria-intro">
                {/* <p>Galería</p> */}
                <h1>Galería</h1>
                <span>
                    Playa, habitaciones, celebraciones y rincones para imaginar
                    tu próxima estancia en Punta de Mita.
                </span>
            </div>

            <div className="galeria-content">
                <div className="galeria-toolbar">
                    <div className="galeria-toolbar-copy">
                        <p>
                            <Images size={18} />
                            {filteredImages.length} fotos
                        </p>
                        <h2>Explora Nuestras Instalaciones</h2>
                    </div>

                    <div
                        className="galeria-tabs"
                        role="tablist"
                        aria-label="Filtrar galería"
                    >
                        {galleryTabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                role="tab"
                                aria-selected={activeCategory === tab.key}
                                className="galeria-tab"
                                onClick={() => changeCategory(tab.key)}
                            >
                                <span>{tab.label}</span>
                                <strong>{getTabCount(tab.key)}</strong>
                            </button>
                        ))}
                    </div>
                </div>

                <Masonry
                    columns={{ xs: 1, sm: 2, lg: 3 }}
                    gutter={[18, 18]}
                    className="galeria-masonry"
                    items={filteredImages.map((image, index) => ({
                        key: image.id,
                        data: { image, index },
                    }))}
                    itemRender={({ data }) => (
                        <figure
                            className={`galeria-card galeria-card-${data.image.variant}`}
                        >
                            <button
                                type="button"
                                onClick={() => openPreview(data.index)}
                                aria-label={`Abrir ${data.image.title}`}
                            >
                                <img
                                    src={data.image.src}
                                    alt={data.image.alt}
                                    loading="lazy"
                                />
                                <span className="galeria-card-shine" />
                                <figcaption>
                                    <strong>{data.image.title}</strong>
                                </figcaption>
                            </button>
                        </figure>
                    )}
                />
            </div>

            <Image.PreviewGroup
                items={filteredImages.map((image) => ({
                    src: image.src,
                    alt: image.alt,
                }))}
                preview={{
                    open: previewOpen,
                    current: previewIndex,
                    onOpenChange: (open) => setPreviewOpen(open),
                    onChange: (current) => setPreviewIndex(current),
                    countRender: (current, total) => `${current} / ${total}`,
                }}
            />
        </section>
    );
}

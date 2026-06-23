import { Image, Masonry } from 'antd';
import { Images } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { GaleriaPageContent, GalleryCategory } from './interfaces';
import { mapGaleriaContent } from './services/mapGaleriaContent';

type GaleriaShowcaseProps = {
    content?: GaleriaPageContent | null;
    locale?: string | null;
};

export default function GaleriaShowcase({
    content,
    locale,
}: GaleriaShowcaseProps) {
    const mappedContent = mapGaleriaContent(content, locale);
    const [activeCategory, setActiveCategory] =
        useState<GalleryCategory>('todos');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'todos') {
            return mappedContent.images;
        }

        return mappedContent.images.filter(
            (image) => image.category === activeCategory,
        );
    }, [activeCategory, mappedContent.images]);

    const getTabCount = (category: GalleryCategory): number => {
        if (category === 'todos') {
            return mappedContent.images.length;
        }

        return mappedContent.images.filter((image) => image.category === category)
            .length;
    };

    const changeCategory = (category: GalleryCategory) => {
        setActiveCategory(category);
        setPreviewOpen(false);
        setPreviewIndex(0);
    };

    const openPreview = (index: number) => {
        setPreviewIndex(index);
        setPreviewOpen(true);
    };

    const photoLabel =
        filteredImages.length === 1
            ? mappedContent.text.photo_singular
            : mappedContent.text.photo_plural;

    return (
        <section className="galeria-section">
            <div className="galeria-intro">
                <h1>{mappedContent.text.intro_title}</h1>
                <span>{mappedContent.text.intro_body}</span>
            </div>

            <div className="galeria-content">
                <div className="galeria-toolbar">
                    <div className="galeria-toolbar-copy">
                        <p>
                            <Images size={18} />
                            {filteredImages.length} {photoLabel}
                        </p>
                        <h2>{mappedContent.text.toolbar_title}</h2>
                    </div>

                    <div
                        className="galeria-tabs"
                        role="tablist"
                        aria-label="Filtrar galeria"
                    >
                        {mappedContent.tabs.map((tab) => (
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

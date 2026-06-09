import { Image, Masonry } from 'antd';
import './InicioMasonry.css';
import { useState } from 'react';

type MasonryVariant = 'normal' | 'wide' | 'tall' | 'feature';

type MasonryImage = {
    src: string;
    alt: string;
    variant: MasonryVariant;
};

const imageList: MasonryImage[] = [
    {
        src: 'alberca-punta-de-mita-02.jpg',
        alt: 'Alberca del hotel en Punta de Mita',
        variant: 'feature',
    },
    {
        src: 'alberca-punta-de-mita-04.jpg',
        alt: 'Vista de alberca',
        variant: 'normal',
    },
    {
        src: 'areas_comunes_03.jpg',
        alt: 'Areas comunes del hotel',
        variant: 'tall',
    },
    {
        src: 'bodas-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Boda frente al mar',
        variant: 'wide',
    },
    {
        src: 'double-Room-Meson-Mita-Hotel-Punta-Mita.jpg',
        alt: 'Habitacion doble',
        variant: 'normal',
    },
    {
        src: 'habitacion-doble-hotel-meson-punta-de-mita-03.jpg',
        alt: 'Habitacion doble en Meson de Mita',
        variant: 'tall',
    },
    {
        src: 'habitacion-doble-hotel-meson-punta-de-mita-05.jpg',
        alt: 'Interior de habitacion doble',
        variant: 'normal',
    },
    {
        src: 'habitacion-doble-hotel-meson-punta-de-mita-09.jpg',
        alt: 'Detalle de habitacion doble',
        variant: 'wide',
    },
    {
        src: 'habitacion-triple-hotel-meson-punta-de-mita-03.jpg',
        alt: 'Habitacion triple',
        variant: 'normal',
    },
    {
        src: 'musica-Bodas-Playa-Punta-Mita-Hotel-Meson-Mita.jpg',
        alt: 'Musica para bodas en la playa',
        variant: 'feature',
    },
    {
        src: 'playa-meson-punta-mita-012.jpg',
        alt: 'Playa de Punta de Mita',
        variant: 'wide',
    },
    {
        src: 'playa-meson-punta-mita-05.jpg',
        alt: 'Vista de playa',
        variant: 'normal',
    },
    {
        src: 'playa_04.jpg',
        alt: 'Playa al atardecer',
        variant: 'tall',
    },
    {
        src: 'playa_05-1.jpg',
        alt: 'Costa en Punta de Mita',
        variant: 'normal',
    },
    {
        src: 'playa_13.jpg',
        alt: 'Mar en Punta de Mita',
        variant: 'wide',
    },
    {
        src: 'punta-Mita-Weddings-Catering-Hotel-Meson-Mita-1.jpg',
        alt: 'Catering para bodas',
        variant: 'normal',
    },
];

export default function InicioMasonry() {
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string | undefined>(undefined);
    const [verImagenSeleccionada, setVerImagenSeleccionada] = useState<boolean>(false);

    return (
        <section className="inicio-masonry-section">
            <Masonry
                columns={{ xs: 1, sm: 2, lg: 3 }}
                gutter={[18, 18]}
                className="inicio-masonry"
                items={imageList.map((image, index) => ({
                    key: `item-${index}`,
                    data: image,
                }))}
                itemRender={({ data }) => (
                    <figure className={`masonry-card masonry-card-${data.variant}`}>
                        <img
                          src={`/galeria/${data.src}`}
                          alt={data.alt}
                          className="masonry-card-image"
                          loading="lazy"
                          onClick={() => {
                            setVerImagenSeleccionada(true);
                            setImagenSeleccionada(`/galeria/${data.src}`)
                          }}
                        />
                    </figure>
                )}
            />

            {(verImagenSeleccionada && imagenSeleccionada) && (
              <Image
                alt="Previsualizar"
                width={100}
                src={imagenSeleccionada}
                preview={{
                  open: verImagenSeleccionada,
                  onOpenChange: (value) => {
                    setVerImagenSeleccionada(value);
                  },
                }}
              />
            )}
        </section>
    );
}

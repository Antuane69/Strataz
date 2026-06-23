import type { GalleryImage, GalleryTab, GaleriaPageText } from '../interfaces';

export const galeriaText: GaleriaPageText = {
    page_title: 'Galeria',
    intro_title: 'Galeria',
    intro_body:
        'Playa, habitaciones, celebraciones y rincones para imaginar tu proxima estancia en Punta de Mita.',
    toolbar_title: 'Explora Nuestras Instalaciones',
    photo_singular: 'foto',
    photo_plural: 'fotos',
    all_tab_label: 'Todos',
};

export const galleryTabs: GalleryTab[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'areas-comunes', label: 'Areas comunes' },
    { key: 'alberca', label: 'Alberca' },
    { key: 'playa', label: 'Playa' },
    { key: 'bodas', label: 'Bodas' },
    { key: 'habitacion-doble', label: 'Habitacion doble' },
    { key: 'habitacion-triple', label: 'Habitacion triple' },
];

export const galleryImages: GalleryImage[] = [
    {
        id: 'vista-hotel',
        src: '/imagenes/galeria/dashboard.jpg',
        alt: 'Vista del hotel con alberca y palmeras frente al mar',
        title: 'Hotel frente al mar',
        category: 'areas-comunes',
        categoryLabel: 'Areas comunes',
        variant: 'feature',
    },
    {
        id: 'areas-palapa',
        src: '/imagenes/galeria/areas_comunes_03.jpg',
        alt: 'Area comun con techo de palapa y recepcion del hotel',
        title: 'Recepcion y palapa',
        category: 'areas-comunes',
        categoryLabel: 'Areas comunes',
        variant: 'tall',
    },
    {
        id: 'jardin-palmeras',
        src: '/imagenes/galeria/background.webp',
        alt: 'Palmeras y espacios abiertos del Hotel Meson de Mita',
        title: 'Rincones tropicales',
        category: 'areas-comunes',
        categoryLabel: 'Areas comunes',
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
];

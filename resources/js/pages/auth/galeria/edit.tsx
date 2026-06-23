import {
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Alert,
    Button,
    Collapse,
    Divider,
    Flex,
    Form,
    InputNumber,
    Segmented,
    Select,
    Space,
    Splitter,
    Switch,
    Tooltip,
    Typography,
    Upload,
} from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import GaleriaShowcase from '@/components/galeria/GaleriaShowcase';
import type {
    EditableGalleryImage,
    EditableGalleryTab,
    EditablePagePayload,
    FormData,
    GaleriaPageContent,
    GaleriaPageText,
    MasonryVariant,
    MediaUploadGroup,
    UploadConfig,
} from '@/components/galeria/interfaces';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import {
    cloneEditableContent,
    localeLabels,
    supportedLocales,
} from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

const VARIANT_OPTIONS: { label: string; value: MasonryVariant }[] = [
    { label: 'Normal', value: 'normal' },
    { label: 'Ancha', value: 'wide' },
    { label: 'Alta', value: 'tall' },
    { label: 'Destacada', value: 'feature' },
];

function localizedValue(es: string, en = es): LocalizedString {
    return { es, en };
}

function normalizeTabKey(label: string): string {
    const normalizedLabel = label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (!normalizedLabel || normalizedLabel === 'todos') {
        return 'categoria';
    }

    return normalizedLabel;
}

function uniqueTabKey(
    label: string,
    tabs: EditableGalleryTab[],
    currentIndex?: number,
): string {
    const baseKey = normalizeTabKey(label);
    let nextKey = baseKey;
    let suffix = 2;

    while (
        tabs.some((tab, index) => index !== currentIndex && tab.key === nextKey)
    ) {
        nextKey = `${baseKey}-${suffix}`;
        suffix += 1;
    }

    return nextKey;
}

function newTab(key = normalizeTabKey('Nueva categoria')): EditableGalleryTab {
    return {
        key,
        label: localizedValue('Nueva categoria', 'New category'),
    };
}

function newImage(order: number, category: string): EditableGalleryImage {
    const id = `galeria-${Date.now()}`;

    return {
        id,
        order,
        is_active: true,
        image: {
            id: `${id}-image`,
            type: 'image',
            src: '',
            poster: '',
            alt: localizedValue('Nueva imagen', 'New image'),
        },
        title: localizedValue('Nueva imagen', 'New image'),
        category,
        variant: 'normal',
    };
}

function mediaNameFromFile(file: File): string {
    return file.name.replace(/\.[^/.]+$/, '').trim() || 'Nueva imagen';
}

function mediaName(media: EditableMedia): string {
    return media.alt.es || media.alt.en || '';
}

type EditGaleriaProps = {
    editablePage: EditablePagePayload;
    uploadConfig: UploadConfig;
};

export default function EditGaleria({
    editablePage,
    uploadConfig,
}: EditGaleriaProps) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] = useState<GaleriaPageContent>(() =>
        cloneEditableContent(editablePage.content),
    );
    const draftContentRef = useRef(draftContent);
    const { data, setData, post, processing, errors, progress, transform } =
        useForm<FormData>({
            _method: 'put',
            title: editablePage.title,
            is_published: editablePage.is_published,
            content: editablePage.content,
            media_uploads: [],
        });
    const formErrors = errors as Record<string, string | undefined>;
    const deferredDraftContent = useDeferredValue(draftContent);
    const activeImage =
        draftContent.images[activeImageIndex] ?? draftContent.images[0];

    const previewContent = useMemo(() => {
        if (!isLivePreviewEnabled) {
            return null;
        }

        return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const categoryOptions = draftContent.tabs.map((tab) => ({
        label: tab.label[locale] || tab.key,
        value: tab.key,
    }));

    const updateContent = (updater: (content: GaleriaPageContent) => void) => {
        const nextContent = cloneEditableContent(draftContentRef.current);

        updater(nextContent);
        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof GaleriaPageText, value: string) => {
        updateContent((content) => {
            content.locales[locale][field] = value;
        });
    };

    const updateTabLabel = (index: number, value: string) => {
        updateContent((content) => {
            const tab = content.tabs[index];

            if (!tab) {
                return;
            }

            const previousKey = tab.key;
            const nextKey = uniqueTabKey(value, content.tabs, index);

            tab.key = nextKey;
            tab.label[locale] = value;

            content.images.forEach((image) => {
                if (image.category === previousKey) {
                    image.category = nextKey;
                }
            });
        });
    };

    const removeTab = (index: number) => {
        if (draftContent.tabs.length <= 1) {
            return;
        }

        updateContent((content) => {
            const [removedTab] = content.tabs.splice(index, 1);
            const fallbackCategory = content.tabs[0]?.key;

            if (!removedTab || !fallbackCategory) {
                return;
            }

            content.images.forEach((image) => {
                if (image.category === removedTab.key) {
                    image.category = fallbackCategory;
                }
            });
        });
    };

    const updateImage = (updater: (image: EditableGalleryImage) => void) => {
        updateContent((content) => {
            const image = content.images[activeImageIndex];

            if (!image) {
                return;
            }

            updater(image);
        });
    };

    const addImage = () => {
        const nextImageIndex = draftContent.images.length;
        const category = draftContent.tabs[0]?.key ?? 'areas-comunes';

        updateContent((content) => {
            content.images.push(newImage(content.images.length + 1, category));
        });
        setActiveImageIndex(nextImageIndex);
    };

    const removeActiveImage = () => {
        if (draftContent.images.length <= 1) {
            return;
        }

        updateContent((content) => {
            content.images.splice(activeImageIndex, 1);
        });
        setActiveImageIndex(Math.max(activeImageIndex - 1, 0));
    };

    const updateMediaName = (name: string) => {
        if (!activeImage) {
            return;
        }

        const mediaId = activeImage.image.id;

        updateImage((image) => {
            image.image.alt = {
                es: name,
                en: name,
            };
        });

        setData(
            'media_uploads',
            data.media_uploads.map((upload) =>
                upload.media_id === mediaId ? { ...upload, name } : upload,
            ),
        );
    };

    const addUpload = (
        galleryImageId: string,
        mediaId: string,
        name: string,
        file: File,
    ) => {
        const maxSizeBytes = uploadConfig.max_size_mb * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            setUploadError(
                `El archivo "${file.name}" pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El limite actual es ${uploadConfig.max_size_mb} MB.`,
            );

            return;
        }

        const nextUploads = data.media_uploads.filter(
            (upload) => upload.media_id !== mediaId,
        );
        const totalUploadSize = nextUploads.reduce(
            (total, upload) => total + upload.file.size,
            file.size,
        );

        if (totalUploadSize > maxSizeBytes) {
            setUploadError(
                `El total de archivos seleccionados supera el limite actual de ${uploadConfig.max_size_mb} MB por guardado.`,
            );

            return;
        }

        setUploadError(null);

        const resolvedName = name.trim() || mediaNameFromFile(file);
        const previewUrl = URL.createObjectURL(file);
        const nextUpload: MediaUploadGroup = {
            gallery_image_id: galleryImageId,
            media_id: mediaId,
            name: resolvedName,
            file,
        };

        nextUploads.push(nextUpload);
        updateImage((image) => {
            image.image.type = 'image';
            image.image.src = previewUrl;
            image.image.poster = null;
            image.image.alt = {
                es: resolvedName,
                en: resolvedName,
            };
        });
        setData('media_uploads', nextUploads);
    };

    const submit = () => {
        const latestContent = cloneEditableContent(draftContentRef.current);

        transform((formData) => ({
            ...formData,
            content: latestContent,
            media_uploads: formData.media_uploads.flatMap((upload) => {
                const image = latestContent.images.find(
                    (item) => item.id === upload.gallery_image_id,
                );

                if (!image || image.image.id !== upload.media_id) {
                    return [];
                }

                return {
                    ...upload,
                    name: mediaName(image.image) || upload.name,
                };
            }),
        }));

        post('/admin/contenido/galeria', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setUploadError(null);
                setData('media_uploads', []);
                showAppAlert({
                    type: 'success',
                    title: 'Galeria guardada',
                    description: 'El contenido se actualizo correctamente.',
                });
            },
            onError: (backendErrors) => {
                showBackendErrorAlert(backendErrors, {
                    title: 'No se pudo guardar galeria',
                    fallback:
                        'Revisa los campos del formulario e intenta de nuevo.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Editar galeria" />

            <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4 overflow-hidden">
                <Flex
                    justify="space-between"
                    align="center"
                    gap={16}
                    wrap
                    className="shrink-0"
                >
                    <div>
                        <Title level={2} className="!mb-1">
                            Galeria
                        </Title>
                        <Paragraph className="!mb-0 text-muted-foreground">
                            Edita tabs, textos e imagenes del mosaico.
                        </Paragraph>
                    </div>

                    <Space wrap>
                        <Link href="/dashboard">
                            <Button>Inicio</Button>
                        </Link>

                        <Space align="center">
                            <Text>Cambios en tiempo real</Text>
                            <Switch
                                checked={isLivePreviewEnabled}
                                checkedChildren="Si"
                                unCheckedChildren="No"
                                onChange={setIsLivePreviewEnabled}
                            />
                        </Space>

                        <Switch
                            checked={data.is_published}
                            checkedChildren="Publicar"
                            unCheckedChildren="Borrador"
                            onChange={(checked) =>
                                setData('is_published', checked)
                            }
                        />

                        <Button
                            type="primary"
                            size="small"
                            icon={<SaveOutlined />}
                            loading={processing}
                            onClick={submit}
                        >
                            Actualizar
                        </Button>
                    </Space>
                </Flex>

                {Object.keys(formErrors).length > 0 && (
                    <Alert
                        type="error"
                        showIcon
                        message="Revisa los campos marcados."
                        description="Laravel devolvio validaciones pendientes en el contenido."
                    />
                )}

                {progress && (
                    <Alert
                        type="info"
                        showIcon
                        message={`Subiendo archivos ${progress.percentage ?? 0}%`}
                    />
                )}

                {uploadError && (
                    <Alert
                        type="error"
                        showIcon
                        message={uploadError}
                        closable
                        onClose={() => setUploadError(null)}
                    />
                )}

                <Splitter
                    collapsible={{ motion: true }}
                    className="min-h-0 flex-1 overflow-hidden rounded-md border bg-white"
                >
                    {isLivePreviewEnabled && previewContent && (
                        <Splitter.Panel
                            defaultSize="54%"
                            min="24%"
                            max="70%"
                            collapsible
                            className="min-h-0 !overflow-hidden"
                        >
                            <div className="relative h-full overflow-hidden bg-white">
                                <div className="h-full overflow-auto">
                                    <GaleriaShowcase
                                        content={previewContent}
                                        locale={locale}
                                    />
                                </div>
                            </div>
                        </Splitter.Panel>
                    )}

                    <Splitter.Panel
                        min={isLivePreviewEnabled ? '360px' : '100%'}
                        className="min-h-0 !overflow-hidden"
                    >
                        <div className="h-full overflow-x-hidden overflow-y-auto p-4">
                            <Form layout="vertical" onFinish={submit}>
                                <Flex align="center" gap={12} wrap>
                                    <Form.Item
                                        label="Titulo"
                                        className="min-w-64 flex-1"
                                    >
                                        <InputFormulario
                                            resetKey={`page:${locale}:intro_title`}
                                            value={
                                                draftContent.locales[locale]
                                                    .intro_title
                                            }
                                            onCommit={(value) =>
                                                updatePageText(
                                                    'intro_title',
                                                    value,
                                                )
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item label="Idioma">
                                        <Segmented
                                            value={locale}
                                            options={supportedLocales.map(
                                                (item) => ({
                                                    label: localeLabels[item],
                                                    value: item,
                                                }),
                                            )}
                                            onChange={(value) =>
                                                setLocale(value as LocaleCode)
                                            }
                                        />
                                    </Form.Item>
                                </Flex>

                                <Collapse
                                    defaultActiveKey={['page', 'images']}
                                    items={[
                                        {
                                            key: 'page',
                                            label: 'Pagina',
                                            children: (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Form.Item label="Titulo para pestana">
                                                        <InputFormulario
                                                            resetKey={`page:${locale}:page_title`}
                                                            value={
                                                                draftContent
                                                                    .locales[
                                                                    locale
                                                                ].page_title
                                                            }
                                                            onCommit={(value) =>
                                                                updatePageText(
                                                                    'page_title',
                                                                    value,
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Descripcion principal">
                                                        <InputFormulario
                                                            resetKey={`page:${locale}:intro_body`}
                                                            rows={4}
                                                            value={
                                                                draftContent
                                                                    .locales[
                                                                    locale
                                                                ].intro_body
                                                            }
                                                            onCommit={(value) =>
                                                                updatePageText(
                                                                    'intro_body',
                                                                    value,
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                        {[
                                                            [
                                                                'toolbar_title',
                                                                'Titulo de seccion',
                                                            ],
                                                            [
                                                                'photo_singular',
                                                                'Texto singular',
                                                            ],
                                                            [
                                                                'photo_plural',
                                                                'Texto plural',
                                                            ],
                                                            [
                                                                'all_tab_label',
                                                                'Tab todas',
                                                            ],
                                                        ].map(
                                                            ([
                                                                field,
                                                                label,
                                                            ]) => (
                                                                <Form.Item
                                                                    key={field}
                                                                    label={
                                                                        label
                                                                    }
                                                                >
                                                                    <InputFormulario
                                                                        resetKey={`page:${locale}:${field}`}
                                                                        value={
                                                                            draftContent
                                                                                .locales[
                                                                                locale
                                                                            ][
                                                                                field as keyof GaleriaPageText
                                                                            ]
                                                                        }
                                                                        onCommit={(
                                                                            value,
                                                                        ) =>
                                                                            updatePageText(
                                                                                field as keyof GaleriaPageText,
                                                                                value,
                                                                            )
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            ),
                                                        )}
                                                    </div>

                                                    <Divider className="!my-2" />

                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                    >
                                                        <Text strong>
                                                            Filtros
                                                        </Text>
                                                        <Button
                                                            size="small"
                                                            icon={
                                                                <PlusOutlined />
                                                            }
                                                            onClick={() =>
                                                                updateContent(
                                                                    (
                                                                        content,
                                                                    ) => {
                                                                        content.tabs.push(
                                                                            newTab(
                                                                                uniqueTabKey(
                                                                                    'Nueva categoria',
                                                                                    content.tabs,
                                                                                ),
                                                                            ),
                                                                        );
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Agregar
                                                        </Button>
                                                    </Flex>

                                                    {draftContent.tabs.map(
                                                        (tab, index) => (
                                                            <Flex
                                                                key={index}
                                                                gap={8}
                                                                align="center"
                                                                wrap
                                                            >
                                                                <InputFormulario
                                                                    resetKey={`tab:${index}:${locale}:label`}
                                                                    className="min-w-64 flex-1"
                                                                    value={
                                                                        tab
                                                                            .label[
                                                                            locale
                                                                        ]
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updateTabLabel(
                                                                            index,
                                                                            value,
                                                                        )
                                                                    }
                                                                />
                                                                <Tooltip title="Eliminar filtro">
                                                                    <Button
                                                                        danger
                                                                        icon={
                                                                            <DeleteOutlined />
                                                                        }
                                                                        disabled={
                                                                            draftContent
                                                                                .tabs
                                                                                .length <=
                                                                            1
                                                                        }
                                                                        onClick={() =>
                                                                            removeTab(
                                                                                index,
                                                                            )
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                            </Flex>
                                                        ),
                                                    )}
                                                </Space>
                                            ),
                                        },
                                        {
                                            key: 'images',
                                            label: 'Imagenes',
                                            children: activeImage && (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Flex
                                                        gap={8}
                                                        wrap
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Form.Item
                                                            label="Imagen"
                                                            layout="horizontal"
                                                        >
                                                            <Select
                                                                className="min-w-64 flex-1"
                                                                value={
                                                                    activeImageIndex
                                                                }
                                                                options={draftContent.images.map(
                                                                    (
                                                                        item,
                                                                        index,
                                                                    ) => ({
                                                                        label:
                                                                            item
                                                                                .title[
                                                                                locale
                                                                            ] ||
                                                                            item.id,
                                                                        value: index,
                                                                    }),
                                                                )}
                                                                onChange={
                                                                    setActiveImageIndex
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Tooltip title="Agregar">
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={
                                                                    addImage
                                                                }
                                                            />
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar">
                                                            <Button
                                                                danger
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                onClick={
                                                                    removeActiveImage
                                                                }
                                                                disabled={
                                                                    draftContent
                                                                        .images
                                                                        .length <=
                                                                    1
                                                                }
                                                            />
                                                        </Tooltip>

                                                        <Form.Item
                                                            label="Orden"
                                                            layout="horizontal"
                                                        >
                                                            <InputNumber
                                                                min={0}
                                                                value={
                                                                    activeImage.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.order =
                                                                                Number(
                                                                                    value ??
                                                                                        0,
                                                                                );
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Visible"
                                                            layout="horizontal"
                                                        >
                                                            <Switch
                                                                checked={
                                                                    activeImage.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.is_active =
                                                                                checked;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                        <Form.Item label="Titulo">
                                                            <InputFormulario
                                                                resetKey={`image:${activeImageIndex}:${locale}:title`}
                                                                value={
                                                                    activeImage
                                                                        .title[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.title[
                                                                                locale
                                                                            ] =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Nombre / alt">
                                                            <InputFormulario
                                                                resetKey={`image:${activeImageIndex}:${locale}:alt`}
                                                                value={
                                                                    activeImage
                                                                        .image
                                                                        .alt[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.image.alt[
                                                                                locale
                                                                            ] =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Categoria">
                                                            <Select
                                                                value={
                                                                    activeImage.category
                                                                }
                                                                options={
                                                                    categoryOptions
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.category =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Formato">
                                                            <Select
                                                                value={
                                                                    activeImage.variant
                                                                }
                                                                options={
                                                                    VARIANT_OPTIONS
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateImage(
                                                                        (
                                                                            image,
                                                                        ) => {
                                                                            image.variant =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <Divider className="!my-2" />

                                                    <div className="rounded-md border p-3">
                                                        <Flex
                                                            gap={8}
                                                            align="flex-end"
                                                            wrap
                                                        >
                                                            <Form.Item
                                                                label="Nombre del archivo"
                                                                className="!mb-0 min-w-64 flex-1"
                                                            >
                                                                <InputFormulario
                                                                    resetKey={`image:${activeImageIndex}:file-name`}
                                                                    value={mediaName(
                                                                        activeImage.image,
                                                                    )}
                                                                    onCommit={
                                                                        updateMediaName
                                                                    }
                                                                />
                                                            </Form.Item>

                                                            <Upload
                                                                accept={
                                                                    uploadConfig.accept
                                                                }
                                                                showUploadList={
                                                                    false
                                                                }
                                                                beforeUpload={(
                                                                    file,
                                                                ) => {
                                                                    addUpload(
                                                                        activeImage.id,
                                                                        activeImage
                                                                            .image
                                                                            .id,
                                                                        mediaName(
                                                                            activeImage.image,
                                                                        ),
                                                                        file as RcFile,
                                                                    );

                                                                    return Upload.LIST_IGNORE;
                                                                }}
                                                            >
                                                                <Button
                                                                    icon={
                                                                        <UploadOutlined />
                                                                    }
                                                                >
                                                                    {activeImage
                                                                        .image
                                                                        .src
                                                                        ? 'Cambiar imagen'
                                                                        : 'Subir imagen'}
                                                                </Button>
                                                            </Upload>
                                                        </Flex>

                                                        <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                                            {activeImage.image
                                                                .src ? (
                                                                <img
                                                                    className="h-48 w-full object-cover"
                                                                    src={
                                                                        activeImage
                                                                            .image
                                                                            .src
                                                                    }
                                                                    alt={mediaName(
                                                                        activeImage.image,
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="flex h-28 items-center justify-center text-sm text-muted-foreground">
                                                                    Sin imagen
                                                                    seleccionada
                                                                </div>
                                                            )}
                                                        </div>

                                                        {data.media_uploads.some(
                                                            (upload) =>
                                                                upload.media_id ===
                                                                activeImage
                                                                    .image.id,
                                                        ) && (
                                                            <Text className="mt-2 block text-xs text-muted-foreground">
                                                                Archivo listo
                                                                para guardarse
                                                            </Text>
                                                        )}
                                                    </div>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                />
                            </Form>
                        </div>
                    </Splitter.Panel>
                </Splitter>
            </div>
        </>
    );
}

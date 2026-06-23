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
import type {
    EditablePagePayload,
    EditableRecommendation,
    EditableRecommendationSection,
    FormData,
    MediaUploadGroup,
    RecomendacionesPageContent,
    RecomendacionesPageText,
    UploadConfig,
} from '@/components/recomendaciones/interfaces';
import RecomendacionesShowcase from '@/components/recomendaciones/RecomendacionesShowcase';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import {
    cloneEditableContent,
    localeLabels,
    supportedLocales,
} from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

function localizedValue(es: string, en = es): LocalizedString {
    return {
        es,
        en,
    };
}

function newImage(): EditableMedia {
    return {
        id: `image-${Date.now()}`,
        type: 'image',
        src: '',
        poster: '',
        alt: localizedValue('Nueva recomendacion', 'New recommendation'),
    };
}

function newSection(): EditableRecommendationSection {
    return {
        title: localizedValue('Nueva seccion', 'New section'),
        paragraphs: [
            localizedValue(
                'Agrega una descripcion para esta seccion.',
                'Add a description for this section.',
            ),
        ],
        bullets: [],
    };
}

function newRecommendation(order: number): EditableRecommendation {
    const id = `recomendacion-${Date.now()}`;

    return {
        id,
        order,
        is_active: true,
        title: localizedValue('Nueva recomendacion', 'New recommendation'),
        eyebrow: localizedValue('Categoria', 'Category'),
        image: newImage(),
        distance: localizedValue('Muy cerca', 'Very close'),
        duration: localizedValue('Libre', 'Flexible'),
        intro: localizedValue(
            'Descripcion breve de la recomendacion.',
            'Brief description for this recommendation.',
        ),
        sections: [newSection()],
    };
}

function mediaNameFromFile(file: File): string {
    return file.name.replace(/\.[^/.]+$/, '').trim() || 'Nueva recomendacion';
}

function mediaName(media: EditableMedia): string {
    return media.alt.es || media.alt.en || '';
}

type EditRecomendacionesProps = {
    editablePage: EditablePagePayload;
    uploadConfig: UploadConfig;
};

export default function EditRecomendaciones({
    editablePage,
    uploadConfig,
}: EditRecomendacionesProps) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeRecommendationIndex, setActiveRecommendationIndex] =
        useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [isPreviewDrawerOpen, setIsPreviewDrawerOpen] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] =
        useState<RecomendacionesPageContent>(() =>
            cloneEditableContent(editablePage.content),
        );
    const draftContentRef = useRef(draftContent);
    const previewDrawerContainerRef = useRef<HTMLDivElement>(null);
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
    const activeRecommendation =
        draftContent.recommendations[activeRecommendationIndex] ??
        draftContent.recommendations[0];

    const previewContent = useMemo(() => {
        if (!isLivePreviewEnabled) {
            return null;
        }

        return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (
        updater: (content: RecomendacionesPageContent) => void,
    ) => {
        const nextContent = cloneEditableContent(draftContentRef.current);

        updater(nextContent);
        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const updatePageText = (
        field: keyof RecomendacionesPageText,
        value: string,
    ) => {
        updateContent((content) => {
            content.locales[locale][field] = value;
        });
    };

    const updateRecommendation = (
        updater: (recommendation: EditableRecommendation) => void,
    ) => {
        updateContent((content) => {
            const recommendation =
                content.recommendations[activeRecommendationIndex];

            if (!recommendation) {
                return;
            }

            updater(recommendation);
        });
    };

    const updateRecommendationLocalizedField = (
        field: keyof Pick<
            EditableRecommendation,
            'title' | 'eyebrow' | 'distance' | 'duration' | 'intro'
        >,
        value: string,
    ) => {
        updateRecommendation((recommendation) => {
            recommendation[field][locale] = value;
        });
    };

    const addRecommendation = () => {
        const nextRecommendationIndex = draftContent.recommendations.length;

        updateContent((content) => {
            content.recommendations.push(
                newRecommendation(content.recommendations.length + 1),
            );
        });
        setActiveRecommendationIndex(nextRecommendationIndex);
    };

    const removeActiveRecommendation = () => {
        if (draftContent.recommendations.length <= 1) {
            return;
        }

        updateContent((content) => {
            content.recommendations.splice(activeRecommendationIndex, 1);
        });
        setActiveRecommendationIndex(Math.max(activeRecommendationIndex - 1, 0));
    };

    const updateMediaName = (name: string) => {
        if (!activeRecommendation) {
            return;
        }

        const mediaId = activeRecommendation.image.id;

        updateRecommendation((recommendation) => {
            recommendation.image.alt = {
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
        recommendationId: string,
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
            recommendation_id: recommendationId,
            media_id: mediaId,
            name: resolvedName,
            file,
        };

        nextUploads.push(nextUpload);
        updateRecommendation((recommendation) => {
            recommendation.image.type = 'image';
            recommendation.image.src = previewUrl;
            recommendation.image.poster = null;
            recommendation.image.alt = {
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
                const recommendation = latestContent.recommendations.find(
                    (item) => item.id === upload.recommendation_id,
                );

                if (
                    !recommendation ||
                    recommendation.image.id !== upload.media_id
                ) {
                    return [];
                }

                return {
                    ...upload,
                    name: mediaName(recommendation.image) || upload.name,
                };
            }),
        }));

        post('/admin/contenido/recomendaciones', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setUploadError(null);
                setData('media_uploads', []);
                showAppAlert({
                    type: 'success',
                    title: 'Recomendaciones guardadas',
                    description: 'El contenido se actualizo correctamente.',
                });
            },
            onError: (backendErrors) => {
                showBackendErrorAlert(backendErrors, {
                    title: 'No se pudo guardar recomendaciones',
                    fallback:
                        'Revisa los campos del formulario e intenta de nuevo.',
                });
            },
        });
    };

    const updateSection = (
        sectionIndex: number,
        updater: (section: EditableRecommendationSection) => void,
    ) => {
        updateRecommendation((recommendation) => {
            const section = recommendation.sections[sectionIndex];

            if (!section) {
                return;
            }

            updater(section);
        });
    };

    const addParagraph = (sectionIndex: number) => {
        updateSection(sectionIndex, (section) => {
            section.paragraphs.push(localizedValue('', ''));
        });
    };

    const addBullet = (sectionIndex: number) => {
        updateSection(sectionIndex, (section) => {
            section.bullets.push(localizedValue('', ''));
        });
    };

    return (
        <>
            <Head title="Editar recomendaciones" />

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
                            Recomendaciones
                        </Title>
                        <Paragraph className="!mb-0 text-muted-foreground">
                            Edita todo el contenido de la pagina.
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
                                <div
                                    className={
                                        isPreviewDrawerOpen
                                            ? 'h-full overflow-hidden'
                                            : 'h-full overflow-auto'
                                    }
                                >
                                    <RecomendacionesShowcase
                                        content={previewContent}
                                        locale={locale}
                                        drawerScope="preview"
                                        getDrawerContainer={() =>
                                            previewDrawerContainerRef.current
                                        }
                                        onDrawerOpenChange={
                                            setIsPreviewDrawerOpen
                                        }
                                    />
                                </div>
                                <div
                                    ref={previewDrawerContainerRef}
                                    className={
                                        isPreviewDrawerOpen
                                            ? 'absolute inset-0 z-20'
                                            : 'pointer-events-none absolute inset-0 z-20'
                                    }
                                />
                            </div>
                        </Splitter.Panel>
                    )}

                    <Splitter.Panel
                        min={isLivePreviewEnabled ? '360px' : '100%'}
                        className="min-h-0 !overflow-hidden"
                    >
                        <div className="h-full overflow-y-auto overflow-x-hidden p-4">
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
                                    defaultActiveKey={[
                                        'page',
                                        'recommendations',
                                    ]}
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
                                                </Space>
                                            ),
                                        },
                                        {
                                            key: 'recommendations',
                                            label: 'Recomendaciones',
                                            children: activeRecommendation && (
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
                                                            label="Recomendacion"
                                                            layout="horizontal"
                                                        >
                                                            <Select
                                                                className="min-w-64 flex-1"
                                                                value={
                                                                    activeRecommendationIndex
                                                                }
                                                                options={draftContent.recommendations.map(
                                                                    (
                                                                        recommendation,
                                                                        index,
                                                                    ) => ({
                                                                        label:
                                                                            recommendation
                                                                                .title[
                                                                                locale
                                                                            ] ||
                                                                            recommendation.id,
                                                                        value: index,
                                                                    }),
                                                                )}
                                                                onChange={
                                                                    setActiveRecommendationIndex
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Tooltip title="Agregar">
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={
                                                                    addRecommendation
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
                                                                    removeActiveRecommendation
                                                                }
                                                                disabled={
                                                                    draftContent
                                                                        .recommendations
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
                                                                    activeRecommendation.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendation(
                                                                        (
                                                                            recommendation,
                                                                        ) => {
                                                                            recommendation.order =
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
                                                                    activeRecommendation.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateRecommendation(
                                                                        (
                                                                            recommendation,
                                                                        ) => {
                                                                            recommendation.is_active =
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
                                                                resetKey={`recommendation:${activeRecommendationIndex}:${locale}:title`}
                                                                value={
                                                                    activeRecommendation
                                                                        .title[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendationLocalizedField(
                                                                        'title',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Categoria">
                                                            <InputFormulario
                                                                resetKey={`recommendation:${activeRecommendationIndex}:${locale}:eyebrow`}
                                                                value={
                                                                    activeRecommendation
                                                                        .eyebrow[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendationLocalizedField(
                                                                        'eyebrow',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Distancia">
                                                            <InputFormulario
                                                                resetKey={`recommendation:${activeRecommendationIndex}:${locale}:distance`}
                                                                value={
                                                                    activeRecommendation
                                                                        .distance[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendationLocalizedField(
                                                                        'distance',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Duracion">
                                                            <InputFormulario
                                                                resetKey={`recommendation:${activeRecommendationIndex}:${locale}:duration`}
                                                                value={
                                                                    activeRecommendation
                                                                        .duration[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendationLocalizedField(
                                                                        'duration',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Introduccion"
                                                            className="lg:col-span-2"
                                                        >
                                                            <InputFormulario
                                                                resetKey={`recommendation:${activeRecommendationIndex}:${locale}:intro`}
                                                                rows={5}
                                                                value={
                                                                    activeRecommendation
                                                                        .intro[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRecommendationLocalizedField(
                                                                        'intro',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <Divider className="!my-2" />

                                                    <Text strong>Imagen</Text>

                                                    <div className="rounded-md border p-3">
                                                        <Flex
                                                            gap={8}
                                                            align="flex-end"
                                                            wrap
                                                        >
                                                            <Form.Item
                                                                label="Nombre / alt"
                                                                className="!mb-0 min-w-64 flex-1"
                                                            >
                                                                <InputFormulario
                                                                    resetKey={`recommendation:${activeRecommendationIndex}:image-name`}
                                                                    value={mediaName(
                                                                        activeRecommendation.image,
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
                                                                        activeRecommendation.id,
                                                                        activeRecommendation
                                                                            .image
                                                                            .id,
                                                                        mediaName(
                                                                            activeRecommendation.image,
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
                                                                    {activeRecommendation
                                                                        .image
                                                                        .src
                                                                        ? 'Cambiar imagen'
                                                                        : 'Subir imagen'}
                                                                </Button>
                                                            </Upload>
                                                        </Flex>

                                                        <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                                            {activeRecommendation
                                                                .image.src ? (
                                                                <img
                                                                    className="h-40 w-full object-cover"
                                                                    src={
                                                                        activeRecommendation
                                                                            .image
                                                                            .src
                                                                    }
                                                                    alt={mediaName(
                                                                        activeRecommendation.image,
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
                                                                activeRecommendation
                                                                    .image.id,
                                                        ) && (
                                                            <Text className="mt-2 block text-xs text-muted-foreground">
                                                                Archivo listo
                                                                para guardarse
                                                            </Text>
                                                        )}
                                                    </div>

                                                    <Divider className="!my-2" />

                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                    >
                                                        <Text strong>
                                                            Secciones
                                                        </Text>
                                                        <Button
                                                            size="small"
                                                            icon={
                                                                <PlusOutlined />
                                                            }
                                                            onClick={() =>
                                                                updateRecommendation(
                                                                    (
                                                                        recommendation,
                                                                    ) => {
                                                                        recommendation.sections.push(
                                                                            newSection(),
                                                                        );
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Agregar seccion
                                                        </Button>
                                                    </Flex>

                                                    {activeRecommendation.sections.map(
                                                        (section, sectionIndex) => (
                                                            <div
                                                                key={
                                                                    sectionIndex
                                                                }
                                                                className="rounded-md border p-3"
                                                            >
                                                                <Flex
                                                                    justify="space-between"
                                                                    align="center"
                                                                    gap={8}
                                                                >
                                                                    <Text strong>
                                                                        Seccion{' '}
                                                                        {sectionIndex +
                                                                            1}
                                                                    </Text>
                                                                    <Button
                                                                        danger
                                                                        size="small"
                                                                        icon={
                                                                            <DeleteOutlined />
                                                                        }
                                                                        disabled={
                                                                            activeRecommendation
                                                                                .sections
                                                                                .length <=
                                                                            1
                                                                        }
                                                                        onClick={() =>
                                                                            updateRecommendation(
                                                                                (
                                                                                    recommendation,
                                                                                ) => {
                                                                                    recommendation.sections.splice(
                                                                                        sectionIndex,
                                                                                        1,
                                                                                    );
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                </Flex>

                                                                <Form.Item
                                                                    label="Titulo seccion"
                                                                    className="mt-3"
                                                                >
                                                                    <InputFormulario
                                                                        resetKey={`section:${activeRecommendationIndex}:${sectionIndex}:${locale}:title`}
                                                                        value={
                                                                            section
                                                                                .title[
                                                                                locale
                                                                            ]
                                                                        }
                                                                        onCommit={(
                                                                            value,
                                                                        ) =>
                                                                            updateSection(
                                                                                sectionIndex,
                                                                                (
                                                                                    item,
                                                                                ) => {
                                                                                    item.title[
                                                                                        locale
                                                                                    ] =
                                                                                        value;
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                </Form.Item>

                                                                <Flex
                                                                    justify="space-between"
                                                                    align="center"
                                                                    className="mt-2"
                                                                >
                                                                    <Text>
                                                                        Parrafos
                                                                    </Text>
                                                                    <Button
                                                                        size="small"
                                                                        icon={
                                                                            <PlusOutlined />
                                                                        }
                                                                        onClick={() =>
                                                                            addParagraph(
                                                                                sectionIndex,
                                                                            )
                                                                        }
                                                                    >
                                                                        Agregar
                                                                    </Button>
                                                                </Flex>

                                                                {section.paragraphs.map(
                                                                    (
                                                                        paragraph,
                                                                        paragraphIndex,
                                                                    ) => (
                                                                        <Flex
                                                                            key={
                                                                                paragraphIndex
                                                                            }
                                                                            gap={
                                                                                8
                                                                            }
                                                                            align="flex-start"
                                                                            className="mt-3"
                                                                        >
                                                                            <InputFormulario
                                                                                resetKey={`section:${activeRecommendationIndex}:${sectionIndex}:${locale}:paragraph:${paragraphIndex}`}
                                                                                rows={
                                                                                    3
                                                                                }
                                                                                className="flex-1"
                                                                                value={
                                                                                    paragraph[
                                                                                        locale
                                                                                    ]
                                                                                }
                                                                                onCommit={(
                                                                                    value,
                                                                                ) =>
                                                                                    updateSection(
                                                                                        sectionIndex,
                                                                                        (
                                                                                            item,
                                                                                        ) => {
                                                                                            item.paragraphs[
                                                                                                paragraphIndex
                                                                                            ][
                                                                                                locale
                                                                                            ] =
                                                                                                value;
                                                                                        },
                                                                                    )
                                                                                }
                                                                            />
                                                                            <Button
                                                                                danger
                                                                                icon={
                                                                                    <DeleteOutlined />
                                                                                }
                                                                                onClick={() =>
                                                                                    updateSection(
                                                                                        sectionIndex,
                                                                                        (
                                                                                            item,
                                                                                        ) => {
                                                                                            item.paragraphs.splice(
                                                                                                paragraphIndex,
                                                                                                1,
                                                                                            );
                                                                                        },
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Flex>
                                                                    ),
                                                                )}

                                                                <Flex
                                                                    justify="space-between"
                                                                    align="center"
                                                                    className="mt-4"
                                                                >
                                                                    <Text>
                                                                        Lista
                                                                    </Text>
                                                                    <Button
                                                                        size="small"
                                                                        icon={
                                                                            <PlusOutlined />
                                                                        }
                                                                        onClick={() =>
                                                                            addBullet(
                                                                                sectionIndex,
                                                                            )
                                                                        }
                                                                    >
                                                                        Agregar
                                                                    </Button>
                                                                </Flex>

                                                                {section.bullets.map(
                                                                    (
                                                                        bullet,
                                                                        bulletIndex,
                                                                    ) => (
                                                                        <Flex
                                                                            key={
                                                                                bulletIndex
                                                                            }
                                                                            gap={
                                                                                8
                                                                            }
                                                                            align="center"
                                                                            className="mt-3"
                                                                        >
                                                                            <InputFormulario
                                                                                resetKey={`section:${activeRecommendationIndex}:${sectionIndex}:${locale}:bullet:${bulletIndex}`}
                                                                                className="flex-1"
                                                                                value={
                                                                                    bullet[
                                                                                        locale
                                                                                    ]
                                                                                }
                                                                                onCommit={(
                                                                                    value,
                                                                                ) =>
                                                                                    updateSection(
                                                                                        sectionIndex,
                                                                                        (
                                                                                            item,
                                                                                        ) => {
                                                                                            item.bullets[
                                                                                                bulletIndex
                                                                                            ][
                                                                                                locale
                                                                                            ] =
                                                                                                value;
                                                                                        },
                                                                                    )
                                                                                }
                                                                            />
                                                                            <Button
                                                                                danger
                                                                                icon={
                                                                                    <DeleteOutlined />
                                                                                }
                                                                                onClick={() =>
                                                                                    updateSection(
                                                                                        sectionIndex,
                                                                                        (
                                                                                            item,
                                                                                        ) => {
                                                                                            item.bullets.splice(
                                                                                                bulletIndex,
                                                                                                1,
                                                                                            );
                                                                                        },
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Flex>
                                                                    ),
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
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

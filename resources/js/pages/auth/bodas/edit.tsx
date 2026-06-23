import { DeleteOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Collapse, Divider, Flex, Form, Segmented, Space, Splitter, Switch, Tooltip, Typography, Upload, Select } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import BodasShowcase from '@/components/bodas/BodasShowcase';
import type { BodasHighlightIcon, BodasPageContent, BodasPageText, EditableBodasHighlight, EditableBodasMedia, EditablePagePayload, FormData, MediaUploadGroup, UploadConfig } from '@/components/bodas/interfaces';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import { cloneEditableContent, localeLabels, supportedLocales } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';

const { Paragraph, Text, Title } = Typography;

const HIGHLIGHT_ICON_OPTIONS: { label: string; value: BodasHighlightIcon }[] = [
  { label: 'Calendario', value: 'calendar-heart' },
  { label: 'Mensaje', value: 'message-circle' },
];

function newMedia(): EditableBodasMedia {
  return {
    id: `media-${Date.now()}`,
    type: 'image',
    src: '',
    poster: '',
    alt: {
      es: 'Nueva imagen',
      en: 'Nueva imagen',
    },
    label: {
      es: 'Nueva imagen',
      en: 'New image',
    },
  };
}

function newHighlight(): EditableBodasHighlight {
  return {
    icon: 'calendar-heart',
    label: {
      es: 'Nuevo destacado',
      en: 'New highlight',
    },
  };
}

function mediaTypeFromFile(file: File): 'image' | 'video' {
  return file.type.startsWith('video/') ? 'video' : 'image';
}

function mediaNameFromFile(file: File): string {
  return file.name.replace(/\.[^/.]+$/, '').trim() || 'Nueva imagen';
}

function mediaName(media: EditableBodasMedia): string {
  return media.label.es || media.alt.es || media.label.en || media.alt.en || '';
}

type EditBodasInterface = {
  editablePage: EditablePagePayload;
  uploadConfig: UploadConfig;
};

export default function EditBodas({editablePage, uploadConfig}: EditBodasInterface) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] = useState<BodasPageContent>(
        () => cloneEditableContent(editablePage.content),
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

    const previewContent = useMemo(() => {
      if (!isLivePreviewEnabled) {
        return null;
      }

      return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: BodasPageContent) => void) => {
      const nextContent = cloneEditableContent(draftContentRef.current);

      updater(nextContent);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof BodasPageText, value: string) => {
      updateContent((content) => {
        content.locales[locale][field] = value;
      });
    };

    const updateMediaName = (mediaId: string, name: string) => {
      updateContent((content) => {
        const mediaItems = [
          content.background_media,
          ...content.media,
        ];
        const media = mediaItems.find((item) => item.id === mediaId);

        if (!media) {
          return;
        }

        media.alt = {
          es: name,
          en: name,
        };
        media.label = {
          es: name,
          en: name,
        };
      });

      setData( 'media_uploads',
        data.media_uploads.map((upload) => upload.media_id === mediaId ? { ...upload, name } : upload),
      );
    };

    const addUpload = (target: MediaUploadGroup['target'], mediaId: string, name: string, file: File) => {
      const maxSizeBytes = uploadConfig.max_size_mb * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        setUploadError(
          `El archivo "${file.name}" pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El limite actual es ${uploadConfig.max_size_mb} MB.`,
        );

        return;
      }

      const nextUploads = data.media_uploads.filter((upload) => upload.media_id !== mediaId);
      const totalUploadSize = nextUploads.reduce((total, upload) => total + upload.file.size, file.size);

      if (totalUploadSize > maxSizeBytes) {
        setUploadError(`El total de archivos seleccionados supera el limite actual de ${uploadConfig.max_size_mb} MB por guardado.`);

        return;
      }

      setUploadError(null);

      const resolvedName = name.trim() || mediaNameFromFile(file);
      const previewUrl = URL.createObjectURL(file);
      const nextUpload: MediaUploadGroup = {
        target,
        media_id: mediaId,
        name: resolvedName,
        file,
      };

      nextUploads.push(nextUpload);
      updateContent((content) => {
        const media = target === 'background'
          ? content.background_media
          : content.media.find((item) => item.id === mediaId);

        if (!media) {
          return;
        }

        media.type = mediaTypeFromFile(file);
        media.src = previewUrl;
        media.poster = null;
        media.alt = {
          es: resolvedName,
          en: resolvedName,
        };
        media.label = {
          es: resolvedName,
          en: resolvedName,
        };
      });
      setData('media_uploads', nextUploads);
    };

    const submit = () => {
      const latestContent = cloneEditableContent(draftContentRef.current);

      latestContent.media = latestContent.media.filter((media) => media.src.trim() !== '');

      transform((formData) => ({
        ...formData,
        content: latestContent,
        media_uploads: formData.media_uploads.flatMap((upload) => {
          const media = upload.target === 'background'
            ? latestContent.background_media
            : latestContent.media.find((item) => item.id === upload.media_id);

          if (!media) {
            return [];
          }

          return {
            ...upload,
            name: mediaName(media) || upload.name,
          };
        }),
      }));

      post('/admin/contenido/bodas', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setUploadError(null);
          setData('media_uploads', []);
          showAppAlert({
            type: 'success',
            title: 'Bodas guardadas',
            description: 'El contenido se actualizo correctamente.',
          });
        },
        onError: (backendErrors) => {
          showBackendErrorAlert(backendErrors, {
            title: 'No se pudo guardar bodas',
            fallback: 'Revisa los campos del formulario e intenta de nuevo.',
          });
        },
      });
    };

    return (
      <>
        <Head title="Editar bodas" />

        <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4 overflow-hidden">
          <Flex justify="space-between" align="center" gap={16} wrap className="shrink-0">
            <div>
              <Title level={2} className="!mb-1">
                Bodas
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
                onChange={(checked) => setData('is_published', checked)}
              />

              <Button
                type="primary"
                size='small'
                icon={<SaveOutlined />}
                loading={processing}
                onClick={submit}
              >
                Actualizar
              </Button>
            </Space>
          </Flex>

          {Object.keys(formErrors).length > 0 && (
            <Alert type="error" showIcon message="Revisa los campos marcados." description="Laravel devolvio validaciones pendientes en el contenido."/>
          )}

          {progress && (
            <Alert type="info" showIcon message={`Subiendo archivos ${progress.percentage ?? 0}%`}/>
          )}

          {uploadError && (
            <Alert type="error" showIcon message={uploadError} closable onClose={() => setUploadError(null)}/>
          )}

          <Splitter collapsible={{motion: true}} className="min-h-0 flex-1 overflow-hidden rounded-md border bg-white">
            {isLivePreviewEnabled && previewContent && (
              <Splitter.Panel defaultSize="54%" min="24%" max="70%" collapsible className="min-h-0 !overflow-hidden" >
                <div className="relative h-full overflow-hidden bg-white">
                  <div className="h-full overflow-auto">
                    <BodasShowcase
                      content={previewContent}
                      locale={locale}
                    />
                  </div>
                </div>
              </Splitter.Panel>
            )}

            <Splitter.Panel min={isLivePreviewEnabled ? '360px' : '100%'} className="min-h-0 !overflow-hidden">
              <div className="h-full overflow-y-auto overflow-x-hidden p-4">
                <Form layout="vertical" onFinish={submit}>
                  <Flex align="center" gap={12} wrap>
                    <Form.Item label="Titulo" className="min-w-64 flex-1">
                      <InputFormulario
                        resetKey={`page:${locale}:hero_title`}
                        value={draftContent.locales[locale].hero_title}
                        onCommit={(value) => updatePageText('hero_title', value)}
                      />
                    </Form.Item>

                    <Form.Item label="Idioma">
                      <Segmented
                        value={locale}
                        options={supportedLocales.map((item) => ({
                          label: localeLabels[item],
                          value: item,
                        }))}
                        onChange={(value) => setLocale(value as LocaleCode)}
                      />
                    </Form.Item>
                  </Flex>

                  <Collapse
                    defaultActiveKey={['page', 'drawer', 'media']}
                    items={[
                        {
                          key: 'page',
                          label: 'Pagina',
                          children: (
                            <Space direction="vertical" size={14} className="w-full">
                              <Form.Item label="Titulo para pestana">
                                <InputFormulario
                                  resetKey={`page:${locale}:page_title`}
                                  value={draftContent.locales[locale].page_title}
                                  onCommit={(value) => updatePageText('page_title', value)}
                                />
                              </Form.Item>

                              <Form.Item label="Subtitulo">
                                <InputFormulario
                                  resetKey={`page:${locale}:hero_subtitle`}
                                  value={draftContent.locales[locale].hero_subtitle}
                                  onCommit={(value) => updatePageText('hero_subtitle', value)}
                                />
                              </Form.Item>

                              <Form.Item label="Descripcion">
                                <InputFormulario
                                  resetKey={`page:${locale}:hero_description`}
                                  rows={5}
                                  value={draftContent.locales[locale].hero_description}
                                  onCommit={(value) => updatePageText('hero_description', value)}
                                />
                              </Form.Item>

                              <Form.Item label="Boton">
                                <InputFormulario
                                  resetKey={`page:${locale}:reserve_cta`}
                                  value={draftContent.locales[locale].reserve_cta}
                                  onCommit={(value) => updatePageText('reserve_cta', value)}
                                />
                              </Form.Item>

                              <Divider className="!my-2" />

                              <Flex justify="space-between" align="center">
                                <Text strong>Destacados</Text>
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() => updateContent((content) => content.highlights.push(newHighlight()))}
                                >
                                  Agregar
                                </Button>
                              </Flex>

                              {draftContent.highlights.map((highlight, index) => (
                                <Flex key={index} gap={8} align="center" wrap>
                                  <Select
                                    value={highlight.icon}
                                    className="w-44"
                                    options={HIGHLIGHT_ICON_OPTIONS}
                                    onChange={(value) =>
                                      updateContent((content) => content.highlights[index].icon = value)
                                    }
                                  />

                                  <InputFormulario
                                    resetKey={`highlight:${locale}:${index}`}
                                    className="min-w-48 flex-1"
                                    value={highlight.label[locale]}
                                    onCommit={(value) =>
                                      updateContent((content) => content.highlights[index].label[locale] = value)
                                    }
                                  />

                                  <Tooltip title="Eliminar destacado">
                                    <Button
                                      danger
                                      icon={<DeleteOutlined />}
                                      disabled={draftContent.highlights.length <= 1}
                                      onClick={() => updateContent((content) => content.highlights.splice(index, 1))}
                                    />
                                  </Tooltip>
                                </Flex>
                              ))}
                            </Space>
                          ),
                        },
                        {
                          key: 'drawer',
                          label: 'Formulario',
                          children: (
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                              {[
                                ['drawer_kicker', 'Kicker'],
                                ['drawer_title', 'Titulo'],
                                ['drawer_description', 'Descripcion'],
                                ['name_label', 'Etiqueta nombre'],
                                ['name_placeholder', 'Placeholder nombre'],
                                ['email_label', 'Etiqueta correo'],
                                ['email_placeholder', 'Placeholder correo'],
                                ['phone_label', 'Etiqueta telefono'],
                                ['phone_placeholder', 'Placeholder telefono'],
                                ['message_label', 'Etiqueta mensaje'],
                                ['message_placeholder', 'Placeholder mensaje'],
                                ['submit_label', 'Boton'],
                              ].map(([field, label]) => (
                                <Form.Item key={field} label={label} className={field.includes('description') || field.includes('placeholder') ? 'lg:col-span-2' : ''}>
                                  <InputFormulario
                                    resetKey={`drawer:${locale}:${field}`}
                                    rows={field.includes('description') || field === 'message_placeholder' ? 3 : undefined}
                                    value={draftContent.locales[locale][field as keyof BodasPageText]}
                                    onCommit={(value) => updatePageText(field as keyof BodasPageText, value)}
                                  />
                                </Form.Item>
                              ))}
                            </div>
                          ),
                        },
                        {
                          key: 'media',
                          label: 'Media',
                          children: (
                            <Space direction="vertical" size={14} className="w-full">
                              <Text strong>Fondo</Text>

                              <div className="rounded-md border p-3">
                                <Flex gap={8} align="flex-end" wrap>
                                  <Form.Item label="Nombre / alt" className="!mb-0 min-w-64 flex-1">
                                    <InputFormulario
                                      resetKey={`background:${draftContent.background_media.id}:name`}
                                      value={mediaName(draftContent.background_media)}
                                      onCommit={(value) =>
                                        updateMediaName(draftContent.background_media.id, value)
                                      }
                                    />
                                  </Form.Item>

                                  <Upload
                                    accept={uploadConfig.accept}
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                      addUpload('background', draftContent.background_media.id, mediaName(draftContent.background_media), file as RcFile);

                                      return Upload.LIST_IGNORE;
                                    }}
                                  >
                                    <Button icon={<UploadOutlined />}>Cambiar fondo</Button>
                                  </Upload>
                                </Flex>

                                <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                  {draftContent.background_media.type === 'video' ? (
                                    <video
                                      controls
                                      className="h-40 w-full object-cover"
                                      src={draftContent.background_media.src}
                                      poster={draftContent.background_media.poster ?? undefined}
                                    />
                                  ) : (
                                    <img className="h-40 w-full object-cover" src={draftContent.background_media.src} alt={mediaName(draftContent.background_media)} />
                                  )}
                                </div>
                              </div>

                              <Divider className="!my-2" />

                              <Flex justify="space-between" align="center">
                                <Text strong>Carrusel</Text>
                                <Button icon={<PlusOutlined />} onClick={() => updateContent((content) => content.media.push(newMedia()))}>
                                  Anadir imagen/video
                                </Button>
                              </Flex>

                              <Paragraph className="!mb-0 text-xs text-muted-foreground">
                                Maximo{' '}{uploadConfig.max_size_mb} MB por archivo y por guardado.
                              </Paragraph>

                              {draftContent.media.map((media, index) => (
                                <div key={media.id} className="rounded-md border p-3">
                                  <Flex gap={8} align="flex-end" wrap>
                                    <Form.Item label="Nombre / alt" className="!mb-0 min-w-64 flex-1">
                                      <InputFormulario
                                        resetKey={`media:${media.id}:name`}
                                        value={mediaName(media)}
                                        onCommit={(value) => updateMediaName(media.id, value)}
                                      />
                                    </Form.Item>

                                    <Upload
                                      accept={uploadConfig.accept}
                                      showUploadList={false}
                                      beforeUpload={(file) => {
                                        addUpload('media', media.id, mediaName(media), file as RcFile);

                                        return Upload.LIST_IGNORE;
                                      }}
                                    >
                                      <Button icon={<UploadOutlined />}>
                                        {media.src ? 'Cambiar archivo' : 'Subir archivo'}
                                      </Button>
                                    </Upload>

                                    <Button
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => updateContent((content) => content.media.splice(index, 1))}
                                      disabled={draftContent.media.length <= 1}
                                    />
                                  </Flex>

                                  <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                    {media.src ? (media.type === 'video' ? (
                                      <video controls className="h-40 w-full object-cover" src={media.src}/>
                                    ) : (
                                      <img className="h-40 w-full object-cover" src={media.src} alt={mediaName(media)} />
                                    )) : (
                                      <div className="flex h-28 items-center justify-center text-sm text-muted-foreground">
                                        Sin archivo seleccionado
                                      </div>
                                    )}
                                  </div>

                                  {data.media_uploads.some((upload) => upload.media_id === media.id) && (
                                    <Text className="mt-2 block text-xs text-muted-foreground">
                                      Archivo listo para guardarse
                                    </Text>
                                  )}
                                </div>
                              ))}
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

import { DeleteOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Collapse, Divider, Flex, Form, InputNumber, Select, Segmented, Space, Splitter, Switch, Tooltip, Typography, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import type { EditablePagePayload, EditableServicio, EditableServicioTrustItem, FormData, MediaUploadGroup, ServiciosPageContent, ServiciosPageText, UploadConfig } from '@/components/servicios/interfaces';
import ServiciosShowcase from '@/components/servicios/ServiciosShowcase';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import { cloneEditableContent, localeLabels, supportedLocales } from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

const SERVICIO_ICON_OPTIONS = [
  { label: 'Alberca', value: 'pool' },
  { label: 'Estacionamiento', value: 'parking' },
  { label: 'Tienda', value: 'shop' },
  { label: 'Playa', value: 'beach' },
  { label: 'Deportes', value: 'sports' },
  { label: 'Comida', value: 'food' },
  { label: 'Tours', value: 'fish' },
  { label: 'Spa', value: 'sparks' },
  { label: 'Bodas', value: 'boda' },
  { label: 'Concierge', value: 'consierge' },
] as const;

const TRUST_ICON_OPTIONS = [
  { label: 'Seguro', value: 'shield' },
  { label: 'Alberca', value: 'pool' },
  { label: 'Tienda', value: 'shop' },
] as const;

const ACCENT_OPTIONS = [
  '#1f6f79',
  '#8a4b22',
  '#a33f1d',
  '#235d48',
  '#7b4f8f',
];

function localizedArrayValues(values: LocalizedString[], locale: LocaleCode): string[] {
  return values.map((value) => value[locale]).filter(Boolean);
}

function valuesToLocalizedArray(values: string[], previous: LocalizedString[], locale: LocaleCode): LocalizedString[] {
  return values.map((value, index) => ({
    es: previous[index]?.es ?? value,
    en: previous[index]?.en ?? value,
    [locale]: value,
  }));
}

function newMedia(): EditableMedia {
  return {
    id: `media-${Date.now()}`,
    type: 'image',
    src: '',
    poster: '',
    alt: {
      es: 'Nueva imagen',
      en: 'Nueva imagen',
    },
  };
}

function newService(order: number): EditableServicio {
  const id = `servicio-${Date.now()}`;

  return {
    id,
    order,
    is_active: true,
    name: {
        es: 'Nuevo servicio',
        en: 'New service',
    },
    eyebrow: {
        es: 'Categoria',
        en: 'Category',
    },
    description: {
        es: 'Descripcion del servicio.',
        en: 'Service description.',
    },
    icon: 'pool',
    accent: '#1f6f79',
    tags: [
        {
            es: 'Nuevo',
            en: 'New',
        },
    ],
    media: [newMedia()],
  };
}

function newTrustItem(): EditableServicioTrustItem {
  return {
    icon: 'shield',
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

function mediaName(media: EditableMedia): string {
  return media.alt.es || media.alt.en || '';
}

interface ListaDestacadosInterface {
  items: EditableServicioTrustItem[];
  locale: LocaleCode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, item: EditableServicioTrustItem) => void;
}

function ListaDestacados({ items, locale, onAdd, onRemove, onChange}: ListaDestacadosInterface) {
  return (
    <Space direction="vertical" size={8} className="w-full">
      <Flex justify="space-between" align="center">
        <Text strong>Destacados</Text>
        <Button size="small" icon={<PlusOutlined />} onClick={onAdd}>
          Agregar
        </Button>
      </Flex>

      {items.map((item, index) => (
        <Flex key={index} gap={8} align="center" wrap>
          <Select
            value={item.icon}
            className="w-40"
            options={TRUST_ICON_OPTIONS.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
            onChange={(value) => onChange(index, {...item, icon: value})}
          />

          <InputFormulario
            resetKey={`trust:${locale}:${index}:label`}
            className="min-w-48 flex-1"
            value={item.label[locale]}
            onCommit={(value) =>
              onChange(index, {...item, label: {...item.label, [locale]: value}})}
          />

          <Tooltip title="Eliminar destacado">
            <Button danger icon={<DeleteOutlined />} onClick={() => onRemove(index)} disabled={items.length <= 1} />
          </Tooltip>
        </Flex>
      ))}
    </Space>
  );
}

interface SelectColorInterface {
  value: string;
  onChange: (value: string) => void;
}

function SelectColor({ value, onChange }: SelectColorInterface) {
  return (
    <Space wrap size={6}>
      {ACCENT_OPTIONS.map((color) => (
        <Tooltip key={color} title={color}>
          <button
            type="button"
            className={`h-8 w-8 rounded-md border ${value === color ? 'ring-2 ring-black' : ''}`}
            style={{ background: color }}
            onClick={() => onChange(color)}
            aria-label={`Usar color ${color}`}
          />
        </Tooltip>
      ))}
    </Space>
  );
}

type EditServiciosInterface = {
  editablePage: EditablePagePayload;
  uploadConfig: UploadConfig;
};

export default function EditServicios({editablePage, uploadConfig}: EditServiciosInterface) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] = useState<ServiciosPageContent>(
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
    const activeService = draftContent.services[activeServiceIndex] ?? draftContent.services[0];

    const previewContent = useMemo(() => {
      if (!isLivePreviewEnabled) {
        return null;
      }

      return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: ServiciosPageContent) => void) => {
      const nextContent = cloneEditableContent(draftContentRef.current);

      updater(nextContent);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const commitDraftContent = (resolver: (currentContent: ServiciosPageContent) => ServiciosPageContent) => {
      const nextContent = resolver(draftContentRef.current);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof ServiciosPageText, value: string) => {
      commitDraftContent((currentContent) => ({
        ...currentContent,
        locales: {
          ...currentContent.locales,
          [locale]: {
            ...currentContent.locales[locale],
            [field]: value,
          },
        },
      }));
    };

    const updateLocalizedField = ( field: keyof Pick<EditableServicio, | 'name' | 'eyebrow' | 'description'>, value: string) => {
      commitDraftContent((currentContent) => ({
        ...currentContent,
        services: currentContent.services.map((service, index) => {
          if (index !== activeServiceIndex) {
            return service;
          }

          const localizedValue = service[field] as LocalizedString;

          return {
            ...service,
            [field]: {
              ...localizedValue,
              [locale]: value,
            },
          } as EditableServicio;
        }),
      }));
    };

    const updateService = (updater: (service: EditableServicio) => void) => {
      commitDraftContent((currentContent) => ({
        ...currentContent,
        services: currentContent.services.map((service, index) => {
          if (index !== activeServiceIndex) {
            return service;
          }

          const nextService = structuredClone(service) as EditableServicio;

          updater(nextService);

          return nextService;
        }),
      }));
    };

    const addService = () => {
      const nextServiceIndex = draftContent.services.length;

      updateContent((content) => {
        content.services.push(newService(content.services.length + 1));
      });
      setActiveServiceIndex(nextServiceIndex);
    };

    const removeActiveService = () => {
      if (draftContent.services.length <= 1) {
        return;
      }

      updateContent((content) => {
        content.services.splice(activeServiceIndex, 1);
      });
      setActiveServiceIndex(Math.max(activeServiceIndex - 1, 0));
    };

    const addCarouselMedia = () => {
      updateService((service) => service.media.push(newMedia()));
    };

    const updateMediaName = (mediaId: string, name: string) => {
      updateService((service) => {
        const media = service.media.find((item) => item.id === mediaId);

        if (! media) {
          return;
        }

        media.alt = {
          es: name,
          en: name,
        };
      });

      setData( 'media_uploads',
        data.media_uploads.map((upload) => upload.media_id === mediaId ? { ...upload, name } : upload),
      );
    };

    const addUpload = (serviceId: string, mediaId: string, name: string, file: File) => {
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
        service_id: serviceId,
        media_id: mediaId,
        name: resolvedName,
        file,
      };

      nextUploads.push(nextUpload);
      updateService((service) => {
        const media = service.media.find((item) => item.id === mediaId);

        if (! media) {
          return;
        }

        media.type = mediaTypeFromFile(file);
        media.src = previewUrl;
        media.poster = null;
        media.alt = {
          es: resolvedName,
          en: resolvedName,
        };
      });
      setData('media_uploads', nextUploads);
    };

    const submit = () => {
      const latestContent = cloneEditableContent(draftContentRef.current);

      latestContent.services = latestContent.services.map((service) => ({...service, media: service.media.filter((media) => media.src.trim() !== '')}));

      transform((formData) => ({
        ...formData,
        content: latestContent,
        media_uploads: formData.media_uploads.flatMap((upload) => {
          const service = latestContent.services.find((item) => item.id === upload.service_id);
          const media = service?.media.find((item) => item.id === upload.media_id);

          if (! media) {
            return [];
          }

          return {
            ...upload,
            name: mediaName(media) || upload.name,
          };
        }),
      }));

      post('/admin/contenido/servicios', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setUploadError(null);
          setData('media_uploads', []);
          showAppAlert({
            type: 'success',
            title: 'Servicios guardados',
            description: 'El contenido se actualizo correctamente.',
          });
        },
        onError: (backendErrors) => {
          showBackendErrorAlert(backendErrors, {
            title: 'No se pudo guardar servicios',
            fallback: 'Revisa los campos del formulario e intenta de nuevo.',
          });
        },
      });
    };

    return (
      <>
        <Head title="Editar servicios" />

        <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4 overflow-hidden">
          <Flex justify="space-between" align="center" gap={16} wrap className="shrink-0">
            <div>
              <Title level={2} className="!mb-1">
                Servicios
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
                    <ServiciosShowcase
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
                        resetKey={`page:${locale}:intro_title`}
                        value={draftContent.locales[locale].intro_title}
                        onCommit={(value) => updatePageText('intro_title', value)}
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
                    defaultActiveKey={['page', 'services']}
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

                              <Form.Item label="Descripcion principal">
                                <InputFormulario
                                  resetKey={`page:${locale}:intro_body`}
                                  rows={4}
                                  value={draftContent.locales[locale].intro_body}
                                  onCommit={(value) => updatePageText('intro_body', value)}
                                />
                              </Form.Item>

                              <Divider className="!my-2" />

                              <ListaDestacados
                                items={draftContent.trust_items}
                                locale={locale}
                                onAdd={() => updateContent((content) => content.trust_items.push(newTrustItem()))}
                                onRemove={(index) => updateContent((content) => content.trust_items.splice(index, 1))}
                                onChange={(index, item) => updateContent((content) => content.trust_items[index] = item)}
                              />
                            </Space>
                          ),
                        },
                        {
                          key: 'services',
                          label: 'Servicios',
                          children: activeService && (
                            <Space direction="vertical" size={14} className="w-full">
                              <Flex gap={8} wrap style={{ width: "100%" }}>
                                <Form.Item label="Servicio" layout="horizontal">
                                  <Select
                                    className="min-w-64 flex-1"
                                    value={activeServiceIndex}
                                    options={draftContent.services.map((service, index) =>
                                      ({
                                        label: service.name[locale] || service.id,
                                        value: index,
                                      }),
                                    )}
                                    onChange={setActiveServiceIndex}
                                  />
                                </Form.Item>

                                <Tooltip title="Agregar">
                                  <Button icon={<PlusOutlined />} onClick={addService}/>
                                </Tooltip>

                                <Tooltip title="Eliminar">
                                  <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={removeActiveService}
                                    disabled={draftContent.services.length <= 1}
                                  />
                                </Tooltip>

                                <Form.Item label="Orden" layout='horizontal'>
                                  <InputNumber
                                    min={0}
                                    value={activeService.order}
                                    onChange={(value) =>
                                      updateService((service) => service.order = Number(value ?? 0))
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Visible" layout='horizontal'>
                                  <Switch
                                    checked={activeService.is_active}
                                    onChange={(checked) =>
                                      updateService((service) => service.is_active = checked)
                                    }
                                  />
                                </Form.Item>
                              </Flex>

                              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                <Form.Item label="Nombre">
                                  <InputFormulario
                                    resetKey={`service:${activeServiceIndex}:${locale}:name`}
                                    value={activeService.name[locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('name', value)
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Categoria">
                                  <InputFormulario
                                    resetKey={`service:${activeServiceIndex}:${locale}:eyebrow`}
                                    value={activeService.eyebrow[locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('eyebrow', value)
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Descripcion" className="lg:col-span-2">
                                  <InputFormulario
                                    resetKey={`service:${activeServiceIndex}:${locale}:description`}
                                    rows={6}
                                    value={activeService.description[locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('description', value)
                                    }
                                  />
                                </Form.Item>
                              </div>

                              <Flex gap={12} wrap style={{ width: "100%" }}>
                                <Form.Item label="Icono">
                                  <Select
                                    className="w-56"
                                    value={activeService.icon}
                                    options={SERVICIO_ICON_OPTIONS.map((type) => ({
                                      label: type.label,
                                      value: type.value,
                                    }))}
                                    onChange={(value) =>
                                      updateService((service) => service.icon = value)
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Color">
                                  <SelectColor
                                    value={activeService.accent}
                                    onChange={(value) =>
                                      updateService((service) => service.accent = value)
                                    }
                                  />
                                </Form.Item>
                              </Flex>

                              <Form.Item label="Tags">
                                <Select
                                  mode="tags"
                                  value={localizedArrayValues(activeService.tags, locale)}
                                  onChange={(values) =>
                                    updateService((service) => service.tags = valuesToLocalizedArray(values, service.tags, locale))
                                  }
                                />
                              </Form.Item>

                              <Divider className="!my-2" />

                              <Flex align="center" justify="space-between">
                                <Text strong>
                                  Carrusel
                                </Text>
                                <Space wrap>
                                  <Button icon={<PlusOutlined />} onClick={addCarouselMedia}>
                                    Anadir imagen/video
                                  </Button>
                                </Space>
                              </Flex>

                              <Paragraph className="!mb-0 text-xs text-muted-foreground">
                                Maximo{' '}{uploadConfig.max_size_mb} MB por archivo y por guardado.
                              </Paragraph>

                              {activeService.media.map(
                                (media, index) => (
                                  <div key={media.id} className="rounded-md border p-3">
                                    <Flex gap={8} align="flex-end" wrap>
                                      <Form.Item label="Nombre / alt" className="!mb-0 min-w-64 flex-1">
                                        <InputFormulario
                                          resetKey={`service:${activeServiceIndex}:media:${media.id}:name`}
                                          placeholder="Ej. Alberca frente al mar"
                                          value={mediaName(media)}
                                          onCommit={(value) =>
                                            updateMediaName(media.id, value)
                                          }
                                        />
                                      </Form.Item>

                                      <Upload
                                        accept={uploadConfig.accept}
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                          addUpload(activeService.id, media.id, mediaName(media), file as RcFile);

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
                                        onClick={() => updateService((service) => service.media.splice(index, 1))}
                                        disabled={activeService.media.length <= 1}
                                      />
                                    </Flex>

                                    <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                      {media.src ? (media.type === 'video' ? (
                                        <video controls className="h-40 w-full object-cover" src={media.src}/>
                                      ) : (
                                        <img
                                          className="h-40 w-full object-cover"
                                          src={media.src}
                                          alt={mediaName(media)}
                                        />
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

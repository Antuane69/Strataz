import { DeleteOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Collapse, Divider, Flex, Form, InputNumber, Select, Segmented, Space, Splitter, Switch, Tooltip, Typography, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import type { EditablePromotion, EditablePromotionHighlightItem, EditablePromotionPrice, EditablePromotionPriceGroup, EditablePromotionTab, EditablePagePayload, FormData, MediaUploadGroup, PromocionesPageContent, PromocionesPageText, UploadConfig } from '@/components/promociones/interface';
import PromocionesShowcase from '@/components/promociones/PromocionesShowcase';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import { cloneEditableContent, localeLabels, supportedLocales } from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

const CATEGORY_OPTIONS = [
  { label: 'Parejas', value: 'parejas' },
  { label: 'Familias', value: 'familias' },
  { label: 'Estancias', value: 'estancias' },
  { label: 'Experiencias', value: 'experiencias' },
  { label: 'Eventos', value: 'eventos' },
] as const;

const PROMOTION_ICON_OPTIONS = [
  { label: 'Playa', value: 'beach' },
  { label: 'Pareja', value: 'couple' },
  { label: 'Familia', value: 'family' },
  { label: 'Noche', value: 'night' },
  { label: 'Evento', value: 'event' },
  { label: 'Regalo', value: 'gift' },
] as const;

const HIGHLIGHT_ICON_OPTIONS = [
  { label: 'Descuento', value: 'badge-percent' },
  { label: 'Palmera', value: 'palmtree' },
  { label: 'Telefono', value: 'phone' },
] as const;

const ACCENT_OPTIONS = [
  '#1f6f79',
  '#a33f1d',
  '#235d48',
  '#1f5f65',
  '#8a4b22',
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

function newImage(): EditableMedia {
  return {
    id: `image-${Date.now()}`,
    type: 'image',
    src: '',
    poster: '',
    alt: {
      es: 'Nueva promocion',
      en: 'New promotion',
    },
  };
}

function newPrice(): EditablePromotionPrice {
  return {
    label: {
      es: 'Nueva tarifa',
      en: 'New rate',
    },
    amount: '$0 MXN',
    prefix: {
      es: 'Desde',
      en: 'From',
    },
    note: {
      es: '',
      en: '',
    },
  };
}

function newPriceGroup(): EditablePromotionPriceGroup {
  return {
    title: {
      es: '',
      en: '',
    },
    description: {
      es: '',
      en: '',
    },
    prices: [newPrice()],
  };
}

function newPromotion(order: number): EditablePromotion {
  const id = `promocion-${Date.now()}`;

  return {
    id,
    order,
    is_active: true,
    featured: false,
    title: {
        es: 'Nueva promocion',
        en: 'New promotion',
    },
    eyebrow: {
        es: 'Oferta',
        en: 'Offer',
    },
    category: 'estancias',
    image: newImage(),
    description: {
        es: 'Descripcion de la promocion.',
        en: 'Promotion description.',
    },
    highlight: {
        es: 'Tarifa especial',
        en: 'Special rate',
    },
    price_heading: {
        es: 'Precio',
        en: 'Price',
    },
    validity: {
        es: '',
        en: '',
    },
    icon: 'gift',
    accent: '#1f6f79',
    tags: [
        {
            es: 'Reserva directa',
            en: 'Direct booking',
        },
    ],
    benefits: [
        {
            es: 'Beneficio incluido',
            en: 'Included benefit',
        },
    ],
    price_groups: [newPriceGroup()],
  };
}

function newHighlightItem(): EditablePromotionHighlightItem {
  return {
    icon: 'badge-percent',
    label: {
      es: 'Nuevo destacado',
      en: 'New highlight',
    },
  };
}

function newTab(): EditablePromotionTab {
  return {
    key: 'estancias',
    label: {
      es: 'Nueva categoria',
      en: 'New category',
    },
  };
}

function mediaNameFromFile(file: File): string {
  return file.name.replace(/\.[^/.]+$/, '').trim() || 'Nueva promocion';
}

function mediaName(media: EditableMedia): string {
  return media.alt.es || media.alt.en || '';
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

type EditPromocionesInterface = {
  editablePage: EditablePagePayload;
  uploadConfig: UploadConfig;
};

export default function EditPromociones({editablePage, uploadConfig}: EditPromocionesInterface) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activePromotionIndex, setActivePromotionIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] = useState<PromocionesPageContent>(
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
    const activePromotion = draftContent.promotions[activePromotionIndex] ?? draftContent.promotions[0];

    const previewContent = useMemo(() => {
      if (!isLivePreviewEnabled) {
        return null;
      }

      return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: PromocionesPageContent) => void) => {
      const nextContent = cloneEditableContent(draftContentRef.current);

      updater(nextContent);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof PromocionesPageText, value: string) => {
      updateContent((content) => {
        content.locales[locale][field] = value;
      });
    };

    const updatePromotion = (updater: (promotion: EditablePromotion) => void) => {
      updateContent((content) => {
        const promotion = content.promotions[activePromotionIndex];

        if (!promotion) {
          return;
        }

        updater(promotion);
      });
    };

    const updatePromotionLocalizedField = (field: keyof Pick<EditablePromotion, | 'title' | 'eyebrow' | 'description' | 'highlight' | 'price_heading' | 'validity'>, value: string) => {
      updatePromotion((promotion) => {
        promotion[field][locale] = value;
      });
    };

    const addPromotion = () => {
      const nextPromotionIndex = draftContent.promotions.length;

      updateContent((content) => {
        content.promotions.push(newPromotion(content.promotions.length + 1));
      });
      setActivePromotionIndex(nextPromotionIndex);
    };

    const removeActivePromotion = () => {
      if (draftContent.promotions.length <= 1) {
        return;
      }

      updateContent((content) => {
        content.promotions.splice(activePromotionIndex, 1);
      });
      setActivePromotionIndex(Math.max(activePromotionIndex - 1, 0));
    };

    const updateMediaName = (name: string) => {
      updatePromotion((promotion) => {
        promotion.image.alt = {
          es: name,
          en: name,
        };
      });

      setData( 'media_uploads',
        data.media_uploads.map((upload) => upload.media_id === activePromotion.image.id ? { ...upload, name } : upload),
      );
    };

    const addUpload = (promotionId: string, mediaId: string, name: string, file: File) => {
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
        promotion_id: promotionId,
        media_id: mediaId,
        name: resolvedName,
        file,
      };

      nextUploads.push(nextUpload);
      updatePromotion((promotion) => {
        promotion.image.src = previewUrl;
        promotion.image.alt = {
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
          const promotion = latestContent.promotions.find((item) => item.id === upload.promotion_id);

          if (!promotion || promotion.image.id !== upload.media_id) {
            return [];
          }

          return {
            ...upload,
            name: mediaName(promotion.image) || upload.name,
          };
        }),
      }));

      post('/admin/contenido/promociones', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setUploadError(null);
          setData('media_uploads', []);
          showAppAlert({
            type: 'success',
            title: 'Promociones guardadas',
            description: 'El contenido se actualizo correctamente.',
          });
        },
        onError: (backendErrors) => {
          showBackendErrorAlert(backendErrors, {
            title: 'No se pudo guardar promociones',
            fallback: 'Revisa los campos del formulario e intenta de nuevo.',
          });
        },
      });
    };

    return (
      <>
        <Head title="Editar promociones" />

        <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4 overflow-hidden">
          <Flex justify="space-between" align="center" gap={16} wrap className="shrink-0">
            <div>
              <Title level={2} className="!mb-1">
                Promociones
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
                    <PromocionesShowcase
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
                    defaultActiveKey={['page', 'promotions']}
                    items={[
                        {
                          key: 'page',
                          label: 'Pagina',
                          children: (
                            <Space direction="vertical" size={14} className="w-full">
                              <Form.Item label="Titulo para pestana">
                                <InputFormulario resetKey={`page:${locale}:page_title`} value={draftContent.locales[locale].page_title} onCommit={(value) => updatePageText('page_title', value)} />
                              </Form.Item>

                              <Form.Item label="Descripcion principal">
                                <InputFormulario resetKey={`page:${locale}:intro_body`} rows={4} value={draftContent.locales[locale].intro_body} onCommit={(value) => updatePageText('intro_body', value)} />
                              </Form.Item>

                              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {[
                                  ['all_tab_label', 'Tab todas'],
                                  ['multiple_options_label', 'Texto opciones'],
                                  ['default_price_label', 'Etiqueta precio'],
                                  ['default_price_heading', 'Titulo precio'],
                                  ['available_options_heading', 'Titulo opciones'],
                                  ['contact_kicker', 'Kicker contacto'],
                                  ['contact_title', 'Titulo contacto'],
                                  ['contact_body', 'Descripcion contacto'],
                                  ['email_cta', 'Boton correo'],
                                  ['phone_cta', 'Boton telefono'],
                                ].map(([field, label]) => (
                                  <Form.Item key={field} label={label} className={field === 'contact_body' ? 'lg:col-span-2' : ''}>
                                    <InputFormulario
                                      resetKey={`page:${locale}:${field}`}
                                      rows={field === 'contact_body' ? 3 : undefined}
                                      value={draftContent.locales[locale][field as keyof PromocionesPageText]}
                                      onCommit={(value) => updatePageText(field as keyof PromocionesPageText, value)}
                                    />
                                  </Form.Item>
                                ))}

                                <Form.Item label="Link correo">
                                  <InputFormulario
                                    resetKey="contact:email"
                                    value={draftContent.contact.email_href}
                                    onCommit={(value) => updateContent((content) => content.contact.email_href = value)}
                                  />
                                </Form.Item>

                                <Form.Item label="Link telefono">
                                  <InputFormulario
                                    resetKey="contact:phone"
                                    value={draftContent.contact.phone_href}
                                    onCommit={(value) => updateContent((content) => content.contact.phone_href = value)}
                                  />
                                </Form.Item>
                              </div>

                              <Divider className="!my-2" />

                              <Flex justify="space-between" align="center">
                                <Text strong>Destacados</Text>
                                <Button size="small" icon={<PlusOutlined />} onClick={() => updateContent((content) => content.highlight_items.push(newHighlightItem()))}>
                                  Agregar
                                </Button>
                              </Flex>

                              {draftContent.highlight_items.map((item, index) => (
                                <Flex key={index} gap={8} align="center" wrap>
                                  <Select
                                    value={item.icon}
                                    className="w-44"
                                    options={HIGHLIGHT_ICON_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
                                    onChange={(value) => updateContent((content) => content.highlight_items[index].icon = value)}
                                  />
                                  <InputFormulario
                                    resetKey={`highlight:${locale}:${index}`}
                                    className="min-w-48 flex-1"
                                    value={item.label[locale]}
                                    onCommit={(value) => updateContent((content) => content.highlight_items[index].label[locale] = value)}
                                  />
                                  <Button danger icon={<DeleteOutlined />} disabled={draftContent.highlight_items.length <= 1} onClick={() => updateContent((content) => content.highlight_items.splice(index, 1))}/>
                                </Flex>
                              ))}

                              <Divider className="!my-2" />

                              <Flex justify="space-between" align="center">
                                <Text strong>Tabs</Text>
                                <Button size="small" icon={<PlusOutlined />} onClick={() => updateContent((content) => content.tabs.push(newTab()))}>
                                  Agregar
                                </Button>
                              </Flex>

                              {draftContent.tabs.map((tab, index) => (
                                <Flex key={index} gap={8} align="center" wrap>
                                  <Select
                                    value={tab.key}
                                    className="w-44"
                                    options={CATEGORY_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
                                    onChange={(value) => updateContent((content) => content.tabs[index].key = value)}
                                  />
                                  <InputFormulario
                                    resetKey={`tab:${locale}:${index}`}
                                    className="min-w-48 flex-1"
                                    value={tab.label[locale]}
                                    onCommit={(value) => updateContent((content) => content.tabs[index].label[locale] = value)}
                                  />
                                  <Button danger icon={<DeleteOutlined />} disabled={draftContent.tabs.length <= 1} onClick={() => updateContent((content) => content.tabs.splice(index, 1))}/>
                                </Flex>
                              ))}
                            </Space>
                          ),
                        },
                        {
                          key: 'promotions',
                          label: 'Promociones',
                          children: activePromotion && (
                            <Space direction="vertical" size={14} className="w-full">
                              <Flex gap={8} wrap style={{ width: "100%" }}>
                                <Form.Item label="Promocion" layout="horizontal">
                                  <Select
                                    className="min-w-64 flex-1"
                                    value={activePromotionIndex}
                                    options={draftContent.promotions.map((promotion, index) =>
                                      ({
                                        label: promotion.title[locale] || promotion.id,
                                        value: index,
                                      }),
                                    )}
                                    onChange={setActivePromotionIndex}
                                  />
                                </Form.Item>

                                <Tooltip title="Agregar">
                                  <Button icon={<PlusOutlined />} onClick={addPromotion}/>
                                </Tooltip>

                                <Tooltip title="Eliminar">
                                  <Button danger icon={<DeleteOutlined />} onClick={removeActivePromotion} disabled={draftContent.promotions.length <= 1}/>
                                </Tooltip>

                                <Form.Item label="Orden" layout='horizontal'>
                                  <InputNumber min={0} value={activePromotion.order} onChange={(value) => updatePromotion((promotion) => promotion.order = Number(value ?? 0))}/>
                                </Form.Item>

                                <Form.Item label="Visible" layout='horizontal'>
                                  <Switch checked={activePromotion.is_active} onChange={(checked) => updatePromotion((promotion) => promotion.is_active = checked)}/>
                                </Form.Item>

                                <Form.Item label="Destacada" layout='horizontal'>
                                  <Switch checked={activePromotion.featured} onChange={(checked) => updatePromotion((promotion) => promotion.featured = checked)}/>
                                </Form.Item>
                              </Flex>

                              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                <Form.Item label="Titulo">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:title`} value={activePromotion.title[locale]} onCommit={(value) => updatePromotionLocalizedField('title', value)} />
                                </Form.Item>

                                <Form.Item label="Eyebrow">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:eyebrow`} value={activePromotion.eyebrow[locale]} onCommit={(value) => updatePromotionLocalizedField('eyebrow', value)} />
                                </Form.Item>

                                <Form.Item label="Descripcion" className="lg:col-span-2">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:description`} rows={5} value={activePromotion.description[locale]} onCommit={(value) => updatePromotionLocalizedField('description', value)} />
                                </Form.Item>

                                <Form.Item label="Highlight">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:highlight`} value={activePromotion.highlight[locale]} onCommit={(value) => updatePromotionLocalizedField('highlight', value)} />
                                </Form.Item>

                                <Form.Item label="Titulo precios">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:price-heading`} value={activePromotion.price_heading[locale]} onCommit={(value) => updatePromotionLocalizedField('price_heading', value)} />
                                </Form.Item>

                                <Form.Item label="Vigencia" className="lg:col-span-2">
                                  <InputFormulario resetKey={`promotion:${activePromotionIndex}:${locale}:validity`} value={activePromotion.validity[locale]} onCommit={(value) => updatePromotionLocalizedField('validity', value)} />
                                </Form.Item>
                              </div>

                              <Flex gap={12} wrap style={{ width: "100%" }}>
                                <Form.Item label="Categoria">
                                  <Select
                                    className="w-56"
                                    value={activePromotion.category}
                                    options={CATEGORY_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
                                    onChange={(value) => updatePromotion((promotion) => promotion.category = value)}
                                  />
                                </Form.Item>

                                <Form.Item label="Icono">
                                  <Select
                                    className="w-48"
                                    value={activePromotion.icon}
                                    options={PROMOTION_ICON_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
                                    onChange={(value) => updatePromotion((promotion) => promotion.icon = value)}
                                  />
                                </Form.Item>

                                <Form.Item label="Color">
                                  <SelectColor
                                    value={activePromotion.accent}
                                    onChange={(value) => updatePromotion((promotion) => promotion.accent = value)}
                                  />
                                </Form.Item>
                              </Flex>

                              <Form.Item label="Tags">
                                <Select
                                  mode="tags"
                                  value={localizedArrayValues(activePromotion.tags, locale)}
                                  onChange={(values) => updatePromotion((promotion) => promotion.tags = valuesToLocalizedArray(values, promotion.tags, locale))}
                                />
                              </Form.Item>

                              <Form.Item label="Beneficios">
                                <Select
                                  mode="tags"
                                  value={localizedArrayValues(activePromotion.benefits, locale)}
                                  onChange={(values) => updatePromotion((promotion) => promotion.benefits = valuesToLocalizedArray(values, promotion.benefits, locale))}
                                />
                              </Form.Item>

                              <Divider className="!my-2" />

                              <Text strong>Imagen</Text>

                              <div className="rounded-md border p-3">
                                <Flex gap={8} align="flex-end" wrap>
                                  <Form.Item label="Nombre / alt" className="!mb-0 min-w-64 flex-1">
                                    <InputFormulario
                                      resetKey={`promotion:${activePromotionIndex}:image-name`}
                                      value={mediaName(activePromotion.image)}
                                      onCommit={updateMediaName}
                                    />
                                  </Form.Item>

                                  <Upload
                                    accept={uploadConfig.accept}
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                      addUpload(activePromotion.id, activePromotion.image.id, mediaName(activePromotion.image), file as RcFile);

                                      return Upload.LIST_IGNORE;
                                    }}
                                  >
                                    <Button icon={<UploadOutlined />}>
                                      {activePromotion.image.src ? 'Cambiar imagen' : 'Subir imagen'}
                                    </Button>
                                  </Upload>
                                </Flex>

                                <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                  {activePromotion.image.src ? (
                                    <img className="h-40 w-full object-cover" src={activePromotion.image.src} alt={mediaName(activePromotion.image)} />
                                  ) : (
                                    <div className="flex h-28 items-center justify-center text-sm text-muted-foreground">
                                      Sin imagen seleccionada
                                    </div>
                                  )}
                                </div>
                              </div>

                              <Divider className="!my-2" />

                              <Flex justify="space-between" align="center">
                                <Text strong>Precios</Text>
                                <Button size="small" icon={<PlusOutlined />} onClick={() => updatePromotion((promotion) => promotion.price_groups.push(newPriceGroup()))}>
                                  Agregar grupo
                                </Button>
                              </Flex>

                              {activePromotion.price_groups.map((group, groupIndex) => (
                                <div key={groupIndex} className="rounded-md border p-3">
                                  <Flex justify="space-between" align="center" gap={8}>
                                    <Text strong>Grupo {groupIndex + 1}</Text>
                                    <Button danger size="small" icon={<DeleteOutlined />} disabled={activePromotion.price_groups.length <= 1} onClick={() => updatePromotion((promotion) => promotion.price_groups.splice(groupIndex, 1))}/>
                                  </Flex>

                                  <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    <Form.Item label="Titulo grupo">
                                      <InputFormulario resetKey={`price-group:${groupIndex}:${locale}:title`} value={group.title[locale]} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].title[locale] = value)} />
                                    </Form.Item>

                                    <Form.Item label="Descripcion grupo">
                                      <InputFormulario resetKey={`price-group:${groupIndex}:${locale}:description`} value={group.description[locale]} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].description[locale] = value)} />
                                    </Form.Item>
                                  </div>

                                  <Flex justify="space-between" align="center" className="mt-2">
                                    <Text>Tarifas</Text>
                                    <Button size="small" icon={<PlusOutlined />} onClick={() => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices.push(newPrice()))}>
                                      Agregar tarifa
                                    </Button>
                                  </Flex>

                                  {group.prices.map((price, priceIndex) => (
                                    <div key={priceIndex} className="mt-3 rounded-md border p-3">
                                      <Flex justify="space-between" align="center" gap={8}>
                                        <Text>Tarifa {priceIndex + 1}</Text>
                                        <Button danger size="small" icon={<DeleteOutlined />} disabled={group.prices.length <= 1} onClick={() => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices.splice(priceIndex, 1))}/>
                                      </Flex>

                                      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
                                        <Form.Item label="Etiqueta">
                                          <InputFormulario resetKey={`price:${groupIndex}:${priceIndex}:${locale}:label`} value={price.label[locale]} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices[priceIndex].label[locale] = value)} />
                                        </Form.Item>

                                        <Form.Item label="Monto">
                                          <InputFormulario resetKey={`price:${groupIndex}:${priceIndex}:amount`} value={price.amount} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices[priceIndex].amount = value)} />
                                        </Form.Item>

                                        <Form.Item label="Prefijo">
                                          <InputFormulario resetKey={`price:${groupIndex}:${priceIndex}:${locale}:prefix`} value={price.prefix[locale]} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices[priceIndex].prefix[locale] = value)} />
                                        </Form.Item>

                                        <Form.Item label="Nota">
                                          <InputFormulario resetKey={`price:${groupIndex}:${priceIndex}:${locale}:note`} value={price.note[locale]} onCommit={(value) => updatePromotion((promotion) => promotion.price_groups[groupIndex].prices[priceIndex].note[locale] = value)} />
                                        </Form.Item>
                                      </div>
                                    </div>
                                  ))}
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

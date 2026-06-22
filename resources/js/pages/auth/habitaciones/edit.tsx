import { DeleteOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Collapse, Divider, Flex, Form, InputNumber, Select, Segmented, Space, Splitter, Switch, Tooltip, Typography, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import HabitacionesShowcase from '@/components/habitaciones/HabitacionesShowcase';
import type { EditableHabitacion, EditableHabitacionAmenity, EditableHabitacionRoomAmenity, EditablePagePayload, FormData, HabitacionesPageContent, HabitacionesPageText, MediaUploadGroup, UploadConfig } from '@/components/habitaciones/interfaces';
import { AMENIDAD_HABITACION_TIPOS, AMENIDAD_TIPOS, CAMPOS_FORM, TITULO_CAMPOS_FORM } from '@/components/habitaciones/services/constantes';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import { cloneEditableContent, emptyLocalizedString, localeLabels, supportedLocales } from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

function labelFromKey(key: string): string {
  return TITULO_CAMPOS_FORM[key];
}

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

function newAmenity(): EditableHabitacionAmenity {
  return {
    type: 'ac',
    label: {
      es: 'Nueva amenidad',
      en: 'New amenity',
    },
  };
}

function newRoomAmenity(): EditableHabitacionRoomAmenity {
  return {
    type: 'ac',
    name: {
      es: 'Nueva amenidad',
      en: 'New amenity',
    },
    description: {
      es: 'Descripcion de la amenidad.',
      en: 'Amenity description.',
    },
  };
}

function newRoom(order: number): EditableHabitacion {
  const id = `habitacion-${Date.now()}`;

  return {
    id,
    order,
    is_active: true,
    name: {
        es: 'Nueva habitacion',
        en: 'New room',
    },
    eyebrow: emptyLocalizedString(),
    short_description: {
        es: 'Descripcion corta.',
        en: 'Short description.',
    },
    description: {
        es: 'Descripcion completa de la habitacion.',
        en: 'Full room description.',
    },
    capacity: {
        es: '2 personas',
        en: '2 people',
    },
    bed: {
        es: 'Cama Queen',
        en: 'Queen bed',
    },
    size: {
        es: 'Espacio comodo',
        en: 'Comfortable space',
    },
    image_stats: {
        beds: 1,
        max_guests: 2,
    },
    media: [newMedia()],
    highlights: [
        {
            es: 'Aire acondicionado',
            en: 'Air conditioning',
        },
    ],
    room_amenities: [newRoomAmenity()],
    request_amenities: [],
    amenities: [newAmenity()],
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

interface ListaAmenidadesInterface {
  title: string;
  items: EditableHabitacionAmenity[];
  locale: LocaleCode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, item: EditableHabitacionAmenity) => void;
}

function ListaAmenidades({ title, items, locale, onAdd, onRemove, onChange}: ListaAmenidadesInterface) {
  return (
    <Space direction="vertical" size={8} className="w-full">
      <Flex justify="space-between" align="center">
        <Text strong>{title}</Text>
        <Button size="small" icon={<PlusOutlined />} onClick={onAdd}>
          Agregar
        </Button>
      </Flex>

      {items.map((item, index) => (
        <Flex key={index} gap={8} align="center" wrap>
          <Select
            value={item.type}
            className="w-40"
            options={AMENIDAD_TIPOS.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
            onChange={(value) => onChange(index, {...item, type: value})}
          />

          <InputFormulario
            resetKey={`${title}:${locale}:${index}:label`}
            className="min-w-48 flex-1"
            value={item.label[locale]}
            onCommit={(value) =>
              onChange(index, {...item, label: {...item.label, [locale]: value}})}
          />
                  
          <Tooltip title="Eliminar Amenidad">
            <Button danger icon={<DeleteOutlined />} onClick={() => onRemove(index)} disabled={items.length <= 1} />
          </Tooltip>
        </Flex>
      ))}
    </Space>
  );
}

interface ListaAmenidadesHabitacionInterface {
  title: string;
  items: EditableHabitacionRoomAmenity[];
  locale: LocaleCode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, item: EditableHabitacionRoomAmenity) => void;
}

function ListaAmenidadesHabitacion({ title, items, locale, onAdd, onRemove, onChange,
}: ListaAmenidadesHabitacionInterface) {
  return (
    <Space direction="vertical" size={8} className="w-full">
      <Flex justify="space-between" align="center">
        <Text strong>{title}</Text>
        <Button size="small" icon={<PlusOutlined />} onClick={onAdd}>
          Agregar
        </Button>
      </Flex>

      {items.map((item, index) => (
        <div key={index} className="rounded-md border p-3">
          <Flex gap={8} align="center" wrap>
            <Select
              value={item.type}
              className="w-33"
              options={AMENIDAD_HABITACION_TIPOS.map((type) => ({
                label: type.label,
                value: type.value,
              }))}
              onChange={(value) =>
                onChange(index, {...item, type: value})}
            />

            <InputFormulario
              resetKey={`${title}:${locale}:${index}:name`}
              className="min-w-48 flex-1"
              value={item.name[locale]}
              onCommit={(value) =>
                onChange(index, {...item, name: {...item.name, [locale]: value}})}
            />

            <Tooltip title="Eliminar Amenidad">
              <Button danger icon={<DeleteOutlined />} onClick={() => onRemove(index)} disabled={items.length <= 1}/>
            </Tooltip>
          </Flex>

          <InputFormulario
            resetKey={`${title}:${locale}:${index}:description`}
            rows={2}
            className="mt-2"
            value={item.description[locale]}
            onCommit={(value) =>
              onChange(index, {...item, description: {...item.description, [locale]: value}})
            }
          />
        </div>
      ))}
    </Space>
  );
}

type EditHabitacionesInterface = {
  editablePage: EditablePagePayload;
  uploadConfig: UploadConfig;
};

export default function EditHabitaciones({editablePage, uploadConfig}: EditHabitacionesInterface) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeRoomIndex, setActiveRoomIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [isPreviewDrawerOpen, setIsPreviewDrawerOpen] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [draftContent, setDraftContent] = useState<HabitacionesPageContent>(
        () => cloneEditableContent(editablePage.content),
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
    const activeRoom = draftContent.rooms[activeRoomIndex] ?? draftContent.rooms[0];

    const previewContent = useMemo(() => {
      if (!isLivePreviewEnabled) {
        return null;
      }

      return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: HabitacionesPageContent) => void) => {
      const nextContent = cloneEditableContent(draftContentRef.current);

      updater(nextContent);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const commitDraftContent = (resolver: (currentContent: HabitacionesPageContent) => HabitacionesPageContent) => {
      const nextContent = resolver(draftContentRef.current);
      draftContentRef.current = nextContent;
      setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof HabitacionesPageText, value: string) => {
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

    const updateLocalizedField = ( field: keyof Pick<EditableHabitacion, | 'name' | 'eyebrow' | 'short_description' | 'description' | 'capacity' | 'bed' | 'size'>, value: string) => {
      commitDraftContent((currentContent) => ({
        ...currentContent,
        rooms: currentContent.rooms.map((room, index) => {
          if (index !== activeRoomIndex) {
            return room;
          }

          const localizedValue = room[field] as LocalizedString;

          return {
            ...room,
            [field]: {
              ...localizedValue,
              [locale]: value,
            },
          } as EditableHabitacion;
        }),
      }));
    };

    const updateRoom = (updater: (room: EditableHabitacion) => void) => {
      commitDraftContent((currentContent) => ({
        ...currentContent,
        rooms: currentContent.rooms.map((room, index) => {
          if (index !== activeRoomIndex) {
            return room;
          }

          const nextRoom = structuredClone(room) as EditableHabitacion;

          updater(nextRoom);

          return nextRoom;
        }),
      }));
    };

    const updateHotelInfo = (updater: (hotelInfo: HabitacionesPageContent['hotel_info']) => void) => {
      commitDraftContent((currentContent) => {
        const nextHotelInfo = structuredClone(currentContent.hotel_info) as HabitacionesPageContent['hotel_info'];

        updater(nextHotelInfo);

        return {
          ...currentContent,
          hotel_info: nextHotelInfo,
        };
      });
    };

    const addRoom = () => {
      const nextRoomIndex = draftContent.rooms.length;

      updateContent((content) => {
        content.rooms.push(newRoom(content.rooms.length + 1));
      });
      setActiveRoomIndex(nextRoomIndex);
    };

    const removeActiveRoom = () => {
      if (draftContent.rooms.length <= 1) {
        return;
      }

      updateContent((content) => {
        content.rooms.splice(activeRoomIndex, 1);
      });
      setActiveRoomIndex(Math.max(activeRoomIndex - 1, 0));
    };

    const addCarouselMedia = () => {
      updateRoom((room) => room.media.push(newMedia()));
    };

    const updateMediaName = (mediaId: string, name: string) => {
      updateRoom((room) => {
        const media = room.media.find((item) => item.id === mediaId);

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

    const addUpload = (roomId: string, mediaId: string, name: string, file: File) => {
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
        room_id: roomId,
        media_id: mediaId,
        name: resolvedName,
        file,
      };

      nextUploads.push(nextUpload);
      updateRoom((room) => {
        const media = room.media.find((item) => item.id === mediaId);

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

      latestContent.rooms = latestContent.rooms.map((room) => ({...room, media: room.media.filter((media) => media.src.trim() !== '')}));

      transform((formData) => ({
        ...formData,
        content: latestContent,
        media_uploads: formData.media_uploads.flatMap((upload) => {
          const room = latestContent.rooms.find((item) => item.id === upload.room_id);
          const media = room?.media.find((item) => item.id === upload.media_id);

          if (! media) {
            return [];
          }

          return {
            ...upload,
            name: mediaName(media) || upload.name,
          };
        }),
      }));

      post('/admin/contenido/habitaciones', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setUploadError(null);
          setData('media_uploads', []);
          showAppAlert({
            type: 'success',
            title: 'Habitaciones guardadas',
            description: 'El contenido se actualizo correctamente.',
          });
        },
        onError: (backendErrors) => {
          showBackendErrorAlert(backendErrors, {
            title: 'No se pudo guardar habitaciones',
            fallback: 'Revisa los campos del formulario e intenta de nuevo.',
          });
        },
      });
    };

    return (
      <>
        <Head title="Editar habitaciones" />

        <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4 overflow-hidden">
          <Flex justify="space-between" align="center" gap={16} wrap className="shrink-0">
            <div>
              <Title level={2} className="!mb-1">
                Habitaciones
              </Title>
              <Paragraph className="!mb-0 text-muted-foreground">
                Edita todo el contenido de la página.
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
                  <div className={isPreviewDrawerOpen ? 'h-full overflow-hidden' : 'h-full overflow-auto'}>
                    <HabitacionesShowcase
                      content={previewContent}
                      locale={locale}
                      drawerScope="preview"
                      getDrawerContainer={() => previewDrawerContainerRef.current}
                      onDrawerOpenChange={setIsPreviewDrawerOpen}
                    />
                  </div>
                  <div ref={previewDrawerContainerRef} className={ isPreviewDrawerOpen ? 'absolute inset-0 z-20' : 'pointer-events-none absolute inset-0 z-20'}/>
                </div>
              </Splitter.Panel>
            )}

            <Splitter.Panel min={isLivePreviewEnabled ? '360px' : '100%'} className="min-h-0 !overflow-hidden">
              <div className="h-full overflow-y-auto overflow-x-hidden p-4">
                <Form layout="vertical" onFinish={submit}>
                  <Flex align="center" gap={12} wrap>
                    <Form.Item label="Título" className="min-w-64 flex-1">
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
                    defaultActiveKey={['page', 'rooms']}
                    items={[
                      {
                        key: 'page',
                        label: 'Contenido General',
                        children: (
                          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            {CAMPOS_FORM.map((field) => (
                              <Form.Item 
                                key={field} 
                                label={labelFromKey(field)}
                                className={field.includes('body') ? 'lg:col-span-2' : ''}
                              >
                                {field.includes('body') ? (
                                  <InputFormulario 
                                    resetKey={`page:${locale}:${field}`}
                                    rows={4}
                                    value={draftContent.locales[locale][field]}
                                    onCommit={(value) => updatePageText(field, value)}
                                  />
                                ) : (
                                  <InputFormulario
                                    resetKey={`page:${locale}:${field}`}
                                    value={draftContent.locales[locale][field]}
                                    onCommit={(value) => updatePageText(field,value)}
                                  />
                                )}
                              </Form.Item>
                            ))}
                          </div>
                        ),
                      },
                      {
                        key: 'policies',
                        label: 'Politicas del hotel',
                        children: (
                          <Space direction="vertical" size={12} className="w-full">
                            <Flex gap={12}>
                              <Form.Item label="Check-in" className="flex-1">
                                <InputFormulario
                                  resetKey="hotel:check-in"
                                  value={draftContent.hotel_info.check_in}
                                  onCommit={(value) =>
                                    updateHotelInfo((hotelInfo) => hotelInfo.check_in = value)
                                  }
                                />
                              </Form.Item>

                              <Form.Item label="Check-out" className="flex-1">
                                <InputFormulario
                                  resetKey="hotel:check-out"
                                  value={draftContent.hotel_info.check_out}
                                  onCommit={(value) =>
                                    updateHotelInfo((hotelInfo) => hotelInfo.check_out = value)
                                  }
                                />
                              </Form.Item>
                            </Flex>

                            {[
                              [
                                'Politica de pago',
                                'payment_policy',
                              ],
                              [
                                'Politica no show',
                                'no_show_policy',
                              ],
                              [
                                'Personas extra',
                                'extra_guest_policy',
                              ],
                            ].map(([label, field]) => (
                              <Form.Item key={field} label={`${label}`}>
                                <InputFormulario 
                                  resetKey={`hotel:${locale}:${field}`}
                                  rows={4}
                                  value={draftContent.hotel_info[field as | 'payment_policy' | 'no_show_policy' | 'extra_guest_policy'][locale]}
                                  onCommit={(value) =>
                                    updateHotelInfo((hotelInfo) => {
                                      hotelInfo[field as | 'payment_policy' | 'no_show_policy' | 'extra_guest_policy'][locale] = value;
                                    })
                                  }
                                />
                              </Form.Item>
                            ))}

                            <Form.Item label="Descripción de cancelación">
                              <InputFormulario
                                resetKey={`hotel:${locale}:cancellation-description`}
                                rows={3}
                                value={draftContent.hotel_info.cancellation_policy.description[locale]}
                                onCommit={(value) =>
                                  updateHotelInfo((hotelInfo) => hotelInfo.cancellation_policy.description[locale] = value)
                                }
                              />
                            </Form.Item>

                            <Form.Item label="Pie de página de cancelación">
                              <InputFormulario
                                resetKey={`hotel:${locale}:cancellation-description-end`}
                                rows={3}
                                value={draftContent.hotel_info.cancellation_policy.description_end[locale]}
                                onCommit={(value) =>
                                  updateHotelInfo((hotelInfo) => hotelInfo.cancellation_policy.description_end[locale] = value)
                                }
                              />
                            </Form.Item>

                            <Divider className="!my-2" />

                            <Text strong>
                              Tabla de cancelación
                            </Text>

                            {draftContent.hotel_info.cancellation_policy.rows.map(
                              (row, index) => (
                                <Flex key={index} gap={8} align="center">
                                  <InputFormulario
                                    resetKey={`hotel:${locale}:cancellation:${index}:weeks`}
                                    value={row.weeks_before_arrival[locale]}
                                    onCommit={(value) =>
                                      updateHotelInfo((hotelInfo) => hotelInfo.cancellation_policy.rows[index].weeks_before_arrival[locale] = value)
                                    }
                                  />

                                  <InputFormulario
                                    resetKey={`hotel:cancellation:${index}:refund`}
                                    value={row.refund}
                                    onCommit={(value) =>
                                      updateHotelInfo((hotelInfo) => hotelInfo.cancellation_policy.rows[index].refund = value)
                                    }
                                  />

                                  <InputFormulario
                                    resetKey={`hotel:cancellation:${index}:credit`}
                                    value={row.credit}
                                    onCommit={(value) =>
                                      updateHotelInfo((hotelInfo) => hotelInfo.cancellation_policy.rows[index].credit = value)
                                    }
                                  />
                                </Flex>
                              ),
                            )}
                          </Space>
                        ),
                        },
                        {
                          key: 'rooms',
                          label: 'Habitaciones',
                          children: activeRoom && (
                            <Space direction="vertical" size={14} className="w-full">
                              <Flex gap={8} wrap style={{ width: "100%" }}>
                                <Form.Item label="Nombre" layout="horizontal">
                                  <Select 
                                    className="min-w-64 flex-1"
                                    value={activeRoomIndex}
                                    options={draftContent.rooms.map((room, index) => 
                                      ({ 
                                        label: room.name[locale] || room.id,
                                        value: index,
                                      }),
                                    )}
                                    onChange={setActiveRoomIndex}
                                  />
                                </Form.Item>

                                <Tooltip title="Agregar">
                                  <Button icon={<PlusOutlined />} onClick={addRoom}/>
                                </Tooltip>

                                <Tooltip title="Eliminar">
                                  <Button 
                                    danger 
                                    icon={<DeleteOutlined />}
                                    onClick={removeActiveRoom}
                                    disabled={draftContent.rooms.length <= 1}
                                  />
                                </Tooltip>
                                                                                                                              <Form.Item label="Orden" layout='horizontal'>
                                  <InputNumber 
                                    min={0}
                                    value={activeRoom.order}
                                    onChange={(value) =>
                                      updateRoom((room) => room.order = Number(value ?? 0))
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Visible" layout='horizontal'>
                                  <Switch
                                    checked={activeRoom.is_active}
                                    onChange={(checked) =>
                                      updateRoom((room) => room.is_active = checked)
                                    }
                                  />
                                </Form.Item>
                              </Flex>

                              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {['name', 'capacity'].map((field) => (
                                  <Form.Item key={field} label={labelFromKey(field)}>
                                    <InputFormulario
                                      resetKey={`room:${activeRoomIndex}:${locale}:${field}`}
                                      value={activeRoom[field as | 'name' | 'capacity'][locale]}
                                      onCommit={(value) =>
                                        updateLocalizedField(field as 'name' | 'capacity', value)
                                      }
                                    />
                                  </Form.Item>
                                ))}
                                
                                <Form.Item label="Descripcion corta" className="lg:col-span-2">
                                  <InputFormulario
                                    resetKey={`room:${activeRoomIndex}:${locale}:short-description`}
                                    rows={4}
                                    value={activeRoom.description[locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('short_description', value)
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Descripcion larga" className="lg:col-span-2">
                                  <InputFormulario
                                    resetKey={`room:${activeRoomIndex}:${locale}:description`}
                                    rows={4}
                                    value={activeRoom.description[locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('description', value)
                                    }
                                  />
                                </Form.Item>
                              </div>

                              <Flex gap={12} wrap style={{ width: "100%" }}>
                                <Form.Item
                                  style={{ width: "70%" }}
                                  key={"bed"}
                                  label={labelFromKey("bed")}
                                >
                                  <InputFormulario
                                    resetKey={`room:${activeRoomIndex}:${locale}:bed`}
                                    value={activeRoom['bed'][locale]}
                                    onCommit={(value) =>
                                      updateLocalizedField('bed', value)
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Cantidad" style={{ width: "10%" }}>
                                  <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    value={activeRoom.image_stats.beds}
                                    onChange={(value) =>
                                      updateRoom((room) => room.image_stats.beds = Number(value ?? 0))
                                    }
                                  />
                                </Form.Item>

                                <Form.Item label="Capacidad" style={{ width: "10%" }}>
                                  <InputNumber
                                    style={{ width: "100%" }}
                                    min={1}
                                    value={activeRoom.image_stats.max_guests}
                                    onChange={(value) =>
                                      updateRoom((room) => room.image_stats.max_guests = Number(value ?? 1))
                                    }
                                  />
                                </Form.Item>
                              </Flex>

                              <Form.Item label="Tags / caracteristicas">
                                <Select
                                  mode="tags"
                                  value={localizedArrayValues(activeRoom.highlights, locale)}
                                  onChange={(values) =>
                                    updateRoom((room) => room.highlights = valuesToLocalizedArray(values, room.highlights, locale))
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
                                    Añadir imagen/video
                                  </Button>
                                </Space>
                              </Flex>

                              <Paragraph className="!mb-0 text-xs text-muted-foreground">
                                Maximo{' '}{uploadConfig.max_size_mb} MB por archivo y por guardado.
                              </Paragraph>

                              {activeRoom.media.map(
                                (media, index) => (
                                  <div key={media.id} className="rounded-md border p-3">
                                    <Flex gap={8} align="flex-end" wrap>
                                      <Form.Item label="Nombre / alt" className="!mb-0 min-w-64 flex-1">
                                        <InputFormulario
                                          resetKey={`room:${activeRoomIndex}:media:${media.id}:name`}
                                          placeholder="Ej. Habitacion doble vista al mar"
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
                                          addUpload(activeRoom.id, media.id, mediaName(media), file as RcFile);

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
                                        onClick={() => updateRoom((room) => room.media.splice(index, 1))}
                                        disabled={activeRoom.media.length <= 1}
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

                              <Divider className="!my-2" />

                              <ListaAmenidades
                                title="Amenidades principales"
                                items={activeRoom.amenities}
                                locale={locale}
                                onAdd={() => updateRoom((room) => room.amenities.push(newAmenity()))}
                                onRemove={(index) => updateRoom((room) => room.amenities.splice(index,1))}
                                onChange={(index, item) => updateRoom((room) => room.amenities[index] = item)}
                              />

                              <ListaAmenidadesHabitacion
                                title="Amenidades del cuarto"
                                items={activeRoom.room_amenities}
                                locale={locale}
                                onAdd={() => 
                                  updateRoom((room) => room.room_amenities.push(newRoomAmenity()))}
                                onRemove={(index) => 
                                  updateRoom((room) => room.room_amenities.splice(index, 1))}
                                onChange={(index, item) =>
                                  updateRoom((room) => room.room_amenities[index] = item)}
                              />

                              <ListaAmenidadesHabitacion
                                title="Accesorios bajo solicitud"
                                items={activeRoom.request_amenities ?? []}
                                locale={locale}
                                onAdd={() => updateRoom((room) => 
                                  room.request_amenities = [...(room.request_amenities ??[]), newRoomAmenity()])
                                }
                                onRemove={(index) => updateRoom((room) => 
                                  room.request_amenities?.splice(index, 1))
                                }
                                onChange={(index, item) =>
                                  updateRoom((room) => {
                                    if (room.request_amenities) {
                                      room.request_amenities[index] = item;
                                    }
                                  })
                                }
                              />
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
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
    Input,
    InputNumber,
    Select,
    Segmented,
    Space,
    Splitter,
    Switch,
    Tooltip,
    Typography,
    Upload,
} from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import HabitacionesShowcase from '@/components/habitaciones/HabitacionesShowcase';
import type {
    EditableHabitacion,
    EditableHabitacionAmenity,
    EditableHabitacionRoomAmenity,
    HabitacionAmenity,
    HabitacionRoomAmenityIcon,
    HabitacionesPageContent,
    HabitacionesPageText,
} from '@/components/habitaciones/interfaces';
import {
    cloneEditableContent,
    emptyLocalizedString,
    localeLabels,
    supportedLocales,
} from '@/lib/editable-content';
import type { EditableMedia, LocaleCode, LocalizedString } from '@/types';

type EditablePagePayload = {
    id: number;
    slug: string;
    title: string;
    content: HabitacionesPageContent;
    is_published: boolean;
    updated_at?: string | null;
};

type UploadConfig = {
    accept: string;
    max_size_mb: number;
};

type MediaUploadGroup = {
    room_id: string;
    media_id: string;
    name: string;
    file: File;
};

type FormData = {
    _method: 'put';
    title: string;
    is_published: boolean;
    content: HabitacionesPageContent;
    media_uploads: MediaUploadGroup[];
};

type Props = {
    editablePage: EditablePagePayload;
    uploadConfig: UploadConfig;
};

const { Paragraph, Text, Title } = Typography;
const textFields: Array<keyof HabitacionesPageText> = [
    'page_title',
    'intro_title',
    'intro_body',
    'card_cta',
    // 'details_label',
    // 'main_amenities_label',
    'image_preview_label',
    'feature_heading',
    'room_amenities_title',
    'room_amenities_body',
    'request_amenities_title',
    'request_amenities_body',
    'policies_title',
    'policies_subtitle',
    'schedule_policy_title',
    'payment_policy_title',
    'cancellation_policy_title',
    'no_show_policy_title',
    'extra_guest_policy_title',
    'arrival_weeks_label',
    'refund_label',
    'credit_label',
    'check_in_label',
    'check_out_label',
    'reserve_cta',
    'call_cta',
    'bed_singular',
    'bed_plural',
    'guest_singular',
    'guest_plural',
    'guest_capacity_prefix',
];

const LABEL_FIELDS: any = {
    page_title: "Título de Página",
    intro_title: "Título",
    intro_body: "Descripción",
    card_cta: "Pie de tarjeta",
    // details_label: "1",
    // main_amenities_label: "1",
    image_preview_label: "Título en imagen",
    feature_heading: "Título caracteristicas",
    room_amenities_title: "Título amenidades",
    room_amenities_body: "Descripción amenidades",
    request_amenities_title: "Título amenidades por solicitud",
    request_amenities_body: "Descripción amenidades por solicitud",
    policies_title: "Título de politicas",
    policies_subtitle: "Subtítulo de politicas",
    schedule_policy_title: "Título horario de politicas",
    payment_policy_title: "Título de política de pago",
    cancellation_policy_title: "Título de política de cancelación",
    no_show_policy_title: "Título de política (No show)",
    extra_guest_policy_title: "Título de persona extra",
    arrival_weeks_label: "Título de semanas de llegada",
    refund_label: "Título de reembolso",
    credit_label: "Título de crédito",
    check_in_label: "Título de check-in",
    check_out_label: "Título de check-out",
    reserve_cta: "Título de botón 'Reservar'",
    call_cta: "Título de botón 'Llamar'",
    bed_singular: "Título de cama (singular)",
    bed_plural: "Título de cama (plural)",
    guest_singular: "Título de huésped (singular)",
    guest_plural: "Título de huésped (plural)",
    guest_capacity_prefix: "Prefijo de huésped",
    name: "Nombre de habitación",
    // eyebrow: "",
    short_description: "Descripción de habitación",
    capacity: "Capacidad",
    bed: "Nombre de cama",
    size: "Tamaño de cama",
};

const amenityTypes: Array<{
    value: HabitacionAmenity;
    label: string;
}> = [
    { value: 'capacity', label: 'Capacidad' },
    { value: 'bed', label: 'Cama' },
    { value: 'ac', label: 'Aire acondicionado' },
    { value: 'tv', label: 'Televisión' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'ocean', label: 'Vista al mar' },
    { value: 'bath', label: 'Baño' },
    { value: 'coffee', label: 'Cafetera' },
    { value: 'terrace', label: 'Terraza' },
];

const roomAmenityTypes: Array<{
    value: HabitacionRoomAmenityIcon;
    label: string;
}> = [
    { value: 'ac', label: 'Aire acondicionado' },
    { value: 'smart-tv', label: 'Smart tv' },
    { value: 'wifi', label: 'Wifi' },
    { value: 'safe', label: 'Caja fuerte' },
    { value: 'fan', label: 'Ventilador' },
    { value: 'private-bath', label: 'Baño privado' },
    { value: 'cleaning', label: 'Limpieza' },
    { value: 'towels', label: 'Toallas' },
    { value: 'bath-kit', label: 'Kit de baño' },
    { value: 'terrace', label: 'Terraza' },
    { value: 'minibar', label: 'Minibar' },
    { value: 'coffee', label: 'Café' },
    { value: 'iron', label: 'Plancha' },
    { value: 'pool-towels', label: 'Toalla de baño' },
    { value: 'hair-dryer', label: 'Secadora de pelo' },
    { value: 'makeup-mirror', label: 'Espejo' },
    { value: 'stove', label: 'Estufa' },
    { value: 'kitchenware', label: 'Cocineta' },
];

function labelFromKey(key: string): string {
  return LABEL_FIELDS[key];
    // return key
    //     .split('_')
    //     .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    //     .join(' ');
}

function localizedArrayValues(
    values: LocalizedString[],
    locale: LocaleCode,
): string[] {
    return values.map((value) => value[locale]).filter(Boolean);
}

function valuesToLocalizedArray(
    values: string[],
    previous: LocalizedString[],
    locale: LocaleCode,
): LocalizedString[] {
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

function DraftTextInput({
    value,
    onCommit,
    rows,
    className,
    placeholder,
    resetKey,
}: {
    value?: string | null;
    onCommit: (value: string) => void;
    rows?: number;
    className?: string;
    placeholder?: string;
    resetKey?: string;
}) {
    const normalizedValue = value ?? '';
    const inputKey = resetKey ?? 'draft-text-input';
    const onCommitRef = useRef(onCommit);
    const localValueRef = useRef(normalizedValue);
    const committedValueRef = useRef(normalizedValue);
    const commitTimerRef = useRef<number | null>(null);

    useEffect(() => {
        onCommitRef.current = onCommit;
    }, [onCommit]);

    useEffect(() => {
        localValueRef.current = normalizedValue;
        committedValueRef.current = normalizedValue;

        if (commitTimerRef.current) {
            window.clearTimeout(commitTimerRef.current);
            commitTimerRef.current = null;
        }
    }, [inputKey, normalizedValue]);

    useEffect(() => {
        return () => {
            if (commitTimerRef.current) {
                window.clearTimeout(commitTimerRef.current);
            }
        };
    }, []);

    const clearCommitTimer = () => {
        if (commitTimerRef.current) {
            window.clearTimeout(commitTimerRef.current);
            commitTimerRef.current = null;
        }
    };

    const commitNow = () => {
        clearCommitTimer();

        if (localValueRef.current !== committedValueRef.current) {
            committedValueRef.current = localValueRef.current;
            onCommitRef.current(localValueRef.current);
        }
    };

    const queueCommit = (nextValue: string) => {
        localValueRef.current = nextValue;
        clearCommitTimer();
        commitTimerRef.current = window.setTimeout(commitNow, 350);
    };

    if (rows) {
        return (
            <Input.TextArea
                key={inputKey}
                rows={rows}
                className={className}
                placeholder={placeholder}
                defaultValue={normalizedValue}
                onChange={(event) => queueCommit(event.target.value)}
                onBlur={commitNow}
            />
        );
    }

    return (
        <Input
            key={inputKey}
            className={className}
            placeholder={placeholder}
            defaultValue={normalizedValue}
            onChange={(event) => queueCommit(event.target.value)}
            onBlur={commitNow}
        />
    );
}

export default function EditHabitaciones({
    editablePage,
    uploadConfig,
}: Props) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeRoomIndex, setActiveRoomIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [draftContent, setDraftContent] = useState<HabitacionesPageContent>(
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
    const activeRoom =
        draftContent.rooms[activeRoomIndex] ?? draftContent.rooms[0];

    const previewContent = useMemo(() => {
        if (!isLivePreviewEnabled) {
            return null;
        }

        return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (
        updater: (content: HabitacionesPageContent) => void,
    ) => {
        const nextContent = cloneEditableContent(draftContentRef.current);

        updater(nextContent);
        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const commitDraftContent = (
        resolver: (
            currentContent: HabitacionesPageContent,
        ) => HabitacionesPageContent,
    ) => {
        const nextContent = resolver(draftContentRef.current);

        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const updatePageText = (
        field: keyof HabitacionesPageText,
        value: string,
    ) => {
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

    const updateLocalizedField = (
        field: keyof Pick<
            EditableHabitacion,
            | 'name'
            | 'eyebrow'
            | 'short_description'
            | 'description'
            | 'capacity'
            | 'bed'
            | 'size'
        >,
        value: string,
    ) => {
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

    const updateHotelInfo = (
        updater: (
            hotelInfo: HabitacionesPageContent['hotel_info'],
        ) => void,
    ) => {
        commitDraftContent((currentContent) => {
            const nextHotelInfo = structuredClone(
                currentContent.hotel_info,
            ) as HabitacionesPageContent['hotel_info'];

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
        updateRoom((room) => {
            room.media.push(newMedia());
        });
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

        setData(
            'media_uploads',
            data.media_uploads.map((upload) =>
                upload.media_id === mediaId
                    ? {
                          ...upload,
                          name,
                      }
                    : upload,
            ),
        );
    };

    const addUpload = (
        roomId: string,
        mediaId: string,
        name: string,
        file: File,
    ) => {
        const resolvedName = name.trim() || mediaNameFromFile(file);
        const previewUrl = URL.createObjectURL(file);
        const nextUpload: MediaUploadGroup = {
            room_id: roomId,
            media_id: mediaId,
            name: resolvedName,
            file,
        };
        const nextUploads = data.media_uploads.filter(
            (upload) => upload.media_id !== mediaId,
        );

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

        latestContent.rooms = latestContent.rooms.map((room) => ({
            ...room,
            media: room.media.filter((media) => media.src.trim() !== ''),
        }));

        transform((formData) => ({
            ...formData,
            content: latestContent,
            media_uploads: formData.media_uploads.flatMap((upload) => {
                const room = latestContent.rooms.find(
                    (item) => item.id === upload.room_id,
                );
                const media = room?.media.find(
                    (item) => item.id === upload.media_id,
                );

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
                setData('media_uploads', []);
            },
        });
    };

    return (
        <>
            <Head title="Editar habitaciones" />

            <div className="mx-auto flex max-w-[1800px] flex-col gap-4">
                <Flex justify="space-between" align="center" gap={16} wrap>
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
                            onChange={(checked) =>
                                setData('is_published', checked)
                            }
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

                <Splitter collapsible={{motion: true}} className="min-h-[calc(100svh-160px)] overflow-hidden rounded-md border bg-white">
                    {isLivePreviewEnabled && previewContent && (
                        <Splitter.Panel defaultSize="54%" min="24%" max="70%" collapsible >
                            <div className="relative h-full overflow-auto bg-white">
                                <HabitacionesShowcase
                                    content={previewContent}
                                    locale={locale}
                                    drawerScope="preview"
                                />
                            </div>
                        </Splitter.Panel>
                    )}

                    <Splitter.Panel
                        min={isLivePreviewEnabled ? '360px' : '100%'}
                    >
                        <div className="h-full overflow-auto p-4">
                            <Form layout="vertical" onFinish={submit}>
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={12}
                                    wrap
                                >
                                    <Form.Item
                                        label="Titulo interno"
                                        validateStatus={
                                            formErrors.title ? 'error' : ''
                                        }
                                        help={formErrors.title}
                                        className="min-w-64 flex-1"
                                    >
                                        <Input
                                            value={data.title}
                                            onChange={(event) =>
                                                setData(
                                                    'title',
                                                    event.target.value,
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
                                    defaultActiveKey={['page', 'rooms']}
                                    items={[
                                        {
                                            key: 'page',
                                            label: 'Contenido General',
                                            children: (
                                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                    {textFields.map((field) => (
                                                        <Form.Item
                                                            key={field}
                                                            label={labelFromKey(
                                                                field,
                                                            )}
                                                            className={
                                                                field.includes(
                                                                    'body',
                                                                )
                                                                    ? 'lg:col-span-2'
                                                                    : ''
                                                            }
                                                        >
                                                            {field.includes(
                                                                'body',
                                                            ) ? (
                                                                <DraftTextInput
                                                                    resetKey={`page:${locale}:${field}`}
                                                                    rows={4}
                                                                    value={
                                                                        draftContent
                                                                            .locales[
                                                                            locale
                                                                        ][field]
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updatePageText(
                                                                            field,
                                                                            value,
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <DraftTextInput
                                                                    resetKey={`page:${locale}:${field}`}
                                                                    value={
                                                                        draftContent
                                                                            .locales[
                                                                            locale
                                                                        ][field]
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updatePageText(
                                                                            field,
                                                                            value,
                                                                        )
                                                                    }
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
                                                <Space
                                                    direction="vertical"
                                                    size={12}
                                                    className="w-full"
                                                >
                                                    <Flex gap={12}>
                                                        <Form.Item
                                                            label="Check-in"
                                                            className="flex-1"
                                                        >
                                                            <DraftTextInput
                                                                resetKey="hotel:check-in"
                                                                value={
                                                                    draftContent
                                                                        .hotel_info
                                                                        .check_in
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateHotelInfo(
                                                                        (
                                                                            hotelInfo,
                                                                        ) => {
                                                                            hotelInfo.check_in =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Check-out"
                                                            className="flex-1"
                                                        >
                                                            <DraftTextInput
                                                                resetKey="hotel:check-out"
                                                                value={
                                                                    draftContent
                                                                        .hotel_info
                                                                        .check_out
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateHotelInfo(
                                                                        (
                                                                            hotelInfo,
                                                                        ) => {
                                                                            hotelInfo.check_out =
                                                                                value;
                                                                        },
                                                                    )
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
                                                        <Form.Item
                                                            key={field}
                                                            label={`${label}`}
                                                        >
                                                            <DraftTextInput
                                                                resetKey={`hotel:${locale}:${field}`}
                                                                rows={4}
                                                                value={
                                                                    draftContent
                                                                        .hotel_info[
                                                                        field as
                                                                            | 'payment_policy'
                                                                            | 'no_show_policy'
                                                                            | 'extra_guest_policy'
                                                                    ][locale]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateHotelInfo(
                                                                        (
                                                                            hotelInfo,
                                                                        ) => {
                                                                            hotelInfo[
                                                                                field as
                                                                                    | 'payment_policy'
                                                                                    | 'no_show_policy'
                                                                                    | 'extra_guest_policy'
                                                                            ][
                                                                                locale
                                                                            ] =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    ))}

                                                    <Form.Item label="Descripción de cancelación">
                                                        <DraftTextInput
                                                            resetKey={`hotel:${locale}:cancellation-description`}
                                                            rows={3}
                                                            value={
                                                                draftContent
                                                                    .hotel_info
                                                                    .cancellation_policy
                                                                    .description[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateHotelInfo(
                                                                    (
                                                                        hotelInfo,
                                                                    ) => {
                                                                        hotelInfo.cancellation_policy.description[
                                                                            locale
                                                                        ] =
                                                                            value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                    <Form.Item label="Pie de página de cancelación">
                                                        <DraftTextInput
                                                            resetKey={`hotel:${locale}:cancellation-description-end`}
                                                            rows={3}
                                                            value={
                                                                draftContent
                                                                    .hotel_info
                                                                    .cancellation_policy
                                                                    .description_end[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateHotelInfo(
                                                                    (
                                                                        hotelInfo,
                                                                    ) => {
                                                                        hotelInfo.cancellation_policy.description_end[
                                                                            locale
                                                                        ] =
                                                                            value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Divider className="!my-2" />
                                                    <Text strong>
                                                        Tabla de cancelación
                                                    </Text>
                                                    {draftContent.hotel_info.cancellation_policy.rows.map(
                                                        (row, index) => (
                                                            <Flex
                                                                key={index}
                                                                gap={8}
                                                                align="center"
                                                            >
                                                                <DraftTextInput
                                                                    resetKey={`hotel:${locale}:cancellation:${index}:weeks`}
                                                                    value={
                                                                        row
                                                                            .weeks_before_arrival[
                                                                            locale
                                                                        ]
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updateHotelInfo(
                                                                            (
                                                                                hotelInfo,
                                                                            ) => {
                                                                                hotelInfo.cancellation_policy.rows[
                                                                                    index
                                                                                ].weeks_before_arrival[
                                                                                    locale
                                                                                ] =
                                                                                    value;
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                                <DraftTextInput
                                                                    resetKey={`hotel:cancellation:${index}:refund`}
                                                                    value={
                                                                        row.refund
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updateHotelInfo(
                                                                            (
                                                                                hotelInfo,
                                                                            ) => {
                                                                                hotelInfo.cancellation_policy.rows[
                                                                                    index
                                                                                ].refund =
                                                                                    value;
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                                <DraftTextInput
                                                                    resetKey={`hotel:cancellation:${index}:credit`}
                                                                    value={
                                                                        row.credit
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updateHotelInfo(
                                                                            (
                                                                                hotelInfo,
                                                                            ) => {
                                                                                hotelInfo.cancellation_policy.rows[
                                                                                    index
                                                                                ].credit =
                                                                                    value;
                                                                            },
                                                                        )
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
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Flex gap={8} wrap>
                                                        <Select
                                                            className="min-w-64 flex-1"
                                                            value={
                                                                activeRoomIndex
                                                            }
                                                            options={draftContent.rooms.map(
                                                                (
                                                                    room,
                                                                    index,
                                                                ) => ({
                                                                    label:
                                                                        room
                                                                            .name[
                                                                            locale
                                                                        ] ||
                                                                        room.id,
                                                                    value: index,
                                                                }),
                                                            )}
                                                            onChange={
                                                                setActiveRoomIndex
                                                            }
                                                        />
                                                        <Tooltip title="Agregar">
                                                          <Button
                                                              icon={
                                                                  <PlusOutlined />
                                                              }
                                                              onClick={addRoom}
                                                          >
                                                          </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                          <Button
                                                              danger
                                                              icon={
                                                                  <DeleteOutlined />
                                                              }
                                                              onClick={
                                                                  removeActiveRoom
                                                              }
                                                              disabled={
                                                                  draftContent
                                                                      .rooms
                                                                      .length <= 1
                                                              }
                                                          >
                                                          </Button>
                                                        </Tooltip>
                                                    </Flex>

                                                    <Flex gap={12} wrap>
                                                        {/* <Form.Item
                                                            label="ID / slug"
                                                            className="min-w-48 flex-1"
                                                        >
                                                            <DraftTextInput
                                                                value={
                                                                    activeRoom.id
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateRoom(
                                                                        (
                                                                            room,
                                                                        ) => {
                                                                            room.id =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item> */}
                                                        <Form.Item label="Orden">
                                                            <InputNumber
                                                                min={0}
                                                                value={
                                                                    activeRoom.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateRoom(
                                                                        (
                                                                            room,
                                                                        ) => {
                                                                            room.order =
                                                                                Number(
                                                                                    value ??
                                                                                        0,
                                                                                );
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <Form.Item label="Visible">
                                                            <Switch
                                                                checked={
                                                                    activeRoom.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateRoom(
                                                                        (
                                                                            room,
                                                                        ) => {
                                                                            room.is_active =
                                                                                checked;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                        {[
                                                            'name',
                                                            // 'eyebrow',
                                                            'capacity',
                                                            'bed',
                                                            'size',
                                                            // 'short_description',
                                                        ].map((field) => (
                                                            <Form.Item
                                                                key={field}
                                                                label={labelFromKey(
                                                                    field,
                                                                )}
                                                            >
                                                                <DraftTextInput
                                                                    resetKey={`room:${activeRoomIndex}:${locale}:${field}`}
                                                                    value={
                                                                        activeRoom[
                                                                            field as
                                                                                | 'name'
                                                                                | 'eyebrow'
                                                                                | 'short_description'
                                                                                | 'capacity'
                                                                                | 'bed'
                                                                                | 'size'
                                                                        ][
                                                                            locale
                                                                        ]
                                                                    }
                                                                    onCommit={(
                                                                        value,
                                                                    ) =>
                                                                        updateLocalizedField(
                                                                            field as
                                                                                | 'name'
                                                                                | 'eyebrow'
                                                                                | 'short_description'
                                                                                | 'capacity'
                                                                                | 'bed'
                                                                                | 'size',
                                                                            value,
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item
                                                            label="Descripcion corta"
                                                            className="lg:col-span-2"
                                                        >
                                                            <DraftTextInput
                                                                resetKey={`room:${activeRoomIndex}:${locale}:short-description`}
                                                                rows={4}
                                                                value={
                                                                    activeRoom
                                                                        .description[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateLocalizedField(
                                                                        'short_description',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Descripcion larga"
                                                            className="lg:col-span-2"
                                                        >
                                                            <DraftTextInput
                                                                resetKey={`room:${activeRoomIndex}:${locale}:description`}
                                                                rows={4}
                                                                value={
                                                                    activeRoom
                                                                        .description[
                                                                        locale
                                                                    ]
                                                                }
                                                                onCommit={(
                                                                    value,
                                                                ) =>
                                                                    updateLocalizedField(
                                                                        'description',
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <Flex gap={12} wrap>
                                                        <Form.Item label="Cantidad de camas">
                                                            <InputNumber
                                                                min={0}
                                                                value={
                                                                    activeRoom
                                                                        .image_stats
                                                                        .beds
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateRoom(
                                                                        (
                                                                            room,
                                                                        ) => {
                                                                            room.image_stats.beds =
                                                                                Number(
                                                                                    value ??
                                                                                        0,
                                                                                );
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <Form.Item label="Capacidad máxima">
                                                            <InputNumber
                                                                min={1}
                                                                value={
                                                                    activeRoom
                                                                        .image_stats
                                                                        .max_guests
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateRoom(
                                                                        (
                                                                            room,
                                                                        ) => {
                                                                            room.image_stats.max_guests =
                                                                                Number(
                                                                                    value ??
                                                                                        1,
                                                                                );
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <Form.Item label="Tags / caracteristicas">
                                                        <Select
                                                            mode="tags"
                                                            value={localizedArrayValues(
                                                                activeRoom.highlights,
                                                                locale,
                                                            )}
                                                            onChange={(
                                                                values,
                                                            ) =>
                                                                updateRoom(
                                                                    (room) => {
                                                                        room.highlights =
                                                                            valuesToLocalizedArray(
                                                                                values,
                                                                                room.highlights,
                                                                                locale,
                                                                            );
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Divider className="!my-2" />
                                                    <Flex
                                                        align="center"
                                                        justify="space-between"
                                                    >
                                                        <Text strong>
                                                            Carrusel
                                                        </Text>
                                                        <Space wrap>
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={
                                                                    addCarouselMedia
                                                                }
                                                            >
                                                                Añadir
                                                                imagen/video
                                                            </Button>
                                                        </Space>
                                                    </Flex>
                                                    <Paragraph className="!mb-0 text-xs text-muted-foreground">
                                                        Maximo{' '}
                                                        {
                                                            uploadConfig.max_size_mb
                                                        }
                                                        MB por archivo.
                                                    </Paragraph>

                                                    {activeRoom.media.map(
                                                        (media, index) => (
                                                            <div
                                                                key={media.id}
                                                                className="rounded-md border p-3"
                                                            >
                                                                <Flex
                                                                    gap={8}
                                                                    align="flex-end"
                                                                    wrap
                                                                >
                                                                    <Form.Item
                                                                        label="Nombre / alt"
                                                                        className="!mb-0 min-w-64 flex-1"
                                                                    >
                                                                        <DraftTextInput
                                                                            resetKey={`room:${activeRoomIndex}:media:${media.id}:name`}
                                                                            placeholder="Ej. Habitacion doble vista al mar"
                                                                            value={mediaName(
                                                                                media,
                                                                            )}
                                                                            onCommit={(
                                                                                value,
                                                                            ) =>
                                                                                updateMediaName(
                                                                                    media.id,
                                                                                    value,
                                                                                )
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
                                                                                activeRoom.id,
                                                                                media.id,
                                                                                mediaName(
                                                                                    media,
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
                                                                            {media.src
                                                                                ? 'Cambiar archivo'
                                                                                : 'Subir archivo'}
                                                                        </Button>
                                                                    </Upload>
                                                                    <Button
                                                                        danger
                                                                        icon={
                                                                            <DeleteOutlined />
                                                                        }
                                                                        onClick={() =>
                                                                            updateRoom(
                                                                                (
                                                                                    room,
                                                                                ) => {
                                                                                    room.media.splice(
                                                                                        index,
                                                                                        1,
                                                                                    );
                                                                                },
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            activeRoom
                                                                                .media
                                                                                .length <=
                                                                            1
                                                                        }
                                                                    />
                                                                </Flex>
                                                                <div className="mt-3 overflow-hidden rounded-md bg-muted/30">
                                                                    {media.src ? (
                                                                        media.type ===
                                                                        'video' ? (
                                                                            <video
                                                                                controls
                                                                                className="h-40 w-full object-cover"
                                                                                src={
                                                                                    media.src
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <img
                                                                                className="h-40 w-full object-cover"
                                                                                src={
                                                                                    media.src
                                                                                }
                                                                                alt={mediaName(
                                                                                    media,
                                                                                )}
                                                                            />
                                                                        )
                                                                    ) : (
                                                                        <div className="flex h-28 items-center justify-center text-sm text-muted-foreground">
                                                                            Sin
                                                                            archivo
                                                                            seleccionado
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {data.media_uploads.some(
                                                                    (upload) =>
                                                                        upload.media_id ===
                                                                        media.id,
                                                                ) && (
                                                                    <Text className="mt-2 block text-xs text-muted-foreground">
                                                                        Archivo
                                                                        listo
                                                                        para
                                                                        guardarse
                                                                    </Text>
                                                                )}
                                                            </div>
                                                        ),
                                                    )}

                                                    <Divider className="!my-2" />
                                                    <EditableAmenityList
                                                        title="Amenidades principales"
                                                        items={
                                                            activeRoom.amenities
                                                        }
                                                        locale={locale}
                                                        onAdd={() =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.amenities.push(
                                                                        newAmenity(),
                                                                    );
                                                                },
                                                            )
                                                        }
                                                        onRemove={(index) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.amenities.splice(
                                                                        index,
                                                                        1,
                                                                    );
                                                                },
                                                            )
                                                        }
                                                        onChange={(
                                                            index,
                                                            item,
                                                        ) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.amenities[
                                                                        index
                                                                    ] = item;
                                                                },
                                                            )
                                                        }
                                                    />

                                                    <EditableRoomAmenityList
                                                        title="Amenidades del cuarto"
                                                        items={
                                                            activeRoom.room_amenities
                                                        }
                                                        locale={locale}
                                                        onAdd={() =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.room_amenities.push(
                                                                        newRoomAmenity(),
                                                                    );
                                                                },
                                                            )
                                                        }
                                                        onRemove={(index) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.room_amenities.splice(
                                                                        index,
                                                                        1,
                                                                    );
                                                                },
                                                            )
                                                        }
                                                        onChange={(
                                                            index,
                                                            item,
                                                        ) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.room_amenities[
                                                                        index
                                                                    ] = item;
                                                                },
                                                            )
                                                        }
                                                    />

                                                    <EditableRoomAmenityList
                                                        title="Accesorios bajo solicitud"
                                                        items={
                                                            activeRoom.request_amenities ??
                                                            []
                                                        }
                                                        locale={locale}
                                                        onAdd={() =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.request_amenities =
                                                                        [
                                                                            ...(room.request_amenities ??
                                                                                []),
                                                                            newRoomAmenity(),
                                                                        ];
                                                                },
                                                            )
                                                        }
                                                        onRemove={(index) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    room.request_amenities?.splice(
                                                                        index,
                                                                        1,
                                                                    );
                                                                },
                                                            )
                                                        }
                                                        onChange={(
                                                            index,
                                                            item,
                                                        ) =>
                                                            updateRoom(
                                                                (room) => {
                                                                    if (
                                                                        room.request_amenities
                                                                    ) {
                                                                        room.request_amenities[
                                                                            index
                                                                        ] =
                                                                            item;
                                                                    }
                                                                },
                                                            )
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

function EditableAmenityList({
    title,
    items,
    locale,
    onAdd,
    onRemove,
    onChange,
}: {
    title: string;
    items: EditableHabitacionAmenity[];
    locale: LocaleCode;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, item: EditableHabitacionAmenity) => void;
}) {
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
                        options={amenityTypes.map((type) => ({
                            label: type.label,
                            value: type.value,
                        }))}
                        onChange={(value) =>
                            onChange(index, {
                                ...item,
                                type: value,
                            })
                        }
                    />
                    <DraftTextInput
                        resetKey={`${title}:${locale}:${index}:label`}
                        className="min-w-48 flex-1"
                        value={item.label[locale]}
                        onCommit={(value) =>
                            onChange(index, {
                                ...item,
                                label: {
                                    ...item.label,
                                    [locale]: value,
                                },
                            })
                        }
                    />
                    
                    <Tooltip title="Eliminar Amenidad">
                      <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => onRemove(index)}
                          disabled={items.length <= 1}
                      />
                    </Tooltip>
                </Flex>
            ))}
        </Space>
    );
}

function EditableRoomAmenityList({
    title,
    items,
    locale,
    onAdd,
    onRemove,
    onChange,
}: {
    title: string;
    items: EditableHabitacionRoomAmenity[];
    locale: LocaleCode;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, item: EditableHabitacionRoomAmenity) => void;
}) {
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
                            options={roomAmenityTypes.map((type) => ({
                                label: type.label,
                                value: type.value,
                            }))}
                            onChange={(value) =>
                                onChange(index, {
                                    ...item,
                                    type: value,
                                })
                            }
                        />
                        <DraftTextInput
                            resetKey={`${title}:${locale}:${index}:name`}
                            className="min-w-48 flex-1"
                            value={item.name[locale]}
                            onCommit={(value) =>
                                onChange(index, {
                                    ...item,
                                    name: {
                                        ...item.name,
                                        [locale]: value,
                                    },
                                })
                            }
                        />
                        <Tooltip title="Eliminar Amenidad">
                          <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => onRemove(index)}
                              disabled={items.length <= 1}
                          />
                        </Tooltip>
                    </Flex>
                    <DraftTextInput
                        resetKey={`${title}:${locale}:${index}:description`}
                        rows={2}
                        className="mt-2"
                        value={item.description[locale]}
                        onCommit={(value) =>
                            onChange(index, {
                                ...item,
                                description: {
                                    ...item.description,
                                    [locale]: value,
                                },
                            })
                        }
                    />
                </div>
            ))}
        </Space>
    );
}

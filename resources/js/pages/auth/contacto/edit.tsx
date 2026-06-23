import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Alert,
    Button,
    Collapse,
    Flex,
    Form,
    Input,
    InputNumber,
    Segmented,
    Select,
    Space,
    Splitter,
    Switch,
    Tooltip,
    Typography,
} from 'antd';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import InputFormulario from '@/components/base/InputFormulario';
import ContactoShowcase from '@/components/contacto/ContactoShowcase';
import type {
    ArrivalIconName,
    ContactIconName,
    ContactoPageContent,
    ContactoPageText,
    EditableArrivalRoute,
    EditableContactInfo,
    EditablePagePayload,
    FormData,
} from '@/components/contacto/interfaces';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import {
    cloneEditableContent,
    localeLabels,
    supportedLocales,
} from '@/lib/editable-content';
import type { LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

const CONTACT_ICON_OPTIONS: { label: string; value: ContactIconName }[] = [
    { label: 'Ubicacion', value: 'map-pin' },
    { label: 'Telefono', value: 'phone' },
    { label: 'Correo', value: 'mail' },
];

const ARRIVAL_ICON_OPTIONS: { label: string; value: ArrivalIconName }[] = [
    { label: 'Avion', value: 'plane' },
    { label: 'Carro', value: 'car' },
    { label: 'Autobus', value: 'bus' },
];

const PAGE_FIELDS: {
    field: keyof ContactoPageText;
    label: string;
    rows?: number;
    wide?: boolean;
}[] = [
    { field: 'page_title', label: 'Titulo para pestana' },
    { field: 'hero_title', label: 'Titulo principal' },
    { field: 'hero_body', label: 'Descripcion principal', rows: 3, wide: true },
    { field: 'contact_info_aria_label', label: 'Etiqueta accesible contacto' },
    { field: 'map_kicker', label: 'Kicker mapa' },
    { field: 'map_title', label: 'Titulo mapa' },
    { field: 'map_body', label: 'Descripcion mapa', rows: 3, wide: true },
    { field: 'map_cta_label', label: 'Boton mapa' },
    { field: 'map_iframe_title', label: 'Titulo iframe mapa' },
    { field: 'arrival_title', label: 'Titulo como llegar' },
    {
        field: 'arrival_body',
        label: 'Descripcion como llegar',
        rows: 3,
        wide: true,
    },
    {
        field: 'airlines_intro',
        label: 'Texto companias aereas',
        rows: 2,
        wide: true,
    },
];

function localizedValue(es: string, en = es): LocalizedString {
    return { es, en };
}

function splitLines(value: string): string[] {
    return value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
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
    return values.map((value, index) => {
        const nextValue: LocalizedString = {
            es: previous[index]?.es ?? value,
            en: previous[index]?.en ?? value,
        };

        nextValue[locale] = value;

        return nextValue;
    });
}

function normalizeItemId(value: string): string {
    const normalizedValue = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalizedValue || 'elemento';
}

function uniqueContactId(
    value: string,
    items: EditableContactInfo[],
    currentIndex?: number,
): string {
    const baseId = normalizeItemId(value);
    let nextId = baseId;
    let suffix = 2;

    while (
        items.some(
            (item, index) => index !== currentIndex && item.id === nextId,
        )
    ) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    return nextId;
}

function uniqueArrivalId(
    value: string,
    routes: EditableArrivalRoute[],
    currentIndex?: number,
): string {
    const baseId = normalizeItemId(value);
    let nextId = baseId;
    let suffix = 2;

    while (
        routes.some(
            (route, index) => index !== currentIndex && route.id === nextId,
        )
    ) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    return nextId;
}

function newContactItem(
    order: number,
    id = `contacto-${Date.now()}`,
): EditableContactInfo {
    return {
        id,
        order,
        is_active: true,
        icon: 'map-pin',
        label: localizedValue('Nuevo contacto', 'New contact'),
        lines: [localizedValue('Nuevo dato', 'New detail')],
        href: '#',
        external: false,
    };
}

function newArrivalRoute(
    order: number,
    id = `ruta-${Date.now()}`,
): EditableArrivalRoute {
    return {
        id,
        order,
        is_active: true,
        icon: 'car',
        eyebrow: localizedValue('Nueva ruta', 'New route'),
        title: localizedValue('Como llegar', 'How to arrive'),
        description: localizedValue('', ''),
        footer: localizedValue('', ''),
        companies: [],
        steps: [localizedValue('Nuevo paso', 'New step')],
    };
}

type EditContactoProps = {
    editablePage: EditablePagePayload;
};

export default function EditContacto({ editablePage }: EditContactoProps) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeContactIndex, setActiveContactIndex] = useState(0);
    const [activeArrivalIndex, setActiveArrivalIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [draftContent, setDraftContent] = useState<ContactoPageContent>(() =>
        cloneEditableContent(editablePage.content),
    );
    const draftContentRef = useRef(draftContent);
    const { data, setData, post, processing, errors, transform } =
        useForm<FormData>({
            _method: 'put',
            title: editablePage.title,
            is_published: editablePage.is_published,
            content: editablePage.content,
        });
    const formErrors = errors as Record<string, string | undefined>;
    const deferredDraftContent = useDeferredValue(draftContent);
    const activeContact =
        draftContent.contact_items[activeContactIndex] ??
        draftContent.contact_items[0];
    const activeArrival =
        draftContent.arrival_routes[activeArrivalIndex] ??
        draftContent.arrival_routes[0];

    const previewContent = useMemo(() => {
        if (!isLivePreviewEnabled) {
            return null;
        }

        return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: ContactoPageContent) => void) => {
        const nextContent = cloneEditableContent(draftContentRef.current);

        updater(nextContent);
        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof ContactoPageText, value: string) => {
        updateContent((content) => {
            content.locales[locale][field] = value;
        });
    };

    const updateContact = (updater: (item: EditableContactInfo) => void) => {
        updateContent((content) => {
            const item = content.contact_items[activeContactIndex];

            if (!item) {
                return;
            }

            updater(item);
        });
    };

    const updateContactLabel = (value: string) => {
        updateContent((content) => {
            const item = content.contact_items[activeContactIndex];

            if (!item) {
                return;
            }

            item.label[locale] = value;
            item.id = uniqueContactId(
                value,
                content.contact_items,
                activeContactIndex,
            );
        });
    };

    const updateArrival = (updater: (route: EditableArrivalRoute) => void) => {
        updateContent((content) => {
            const route = content.arrival_routes[activeArrivalIndex];

            if (!route) {
                return;
            }

            updater(route);
        });
    };

    const updateArrivalTitle = (value: string) => {
        updateContent((content) => {
            const route = content.arrival_routes[activeArrivalIndex];

            if (!route) {
                return;
            }

            route.title[locale] = value;
            route.id = uniqueArrivalId(
                value,
                content.arrival_routes,
                activeArrivalIndex,
            );
        });
    };

    const addContact = () => {
        const nextContactIndex = draftContent.contact_items.length;

        updateContent((content) => {
            content.contact_items.push(
                newContactItem(
                    content.contact_items.length + 1,
                    uniqueContactId('Nuevo contacto', content.contact_items),
                ),
            );
        });
        setActiveContactIndex(nextContactIndex);
    };

    const removeActiveContact = () => {
        if (draftContent.contact_items.length <= 1) {
            return;
        }

        updateContent((content) => {
            content.contact_items.splice(activeContactIndex, 1);
        });
        setActiveContactIndex(Math.max(activeContactIndex - 1, 0));
    };

    const addArrivalRoute = () => {
        const nextArrivalIndex = draftContent.arrival_routes.length;

        updateContent((content) => {
            content.arrival_routes.push(
                newArrivalRoute(
                    content.arrival_routes.length + 1,
                    uniqueArrivalId('Como llegar', content.arrival_routes),
                ),
            );
        });
        setActiveArrivalIndex(nextArrivalIndex);
    };

    const removeActiveArrivalRoute = () => {
        if (draftContent.arrival_routes.length <= 1) {
            return;
        }

        updateContent((content) => {
            content.arrival_routes.splice(activeArrivalIndex, 1);
        });
        setActiveArrivalIndex(Math.max(activeArrivalIndex - 1, 0));
    };

    const submit = () => {
        const latestContent = cloneEditableContent(draftContentRef.current);

        transform((formData) => ({
            ...formData,
            content: latestContent,
        }));

        post('/admin/contenido/contacto', {
            preserveScroll: true,
            onSuccess: () => {
                showAppAlert({
                    type: 'success',
                    title: 'Contacto guardado',
                    description: 'El contenido se actualizo correctamente.',
                });
            },
            onError: (backendErrors) => {
                showBackendErrorAlert(backendErrors, {
                    title: 'No se pudo guardar contacto',
                    fallback:
                        'Revisa los campos del formulario e intenta de nuevo.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Editar contacto" />

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
                            Contacto y ubicaciones
                        </Title>
                        <Paragraph className="!mb-0 text-muted-foreground">
                            Edita datos de contacto, mapa y rutas de llegada.
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
                                    <ContactoShowcase
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
                                        label="Titulo interno"
                                        className="min-w-64 flex-1"
                                    >
                                        <InputFormulario
                                            resetKey="contacto:title"
                                            value={data.title}
                                            onCommit={(value) =>
                                                setData('title', value)
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
                                        'contact',
                                        'arrival',
                                    ]}
                                    items={[
                                        {
                                            key: 'page',
                                            label: 'Pagina y mapa',
                                            children: (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                        {PAGE_FIELDS.map(
                                                            ({
                                                                field,
                                                                label,
                                                                rows,
                                                                wide,
                                                            }) => (
                                                                <Form.Item
                                                                    key={field}
                                                                    label={
                                                                        label
                                                                    }
                                                                    className={
                                                                        wide
                                                                            ? 'lg:col-span-2'
                                                                            : ''
                                                                    }
                                                                >
                                                                    <InputFormulario
                                                                        resetKey={`page:${locale}:${field}`}
                                                                        rows={
                                                                            rows
                                                                        }
                                                                        value={
                                                                            draftContent
                                                                                .locales[
                                                                                locale
                                                                            ][
                                                                                field
                                                                            ]
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
                                                                </Form.Item>
                                                            ),
                                                        )}
                                                    </div>

                                                    <Form.Item label="URL de Google Maps">
                                                        <Input
                                                            value={
                                                                draftContent.maps_url
                                                            }
                                                            onChange={(event) =>
                                                                updateContent(
                                                                    (
                                                                        content,
                                                                    ) => {
                                                                        content.maps_url =
                                                                            event.target.value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="URL embed del mapa">
                                                        <Input
                                                            value={
                                                                draftContent.map_embed_url
                                                            }
                                                            onChange={(event) =>
                                                                updateContent(
                                                                    (
                                                                        content,
                                                                    ) => {
                                                                        content.map_embed_url =
                                                                            event.target.value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Space>
                                            ),
                                        },
                                        {
                                            key: 'contact',
                                            label: 'Datos de contacto',
                                            children: activeContact && (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Flex
                                                        gap={8}
                                                        align="center"
                                                        wrap
                                                    >
                                                        <Form.Item
                                                            label="Dato"
                                                            layout="horizontal"
                                                        >
                                                            <Select
                                                                className="min-w-72 flex-1"
                                                                value={
                                                                    activeContactIndex
                                                                }
                                                                options={draftContent.contact_items.map(
                                                                    (
                                                                        item,
                                                                        index,
                                                                    ) => ({
                                                                        label:
                                                                            item
                                                                                .label[
                                                                                locale
                                                                            ] ||
                                                                            item.id,
                                                                        value: index,
                                                                    }),
                                                                )}
                                                                onChange={
                                                                    setActiveContactIndex
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Tooltip title="Agregar">
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={
                                                                    addContact
                                                                }
                                                            />
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar">
                                                            <Button
                                                                danger
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                disabled={
                                                                    draftContent
                                                                        .contact_items
                                                                        .length <=
                                                                    1
                                                                }
                                                                onClick={
                                                                    removeActiveContact
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </Flex>

                                                    <Flex gap={12} wrap>
                                                        <Form.Item label="Publicar">
                                                            <Switch
                                                                checked={
                                                                    activeContact.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateContact(
                                                                        (
                                                                            item,
                                                                        ) => {
                                                                            item.is_active =
                                                                                checked;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Externo">
                                                            <Switch
                                                                checked={
                                                                    activeContact.external
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateContact(
                                                                        (
                                                                            item,
                                                                        ) => {
                                                                            item.external =
                                                                                checked;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Orden">
                                                            <InputNumber
                                                                min={0}
                                                                value={
                                                                    activeContact.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateContact(
                                                                        (
                                                                            item,
                                                                        ) => {
                                                                            item.order =
                                                                                value ??
                                                                                0;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Icono">
                                                            <Select
                                                                className="w-40"
                                                                value={
                                                                    activeContact.icon
                                                                }
                                                                options={
                                                                    CONTACT_ICON_OPTIONS
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateContact(
                                                                        (
                                                                            item,
                                                                        ) => {
                                                                            item.icon =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <Form.Item label="Etiqueta">
                                                        <InputFormulario
                                                            resetKey={`contact:${activeContact.id}:${locale}:label`}
                                                            value={
                                                                activeContact
                                                                    .label[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={
                                                                updateContactLabel
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Enlace">
                                                        <Input
                                                            value={
                                                                activeContact.href
                                                            }
                                                            onChange={(event) =>
                                                                updateContact(
                                                                    (item) => {
                                                                        item.href =
                                                                            event.target.value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Lineas">
                                                        <InputFormulario
                                                            resetKey={`contact:${activeContact.id}:${locale}:lines`}
                                                            rows={4}
                                                            value={localizedArrayValues(
                                                                activeContact.lines,
                                                                locale,
                                                            ).join('\n')}
                                                            onCommit={(value) =>
                                                                updateContact(
                                                                    (item) => {
                                                                        item.lines =
                                                                            valuesToLocalizedArray(
                                                                                splitLines(
                                                                                    value,
                                                                                ),
                                                                                item.lines,
                                                                                locale,
                                                                            );
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Space>
                                            ),
                                        },
                                        {
                                            key: 'arrival',
                                            label: 'Como llegar',
                                            children: activeArrival && (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Flex
                                                        gap={8}
                                                        align="center"
                                                        wrap
                                                    >
                                                        <Form.Item
                                                            label="Ruta"
                                                            layout="horizontal"
                                                        >
                                                            <Select
                                                                className="min-w-72 flex-1"
                                                                value={
                                                                    activeArrivalIndex
                                                                }
                                                                options={draftContent.arrival_routes.map(
                                                                    (
                                                                        route,
                                                                        index,
                                                                    ) => ({
                                                                        label:
                                                                            route
                                                                                .title[
                                                                                locale
                                                                            ] ||
                                                                            route.id,
                                                                        value: index,
                                                                    }),
                                                                )}
                                                                onChange={
                                                                    setActiveArrivalIndex
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Tooltip title="Agregar">
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={
                                                                    addArrivalRoute
                                                                }
                                                            />
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar">
                                                            <Button
                                                                danger
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                disabled={
                                                                    draftContent
                                                                        .arrival_routes
                                                                        .length <=
                                                                    1
                                                                }
                                                                onClick={
                                                                    removeActiveArrivalRoute
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </Flex>

                                                    <Flex gap={12} wrap>
                                                        <Form.Item label="Publicar">
                                                            <Switch
                                                                checked={
                                                                    activeArrival.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateArrival(
                                                                        (
                                                                            route,
                                                                        ) => {
                                                                            route.is_active =
                                                                                checked;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Orden">
                                                            <InputNumber
                                                                min={0}
                                                                value={
                                                                    activeArrival.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateArrival(
                                                                        (
                                                                            route,
                                                                        ) => {
                                                                            route.order =
                                                                                value ??
                                                                                0;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item label="Icono">
                                                            <Select
                                                                className="w-40"
                                                                value={
                                                                    activeArrival.icon
                                                                }
                                                                options={
                                                                    ARRIVAL_ICON_OPTIONS
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateArrival(
                                                                        (
                                                                            route,
                                                                        ) => {
                                                                            route.icon =
                                                                                value;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <Form.Item label="Kicker">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:eyebrow`}
                                                            value={
                                                                activeArrival
                                                                    .eyebrow[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateArrival(
                                                                    (route) => {
                                                                        route.eyebrow[
                                                                            locale
                                                                        ] =
                                                                            value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Titulo">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:title`}
                                                            value={
                                                                activeArrival
                                                                    .title[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={
                                                                updateArrivalTitle
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Descripcion">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:description`}
                                                            rows={4}
                                                            value={
                                                                activeArrival
                                                                    .description[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateArrival(
                                                                    (route) => {
                                                                        route.description[
                                                                            locale
                                                                        ] =
                                                                            value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Companias">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:companies`}
                                                            rows={5}
                                                            value={localizedArrayValues(
                                                                activeArrival.companies,
                                                                locale,
                                                            ).join('\n')}
                                                            onCommit={(value) =>
                                                                updateArrival(
                                                                    (route) => {
                                                                        route.companies =
                                                                            valuesToLocalizedArray(
                                                                                splitLines(
                                                                                    value,
                                                                                ),
                                                                                route.companies,
                                                                                locale,
                                                                            );
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Texto final">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:footer`}
                                                            rows={4}
                                                            value={
                                                                activeArrival
                                                                    .footer[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateArrival(
                                                                    (route) => {
                                                                        route.footer[
                                                                            locale
                                                                        ] =
                                                                            value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Pasos">
                                                        <InputFormulario
                                                            resetKey={`arrival:${activeArrival.id}:${locale}:steps`}
                                                            rows={7}
                                                            value={localizedArrayValues(
                                                                activeArrival.steps,
                                                                locale,
                                                            ).join('\n')}
                                                            onCommit={(value) =>
                                                                updateArrival(
                                                                    (route) => {
                                                                        route.steps =
                                                                            valuesToLocalizedArray(
                                                                                splitLines(
                                                                                    value,
                                                                                ),
                                                                                route.steps,
                                                                                locale,
                                                                            );
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
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

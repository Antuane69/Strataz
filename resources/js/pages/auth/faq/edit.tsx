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
import FaqShowcase from '@/components/faq/FaqShowcase';
import type {
    EditableFaqItem,
    EditablePagePayload,
    FaqPageContent,
    FaqPageText,
    FormData,
} from '@/components/faq/interfaces';
import { showAppAlert, showBackendErrorAlert } from '@/lib/app-alerts';
import {
    cloneEditableContent,
    localeLabels,
    supportedLocales,
} from '@/lib/editable-content';
import type { LocaleCode, LocalizedString } from '@/types';

const { Paragraph, Text, Title } = Typography;

function localizedValue(es: string, en = es): LocalizedString {
    return { es, en };
}

function normalizeFaqId(question: string): string {
    const normalizedQuestion = question
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalizedQuestion || 'pregunta';
}

function uniqueFaqId(
    question: string,
    faqs: EditableFaqItem[],
    currentIndex?: number,
): string {
    const baseId = normalizeFaqId(question);
    let nextId = baseId;
    let suffix = 2;

    while (
        faqs.some((faq, index) => index !== currentIndex && faq.id === nextId)
    ) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    return nextId;
}

function newFaq(order: number, id = `pregunta-${Date.now()}`): EditableFaqItem {
    return {
        id,
        order,
        is_active: true,
        question: localizedValue('Nueva pregunta', 'New question'),
        answer: localizedValue('Nueva respuesta.', 'New answer.'),
    };
}

type EditFaqProps = {
    editablePage: EditablePagePayload;
};

export default function EditFaq({ editablePage }: EditFaqProps) {
    const [locale, setLocale] = useState<LocaleCode>('es');
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);
    const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false);
    const [draftContent, setDraftContent] = useState<FaqPageContent>(() =>
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
    const activeFaq = draftContent.faqs[activeFaqIndex] ?? draftContent.faqs[0];

    const previewContent = useMemo(() => {
        if (!isLivePreviewEnabled) {
            return null;
        }

        return cloneEditableContent(deferredDraftContent);
    }, [deferredDraftContent, isLivePreviewEnabled]);

    const updateContent = (updater: (content: FaqPageContent) => void) => {
        const nextContent = cloneEditableContent(draftContentRef.current);

        updater(nextContent);
        draftContentRef.current = nextContent;
        setDraftContent(nextContent);
    };

    const updatePageText = (field: keyof FaqPageText, value: string) => {
        updateContent((content) => {
            content.locales[locale][field] = value;
        });
    };

    const updateFaq = (updater: (faq: EditableFaqItem) => void) => {
        updateContent((content) => {
            const faq = content.faqs[activeFaqIndex];

            if (!faq) {
                return;
            }

            updater(faq);
        });
    };

    const updateFaqQuestion = (value: string) => {
        updateContent((content) => {
            const faq = content.faqs[activeFaqIndex];

            if (!faq) {
                return;
            }

            faq.question[locale] = value;
            faq.id = uniqueFaqId(value, content.faqs, activeFaqIndex);
        });
    };

    const addFaq = () => {
        const nextFaqIndex = draftContent.faqs.length;

        updateContent((content) => {
            content.faqs.push(
                newFaq(
                    content.faqs.length + 1,
                    uniqueFaqId('Nueva pregunta', content.faqs),
                ),
            );
        });
        setActiveFaqIndex(nextFaqIndex);
    };

    const removeActiveFaq = () => {
        if (draftContent.faqs.length <= 1) {
            return;
        }

        updateContent((content) => {
            content.faqs.splice(activeFaqIndex, 1);
        });
        setActiveFaqIndex(Math.max(activeFaqIndex - 1, 0));
    };

    const submit = () => {
        const latestContent = cloneEditableContent(draftContentRef.current);

        transform((formData) => ({
            ...formData,
            content: latestContent,
        }));

        post('/admin/contenido/faq', {
            preserveScroll: true,
            onSuccess: () => {
                showAppAlert({
                    type: 'success',
                    title: 'FAQ guardado',
                    description: 'El contenido se actualizo correctamente.',
                });
            },
            onError: (backendErrors) => {
                showBackendErrorAlert(backendErrors, {
                    title: 'No se pudo guardar FAQ',
                    fallback:
                        'Revisa los campos del formulario e intenta de nuevo.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Editar FAQ" />

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
                            FAQ
                        </Title>
                        <Paragraph className="!mb-0 text-muted-foreground">
                            Edita las preguntas frecuentes de la pagina.
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
                                    <FaqShowcase
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
                                            resetKey="faq:title"
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
                                    defaultActiveKey={['page', 'faqs']}
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

                                                    <Form.Item label="Correo destino">
                                                        <Input
                                                            value={
                                                                draftContent.contact_email
                                                            }
                                                            onChange={(event) =>
                                                                updateContent(
                                                                    (
                                                                        content,
                                                                    ) => {
                                                                        content.contact_email =
                                                                            event.target.value;
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                        {[
                                                            [
                                                                'hero_background_label',
                                                                'Texto de fondo',
                                                            ],
                                                            [
                                                                'hero_title',
                                                                'Titulo principal',
                                                            ],
                                                            [
                                                                'question_card_kicker',
                                                                'Kicker tarjeta',
                                                            ],
                                                            [
                                                                'question_card_title',
                                                                'Titulo tarjeta',
                                                            ],
                                                            [
                                                                'question_card_body',
                                                                'Descripcion tarjeta',
                                                            ],
                                                            [
                                                                'question_card_button',
                                                                'Boton tarjeta',
                                                            ],
                                                            [
                                                                'drawer_kicker',
                                                                'Kicker drawer',
                                                            ],
                                                            [
                                                                'drawer_title',
                                                                'Titulo drawer',
                                                            ],
                                                            [
                                                                'drawer_body',
                                                                'Descripcion drawer',
                                                            ],
                                                            [
                                                                'form_name_label',
                                                                'Etiqueta nombre',
                                                            ],
                                                            [
                                                                'form_name_placeholder',
                                                                'Placeholder nombre',
                                                            ],
                                                            [
                                                                'form_name_required',
                                                                'Error nombre',
                                                            ],
                                                            [
                                                                'form_email_label',
                                                                'Etiqueta correo',
                                                            ],
                                                            [
                                                                'form_email_placeholder',
                                                                'Placeholder correo',
                                                            ],
                                                            [
                                                                'form_email_required',
                                                                'Error correo',
                                                            ],
                                                            [
                                                                'form_email_invalid',
                                                                'Error correo invalido',
                                                            ],
                                                            [
                                                                'form_phone_label',
                                                                'Etiqueta telefono',
                                                            ],
                                                            [
                                                                'form_phone_placeholder',
                                                                'Placeholder telefono',
                                                            ],
                                                            [
                                                                'form_message_label',
                                                                'Etiqueta pregunta',
                                                            ],
                                                            [
                                                                'form_message_placeholder',
                                                                'Placeholder pregunta',
                                                            ],
                                                            [
                                                                'form_message_required',
                                                                'Error pregunta',
                                                            ],
                                                            [
                                                                'form_submit_label',
                                                                'Boton formulario',
                                                            ],
                                                            [
                                                                'mail_subject',
                                                                'Asunto correo',
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
                                                                    className={
                                                                        [
                                                                            'question_card_body',
                                                                            'drawer_body',
                                                                            'form_message_placeholder',
                                                                        ].includes(
                                                                            field,
                                                                        )
                                                                            ? 'lg:col-span-2'
                                                                            : ''
                                                                    }
                                                                >
                                                                    <InputFormulario
                                                                        resetKey={`page:${locale}:${field}`}
                                                                        rows={
                                                                            [
                                                                                'question_card_body',
                                                                                'drawer_body',
                                                                                'form_message_placeholder',
                                                                            ].includes(
                                                                                field,
                                                                            )
                                                                                ? 3
                                                                                : undefined
                                                                        }
                                                                        value={
                                                                            draftContent
                                                                                .locales[
                                                                                locale
                                                                            ][
                                                                                field as keyof FaqPageText
                                                                            ]
                                                                        }
                                                                        onCommit={(
                                                                            value,
                                                                        ) =>
                                                                            updatePageText(
                                                                                field as keyof FaqPageText,
                                                                                value,
                                                                            )
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            ),
                                                        )}
                                                    </div>
                                                </Space>
                                            ),
                                        },
                                        {
                                            key: 'faqs',
                                            label: 'Preguntas',
                                            children: activeFaq && (
                                                <Space
                                                    direction="vertical"
                                                    size={14}
                                                    className="w-full"
                                                >
                                                    <Flex
                                                        gap={8}
                                                        align="center"
                                                        wrap
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Form.Item
                                                            label="Pregunta"
                                                            layout="horizontal"
                                                        >
                                                            <Select
                                                                className="min-w-72 flex-1"
                                                                value={
                                                                    activeFaqIndex
                                                                }
                                                                options={draftContent.faqs.map(
                                                                    (
                                                                        faq,
                                                                        index,
                                                                    ) => ({
                                                                        label:
                                                                            faq
                                                                                .question[
                                                                                locale
                                                                            ] ||
                                                                            faq.id,
                                                                        value: index,
                                                                    }),
                                                                )}
                                                                onChange={
                                                                    setActiveFaqIndex
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Tooltip title="Agregar">
                                                            <Button
                                                                icon={
                                                                    <PlusOutlined />
                                                                }
                                                                onClick={addFaq}
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
                                                                        .faqs
                                                                        .length <=
                                                                    1
                                                                }
                                                                onClick={
                                                                    removeActiveFaq
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </Flex>

                                                    <Flex gap={12} wrap>
                                                        <Form.Item label="Publicar">
                                                            <Switch
                                                                checked={
                                                                    activeFaq.is_active
                                                                }
                                                                onChange={(
                                                                    checked,
                                                                ) =>
                                                                    updateFaq(
                                                                        (
                                                                            faq,
                                                                        ) => {
                                                                            faq.is_active =
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
                                                                    activeFaq.order
                                                                }
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    updateFaq(
                                                                        (
                                                                            faq,
                                                                        ) => {
                                                                            faq.order =
                                                                                value ??
                                                                                0;
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Flex>

                                                    <Form.Item label="Pregunta">
                                                        <InputFormulario
                                                            resetKey={`faq:${activeFaq.id}:${locale}:question`}
                                                            value={
                                                                activeFaq
                                                                    .question[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={
                                                                updateFaqQuestion
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Respuesta">
                                                        <InputFormulario
                                                            resetKey={`faq:${activeFaq.id}:${locale}:answer`}
                                                            rows={6}
                                                            value={
                                                                activeFaq
                                                                    .answer[
                                                                    locale
                                                                ]
                                                            }
                                                            onCommit={(value) =>
                                                                updateFaq(
                                                                    (faq) => {
                                                                        faq.answer[
                                                                            locale
                                                                        ] =
                                                                            value;
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

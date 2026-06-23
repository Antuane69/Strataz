import { Button, Collapse, Drawer, Form, Input } from 'antd';
import type { CollapseProps } from 'antd';
import {
    ChevronRight,
    Mail,
    MessageSquareText,
    Phone,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FaqPageContent } from './interfaces';
import { mapFaqContent } from './services/mapFaqContent';

type QuestionFormValues = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

type FaqShowcaseProps = {
    content?: FaqPageContent | null;
    locale?: string | null;
};

export default function FaqShowcase({ content, locale }: FaqShowcaseProps) {
    const mappedContent = mapFaqContent(content, locale);
    const [form] = Form.useForm<QuestionFormValues>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const collapseItems = useMemo<CollapseProps['items']>(
        () =>
            mappedContent.items.map((item) => ({
                key: item.id,
                label: item.question,
                children: <p>{item.answer}</p>,
            })),
        [mappedContent.items],
    );

    const handleQuestionSubmit = (values: QuestionFormValues) => {
        const emailBody = [
            `Nombre: ${values.name}`,
            `Correo: ${values.email}`,
            values.phone ? `Teléfono: ${values.phone}` : null,
            '',
            values.message,
        ]
            .filter(Boolean)
            .join('\n');

        const mailtoUrl = new URL(`mailto:${mappedContent.contactEmail}`);

        mailtoUrl.searchParams.set('subject', mappedContent.text.mail_subject);
        mailtoUrl.searchParams.set('body', emailBody);

        window.location.href = mailtoUrl.toString();
        form.resetFields();
        setIsDrawerOpen(false);
    };

    return (
        <main className="faq-section">
            <section className="faq-hero">
                <span aria-hidden="true">
                    {mappedContent.text.hero_background_label}
                </span>
                <h1>{mappedContent.text.hero_title}</h1>
            </section>

            <section className="faq-content" aria-label="Preguntas frecuentes">
                <div className="faq-panel">
                    <Collapse
                        accordion
                        defaultActiveKey={
                            mappedContent.items[0]
                                ? [mappedContent.items[0].id]
                                : undefined
                        }
                        items={collapseItems}
                        expandIconPosition="end"
                        className="faq-collapse"
                    />
                </div>

                <aside className="faq-question-card">
                    <span>
                        <MessageSquareText size={18} />
                        {mappedContent.text.question_card_kicker}
                    </span>
                    <h2>{mappedContent.text.question_card_title}</h2>
                    <p>{mappedContent.text.question_card_body}</p>
                    <Button
                        type="primary"
                        size="large"
                        className="faq-question-button"
                        icon={<ChevronRight size={17} />}
                        iconPosition="end"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        {mappedContent.text.question_card_button}
                    </Button>
                </aside>
            </section>

            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                width="min(520px, 100vw)"
                placement="right"
                className="faq-question-drawer"
                title={null}
                destroyOnHidden
            >
                <div className="faq-drawer-intro">
                    <p>{mappedContent.text.drawer_kicker}</p>
                    <h2>{mappedContent.text.drawer_title}</h2>
                    <span>{mappedContent.text.drawer_body}</span>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    className="faq-question-form"
                    requiredMark={false}
                    onFinish={handleQuestionSubmit}
                >
                    <Form.Item
                        label={mappedContent.text.form_name_label}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: mappedContent.text.form_name_required,
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserRound size={18} />}
                            placeholder={
                                mappedContent.text.form_name_placeholder
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label={mappedContent.text.form_email_label}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: mappedContent.text.form_email_required,
                            },
                            {
                                type: 'email',
                                message: mappedContent.text.form_email_invalid,
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<Mail size={18} />}
                            placeholder={
                                mappedContent.text.form_email_placeholder
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label={mappedContent.text.form_phone_label}
                        name="phone"
                    >
                        <Input
                            size="large"
                            prefix={<Phone size={18} />}
                            placeholder={
                                mappedContent.text.form_phone_placeholder
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label={mappedContent.text.form_message_label}
                        name="message"
                        rules={[
                            {
                                required: true,
                                message:
                                    mappedContent.text.form_message_required,
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={5}
                            size="large"
                            placeholder={
                                mappedContent.text.form_message_placeholder
                            }
                        />
                    </Form.Item>

                    <Button type="primary" size="large" block htmlType="submit">
                        {mappedContent.text.form_submit_label}
                    </Button>
                </Form>
            </Drawer>
        </main>
    );
}

import { Head } from '@inertiajs/react';
import { Button, Collapse, Drawer, Form, Input } from 'antd';
import type { CollapseProps } from 'antd';
import {
    ChevronRight,
    HelpCircle,
    Mail,
    MessageSquareText,
    Phone,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type FaqItem = {
    question: string;
    answer: string;
};

type QuestionFormValues = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

const faqItems: FaqItem[] = [
    {
        question: '¿El hotel se ubica sobre la playa?',
        answer: 'Nos localizamos sobre la playa Anclote; nuestra área de alberca tiene acceso directo a la sección de playa delimitada para uso del hotel, la cual cuenta con camastros para uso exclusivo de nuestros huéspedes.',
    },
    {
        question: '¿Cuál es el horario de check-in y check-out?',
        answer: 'El check-in es a partir de las 2:00 PM y el check-out se realiza a las 12:00 PM. Si necesitas apoyo con tu llegada o salida, nuestro equipo puede orientarte antes de tu estancia.',
    },
    {
        question: '¿Cuál es el horario de alberca?',
        answer: 'La alberca está disponible para huéspedes del hotel. Al llegar, recepción puede confirmarte el horario vigente y cualquier indicación especial para el uso del área.',
    },
    {
        question: '¿Hay alguna tienda cerca?',
        answer: 'Sí. En la zona de El Anclote encontrarás tiendas, restaurantes y servicios locales a pocos pasos del hotel.',
    },
    {
        question: '¿El hotel cuenta con estacionamiento?',
        answer: 'El equipo de recepción puede ayudarte con la información disponible para estacionamiento y acceso al hotel de acuerdo con tu fecha de visita.',
    },
    {
        question: '¿Cómo puedo consultar disponibilidad?',
        answer: 'Puedes usar la barra de reservación del sitio o escribirnos directamente para confirmar fechas, tipo de habitación y detalles de tu estancia.',
    },
    {
        question: '¿Cuál es la política de cancelación?',
        answer: 'Las políticas pueden variar según la fecha y el tipo de reserva. En la sección de habitaciones puedes revisar la tabla de cancelaciones dentro de la información del hotel.',
    },
];

export default function Faq() {
    const [form] = Form.useForm<QuestionFormValues>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const collapseItems = useMemo<CollapseProps['items']>(
        () =>
            faqItems.map((item) => ({
                key: item.question,
                label: item.question,
                children: <p>{item.answer}</p>,
            })),
        [],
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

        const mailtoUrl = new URL('mailto:reservaciones@hotelmesondemita.com');

        mailtoUrl.searchParams.set('subject', 'Duda desde FAQ');
        mailtoUrl.searchParams.set('body', emailBody);

        window.location.href = mailtoUrl.toString();
        form.resetFields();
        setIsDrawerOpen(false);
    };

    return (
        <>
            <Head title="FAQ" />

            <main className="faq-section">
                <section className="faq-hero">
                    <span aria-hidden="true">FAQ</span>
                    {/* <p>Preguntas frecuentes</p> */}
                    <h1>Preguntas frecuentes</h1>
                </section>

                <section
                    className="faq-content"
                    aria-label="Preguntas frecuentes"
                >
                    <div className="faq-panel">

                        <Collapse
                            accordion
                            defaultActiveKey={[faqItems[0].question]}
                            items={collapseItems}
                            expandIconPosition="end"
                            className="faq-collapse"
                        />
                    </div>

                    <aside className="faq-question-card">
                        <span>
                            <MessageSquareText size={18} />
                            ¿Otra duda?
                        </span>
                        <h2>Cuéntanos qué necesitas saber</h2>
                        <p>
                            Si tu pregunta no aparece aquí, envíanos el detalle
                            y te responderemos por correo.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            className="faq-question-button"
                            icon={<ChevronRight size={17} />}
                            iconPosition="end"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            Preguntar ahora
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
                        <p>Pregunta específica</p>
                        <h2>Envíanos tu duda</h2>
                        <span>
                            Comparte tus datos y el equipo de Hotel Mesón de
                            Mita te responderá lo antes posible.
                        </span>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        className="faq-question-form"
                        requiredMark={false}
                        onFinish={handleQuestionSubmit}
                    >
                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Escribe tu nombre.',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={<UserRound size={18} />}
                                placeholder="Tu nombre"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Correo"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Escribe tu correo.',
                                },
                                {
                                    type: 'email',
                                    message: 'Escribe un correo válido.',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={<Mail size={18} />}
                                placeholder="correo@ejemplo.com"
                            />
                        </Form.Item>

                        <Form.Item label="Teléfono" name="phone">
                            <Input
                                size="large"
                                prefix={<Phone size={18} />}
                                placeholder="+52"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Pregunta"
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Cuéntanos tu duda.',
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={5}
                                size="large"
                                placeholder="Escribe aquí la duda que quieres resolver."
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            size="large"
                            block
                            htmlType="submit"
                        >
                            Enviar pregunta
                        </Button>
                    </Form>
                </Drawer>
            </main>
        </>
    );
}

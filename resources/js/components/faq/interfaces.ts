import type { LocalizedString } from '@/types';

export type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export type FaqPageText = {
    page_title: string;
    hero_background_label: string;
    hero_title: string;
    question_card_kicker: string;
    question_card_title: string;
    question_card_body: string;
    question_card_button: string;
    drawer_kicker: string;
    drawer_title: string;
    drawer_body: string;
    form_name_label: string;
    form_name_placeholder: string;
    form_name_required: string;
    form_email_label: string;
    form_email_placeholder: string;
    form_email_required: string;
    form_email_invalid: string;
    form_phone_label: string;
    form_phone_placeholder: string;
    form_message_label: string;
    form_message_placeholder: string;
    form_message_required: string;
    form_submit_label: string;
    mail_subject: string;
};

export type EditableFaqItem = {
    id: string;
    order: number;
    is_active: boolean;
    question: LocalizedString;
    answer: LocalizedString;
};

export type FaqPageContent = {
    version: number;
    contact_email: string;
    locales: Record<'es' | 'en', FaqPageText>;
    faqs: EditableFaqItem[];
};

export type EditablePagePayload = {
    id: number;
    slug: string;
    title: string;
    content: FaqPageContent;
    is_published: boolean;
    updated_at?: string | null;
};

export type FormData = {
    _method: 'put';
    title: string;
    is_published: boolean;
    content: FaqPageContent;
};

<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEditableFaqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('manage-content');
    }

    /**
     * @return array<string, array<int, mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'is_published' => ['required', 'boolean'],
            'content' => ['required', 'array'],
            'content.version' => ['required', 'integer', 'min:1'],
            'content.contact_email' => ['required', 'email', 'max:255'],
            'content.locales' => ['required', 'array'],
            'content.locales.es' => ['required', 'array'],
            'content.locales.en' => ['required', 'array'],
            'content.locales.*.page_title' => ['required', 'string', 'max:120'],
            'content.locales.*.hero_background_label' => ['required', 'string', 'max:40'],
            'content.locales.*.hero_title' => ['required', 'string', 'max:120'],
            'content.locales.*.question_card_kicker' => ['required', 'string', 'max:80'],
            'content.locales.*.question_card_title' => ['required', 'string', 'max:140'],
            'content.locales.*.question_card_body' => ['required', 'string', 'max:500'],
            'content.locales.*.question_card_button' => ['required', 'string', 'max:80'],
            'content.locales.*.drawer_kicker' => ['required', 'string', 'max:80'],
            'content.locales.*.drawer_title' => ['required', 'string', 'max:140'],
            'content.locales.*.drawer_body' => ['required', 'string', 'max:500'],
            'content.locales.*.form_name_label' => ['required', 'string', 'max:80'],
            'content.locales.*.form_name_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.form_name_required' => ['required', 'string', 'max:160'],
            'content.locales.*.form_email_label' => ['required', 'string', 'max:80'],
            'content.locales.*.form_email_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.form_email_required' => ['required', 'string', 'max:160'],
            'content.locales.*.form_email_invalid' => ['required', 'string', 'max:160'],
            'content.locales.*.form_phone_label' => ['required', 'string', 'max:80'],
            'content.locales.*.form_phone_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.form_message_label' => ['required', 'string', 'max:80'],
            'content.locales.*.form_message_placeholder' => ['required', 'string', 'max:180'],
            'content.locales.*.form_message_required' => ['required', 'string', 'max:160'],
            'content.locales.*.form_submit_label' => ['required', 'string', 'max:80'],
            'content.locales.*.mail_subject' => ['required', 'string', 'max:160'],
            'content.faqs' => ['required', 'array', 'min:1'],
            'content.faqs.*.id' => ['required', 'string', 'max:100', 'alpha_dash', 'distinct'],
            'content.faqs.*.order' => ['required', 'integer', 'min:0'],
            'content.faqs.*.is_active' => ['required', 'boolean'],
            'content.faqs.*.question.es' => ['required', 'string', 'max:180'],
            'content.faqs.*.question.en' => ['required', 'string', 'max:180'],
            'content.faqs.*.answer.es' => ['required', 'string', 'max:1200'],
            'content.faqs.*.answer.en' => ['required', 'string', 'max:1200'],
        ];
    }
}

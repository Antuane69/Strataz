<?php

namespace App\Http\Requests\Admin;

use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditablePromocionesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('manage-content');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'is_published' => ['required', 'boolean'],
            'content' => ['required', 'array'],
            'content.version' => ['required', 'integer', 'min:1'],
            'content.locales' => ['required', 'array'],
            'content.locales.es' => ['required', 'array'],
            'content.locales.en' => ['required', 'array'],
            'content.locales.*.page_title' => ['required', 'string', 'max:120'],
            'content.locales.*.intro_title' => ['required', 'string', 'max:120'],
            'content.locales.*.intro_body' => ['required', 'string', 'max:1600'],
            'content.locales.*.all_tab_label' => ['required', 'string', 'max:80'],
            'content.locales.*.multiple_options_label' => ['required', 'string', 'max:80'],
            'content.locales.*.default_price_label' => ['required', 'string', 'max:80'],
            'content.locales.*.default_price_heading' => ['required', 'string', 'max:80'],
            'content.locales.*.available_options_heading' => ['required', 'string', 'max:120'],
            'content.locales.*.contact_kicker' => ['required', 'string', 'max:120'],
            'content.locales.*.contact_title' => ['required', 'string', 'max:160'],
            'content.locales.*.contact_body' => ['required', 'string', 'max:800'],
            'content.locales.*.email_cta' => ['required', 'string', 'max:80'],
            'content.locales.*.phone_cta' => ['required', 'string', 'max:80'],
            'content.highlight_items' => ['required', 'array', 'min:1'],
            'content.highlight_items.*.icon' => ['required', Rule::in(['badge-percent', 'palmtree', 'phone'])],
            'content.highlight_items.*.label.es' => ['required', 'string', 'max:120'],
            'content.highlight_items.*.label.en' => ['required', 'string', 'max:120'],
            'content.tabs' => ['required', 'array', 'min:1'],
            'content.tabs.*.key' => ['required', Rule::in(['parejas', 'familias', 'estancias', 'eventos', 'experiencias'])],
            'content.tabs.*.label.es' => ['required', 'string', 'max:80'],
            'content.tabs.*.label.en' => ['required', 'string', 'max:80'],
            'content.contact.email_href' => ['required', 'string', 'max:2048'],
            'content.contact.phone_href' => ['required', 'string', 'max:2048'],
            'content.promotions' => ['required', 'array', 'min:1'],
            'content.promotions.*.id' => ['required', 'string', 'max:120', 'alpha_dash'],
            'content.promotions.*.order' => ['required', 'integer', 'min:0'],
            'content.promotions.*.is_active' => ['required', 'boolean'],
            'content.promotions.*.featured' => ['required', 'boolean'],
            'content.promotions.*.title.es' => ['required', 'string', 'max:180'],
            'content.promotions.*.title.en' => ['required', 'string', 'max:180'],
            'content.promotions.*.eyebrow.es' => ['required', 'string', 'max:120'],
            'content.promotions.*.eyebrow.en' => ['required', 'string', 'max:120'],
            'content.promotions.*.category' => ['required', Rule::in(['parejas', 'familias', 'estancias', 'eventos', 'experiencias'])],
            'content.promotions.*.image.id' => ['required', 'string', 'max:120'],
            'content.promotions.*.image.type' => ['required', Rule::in(['image'])],
            'content.promotions.*.image.src' => ['required', 'string', 'max:2048'],
            'content.promotions.*.image.poster' => ['nullable', 'string', 'max:2048'],
            'content.promotions.*.image.alt.es' => ['required', 'string', 'max:180'],
            'content.promotions.*.image.alt.en' => ['required', 'string', 'max:180'],
            'content.promotions.*.description.es' => ['required', 'string', 'max:3000'],
            'content.promotions.*.description.en' => ['required', 'string', 'max:3000'],
            'content.promotions.*.highlight.es' => ['required', 'string', 'max:180'],
            'content.promotions.*.highlight.en' => ['required', 'string', 'max:180'],
            'content.promotions.*.price_heading.es' => ['required', 'string', 'max:120'],
            'content.promotions.*.price_heading.en' => ['required', 'string', 'max:120'],
            'content.promotions.*.validity.es' => ['nullable', 'string', 'max:240'],
            'content.promotions.*.validity.en' => ['nullable', 'string', 'max:240'],
            'content.promotions.*.icon' => ['required', Rule::in(['beach', 'couple', 'family', 'night', 'event', 'gift'])],
            'content.promotions.*.accent' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'content.promotions.*.tags' => ['required', 'array', 'min:1'],
            'content.promotions.*.tags.*.es' => ['required', 'string', 'max:80'],
            'content.promotions.*.tags.*.en' => ['required', 'string', 'max:80'],
            'content.promotions.*.benefits' => ['required', 'array', 'min:1'],
            'content.promotions.*.benefits.*.es' => ['required', 'string', 'max:180'],
            'content.promotions.*.benefits.*.en' => ['required', 'string', 'max:180'],
            'content.promotions.*.price_groups' => ['required', 'array', 'min:1'],
            'content.promotions.*.price_groups.*.title.es' => ['nullable', 'string', 'max:120'],
            'content.promotions.*.price_groups.*.title.en' => ['nullable', 'string', 'max:120'],
            'content.promotions.*.price_groups.*.description.es' => ['nullable', 'string', 'max:240'],
            'content.promotions.*.price_groups.*.description.en' => ['nullable', 'string', 'max:240'],
            'content.promotions.*.price_groups.*.prices' => ['required', 'array', 'min:1'],
            'content.promotions.*.price_groups.*.prices.*.label.es' => ['required', 'string', 'max:120'],
            'content.promotions.*.price_groups.*.prices.*.label.en' => ['required', 'string', 'max:120'],
            'content.promotions.*.price_groups.*.prices.*.amount' => ['required', 'string', 'max:80'],
            'content.promotions.*.price_groups.*.prices.*.prefix.es' => ['nullable', 'string', 'max:60'],
            'content.promotions.*.price_groups.*.prices.*.prefix.en' => ['nullable', 'string', 'max:60'],
            'content.promotions.*.price_groups.*.prices.*.note.es' => ['nullable', 'string', 'max:120'],
            'content.promotions.*.price_groups.*.prices.*.note.en' => ['nullable', 'string', 'max:120'],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.promotion_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif', 'max:'.MediaUploadLimits::maxFileSizeKilobytes()],
        ];
    }
}

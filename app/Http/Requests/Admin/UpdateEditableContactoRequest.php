<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableContactoRequest extends FormRequest
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
            'content.maps_url' => ['required', 'url', 'max:2048'],
            'content.map_embed_url' => ['required', 'url', 'max:2048'],
            'content.locales' => ['required', 'array'],
            'content.locales.es' => ['required', 'array'],
            'content.locales.en' => ['required', 'array'],
            'content.locales.*.page_title' => ['required', 'string', 'max:120'],
            'content.locales.*.hero_title' => ['required', 'string', 'max:120'],
            'content.locales.*.hero_body' => ['required', 'string', 'max:500'],
            'content.locales.*.contact_info_aria_label' => ['required', 'string', 'max:120'],
            'content.locales.*.map_kicker' => ['required', 'string', 'max:100'],
            'content.locales.*.map_title' => ['required', 'string', 'max:140'],
            'content.locales.*.map_body' => ['required', 'string', 'max:500'],
            'content.locales.*.map_cta_label' => ['required', 'string', 'max:100'],
            'content.locales.*.map_iframe_title' => ['required', 'string', 'max:140'],
            'content.locales.*.arrival_title' => ['required', 'string', 'max:140'],
            'content.locales.*.arrival_body' => ['nullable', 'string', 'max:500'],
            'content.locales.*.airlines_intro' => ['required', 'string', 'max:180'],
            'content.contact_items' => ['required', 'array', 'min:1'],
            'content.contact_items.*.id' => ['required', 'string', 'max:100', 'alpha_dash', 'distinct'],
            'content.contact_items.*.order' => ['required', 'integer', 'min:0'],
            'content.contact_items.*.is_active' => ['required', 'boolean'],
            'content.contact_items.*.icon' => ['required', Rule::in(['mail', 'map-pin', 'phone'])],
            'content.contact_items.*.label.es' => ['required', 'string', 'max:100'],
            'content.contact_items.*.label.en' => ['required', 'string', 'max:100'],
            'content.contact_items.*.lines' => ['required', 'array', 'min:1'],
            'content.contact_items.*.lines.*.es' => ['required', 'string', 'max:180'],
            'content.contact_items.*.lines.*.en' => ['required', 'string', 'max:180'],
            'content.contact_items.*.href' => ['required', 'string', 'max:2048'],
            'content.contact_items.*.external' => ['required', 'boolean'],
            'content.arrival_routes' => ['required', 'array', 'min:1'],
            'content.arrival_routes.*.id' => ['required', 'string', 'max:100', 'alpha_dash', 'distinct'],
            'content.arrival_routes.*.order' => ['required', 'integer', 'min:0'],
            'content.arrival_routes.*.is_active' => ['required', 'boolean'],
            'content.arrival_routes.*.icon' => ['required', Rule::in(['bus', 'car', 'plane'])],
            'content.arrival_routes.*.eyebrow.es' => ['required', 'string', 'max:100'],
            'content.arrival_routes.*.eyebrow.en' => ['required', 'string', 'max:100'],
            'content.arrival_routes.*.title.es' => ['required', 'string', 'max:180'],
            'content.arrival_routes.*.title.en' => ['required', 'string', 'max:180'],
            'content.arrival_routes.*.description.es' => ['nullable', 'string', 'max:1200'],
            'content.arrival_routes.*.description.en' => ['nullable', 'string', 'max:1200'],
            'content.arrival_routes.*.footer.es' => ['nullable', 'string', 'max:1200'],
            'content.arrival_routes.*.footer.en' => ['nullable', 'string', 'max:1200'],
            'content.arrival_routes.*.companies' => ['present', 'array'],
            'content.arrival_routes.*.companies.*.es' => ['required', 'string', 'max:180'],
            'content.arrival_routes.*.companies.*.en' => ['required', 'string', 'max:180'],
            'content.arrival_routes.*.steps' => ['present', 'array'],
            'content.arrival_routes.*.steps.*.es' => ['required', 'string', 'max:1200'],
            'content.arrival_routes.*.steps.*.en' => ['required', 'string', 'max:1200'],
        ];
    }
}

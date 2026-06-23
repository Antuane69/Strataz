<?php

namespace App\Http\Requests\Admin;

use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableGaleriaRequest extends FormRequest
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
            'content.locales' => ['required', 'array'],
            'content.locales.es' => ['required', 'array'],
            'content.locales.en' => ['required', 'array'],
            'content.locales.*.page_title' => ['required', 'string', 'max:120'],
            'content.locales.*.intro_title' => ['required', 'string', 'max:120'],
            'content.locales.*.intro_body' => ['required', 'string', 'max:1200'],
            'content.locales.*.toolbar_title' => ['required', 'string', 'max:160'],
            'content.locales.*.photo_singular' => ['required', 'string', 'max:40'],
            'content.locales.*.photo_plural' => ['required', 'string', 'max:40'],
            'content.locales.*.all_tab_label' => ['required', 'string', 'max:80'],
            'content.tabs' => ['required', 'array', 'min:1'],
            'content.tabs.*.key' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.tabs.*.label.es' => ['required', 'string', 'max:120'],
            'content.tabs.*.label.en' => ['required', 'string', 'max:120'],
            'content.images' => ['required', 'array', 'min:1'],
            'content.images.*.id' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.images.*.order' => ['required', 'integer', 'min:0'],
            'content.images.*.is_active' => ['required', 'boolean'],
            'content.images.*.image' => ['required', 'array'],
            'content.images.*.image.id' => ['required', 'string', 'max:120'],
            'content.images.*.image.type' => ['required', Rule::in(['image'])],
            'content.images.*.image.src' => ['required', 'string', 'max:2048'],
            'content.images.*.image.poster' => ['nullable', 'string', 'max:2048'],
            'content.images.*.image.alt.es' => ['required', 'string', 'max:180'],
            'content.images.*.image.alt.en' => ['required', 'string', 'max:180'],
            'content.images.*.title.es' => ['required', 'string', 'max:160'],
            'content.images.*.title.en' => ['required', 'string', 'max:160'],
            'content.images.*.category' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.images.*.variant' => ['required', Rule::in(['normal', 'wide', 'tall', 'feature'])],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.gallery_image_id' => ['required_with:media_uploads.*.file', 'string', 'max:100'],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif', 'max:'.MediaUploadLimits::maxFileSizeKilobytes()],
        ];
    }
}

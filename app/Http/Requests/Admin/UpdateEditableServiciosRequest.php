<?php

namespace App\Http\Requests\Admin;

use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableServiciosRequest extends FormRequest
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
            'content.locales.*.intro_body' => ['required', 'string', 'max:1200'],
            'content.trust_items' => ['required', 'array', 'min:1'],
            'content.trust_items.*.icon' => ['required', Rule::in(['shield', 'pool', 'shop'])],
            'content.trust_items.*.label.es' => ['required', 'string', 'max:120'],
            'content.trust_items.*.label.en' => ['required', 'string', 'max:120'],
            'content.services' => ['required', 'array', 'min:1'],
            'content.services.*.id' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.services.*.order' => ['required', 'integer', 'min:0'],
            'content.services.*.is_active' => ['required', 'boolean'],
            'content.services.*.name.es' => ['required', 'string', 'max:160'],
            'content.services.*.name.en' => ['required', 'string', 'max:160'],
            'content.services.*.eyebrow.es' => ['required', 'string', 'max:120'],
            'content.services.*.eyebrow.en' => ['required', 'string', 'max:120'],
            'content.services.*.description.es' => ['required', 'string', 'max:3000'],
            'content.services.*.description.en' => ['required', 'string', 'max:3000'],
            'content.services.*.icon' => ['required', Rule::in(['pool', 'parking', 'shop', 'beach', 'sports', 'food', 'fish', 'sparks', 'boda', 'consierge'])],
            'content.services.*.accent' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'content.services.*.tags' => ['required', 'array', 'min:1'],
            'content.services.*.tags.*.es' => ['required', 'string', 'max:80'],
            'content.services.*.tags.*.en' => ['required', 'string', 'max:80'],
            'content.services.*.media' => ['required', 'array', 'min:1'],
            'content.services.*.media.*.id' => ['required', 'string', 'max:120'],
            'content.services.*.media.*.type' => ['required', Rule::in(['image', 'video'])],
            'content.services.*.media.*.src' => ['required', 'string', 'max:2048'],
            'content.services.*.media.*.poster' => ['nullable', 'string', 'max:2048'],
            'content.services.*.media.*.alt.es' => ['required', 'string', 'max:180'],
            'content.services.*.media.*.alt.en' => ['required', 'string', 'max:180'],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.service_id' => ['required_with:media_uploads.*.file', 'string', 'max:100'],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,mov,webm', 'max:'.MediaUploadLimits::maxFileSizeKilobytes()],
        ];
    }
}

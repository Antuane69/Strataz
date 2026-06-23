<?php

namespace App\Http\Requests\Admin;

use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableRecomendacionesRequest extends FormRequest
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
            'content.locales.*.intro_body' => ['required', 'string', 'max:1500'],
            'content.recommendations' => ['required', 'array', 'min:1'],
            'content.recommendations.*.id' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.recommendations.*.order' => ['required', 'integer', 'min:0'],
            'content.recommendations.*.is_active' => ['required', 'boolean'],
            'content.recommendations.*.title.es' => ['required', 'string', 'max:180'],
            'content.recommendations.*.title.en' => ['required', 'string', 'max:180'],
            'content.recommendations.*.eyebrow.es' => ['required', 'string', 'max:120'],
            'content.recommendations.*.eyebrow.en' => ['required', 'string', 'max:120'],
            'content.recommendations.*.image' => ['required', 'array'],
            'content.recommendations.*.image.id' => ['required', 'string', 'max:120'],
            'content.recommendations.*.image.type' => ['required', Rule::in(['image'])],
            'content.recommendations.*.image.src' => ['required', 'string', 'max:2048'],
            'content.recommendations.*.image.poster' => ['nullable', 'string', 'max:2048'],
            'content.recommendations.*.image.alt.es' => ['required', 'string', 'max:180'],
            'content.recommendations.*.image.alt.en' => ['required', 'string', 'max:180'],
            'content.recommendations.*.distance.es' => ['required', 'string', 'max:120'],
            'content.recommendations.*.distance.en' => ['required', 'string', 'max:120'],
            'content.recommendations.*.duration.es' => ['required', 'string', 'max:120'],
            'content.recommendations.*.duration.en' => ['required', 'string', 'max:120'],
            'content.recommendations.*.intro.es' => ['required', 'string', 'max:2000'],
            'content.recommendations.*.intro.en' => ['required', 'string', 'max:2000'],
            'content.recommendations.*.sections' => ['required', 'array', 'min:1'],
            'content.recommendations.*.sections.*.title.es' => ['required', 'string', 'max:160'],
            'content.recommendations.*.sections.*.title.en' => ['required', 'string', 'max:160'],
            'content.recommendations.*.sections.*.paragraphs' => ['nullable', 'array'],
            'content.recommendations.*.sections.*.paragraphs.*.es' => ['required', 'string', 'max:1200'],
            'content.recommendations.*.sections.*.paragraphs.*.en' => ['required', 'string', 'max:1200'],
            'content.recommendations.*.sections.*.bullets' => ['nullable', 'array'],
            'content.recommendations.*.sections.*.bullets.*.es' => ['required', 'string', 'max:500'],
            'content.recommendations.*.sections.*.bullets.*.en' => ['required', 'string', 'max:500'],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.recommendation_id' => ['required_with:media_uploads.*.file', 'string', 'max:100'],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif', 'max:'.MediaUploadLimits::maxFileSizeKilobytes()],
        ];
    }
}

<?php

namespace App\Http\Requests\Admin;

use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableBodasRequest extends FormRequest
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
            'content.locales.*.hero_title' => ['required', 'string', 'max:180'],
            'content.locales.*.hero_subtitle' => ['required', 'string', 'max:180'],
            'content.locales.*.hero_description' => ['required', 'string', 'max:3000'],
            'content.locales.*.reserve_cta' => ['required', 'string', 'max:80'],
            'content.locales.*.drawer_kicker' => ['required', 'string', 'max:120'],
            'content.locales.*.drawer_title' => ['required', 'string', 'max:160'],
            'content.locales.*.drawer_description' => ['required', 'string', 'max:500'],
            'content.locales.*.name_label' => ['required', 'string', 'max:80'],
            'content.locales.*.name_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.email_label' => ['required', 'string', 'max:80'],
            'content.locales.*.email_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.phone_label' => ['required', 'string', 'max:80'],
            'content.locales.*.phone_placeholder' => ['required', 'string', 'max:120'],
            'content.locales.*.message_label' => ['required', 'string', 'max:80'],
            'content.locales.*.message_placeholder' => ['required', 'string', 'max:240'],
            'content.locales.*.submit_label' => ['required', 'string', 'max:80'],
            'content.background_media' => ['required', 'array'],
            'content.background_media.id' => ['required', 'string', 'max:120'],
            'content.background_media.type' => ['required', Rule::in(['image', 'video'])],
            'content.background_media.src' => ['required', 'string', 'max:2048'],
            'content.background_media.poster' => ['nullable', 'string', 'max:2048'],
            'content.background_media.alt.es' => ['required', 'string', 'max:180'],
            'content.background_media.alt.en' => ['required', 'string', 'max:180'],
            'content.background_media.label.es' => ['required', 'string', 'max:120'],
            'content.background_media.label.en' => ['required', 'string', 'max:120'],
            'content.highlights' => ['required', 'array', 'min:1'],
            'content.highlights.*.icon' => ['required', Rule::in(['calendar-heart', 'message-circle'])],
            'content.highlights.*.label.es' => ['required', 'string', 'max:120'],
            'content.highlights.*.label.en' => ['required', 'string', 'max:120'],
            'content.media' => ['required', 'array', 'min:1'],
            'content.media.*.id' => ['required', 'string', 'max:120'],
            'content.media.*.type' => ['required', Rule::in(['image', 'video'])],
            'content.media.*.src' => ['required', 'string', 'max:2048'],
            'content.media.*.poster' => ['nullable', 'string', 'max:2048'],
            'content.media.*.alt.es' => ['required', 'string', 'max:180'],
            'content.media.*.alt.en' => ['required', 'string', 'max:180'],
            'content.media.*.label.es' => ['required', 'string', 'max:120'],
            'content.media.*.label.en' => ['required', 'string', 'max:120'],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.target' => ['required_with:media_uploads.*.file', Rule::in(['background', 'media'])],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,mov,webm', 'max:'.MediaUploadLimits::maxFileSizeKilobytes()],
        ];
    }
}

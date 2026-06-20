<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditableHabitacionesRequest extends FormRequest
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
            'content.locales.*.intro_body' => ['required', 'string', 'max:2000'],
            'content.locales.*.card_cta' => ['required', 'string', 'max:80'],
            // 'content.locales.*.details_label' => ['required', 'string', 'max:80'],
            // 'content.locales.*.main_amenities_label' => ['required', 'string', 'max:120'],
            'content.locales.*.image_preview_label' => ['required', 'string', 'max:80'],
            'content.locales.*.feature_heading' => ['required', 'string', 'max:120'],
            'content.locales.*.room_amenities_title' => ['required', 'string', 'max:120'],
            'content.locales.*.room_amenities_body' => ['required', 'string', 'max:400'],
            'content.locales.*.request_amenities_title' => ['required', 'string', 'max:120'],
            'content.locales.*.request_amenities_body' => ['required', 'string', 'max:400'],
            'content.locales.*.policies_title' => ['required', 'string', 'max:120'],
            'content.locales.*.policies_subtitle' => ['required', 'string', 'max:120'],
            'content.locales.*.schedule_policy_title' => ['required', 'string', 'max:80'],
            'content.locales.*.payment_policy_title' => ['required', 'string', 'max:80'],
            'content.locales.*.cancellation_policy_title' => ['required', 'string', 'max:80'],
            'content.locales.*.no_show_policy_title' => ['required', 'string', 'max:80'],
            'content.locales.*.extra_guest_policy_title' => ['required', 'string', 'max:80'],
            'content.locales.*.arrival_weeks_label' => ['required', 'string', 'max:80'],
            'content.locales.*.refund_label' => ['required', 'string', 'max:80'],
            'content.locales.*.credit_label' => ['required', 'string', 'max:80'],
            'content.locales.*.check_in_label' => ['required', 'string', 'max:80'],
            'content.locales.*.check_out_label' => ['required', 'string', 'max:80'],
            'content.locales.*.reserve_cta' => ['required', 'string', 'max:80'],
            'content.locales.*.call_cta' => ['required', 'string', 'max:80'],
            'content.locales.*.bed_singular' => ['required', 'string', 'max:40'],
            'content.locales.*.bed_plural' => ['required', 'string', 'max:40'],
            'content.locales.*.guest_singular' => ['required', 'string', 'max:40'],
            'content.locales.*.guest_plural' => ['required', 'string', 'max:40'],
            'content.locales.*.guest_capacity_prefix' => ['required', 'string', 'max:40'],
            'content.hotel_info' => ['required', 'array'],
            'content.hotel_info.check_in' => ['required', 'string', 'max:40'],
            'content.hotel_info.check_out' => ['required', 'string', 'max:40'],
            'content.hotel_info.payment_policy.es' => ['required', 'string', 'max:3000'],
            'content.hotel_info.payment_policy.en' => ['required', 'string', 'max:3000'],
            'content.hotel_info.cancellation_policy.description.es' => ['required', 'string', 'max:3000'],
            'content.hotel_info.cancellation_policy.description.en' => ['required', 'string', 'max:3000'],
            'content.hotel_info.cancellation_policy.description_end.es' => ['required', 'string', 'max:2000'],
            'content.hotel_info.cancellation_policy.description_end.en' => ['required', 'string', 'max:2000'],
            'content.hotel_info.cancellation_policy.rows' => ['required', 'array', 'min:1'],
            'content.hotel_info.cancellation_policy.rows.*.weeks_before_arrival.es' => ['required', 'string', 'max:120'],
            'content.hotel_info.cancellation_policy.rows.*.weeks_before_arrival.en' => ['required', 'string', 'max:120'],
            'content.hotel_info.cancellation_policy.rows.*.refund' => ['required', 'string', 'max:60'],
            'content.hotel_info.cancellation_policy.rows.*.credit' => ['required', 'string', 'max:60'],
            'content.hotel_info.no_show_policy.es' => ['required', 'string', 'max:2000'],
            'content.hotel_info.no_show_policy.en' => ['required', 'string', 'max:2000'],
            'content.hotel_info.extra_guest_policy.es' => ['required', 'string', 'max:2000'],
            'content.hotel_info.extra_guest_policy.en' => ['required', 'string', 'max:2000'],
            'content.rooms' => ['required', 'array', 'min:1'],
            'content.rooms.*.id' => ['required', 'string', 'max:100', 'alpha_dash'],
            'content.rooms.*.order' => ['required', 'integer', 'min:0'],
            'content.rooms.*.is_active' => ['required', 'boolean'],
            'content.rooms.*.name.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.name.en' => ['required', 'string', 'max:120'],
            // 'content.rooms.*.eyebrow.es' => ['nullable', 'string', 'max:120'],
            // 'content.rooms.*.eyebrow.en' => ['nullable', 'string', 'max:120'],
            'content.rooms.*.short_description.es' => ['required', 'string', 'max:240'],
            'content.rooms.*.short_description.en' => ['required', 'string', 'max:240'],
            'content.rooms.*.description.es' => ['required', 'string', 'max:1600'],
            'content.rooms.*.description.en' => ['required', 'string', 'max:1600'],
            'content.rooms.*.capacity.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.capacity.en' => ['required', 'string', 'max:120'],
            'content.rooms.*.bed.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.bed.en' => ['required', 'string', 'max:120'],
            'content.rooms.*.size.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.size.en' => ['required', 'string', 'max:120'],
            'content.rooms.*.image_stats.beds' => ['required', 'integer', 'min:0', 'max:20'],
            'content.rooms.*.image_stats.max_guests' => ['required', 'integer', 'min:1', 'max:40'],
            'content.rooms.*.media' => ['required', 'array', 'min:1'],
            'content.rooms.*.media.*.id' => ['required', 'string', 'max:120'],
            'content.rooms.*.media.*.type' => ['required', Rule::in(['image', 'video'])],
            'content.rooms.*.media.*.src' => ['required', 'string', 'max:2048'],
            'content.rooms.*.media.*.poster' => ['nullable', 'string', 'max:2048'],
            'content.rooms.*.media.*.alt.es' => ['required', 'string', 'max:180'],
            'content.rooms.*.media.*.alt.en' => ['required', 'string', 'max:180'],
            'content.rooms.*.highlights' => ['required', 'array', 'min:1'],
            'content.rooms.*.highlights.*.es' => ['required', 'string', 'max:160'],
            'content.rooms.*.highlights.*.en' => ['required', 'string', 'max:160'],
            'content.rooms.*.amenities' => ['required', 'array', 'min:1'],
            'content.rooms.*.amenities.*.type' => ['required', 'string', 'max:60'],
            'content.rooms.*.amenities.*.label.es' => ['required', 'string', 'max:100'],
            'content.rooms.*.amenities.*.label.en' => ['required', 'string', 'max:100'],
            'content.rooms.*.room_amenities' => ['required', 'array', 'min:1'],
            'content.rooms.*.room_amenities.*.type' => ['required', 'string', 'max:60'],
            'content.rooms.*.room_amenities.*.name.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.room_amenities.*.name.en' => ['required', 'string', 'max:120'],
            'content.rooms.*.room_amenities.*.description.es' => ['required', 'string', 'max:240'],
            'content.rooms.*.room_amenities.*.description.en' => ['required', 'string', 'max:240'],
            'content.rooms.*.request_amenities' => ['nullable', 'array'],
            'content.rooms.*.request_amenities.*.type' => ['required', 'string', 'max:60'],
            'content.rooms.*.request_amenities.*.name.es' => ['required', 'string', 'max:120'],
            'content.rooms.*.request_amenities.*.name.en' => ['required', 'string', 'max:120'],
            'content.rooms.*.request_amenities.*.description.es' => ['required', 'string', 'max:240'],
            'content.rooms.*.request_amenities.*.description.en' => ['required', 'string', 'max:240'],
            'media_uploads' => ['nullable', 'array'],
            'media_uploads.*.room_id' => ['required_with:media_uploads.*.file', 'string', 'max:100'],
            'media_uploads.*.media_id' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.name' => ['required_with:media_uploads.*.file', 'string', 'max:120'],
            'media_uploads.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,mov,webm', 'max:24576'],
        ];
    }
}

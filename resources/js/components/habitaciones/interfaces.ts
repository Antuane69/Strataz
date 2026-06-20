import type { EditableMedia, LocalizedString } from '@/types';

export type HabitacionAmenity =
    | 'capacity'
    | 'bed'
    | 'ac'
    | 'tv'
    | 'wifi'
    | 'ocean'
    | 'bath'
    | 'coffee'
    | 'terrace';

export type HabitacionRoomAmenityIcon =
    | 'ac'
    | 'smart-tv'
    | 'wifi'
    | 'safe'
    | 'fan'
    | 'private-bath'
    | 'cleaning'
    | 'towels'
    | 'bath-kit'
    | 'terrace'
    | 'minibar'
    | 'coffee'
    | 'iron'
    | 'pool-towels'
    | 'hair-dryer'
    | 'makeup-mirror'
    | 'stove'
    | 'kitchenware';

export type HabitacionRoomAmenity = {
    type: HabitacionRoomAmenityIcon;
    name: string;
    description: string;
};

export type HabitacionImage = {
    id?: string;
    type?: 'image' | 'video';
    src: string;
    poster?: string | null;
    alt: string;
};

export type HabitacionImageStats = {
    beds: number;
    maxGuests: number;
};

export type EditableHabitacionImageStats = {
    beds: number;
    max_guests: number;
};

export type HotelCancellationPolicyRow = {
    weeksBeforeArrival: string;
    refund: string;
    credit: string;
};

export type HotelCancellationPolicy = {
    description: string;
    description_end: string;
    rows: HotelCancellationPolicyRow[];
};

export type HotelInfo = {
    checkIn: string;
    checkOut: string;
    paymentPolicy: string;
    cancellationPolicy: HotelCancellationPolicy;
    noShowPolicy: string;
    extraGuestPolicy: string;
};

export type Habitacion = {
    id: string;
    name: string;
    eyebrow: string;
    shortDescription: string;
    description: string;
    capacity: string;
    bed: string;
    size: string;
    imageStats: HabitacionImageStats;
    images: HabitacionImage[];
    highlights: string[];
    roomAmenities: HabitacionRoomAmenity[];
    requestAmenities?: HabitacionRoomAmenity[];
    amenities: {
        type: HabitacionAmenity;
        label: string;
    }[];
};

export type HabitacionesPageText = {
    page_title: string;
    intro_title: string;
    intro_body: string;
    card_cta: string;
    details_label: string;
    main_amenities_label: string;
    image_preview_label: string;
    feature_heading: string;
    room_amenities_title: string;
    room_amenities_body: string;
    request_amenities_title: string;
    request_amenities_body: string;
    policies_title: string;
    policies_subtitle: string;
    schedule_policy_title: string;
    payment_policy_title: string;
    cancellation_policy_title: string;
    no_show_policy_title: string;
    extra_guest_policy_title: string;
    arrival_weeks_label: string;
    refund_label: string;
    credit_label: string;
    check_in_label: string;
    check_out_label: string;
    reserve_cta: string;
    call_cta: string;
    bed_singular: string;
    bed_plural: string;
    guest_singular: string;
    guest_plural: string;
    guest_capacity_prefix: string;
};

export type EditableCancellationPolicyRow = {
    weeks_before_arrival: LocalizedString;
    refund: string;
    credit: string;
};

export type EditableHabitacionAmenity = {
    type: HabitacionAmenity;
    label: LocalizedString;
};

export type EditableHabitacionRoomAmenity = {
    type: HabitacionRoomAmenityIcon;
    name: LocalizedString;
    description: LocalizedString;
};

export type EditableHabitacion = {
    id: string;
    order: number;
    is_active: boolean;
    name: LocalizedString;
    eyebrow: LocalizedString;
    short_description: LocalizedString;
    description: LocalizedString;
    capacity: LocalizedString;
    bed: LocalizedString;
    size: LocalizedString;
    image_stats: EditableHabitacionImageStats;
    media: EditableMedia[];
    highlights: LocalizedString[];
    room_amenities: EditableHabitacionRoomAmenity[];
    request_amenities?: EditableHabitacionRoomAmenity[];
    amenities: EditableHabitacionAmenity[];
};

export type HabitacionesPageContent = {
    version: number;
    locales: Record<'es' | 'en', HabitacionesPageText>;
    hotel_info: {
        check_in: string;
        check_out: string;
        payment_policy: LocalizedString;
        cancellation_policy: {
            description: LocalizedString;
            description_end: LocalizedString;
            rows: EditableCancellationPolicyRow[];
        };
        no_show_policy: LocalizedString;
        extra_guest_policy: LocalizedString;
    };
    rooms: EditableHabitacion[];
};

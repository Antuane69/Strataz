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

export type HabitacionImage = {
    src: string;
    alt: string;
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
    images: HabitacionImage[];
    highlights: string[];
    included: string[];
    amenities: {
        type: HabitacionAmenity;
        label: string;
    }[];
};

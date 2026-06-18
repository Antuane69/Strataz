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
    src: string;
    alt: string;
};

export type HabitacionImageStats = {
    beds: number;
    maxGuests: number;
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

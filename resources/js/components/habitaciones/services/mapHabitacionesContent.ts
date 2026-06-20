import { localizedText, normalizeLocale } from '@/lib/editable-content';
import type { LocaleCode } from '@/types';
import type {
    Habitacion,
    HabitacionesPageContent,
    HabitacionesPageText,
    HotelInfo,
} from '../interfaces';
import {
    habitaciones as fallbackHabitaciones,
    hotelInfo as fallbackHotelInfo,
} from './habitacionesMock';

type MappedHabitacionesContent = {
    locale: LocaleCode;
    text: HabitacionesPageText;
    habitaciones: Habitacion[];
    hotelInfo: HotelInfo;
};

const fallbackText: HabitacionesPageText = {
    page_title: 'Habitaciones',
    intro_title: 'Habitaciones',
    intro_body:
        'El hotel Meson de Mita cuenta con 25 comodas habitaciones dentro de un ambiente de relax rodeado de jardines con alberca junto al mar.',
    card_cta: 'Ver detalles +',
    details_label: 'Ver detalles',
    main_amenities_label: 'Amenidades principales',
    image_preview_label: 'Ver imagen',
    feature_heading: 'Caracteristicas',
    room_amenities_title: 'Amenidades en tu habitacion',
    room_amenities_body:
        'Todo lo que necesitas para una estancia comoda y placentera.',
    request_amenities_title: 'Accesorios bajo solicitud',
    request_amenities_body:
        'Sujetos a disponibilidad, solicitalos en recepcion.',
    policies_title: 'Politicas de reservacion',
    policies_subtitle: 'Todo lo necesario para tu estancia',
    schedule_policy_title: 'Horarios',
    payment_policy_title: 'Politica de pago',
    cancellation_policy_title: 'Politica de cancelacion',
    no_show_policy_title: 'Politica de no show',
    extra_guest_policy_title: 'Personas extra',
    arrival_weeks_label: 'Semanas antes de llegada',
    refund_label: 'Reembolso',
    credit_label: 'Credito',
    check_in_label: 'Check-in',
    check_out_label: 'Check-out',
    reserve_cta: 'Reservar',
    call_cta: 'Llamar al hotel',
    bed_singular: 'cama',
    bed_plural: 'camas',
    guest_singular: 'huesped',
    guest_plural: 'huespedes',
    guest_capacity_prefix: 'Hasta',
};

export function mapHabitacionesContent(
    content?: HabitacionesPageContent | null,
    locale?: string | null,
): MappedHabitacionesContent {
    const activeLocale = normalizeLocale(locale);

    if (!content) {
        return {
            locale: activeLocale,
            text: fallbackText,
            habitaciones: fallbackHabitaciones,
            hotelInfo: fallbackHotelInfo,
        };
    }

    return {
        locale: activeLocale,
        text:
            content.locales[activeLocale] ?? content.locales.es ?? fallbackText,
        habitaciones: content.rooms
            .filter((room) => room.is_active)
            .sort((first, second) => first.order - second.order)
            .map(
                (room): Habitacion => ({
                    id: room.id,
                    name: localizedText(room.name, activeLocale),
                    eyebrow: localizedText(room.eyebrow, activeLocale),
                    shortDescription: localizedText(
                        room.short_description,
                        activeLocale,
                    ),
                    description: localizedText(room.description, activeLocale),
                    capacity: localizedText(room.capacity, activeLocale),
                    bed: localizedText(room.bed, activeLocale),
                    size: localizedText(room.size, activeLocale),
                    imageStats: {
                        beds: room.image_stats.beds,
                        maxGuests: room.image_stats.max_guests,
                    },
                    images: room.media.map((media) => ({
                        id: media.id,
                        type: media.type,
                        src: media.src,
                        poster: media.poster,
                        alt: localizedText(media.alt, activeLocale),
                    })),
                    highlights: room.highlights.map((highlight) =>
                        localizedText(highlight, activeLocale),
                    ),
                    roomAmenities: room.room_amenities.map((amenity) => ({
                        type: amenity.type,
                        name: localizedText(amenity.name, activeLocale),
                        description: localizedText(
                            amenity.description,
                            activeLocale,
                        ),
                    })),
                    requestAmenities: room.request_amenities?.map(
                        (amenity) => ({
                            type: amenity.type,
                            name: localizedText(amenity.name, activeLocale),
                            description: localizedText(
                                amenity.description,
                                activeLocale,
                            ),
                        }),
                    ),
                    amenities: room.amenities.map((amenity) => ({
                        type: amenity.type,
                        label: localizedText(amenity.label, activeLocale),
                    })),
                }),
            ),
        hotelInfo: {
            checkIn: content.hotel_info.check_in,
            checkOut: content.hotel_info.check_out,
            paymentPolicy: localizedText(
                content.hotel_info.payment_policy,
                activeLocale,
            ),
            cancellationPolicy: {
                description: localizedText(
                    content.hotel_info.cancellation_policy.description,
                    activeLocale,
                ),
                description_end: localizedText(
                    content.hotel_info.cancellation_policy.description_end,
                    activeLocale,
                ),
                rows: content.hotel_info.cancellation_policy.rows.map(
                    (row) => ({
                        weeksBeforeArrival: localizedText(
                            row.weeks_before_arrival,
                            activeLocale,
                        ),
                        refund: row.refund,
                        credit: row.credit,
                    }),
                ),
            },
            noShowPolicy: localizedText(
                content.hotel_info.no_show_policy,
                activeLocale,
            ),
            extraGuestPolicy: localizedText(
                content.hotel_info.extra_guest_policy,
                activeLocale,
            ),
        },
    };
}

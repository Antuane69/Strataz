import { Button, DatePicker, Drawer, Select } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CalendarDays, ChevronRight, UsersRound } from 'lucide-react';
import { useState } from 'react';

const bookingBaseUrl =
    'https://www.booking.com/searchresults.html?ss=Hotel+Meson+de+Mita%2C+Punta+de+Mita%2C+Nayarit%2C+Mexico';

type BookingFormProps = {
    layout: 'desktop' | 'drawer';
    onSubmit?: () => void;
};

const today = dayjs().startOf('day');

const guestOptions = [
    { value: '1', label: '1 Adulto' },
    { value: '2', label: '2 Adultos' },
    { value: '3', label: '3 Adultos' },
    { value: '4', label: '4 Adultos' },
];

function BookingForm({ layout, onSubmit }: BookingFormProps) {
    const [arrival, setArrival] = useState<Dayjs>(() => today.add(1, 'day'));
    const [departure, setDeparture] = useState<Dayjs>(() =>
        today.add(4, 'day'),
    );
    const [guests, setGuests] = useState('2');

    const minimumDeparture = arrival.add(1, 'day').startOf('day');

    const handleArrivalChange = (value: Dayjs | null) => {
        if (!value) {
            return;
        }

        setArrival(value);

        if (!departure.isAfter(value, 'day')) {
            setDeparture(value.add(1, 'day'));
        }
    };

    const handleSubmit = () => {
        const bookingUrl = new URL(bookingBaseUrl);

        bookingUrl.searchParams.set('checkin', arrival.format('YYYY-MM-DD'));
        bookingUrl.searchParams.set(
            'checkout',
            departure.format('YYYY-MM-DD'),
        );
        bookingUrl.searchParams.set('group_adults', guests);
        bookingUrl.searchParams.set('no_rooms', '1');
        bookingUrl.searchParams.set('group_children', '0');

        onSubmit?.();
        window.location.assign(bookingUrl.toString());
    };

    return (
        <form
            className={`public-booking-form public-booking-form-${layout}`}
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}
        >
            <label className="public-booking-field">
                <span>Llegada</span>
                <DatePicker
                    value={arrival}
                    format="DD/MM/YYYY"
                    allowClear={false}
                    suffixIcon={<CalendarDays size={17} />}
                    disabledDate={(current) =>
                        Boolean(current && current < today)
                    }
                    onChange={handleArrivalChange}
                    popupClassName="public-booking-datepicker-popup"
                    className="public-booking-picker"
                />
            </label>

            <label className="public-booking-field">
                <span>Salida</span>
                <DatePicker
                    value={departure}
                    format="DD/MM/YYYY"
                    allowClear={false}
                    suffixIcon={<CalendarDays size={17} />}
                    disabledDate={(current) =>
                        Boolean(current && current < minimumDeparture)
                    }
                    onChange={(value) => {
                        if (value) {
                            setDeparture(value);
                        }
                    }}
                    popupClassName="public-booking-datepicker-popup"
                    className="public-booking-picker"
                />
            </label>

            <label className="public-booking-field">
                <span>Huéspedes</span>
                <Select
                    value={guests}
                    options={guestOptions}
                    onChange={setGuests}
                    suffixIcon={<UsersRound size={17} />}
                    popupClassName="public-booking-select-popup"
                    className="public-booking-select"
                />
            </label>

            <Button
                htmlType="submit"
                type={layout === 'drawer' ? 'primary' : 'default'}
                size="large"
                className="public-booking-submit"
                icon={<ChevronRight size={17} />}
                iconPosition="end"
            >
                Reservar
            </Button>
        </form>
    );
}

export default function PublicBookingBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <div className="public-booking-desktop" aria-label="Reservas">
                <BookingForm layout="desktop" />
            </div>

            <button
                type="button"
                className="public-booking-mobile-trigger"
                onClick={() => setIsDrawerOpen(true)}
            >
                <span>
                    <CalendarDays size={18} />
                    Reserva tu estancia
                </span>
                <strong>Reservar</strong>
            </button>

            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                placement="bottom"
                height="auto"
                title={null}
                className="public-booking-drawer"
                destroyOnHidden
            >
                <div className="public-booking-drawer-intro">
                    <p>Reserva</p>
                    <h2>Consulta disponibilidad</h2>
                    <span>
                        Elige fechas y huéspedes para continuar a la página de
                        reserva.
                    </span>
                </div>

                <BookingForm
                    layout="drawer"
                    onSubmit={() => setIsDrawerOpen(false)}
                />
            </Drawer>
        </>
    );
}

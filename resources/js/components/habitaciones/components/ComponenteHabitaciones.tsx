import { BedDouble, UsersRound } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { Habitacion, HabitacionesPageText } from "../interfaces";
import { IconosAmenidades } from '../services/constantes';
import ComponentesHabitacionesMedia from './ComponenteHabitacionesMedia';

interface ComponenteHabitacionesInterface {
  habitacion: Habitacion;
  onSelect: (habitacion: Habitacion) => void;
  text: HabitacionesPageText;
}

interface AmenityIconInterface {
  amenity: Habitacion['amenities'][number];
}

export default function ComponenteHabitaciones({ habitacion, onSelect, text }: ComponenteHabitacionesInterface) {
  function AmenityIcon({amenity}: AmenityIconInterface) {
    const Icon = IconosAmenidades[amenity.type];

    return (
      <span className="habitacion-amenity">
        <Icon size={17} />
        <span>{amenity.label}</span>
      </span>
    );
  }

  function formatBedCount(count: number, text: HabitacionesPageText) {
    return `${count} ${count === 1 ? text.bed_singular : text.bed_plural}`;
  }

  function formatGuestCapacity(count: number, text: HabitacionesPageText) {
    return `${text.guest_capacity_prefix} ${count} ${
      count === 1 ? text.guest_singular : text.guest_plural
    }`;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(habitacion);
    }
  };

  const bedCountLabel = formatBedCount(habitacion.imageStats.beds, text);
  const guestCapacityLabel = formatGuestCapacity(habitacion.imageStats.maxGuests, text);
  const coverMedia = habitacion.images[0];

  return (
    <article
      className="habitacion-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(habitacion)}
      onKeyDown={handleKeyDown}
      aria-label={`${text.details_label} ${habitacion.name}. ${bedCountLabel}. ${guestCapacityLabel}.`}
    >
      <div className="habitacion-card-image-wrap">
        <ComponentesHabitacionesMedia media={coverMedia} className="habitacion-card-image"/>
        <div className="habitacion-card-image-stats" aria-hidden="true">
          <span className="habitacion-card-image-stat">
            <BedDouble size={16} />
            <span>{bedCountLabel}</span>
          </span>
          <span className="habitacion-card-image-stat">
            <UsersRound size={16} />
            <span>{guestCapacityLabel}</span>
          </span>
        </div>
      </div>

      <div className="habitacion-card-body">
        <h2>{habitacion.name}</h2>
        <p>{habitacion.shortDescription}</p>

        <div className="habitacion-amenities" aria-label={text.main_amenities_label}>
          {habitacion.amenities.map((amenity) => (
            <AmenityIcon key={`${habitacion.id}-${amenity.type}`} amenity={amenity} />
          ))}
        </div>

        <span className="habitacion-card-link">{text.card_cta}</span>
      </div>
    </article>
  );
}
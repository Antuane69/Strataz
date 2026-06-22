import { Info } from "lucide-react";
import type { Habitacion, HabitacionesPageText } from "../interfaces";
import { IconosAmenidadesHabitaciones } from "../services/constantes";

interface ComponenteAmenidadesHabitacionInterface {
  habitacion: Habitacion;
  text: HabitacionesPageText;
}

interface RoomAmenityCardInterface {
  amenity: Habitacion['roomAmenities'][number];
  compact?: boolean;
}

export default function ComponenteAmenidadesHabitacion({habitacion, text}: ComponenteAmenidadesHabitacionInterface) {

  function RoomAmenityCard({ amenity, compact = false }: RoomAmenityCardInterface) {
    const Icon = IconosAmenidadesHabitaciones[amenity.type];

    return (
      <article className={`habitacion-room-amenity-card ${compact ? 'habitacion-room-amenity-card-compact' : ''}`}>
        <span className="habitacion-room-amenity-icon">
          <Icon size={32} />
        </span>
        <div>
          <h4>{amenity.name}</h4>
          <p>{amenity.description}</p>
        </div>
      </article>
    );
  }

  return (
    <section className="habitacion-room-amenities-section" aria-labelledby={`${habitacion.id}-room-amenities-title`}>
      <div className="habitacion-room-amenities-heading">
        <h3 id={`${habitacion.id}-room-amenities-title`}>
          {text.room_amenities_title}
        </h3>
        <p>{text.room_amenities_body}</p>
      </div>

      <div className="habitacion-room-amenities-grid">
        {habitacion.roomAmenities.map((amenity) => (
          <RoomAmenityCard key={`${habitacion.id}-${amenity.type}-${amenity.name}`} amenity={amenity}/>
        ))}
      </div>

    {(habitacion.requestAmenities && habitacion.requestAmenities.length > 0) && (
        <div className="habitacion-room-amenities-request">
          <div className="habitacion-room-amenities-request-heading">
            <Info size={18} />
            <div>
              <strong>{text.request_amenities_title}</strong>
              <span>{text.request_amenities_body}</span>
            </div>
          </div>
          <div className="habitacion-room-amenities-request-grid">
            {habitacion.requestAmenities.map((amenity) => (
              <RoomAmenityCard key={`${habitacion.id}-request-${amenity.type}-${amenity.name}`} amenity={amenity} compact />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
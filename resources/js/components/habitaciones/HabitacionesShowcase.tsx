import { useEffect, useState } from 'react';
import ComponenteHabitaciones from './components/ComponenteHabitaciones';
import HabitacionDrawer from './components/DrawerHabitaciones';
import type { Habitacion, HabitacionesPageContent } from './interfaces';
import { mapHabitacionesContent } from './services/mapHabitacionesContent';

type HabitacionesShowcaseProps = {
  content?: HabitacionesPageContent | null;
  locale?: string | null;
  drawerScope?: 'page' | 'preview';
  getDrawerContainer?: () => HTMLElement | null;
  onDrawerOpenChange?: (open: boolean) => void;
};

export default function HabitacionesShowcase({ content, locale, drawerScope = 'page', getDrawerContainer, onDrawerOpenChange }: HabitacionesShowcaseProps = {}) {
  const [selectedHabitacion, setSelectedHabitacion] = useState<Habitacion | undefined>();
  const mappedContent = mapHabitacionesContent(content, locale);
  const { habitaciones, hotelInfo, text } = mappedContent;
  const isDrawerOpen = Boolean(selectedHabitacion);

  useEffect(() => {
    onDrawerOpenChange?.(isDrawerOpen);

    return () => {
      onDrawerOpenChange?.(false);
    };
  }, [isDrawerOpen, onDrawerOpenChange]);

  return (
    <section className="habitaciones-section">
      <div className="habitaciones-intro">
        <h1>{text.intro_title}</h1>
        <span>{text.intro_body}</span>
      </div>

      <div className="habitaciones-grid">
        {habitaciones.map((habitacion) => (
          <ComponenteHabitaciones key={habitacion.id} habitacion={habitacion} onSelect={setSelectedHabitacion} text={text}/>
        ))}
      </div>

      <HabitacionDrawer
        habitacion={selectedHabitacion}
        open={isDrawerOpen}
        onClose={() => setSelectedHabitacion(undefined)}
        hotelInfo={hotelInfo}
        text={text}
        scoped={drawerScope === 'preview'}
        getDrawerContainer={getDrawerContainer}
      />
    </section>
  );
}

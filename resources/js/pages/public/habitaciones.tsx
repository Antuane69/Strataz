import { Head } from '@inertiajs/react';
import HabitacionesShowcase from '@/components/habitaciones/HabitacionesShowcase';
import type { HabitacionesPageContent } from '@/components/habitaciones/interfaces';
import { mapHabitacionesContent } from '@/components/habitaciones/services/mapHabitacionesContent';

interface HabitacionesProps {
  pageContent?: HabitacionesPageContent | null;
  locale?: string;
};

export default function Habitaciones({ pageContent, locale }: HabitacionesProps) {
  const { text } = mapHabitacionesContent(pageContent, locale);

  return (
    <>
      <Head title={text.page_title} />

      <main>
        <HabitacionesShowcase content={pageContent} locale={locale} />
      </main>
    </>
  );
}

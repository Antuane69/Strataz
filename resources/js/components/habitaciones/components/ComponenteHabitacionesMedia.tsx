import type { HabitacionImage } from "../interfaces";

interface ComponentesHabitacionesMediaInterface {
  media: HabitacionImage;
  className: string;
  controls?: boolean;
}

export default function ComponentesHabitacionesMedia({ media, className, controls = false }: ComponentesHabitacionesMediaInterface) {
  if (media.type === 'video') {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster ?? undefined}
        controls={controls}
        muted={!controls}
        playsInline
        preload="metadata"
      />
    );
  }

  return <img src={media.src} alt={media.alt} className={className} />;
}
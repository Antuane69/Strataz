export type NewsSport = "Futbol" | "Tenis" | "NBA";

export type SportArticle = {
  id: string;
  sport: NewsSport;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  readTime: string;
  image: string;
  impact: "Alta" | "Media" | "Baja";
  tags: string[];
};

export type NewsPageMock = {
  generatedAt: string;
  featured: SportArticle;
  articles: SportArticle[];
  topics: {
    label: string;
    count: number;
  }[];
  briefings: {
    title: string;
    text: string;
    sport: NewsSport;
  }[];
};

export const newsPageMock: NewsPageMock = {
  generatedAt: "Hoy 11:18 AM",
  featured: {
    id: "feature-final-europea",
    sport: "Futbol",
    title: "Final europea llega con dos equipos en pico de rendimiento",
    summary:
      "El modelo proyecta un partido de ritmo alto, laterales muy activos y una probabilidad elevada de goles en ambos tiempos.",
    source: "TodoParaTuApuesta Newsroom",
    publishedAt: "Hace 18 min",
    readTime: "4 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMDXKSg-4IpQWhWzxZXNqTR8g1kl6J4-F_8g&s",
    impact: "Alta",
    tags: ["Final", "Tactica", "Mercado"],
  },
  articles: [
    {
      id: "nba-rotacion-celtics",
      sport: "NBA",
      title: "Celtics ajustan rotacion y sube el volumen de triples",
      summary:
        "La segunda unidad esta tomando mas tiros abiertos y el mercado ya movio la linea total del partido.",
      source: "Cancha Central",
      publishedAt: "Hace 34 min",
      readTime: "3 min",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=900&auto=format&fit=crop",
      impact: "Media",
      tags: ["Playoffs", "Triples"],
    },
    {
      id: "tenis-saque-sinner",
      sport: "Tenis",
      title: "Sinner domina con primer saque antes de semifinal clave",
      summary:
        "Sus ultimos tres partidos muestran un salto fuerte en puntos ganados con primer servicio y menos bolas de break concedidas.",
      source: "Linea de Fondo",
      publishedAt: "Hace 52 min",
      readTime: "5 min",
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=900&auto=format&fit=crop",
      impact: "Alta",
      tags: ["ATP", "Servicio", "Forma"],
    },
    {
      id: "futbol-lesiones-city",
      sport: "Futbol",
      title: "City recupera mediocampista y cambia lectura del partido",
      summary:
        "La vuelta del titular mejora salida bajo presion y reduce el riesgo de transiciones rivales.",
      source: "Reporte 90",
      publishedAt: "Hace 1 h",
      readTime: "3 min",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=900&auto=format&fit=crop",
      impact: "Media",
      tags: ["Lesiones", "Premier"],
    },
    {
      id: "nba-fatiga-lakers",
      sport: "NBA",
      title: "Lakers llegan con carga alta tras dos cierres cerrados",
      summary:
        "El desgaste de sus titulares podria impactar defensa perimetral durante el tercer cuarto.",
      source: "Pizarra NBA",
      publishedAt: "Hace 2 h",
      readTime: "4 min",
      image:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=900&auto=format&fit=crop",
      impact: "Media",
      tags: ["Fatiga", "Playoffs"],
    },
    {
      id: "tenis-arcilla-breakpoints",
      sport: "Tenis",
      title: "La arcilla premia a restadores agresivos esta semana",
      summary:
        "El porcentaje de quiebres subio 7 puntos frente al promedio del torneo anterior en pista dura.",
      source: "Match Point Data",
      publishedAt: "Hace 3 h",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=900&auto=format&fit=crop",
      impact: "Baja",
      tags: ["Arcilla", "Break points"],
    },
  ],
  topics: [
    { label: "Lesiones", count: 8 },
    { label: "Mercado en movimiento", count: 14 },
    { label: "Alineaciones", count: 11 },
    { label: "Tactica", count: 6 },
  ],
  briefings: [
    {
      title: "Alerta de goles",
      text: "Tres partidos de futbol muestran proyeccion superior a 3.0 xG combinado.",
      sport: "Futbol",
    },
    {
      title: "Tenis con valor en under",
      text: "Dos cruces tienen perfiles de saque dominante y bajo intercambio largo.",
      sport: "Tenis",
    },
    {
      title: "NBA: ojo al tercer cuarto",
      text: "Equipos visitantes bajan 5.4 puntos de eficiencia tras el descanso.",
      sport: "NBA",
    },
  ],
};

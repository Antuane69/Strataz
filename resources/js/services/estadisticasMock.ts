export type SportKey = "futbol" | "tenis" | "nba";

export type MetricCard = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  helper: string;
};

export type MarketBarPoint = {
  label: string;
  futbol: number;
  tenis: number;
  nba: number;
};

export type LinePoint = {
  label: string;
  value: number;
};

export type DonutPoint = {
  label: string;
  value: number;
  color: string;
};

export type RankingRow = {
  rank: number;
  sport: SportKey;
  team: string;
  league: string;
  rating: number;
  form: string;
  attack: number;
  defense: number;
};

export type InsightBlock = {
  title: string;
  sport: string;
  text: string;
  confidence: number;
};

export type StatisticsPageMock = {
  updatedAt: string;
  filters: {
    sports: string[];
    ranges: string[];
  };
  heroMetrics: MetricCard[];
  marketOpportunity: MarketBarPoint[];
  scoringTrend: LinePoint[];
  pickQualityMix: DonutPoint[];
  teamRankings: RankingRow[];
  insights: InsightBlock[];
  opportunityMatrix: {
    rows: string[];
    sports: string[];
    values: number[][];
    actions: string[];
  };
};

export const statisticsPageMock: StatisticsPageMock = {
  updatedAt: "Hoy 10:42 AM",
  filters: {
    sports: ["Todos", "Futbol", "Tenis", "NBA"],
    ranges: ["7 dias", "30 dias", "Temporada"],
  },
  heroMetrics: [
    {
      label: "Partidos analizados",
      value: "248",
      change: "+18%",
      trend: "up",
      helper: "vs. semana anterior",
    },
    {
      label: "Promedio de goles",
      value: "2.84",
      change: "+0.22",
      trend: "up",
      helper: "top ligas europeas",
    },
    {
      label: "Sets a 3 parciales",
      value: "41%",
      change: "-6%",
      trend: "down",
      helper: "torneos ATP/WTA",
    },
    {
      label: "Ritmo NBA",
      value: "101.7",
      change: "Estable",
      trend: "stable",
      helper: "posesiones por 48 min",
    },
  ],
  marketOpportunity: [
    { label: "Ganador", futbol: 78, tenis: 72, nba: 66 },
    { label: "Totales", futbol: 69, tenis: 61, nba: 84 },
    { label: "Handicap", futbol: 58, tenis: 55, nba: 79 },
    { label: "Props", futbol: 52, tenis: 74, nba: 82 },
    { label: "En vivo", futbol: 73, tenis: 68, nba: 76 },
    { label: "Underdog", futbol: 47, tenis: 64, nba: 59 },
  ],
  scoringTrend: [
    { label: "J1", value: 58 },
    { label: "J2", value: 63 },
    { label: "J3", value: 60 },
    { label: "J4", value: 70 },
    { label: "J5", value: 74 },
    { label: "J6", value: 69 },
    { label: "J7", value: 82 },
    { label: "J8", value: 79 },
  ],
  pickQualityMix: [
    { label: "Alta confianza", value: 36, color: "#22c55e" },
    { label: "Valor moderado", value: 42, color: "#f59e0b" },
    { label: "Evitar por riesgo", value: 22, color: "#ef4444" },
  ],
  teamRankings: [
    {
      rank: 1,
      sport: "futbol",
      team: "Real Madrid",
      league: "LaLiga",
      rating: 94,
      form: "W W W D W",
      attack: 91,
      defense: 87,
    },
    {
      rank: 2,
      sport: "nba",
      team: "Boston Celtics",
      league: "NBA",
      rating: 92,
      form: "W W L W W",
      attack: 88,
      defense: 90,
    },
    {
      rank: 3,
      sport: "tenis",
      team: "Jannik Sinner",
      league: "ATP",
      rating: 90,
      form: "W W W W L",
      attack: 86,
      defense: 82,
    },
    {
      rank: 4,
      sport: "futbol",
      team: "Manchester City",
      league: "Premier League",
      rating: 89,
      form: "W D W W W",
      attack: 93,
      defense: 78,
    },
    {
      rank: 5,
      sport: "nba",
      team: "Denver Nuggets",
      league: "NBA",
      rating: 87,
      form: "L W W W L",
      attack: 84,
      defense: 85,
    },
  ],
  insights: [
    {
      title: "Futbol con alta presion",
      sport: "Futbol",
      text: "Los equipos que recuperan en campo rival estan generando 1.8 goles esperados por partido en esta muestra.",
      confidence: 81,
    },
    {
      title: "Tenis: primer servicio decide",
      sport: "Tenis",
      text: "Jugadores arriba de 67% de primeros servicios sostienen el saque en 84% de sus turnos.",
      confidence: 76,
    },
    {
      title: "NBA: ritmo y triples",
      sport: "NBA",
      text: "Los partidos con ritmo mayor a 101 posesiones estan superando la linea de puntos en 64% de casos.",
      confidence: 73,
    },
  ],
  opportunityMatrix: {
    rows: ["Favorito claro", "Over / Totales", "Handicap", "Props jugador"],
    sports: ["Futbol", "Tenis", "NBA"],
    values: [
      [82, 76, 68],
      [70, 58, 87],
      [55, 62, 81],
      [49, 79, 84],
    ],
    actions: [
      "Mejor para picks pre-partido",
      "NBA tiene la senal mas fuerte",
      "Usar solo si la linea se mueve",
      "Priorizar tenis y NBA",
    ],
  },
};

import { CalendarOutlined, LineChartOutlined, MenuOutlined, TrophyOutlined } from '@ant-design/icons';
import type { DashboardData } from "../interface";

export const dashboardData: DashboardData = {
  sports: [
    { name: "Fútbol", count: 128, icon: "⚽" },
    { name: "Tenis", count: 45, icon: "🎾" },
    { name: "NBA", count: 32, icon: "🏀" },
    // { name: "MLB", count: 27, icon: "⚾" },
    // { name: "Hockey", count: 18, icon: "🏒" },
    // { name: "NFL", count: 14, icon: "🏈" },
    // { name: "Voleibol", count: 12, icon: "🏐" },
    // { name: "Baloncesto FIBA", count: 9, icon: "🏀" },
    // { name: "eSports", count: 34, icon: "🎮" },
  ],
  featuredMatches: [
    {
      league: "ATP - Roma",
      time: "Hoy 11:00 AM",
      leftName: "Carlos Alcaraz",
      rightName: "Jannik Sinner",
      leftImage:
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=500&auto=format&fit=crop",
      rightImage:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=500&auto=format&fit=crop",
      odds: ["1.78", "2.05"],
      confidence: 72,
      trend: "Al alza",
    },
    {
      league: "LaLiga - España",
      time: "Hoy 3:00 PM",
      leftName: "Real Madrid",
      rightName: "Barcelona",
      leftImage:
        "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      rightImage:
        "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      odds: ["2.10", "3.50", "2.90"],
      confidence: 65,
      trend: "Estable",
    },
    {
      league: "NBA - Playoffs",
      time: "Hoy 8:30 PM",
      leftName: "Lakers",
      rightName: "Celtics",
      leftImage:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
      rightImage:
        "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
      odds: ["1.92", "1.92"],
      confidence: 68,
      trend: "Al alza",
    },
  ],
  liveMatches: [
    {
      league: "ATP - Roma",
      leftName: "D. Medvedev",
      rightName: "H. Hurkacz",
      score: "1  6  3  -   0  3  2",
      time: "2° Set · 40-30",
      quickStatLabel: "Aces",
      leftStat: 68,
      rightStat: 62,
    },
    {
      league: "LaLiga - España",
      leftName: "Villarreal",
      rightName: "Real Betis",
      score: "1  -  0",
      time: "2T · 6’",
      quickStatLabel: "Posesión",
      leftStat: 55,
      rightStat: 45,
    },
    {
      league: "NBA - Playoffs",
      leftName: "Nuggets",
      rightName: "Timberwolves",
      score: "78  -  72",
      time: "3C · 08:12",
      quickStatLabel: "Rebotes",
      leftStat: 32,
      rightStat: 28,
    },
    {
      league: "MLB",
      leftName: "Yankees",
      rightName: "Red Sox",
      score: "2  -  1",
      time: "6° Alta",
      quickStatLabel: "Hits",
      leftStat: 60,
      rightStat: 40,
    },
  ],
  highlightStats: [
    {
      title: "% Primer servicio",
      rows: [
        {
          name: "J. Sinner",
          image:
            "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=200&auto=format&fit=crop",
          value: "68.4%",
          percent: 68,
        },
        {
          name: "C. Alcaraz",
          image:
            "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=200&auto=format&fit=crop",
          value: "63.1%",
          percent: 63,
        },
      ],
    },
    {
      title: "Puntos ganados",
      subtitle: "Últimos 10 partidos",
      rows: [
        {
          name: "J. Djokovic",
          image:
            "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=200&auto=format&fit=crop",
          value: "79.3%",
          percent: 79,
        },
        {
          name: "A. Zverev",
          image:
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=200&auto=format&fit=crop",
          value: "73.2%",
          percent: 73,
        },
      ],
    },
    {
      title: "Games ganados",
      subtitle: "En arcilla 2024",
      rows: [
        {
          name: "C. Alcaraz",
          image:
            "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=200&auto=format&fit=crop",
          value: "85.7%",
          percent: 86,
        },
        {
          name: "S. Tsitsipas",
          image:
            "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=200&auto=format&fit=crop",
          value: "72.3%",
          percent: 72,
        },
      ],
    },
    {
      title: "Break points convertidos",
      subtitle: "Últimos 10 partidos",
      rows: [
        {
          name: "J. Sinner",
          image:
            "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=200&auto=format&fit=crop",
          value: "42.1%",
          percent: 42,
        },
        {
          name: "D. Medvedev",
          image:
            "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=200&auto=format&fit=crop",
          value: "38.7%",
          percent: 39,
        },
      ],
    },
  ],
  pickOfDay: {
    league: "ATP - Roma",
    time: "Hoy 11:00 AM",
    title: "Jannik Sinner gana 2-0",
    confidence: 87,
    reasons: [
      "9 victorias seguidas en arcilla",
      "Alcaraz con molestias físicas",
      "Sinner domina el H2H 4-1",
      "Mejor porcentaje de 1er servicio",
    ],
  },
  trends: [
    "Alcaraz: 5 victorias en sus últimos partidos",
    "Real Madrid: 8 partidos consecutivos sin perder",
    "Lakers: 7-2 en los últimos 9 partidos en casa",
    "Over 2.5 goles en 70% de los partidos de Premier League",
  ],
  communityPicks: [
    {
      title: "Más de 2.5 goles",
      odd: "1.70",
      percent: 80,
      change: "12%",
    },
    {
      title: "Sinner gana 2-0",
      odd: "1.85",
      percent: 65,
      change: "24%",
    },
    {
      title: "Real Madrid gana",
      odd: "2.10",
      percent: 60,
      change: "10%",
    },
  ],
};

export const menuNavegacionUsuario = [
  { label: "Resumen", icon: <TrophyOutlined />, active: true, ruta: "/" },
  { label: "Estadísticas", icon: <LineChartOutlined />, ruta: "/estadisticas" },
  { label: "En vivo", icon: <LineChartOutlined />, ruta: "/en_vivo" },
  // { label: "H2H", icon: <TeamOutlined /> },
  // { label: "Partidos", icon: <CalendarOutlined /> },
  // { label: "Análisis IA", icon: <WarningOutlined /> },
  { label: "Noticias", icon: <MenuOutlined />, ruta: "/noticias" },
  // { label: "Cuotas", icon: <DollarOutlined /> },
  // { label: "Lesiones", icon: <WarningOutlined /> },
  { label: "Calendario", icon: <CalendarOutlined />, ruta: "/calendario" },
];

export const menuNavegacionUsuarioHeader = [
  "Resumen",
  "En vivo",
  "Estadísticas",
  "Picks IA",
  "Noticias",
];

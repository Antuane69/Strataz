export type LiveSport = "Futbol" | "Tenis" | "NBA";

export type LiveGame = {
  id: string;
  sport: LiveSport;
  competition: string;
  status: "live" | "halftime" | "break" | "upcoming";
  clock: string;
  home: {
    name: string;
    image: string;
    score: string;
  };
  away: {
    name: string;
    image: string;
    score: string;
  };
  odds: {
    home: string;
    draw?: string;
    away: string;
  };
  momentum: number;
  keyStats: {
    label: string;
    home: number;
    away: number;
  }[];
  events: {
    minute: string;
    text: string;
    tone: "green" | "yellow" | "blue";
  }[];
};

export type LiveGamesPageMock = {
  generatedAt: string;
  filters: LiveSport[];
  summary: {
    label: string;
    value: string;
  }[];
  matches: LiveGame[];
  marketMovers: {
    label: string;
    sport: LiveSport;
    odd: string;
    change: string;
  }[];
};

export const liveGamesPageMock: LiveGamesPageMock = {
  generatedAt: "Hoy 11:05 AM",
  filters: ["Futbol", "Tenis", "NBA"],
  summary: [
    { label: "En juego", value: "12" },
    { label: "Con alta actividad", value: "7" },
    { label: "Cambios de cuota", value: "18" },
    { label: "Alertas IA", value: "5" },
  ],
  matches: [
    {
      id: "laliga-madrid-barcelona",
      sport: "Futbol",
      competition: "LaLiga - Jornada 34",
      status: "live",
      clock: "67'",
      home: {
        name: "Real Madrid",
        image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        score: "2",
      },
      away: {
        name: "Barcelona",
        image: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
        score: "1",
      },
      odds: { home: "1.72", draw: "3.40", away: "4.80" },
      momentum: 68,
      keyStats: [
        { label: "Posesion", home: 54, away: 46 },
        { label: "Tiros", home: 13, away: 9 },
        { label: "xG", home: 71, away: 52 },
      ],
      events: [
        { minute: "64'", text: "Madrid acelera por banda derecha", tone: "green" },
        { minute: "58'", text: "Barcelona ajusta presion alta", tone: "blue" },
      ],
    },
    {
      id: "atp-sinner-medvedev",
      sport: "Tenis",
      competition: "ATP Roma - Semifinal",
      status: "break",
      clock: "2do set",
      home: {
        name: "Jannik Sinner",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=300&auto=format&fit=crop",
        score: "6 4",
      },
      away: {
        name: "Daniil Medvedev",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=300&auto=format&fit=crop",
        score: "3 3",
      },
      odds: { home: "1.41", away: "2.95" },
      momentum: 61,
      keyStats: [
        { label: "1er servicio", home: 72, away: 64 },
        { label: "Aces", home: 7, away: 5 },
        { label: "Break points", home: 50, away: 33 },
      ],
      events: [
        { minute: "40-30", text: "Sinner mantiene ventaja con primer saque", tone: "green" },
        { minute: "15-30", text: "Medvedev sube agresividad al resto", tone: "yellow" },
      ],
    },
    {
      id: "nba-lakers-celtics",
      sport: "NBA",
      competition: "NBA - Playoffs",
      status: "live",
      clock: "3C 04:18",
      home: {
        name: "Lakers",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
        score: "82",
      },
      away: {
        name: "Celtics",
        image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
        score: "86",
      },
      odds: { home: "2.18", away: "1.70" },
      momentum: 57,
      keyStats: [
        { label: "Rebotes", home: 33, away: 39 },
        { label: "Triples", home: 38, away: 42 },
        { label: "Perdidas", home: 11, away: 8 },
      ],
      events: [
        { minute: "3C", text: "Celtics castigan desde la esquina", tone: "green" },
        { minute: "3C", text: "Lakers bajan perdidas tras tiempo fuera", tone: "blue" },
      ],
    },
    {
      id: "premier-arsenal-city",
      sport: "Futbol",
      competition: "Premier League",
      status: "halftime",
      clock: "Descanso",
      home: {
        name: "Arsenal",
        image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        score: "0",
      },
      away: {
        name: "Manchester City",
        image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        score: "0",
      },
      odds: { home: "2.85", draw: "2.60", away: "2.20" },
      momentum: 49,
      keyStats: [
        { label: "Posesion", home: 47, away: 53 },
        { label: "Tiros", home: 6, away: 7 },
        { label: "Corners", home: 4, away: 3 },
      ],
      events: [
        { minute: "45+1'", text: "City cierra mejor el primer tiempo", tone: "yellow" },
        { minute: "39'", text: "Arsenal tuvo la ocasion mas clara", tone: "blue" },
      ],
    },
  ],
  marketMovers: [
    { label: "Real Madrid gana", sport: "Futbol", odd: "1.72", change: "-14%" },
    { label: "Sinner 2-0", sport: "Tenis", odd: "1.88", change: "+9%" },
    { label: "Celtics over 112.5", sport: "NBA", odd: "1.94", change: "+11%" },
  ],
};

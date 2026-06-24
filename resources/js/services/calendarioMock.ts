export type CalendarSport = "Futbol" | "Tenis" | "NBA";

export type CalendarMatch = {
  id: string;
  date: string;
  time: string;
  sport: CalendarSport;
  competition: string;
  title: string;
  venue: string;
  importance: "Alta" | "Media" | "Baja";
  prediction: string;
  odds: {
    home: string;
    draw?: string;
    away: string;
  };
};

export type CalendarPageMock = {
  month: string;
  monthLabel: string;
  generatedAt: string;
  matches: CalendarMatch[];
};

const dayMatches: Omit<CalendarMatch, "id" | "date">[][] = [
  [
    match("18:30", "Futbol", "LaLiga", "Real Madrid vs Sevilla", "Santiago Bernabeu", "Alta", "Madrid gana o empata", "1.56", "3.90", "6.20"),
    match("21:00", "NBA", "Playoffs", "Knicks vs Heat", "Madison Square Garden", "Media", "Total arriba de 211.5", "1.88", undefined, "1.94"),
  ],
  [
    match("11:00", "Tenis", "ATP Roma", "Sinner vs Dimitrov", "Campo Centrale", "Alta", "Sinner gana 2-0", "1.42", undefined, "2.95"),
    match("19:45", "Futbol", "Premier League", "Arsenal vs Newcastle", "Emirates Stadium", "Media", "Ambos anotan", "1.96", "3.35", "3.80"),
  ],
  [
    match("13:30", "Tenis", "WTA Madrid", "Swiatek vs Gauff", "Manolo Santana", "Alta", "Mas de 20.5 games", "1.70", undefined, "2.10"),
    match("20:30", "NBA", "Regular Season", "Lakers vs Suns", "Crypto.com Arena", "Alta", "Lakers +4.5", "2.05", undefined, "1.78"),
  ],
  [
    match("16:15", "Futbol", "Serie A", "Inter vs Lazio", "San Siro", "Media", "Inter gana", "1.74", "3.60", "4.90"),
  ],
  [
    match("10:00", "Tenis", "ATP Roma", "Alcaraz vs Rune", "Grand Stand", "Alta", "Alcaraz gana", "1.62", undefined, "2.35"),
    match("18:00", "Futbol", "Liga MX", "America vs Tigres", "Estadio Azteca", "Alta", "Menos de 3.5 goles", "2.10", "3.20", "3.40"),
  ],
  [
    match("12:45", "Futbol", "Champions", "PSG vs Bayern", "Parc des Princes", "Alta", "Ambos anotan", "2.22", "3.55", "3.05"),
    match("22:00", "NBA", "Playoffs", "Warriors vs Nuggets", "Chase Center", "Alta", "Nuggets +2.5", "1.91", undefined, "1.91"),
  ],
  [
    match("09:30", "Tenis", "ATP Roma", "Medvedev vs Zverev", "Campo Centrale", "Media", "Mas de 2.5 sets", "1.84", undefined, "1.98"),
    match("17:00", "Futbol", "Eredivisie", "Ajax vs PSV", "Johan Cruyff Arena", "Alta", "Over 2.5 goles", "2.40", "3.70", "2.70"),
  ],
  [
    match("15:00", "Futbol", "Premier League", "Chelsea vs Liverpool", "Stamford Bridge", "Alta", "Liverpool doble oportunidad", "2.85", "3.40", "2.42"),
    match("20:00", "NBA", "Regular Season", "Celtics vs Bulls", "TD Garden", "Media", "Celtics -6.5", "1.38", undefined, "3.10"),
  ],
  [
    match("11:30", "Tenis", "WTA Roma", "Sabalenka vs Pegula", "Campo Pietrangeli", "Media", "Sabalenka gana", "1.58", undefined, "2.45"),
    match("19:00", "Futbol", "MLS", "Inter Miami vs Atlanta", "DRV PNK Stadium", "Media", "Over 2.5 goles", "1.82", "3.85", "4.10"),
  ],
  [
    match("14:00", "Futbol", "Bundesliga", "Dortmund vs Leverkusen", "Signal Iduna Park", "Alta", "Ambos anotan", "2.55", "3.60", "2.58"),
    match("21:30", "NBA", "Playoffs", "Mavericks vs Thunder", "American Airlines Center", "Alta", "Doncic mas de 29.5 puntos", "1.87", undefined, "1.95"),
  ],
  [
    match("12:00", "Tenis", "ATP Roma", "Djokovic vs Tsitsipas", "Campo Centrale", "Alta", "Djokovic gana", "1.66", undefined, "2.28"),
  ],
  [
    match("16:00", "Futbol", "LaLiga", "Barcelona vs Atletico", "Camp Nou", "Alta", "Barcelona gana o empata", "1.90", "3.45", "4.15"),
    match("20:45", "NBA", "Playoffs", "Cavaliers vs Pacers", "Rocket Arena", "Media", "Pacers +5.5", "1.74", undefined, "2.12"),
  ],
  [
    match("10:30", "Tenis", "WTA Madrid", "Rybakina vs Osaka", "Manolo Santana", "Media", "Mas de 21.5 games", "1.76", undefined, "2.05"),
    match("18:30", "Futbol", "Copa Libertadores", "Flamengo vs River Plate", "Maracana", "Alta", "Flamengo gana", "1.98", "3.25", "3.95"),
  ],
  [
    match("13:00", "Futbol", "Serie A", "Milan vs Juventus", "San Siro", "Alta", "Menos de 2.5 goles", "2.18", "3.05", "3.55"),
    match("22:15", "NBA", "Regular Season", "Clippers vs Kings", "Intuit Dome", "Media", "Kings +3.5", "1.80", undefined, "2.02"),
  ],
  [
    match("09:00", "Tenis", "ATP Roma", "Rublev vs Ruud", "Grand Stand", "Media", "Ruud gana set", "1.92", undefined, "1.90"),
  ],
  [
    match("15:30", "Futbol", "Premier League", "Tottenham vs Manchester United", "Tottenham Stadium", "Alta", "Over 2.5 goles", "2.02", "3.50", "3.45"),
    match("19:30", "NBA", "Playoffs", "Bucks vs Sixers", "Fiserv Forum", "Alta", "Embiid mas de 10.5 rebotes", "1.83", undefined, "1.99"),
  ],
  [
    match("11:00", "Tenis", "WTA Roma", "Jabeur vs Muchova", "Campo Centrale", "Baja", "Jabeur gana set", "1.72", undefined, "2.12"),
    match("18:45", "Futbol", "Liga MX", "Monterrey vs Cruz Azul", "BBVA", "Media", "Monterrey gana", "1.86", "3.35", "4.25"),
  ],
  [
    match("14:30", "Futbol", "Champions", "Manchester City vs Real Madrid", "Etihad Stadium", "Alta", "Ambos anotan", "1.88", "3.75", "4.05"),
    match("21:00", "NBA", "Playoffs", "Timberwolves vs Nuggets", "Target Center", "Alta", "Nuggets moneyline", "2.05", undefined, "1.78"),
  ],
  [
    match("10:00", "Tenis", "ATP Roma", "Fritz vs De Minaur", "Grand Stand", "Media", "Fritz gana", "1.79", undefined, "2.02"),
  ],
  [
    match("17:00", "Futbol", "LaLiga", "Valencia vs Villarreal", "Mestalla", "Media", "Empate no apuesta Valencia", "2.25", "3.10", "3.30"),
    match("20:30", "NBA", "Regular Season", "Magic vs Hawks", "Kia Center", "Baja", "Hawks +4.5", "1.70", undefined, "2.18"),
  ],
  [
    match("12:15", "Tenis", "ATP Roma", "Alcaraz vs Sinner", "Campo Centrale", "Alta", "Mas de 22.5 games", "1.95", undefined, "1.87"),
    match("19:45", "Futbol", "Premier League", "Liverpool vs Arsenal", "Anfield", "Alta", "Liverpool gana o empata", "1.82", "3.70", "4.10"),
  ],
  [
    match("16:00", "Futbol", "Bundesliga", "Bayern vs Leipzig", "Allianz Arena", "Alta", "Bayern gana", "1.68", "4.10", "4.60"),
    match("22:00", "NBA", "Playoffs", "Suns vs Lakers", "Footprint Center", "Alta", "Booker mas de 26.5 puntos", "1.91", undefined, "1.91"),
  ],
  [
    match("09:45", "Tenis", "WTA Roma", "Swiatek vs Rybakina", "Campo Centrale", "Alta", "Swiatek gana", "1.55", undefined, "2.52"),
  ],
  [
    match("13:30", "Futbol", "Serie A", "Napoli vs Roma", "Diego Armando Maradona", "Media", "Ambos anotan", "2.08", "3.20", "3.60"),
    match("21:15", "NBA", "Playoffs", "Celtics vs Knicks", "TD Garden", "Alta", "Celtics -5.5", "1.48", undefined, "2.72"),
  ],
  [
    match("11:15", "Tenis", "ATP Roma", "Final masculina", "Campo Centrale", "Alta", "Over de games", "1.88", undefined, "1.94"),
    match("18:00", "Futbol", "Copa del Rey", "Athletic vs Real Sociedad", "La Cartuja", "Alta", "Menos de 2.5 goles", "2.32", "3.05", "3.25"),
  ],
  [
    match("15:00", "Futbol", "Premier League", "Manchester United vs Chelsea", "Old Trafford", "Alta", "Ambos anotan", "2.18", "3.55", "3.15"),
    match("20:00", "NBA", "Regular Season", "Raptors vs Nets", "Scotiabank Arena", "Baja", "Nets +2.5", "1.82", undefined, "2.00"),
  ],
  [
    match("10:30", "Tenis", "WTA Roma", "Final femenina", "Campo Centrale", "Alta", "Favorita gana 2-0", "1.64", undefined, "2.30"),
  ],
  [
    match("17:30", "Futbol", "MLS", "LAFC vs Seattle", "BMO Stadium", "Media", "LAFC gana", "1.92", "3.55", "3.80"),
    match("22:30", "NBA", "Playoffs", "Warriors vs Lakers", "Chase Center", "Alta", "Over 224.5 puntos", "1.89", undefined, "1.93"),
  ],
  [
    match("12:00", "Tenis", "ATP 250", "Hurkacz vs Shelton", "Cancha central", "Media", "Mas de 23.5 games", "1.78", undefined, "2.05"),
    match("19:00", "Futbol", "Liga MX", "Pumas vs Chivas", "Olimpico Universitario", "Alta", "Chivas +0.5", "2.15", "3.20", "3.35"),
  ],
  [
    match("14:45", "Futbol", "Champions", "Barcelona vs PSG", "Camp Nou", "Alta", "Over 2.5 goles", "2.05", "3.65", "3.35"),
    match("21:45", "NBA", "Playoffs", "Thunder vs Mavericks", "Paycom Center", "Alta", "Thunder gana", "1.76", undefined, "2.08"),
  ],
  [
    match("11:00", "Tenis", "ATP 500", "Zverev vs Musetti", "Cancha central", "Media", "Zverev gana", "1.69", undefined, "2.20"),
    match("18:30", "Futbol", "LaLiga", "Girona vs Betis", "Montilivi", "Media", "Ambos anotan", "1.94", "3.35", "3.90"),
  ],
];

export const calendarPageMock: CalendarPageMock = {
  month: "2026-05",
  monthLabel: "Mayo 2026",
  generatedAt: "Hoy 11:30 AM",
  matches: dayMatches.flatMap((matches, index) => {
    const day = String(index + 1).padStart(2, "0");
    const date = `2026-05-${day}`;

    return matches.map((item, itemIndex) => ({
      ...item,
      id: `${date}-${itemIndex + 1}`,
      date,
    }));
  }),
};

function match(
  time: string,
  sport: CalendarSport,
  competition: string,
  title: string,
  venue: string,
  importance: CalendarMatch["importance"],
  prediction: string,
  home: string,
  draw: string | undefined,
  away: string
): Omit<CalendarMatch, "id" | "date"> {
  return {
    time,
    sport,
    competition,
    title,
    venue,
    importance,
    prediction,
    odds: { home, draw, away },
  };
}

import { Head } from "@inertiajs/react";
import { Button, Drawer, Progress, Tag } from "antd";
import React, { useState } from "react";
import type { ReactNode } from "react";

type Player = {
  name: string;
  country: string;
  ranking: string;
  image: string;
  recentForm: string[];
  wearLevel: number;
  wearLabel: string;
  stats: {
    label: string;
    value: string;
  }[];
};

type H2HMatch = {
  date: string;
  tournament: string;
  winner: string;
  score: string;
  duration: string;
  surface: string;
  note: string;
  keyStat: string;
};

type LastMatch = {
  date: string;
  round: string;
  opponent: string;
  score: string;
  difficulty: "Fácil" | "Moderado" | "Difícil";
  duration: string;
};

type MatchPageData = {
  breadcrumb: string[];
  tournament: string;
  round: string;
  date: string;
  surface: string;
  bestOf: string;
  prediction: {
    title: string;
    confidence: number;
    factors: string[];
  };
  players: {
    left: Player;
    right: Player;
  };
  h2h: {
    total: number;
    leftWins: number;
    rightWins: number;
    matches: H2HMatch[];
  };
  matchStats: {
    label: string;
    leftValue: string;
    rightValue: string;
    leftPercent: number;
    rightPercent: number;
  }[];
  performanceSplits: {
    title: string;
    left: number;
    right: number;
    insight: string;
  }[];
  h2hProfile: {
    summary: string;
    patterns: {
      title: string;
      value: string;
      owner: "left" | "right" | "neutral";
    }[];
  };
  aiAnalysis: {
    headline: string;
    confidence: number;
    comments: {
      title: string;
      text: string;
      tone: "green" | "yellow" | "blue";
    }[];
    riskFactors: string[];
    recommendedMarkets: {
      label: string;
      odd: string;
      confidence: number;
    }[];
  };
  lastMatches: LastMatch[];
  additionalInfo: {
    label: string;
    leftValue: string;
    rightValue: string;
  }[];
};

const matchData: MatchPageData = {
  breadcrumb: ["Tenis", "ATP", "Roma, Italia", "Octavos de final"],
  tournament: "ATP Roma",
  round: "Octavos de final",
  date: "Hoy, 12:00 PM",
  surface: "Tierra batida",
  bestOf: "3 sets",
  prediction: {
    title: "Jannik Sinner gana 2-1",
    confidence: 72,
    factors: [
      "Mejor rendimiento en tierra batida",
      "Menor desgaste físico en la última semana",
      "9 victorias en los últimos 10 enfrentamientos",
      "Alcaraz ha tenido partidos más largos últimamente",
    ],
  },
  players: {
    left: {
      name: "Jannik Sinner",
      country: "🇮🇹",
      ranking: "ATP #2",
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop",
      recentForm: ["W", "W", "W", "W", "L", "W"],
      wearLevel: 35,
      wearLabel: "Bajo",
      stats: [
        { label: "Tierra batida", value: "72%" },
        { label: "Pista dura", value: "66%" },
        { label: "Césped", value: "60%" },
      ],
    },
    right: {
      name: "Carlos Alcaraz",
      country: "🇪🇸",
      ranking: "ATP #3",
      image:
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop",
      recentForm: ["W", "W", "L", "W", "W", "W"],
      wearLevel: 68,
      wearLabel: "Alto",
      stats: [
        { label: "Tierra batida", value: "68%" },
        { label: "Pista dura", value: "71%" },
        { label: "Césped", value: "58%" },
      ],
    },
  },
  h2h: {
    total: 6,
    leftWins: 4,
    rightWins: 2,
    matches: [
      {
        date: "14/04/2024",
        tournament: "ATP Montecarlo Final",
        winner: "Sinner",
        score: "2 - 1",
        duration: "2h 42m",
        surface: "Arcilla",
        note: "Sinner sostuvo 81% de puntos con primer servicio en el tercer set.",
        keyStat: "Break points: 4/7",
      },
      {
        date: "10/03/2024",
        tournament: "ATP Indian Wells Semifinal",
        winner: "Sinner",
        score: "2 - 0",
        duration: "1h 54m",
        surface: "Dura",
        note: "Alcaraz cedio temprano el saque y nunca recupero ritmo al resto.",
        keyStat: "Aces: 9 - 4",
      },
      {
        date: "21/01/2024",
        tournament: "Australian Open Semifinal",
        winner: "Alcaraz",
        score: "3 - 1",
        duration: "3h 21m",
        surface: "Dura",
        note: "Alcaraz domino intercambios largos y gano 62% de puntos de mas de 9 golpes.",
        keyStat: "Winners: 48 - 39",
      },
      {
        date: "17/11/2023",
        tournament: "ATP Finals",
        winner: "Sinner",
        score: "2 - 1",
        duration: "2h 18m",
        surface: "Indoor",
        note: "Sinner fue mas agresivo con la devolucion en segundos servicios.",
        keyStat: "2do saque ganado: 58%",
      },
      {
        date: "08/09/2023",
        tournament: "US Open Cuartos",
        winner: "Alcaraz",
        score: "3 - 2",
        duration: "4h 05m",
        surface: "Dura",
        note: "Partido muy cerrado, definido por una racha de 11 puntos de Alcaraz.",
        keyStat: "Tie-breaks: 2 - 1",
      },
      {
        date: "12/05/2023",
        tournament: "ATP Roma Cuartos",
        winner: "Sinner",
        score: "2 - 0",
        duration: "1h 47m",
        surface: "Arcilla",
        note: "Sinner ataco la derecha cruzada y redujo errores no forzados.",
        keyStat: "Errores no forzados: 18 - 29",
      },
    ],
  },
  matchStats: [
    {
      label: "Primer servicio",
      leftValue: "68%",
      rightValue: "62%",
      leftPercent: 68,
      rightPercent: 62,
    },
    {
      label: "Puntos con 1er saque",
      leftValue: "74%",
      rightValue: "70%",
      leftPercent: 74,
      rightPercent: 70,
    },
    {
      label: "Puntos con 2do saque",
      leftValue: "55%",
      rightValue: "52%",
      leftPercent: 55,
      rightPercent: 52,
    },
    {
      label: "Break points convertidos",
      leftValue: "42%",
      rightValue: "39%",
      leftPercent: 42,
      rightPercent: 39,
    },
    {
      label: "Puntos en rallies largos",
      leftValue: "57%",
      rightValue: "61%",
      leftPercent: 57,
      rightPercent: 61,
    },
    {
      label: "Juegos al resto ganados",
      leftValue: "31%",
      rightValue: "27%",
      leftPercent: 31,
      rightPercent: 27,
    },
  ],
  performanceSplits: [
    {
      title: "Inicio de partido",
      left: 78,
      right: 69,
      insight: "Sinner entra mejor en los primeros turnos de saque.",
    },
    {
      title: "Puntos bajo presion",
      left: 72,
      right: 76,
      insight: "Alcaraz mejora cuando el intercambio se alarga.",
    },
    {
      title: "Cierre de sets",
      left: 80,
      right: 73,
      insight: "Sinner viene cerrando con menos errores no forzados.",
    },
  ],
  h2hProfile: {
    summary:
      "El cara a cara esta casi equilibrado, pero Sinner ha ganado los ultimos duelos donde impuso primer saque y puntos cortos. Alcaraz necesita moverlo hacia rallies largos para inclinar el partido.",
    patterns: [
      { title: "Ultimos 3 enfrentamientos", value: "2-1 Sinner", owner: "left" },
      { title: "En arcilla", value: "2-1 Sinner", owner: "left" },
      { title: "Partidos a 3+ sets", value: "2-2", owner: "neutral" },
      { title: "Tie-breaks ganados", value: "4-3 Alcaraz", owner: "right" },
    ],
  },
  aiAnalysis: {
    headline: "Ventaja ligera para Sinner si logra sostener puntos cortos",
    confidence: 72,
    comments: [
      {
        title: "Lectura tactica",
        text: "Sinner deberia buscar saques abiertos y primer golpe profundo para evitar que Alcaraz tome control con la derecha.",
        tone: "green",
      },
      {
        title: "Momento emocional",
        text: "Alcaraz suele crecer despues de perder sets cerrados; si sobrevive al primer set, el valor del partido cambia bastante.",
        tone: "yellow",
      },
      {
        title: "Ritmo esperado",
        text: "La proyeccion marca sets largos y muchas oportunidades al resto, especialmente si baja el porcentaje de primeros servicios.",
        tone: "blue",
      },
    ],
    riskFactors: [
      "Alcaraz genera mas winners cuando el rival baja intensidad en segundos servicios.",
      "Sinner puede ceder valor si el partido supera las 2h 30m por desgaste acumulado.",
      "La arcilla reduce el impacto de aces directos y favorece devoluciones profundas.",
    ],
    recommendedMarkets: [
      { label: "Sinner gana set 1", odd: "1.78", confidence: 69 },
      { label: "Mas de 22.5 games", odd: "1.91", confidence: 74 },
      { label: "Ambos ganan un set", odd: "2.05", confidence: 66 },
    ],
  },
  lastMatches: [
    {
      date: "10/05/2024",
      round: "Roma R32",
      opponent: "Grigor Dimitrov",
      score: "2-0",
      difficulty: "Fácil",
      duration: "1h 25m",
    },
    {
      date: "08/05/2024",
      round: "Roma R64",
      opponent: "Tallon Griekspoor",
      score: "2-1",
      difficulty: "Moderado",
      duration: "2h 10m",
    },
    {
      date: "04/05/2024",
      round: "Madrid SF",
      opponent: "Daniil Medvedev",
      score: "2-1",
      difficulty: "Difícil",
      duration: "2h 45m",
    },
    {
      date: "02/05/2024",
      round: "Madrid QF",
      opponent: "Andrey Rublev",
      score: "2-0",
      difficulty: "Moderado",
      duration: "1h 50m",
    },
  ],
  additionalInfo: [
    { label: "Ranking actual", leftValue: "ATP #2", rightValue: "ATP #3" },
    { label: "Edad", leftValue: "22 años", rightValue: "21 años" },
    { label: "Altura", leftValue: "1.88 m", rightValue: "1.83 m" },
    { label: "Peso", leftValue: "76 kg", rightValue: "74 kg" },
    { label: "Mano hábil", leftValue: "Derecha", rightValue: "Derecha" },
    { label: "Mejor ranking", leftValue: "ATP #2", rightValue: "ATP #1" },
    { label: "Títulos ATP", leftValue: "12", rightValue: "9" },
  ],
};

export default function Page() {
  return (
    <>
      <Head title="Detalle del partido" />
      <div className="px-5 pb-8 pt-4 lg:px-8">
        <MatchDetailPage data={matchData} />
      </div>
    </>
  );
}

function MatchDetailPage({ data }: { data: MatchPageData }) {
  const [activeTab, setActiveTab] = useState<DetailTab>("Resumen");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <section className="space-y-5">
          <Breadcrumb items={data.breadcrumb} />

          <HeroMatch data={data} />

          <Tabs activeTab={activeTab} onChange={setActiveTab} />

          <TabPanel
            data={data}
            activeTab={activeTab}
            onOpenTimeline={() => setIsTimelineOpen(true)}
          />
        </section>

        <aside className="space-y-5">
          <PredictionCard prediction={data.prediction} />

          <LastMatchesCard matches={data.lastMatches} />

          <AdditionalInfoCard data={data} />
        </aside>
      </div>

      <H2HTimelineDrawer
        data={data}
        open={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />
    </>
  );
}

type DetailTab = "Resumen" | "Estadisticas" | "H2H" | "Analisis IA";

function TabPanel({
  data,
  activeTab,
  onOpenTimeline,
}: {
  data: MatchPageData;
  activeTab: DetailTab;
  onOpenTimeline: () => void;
}) {
  if (activeTab === "Estadisticas") {
    return <StatisticsTab data={data} />;
  }

  if (activeTab === "H2H") {
    return <H2HTab data={data} onOpenTimeline={onOpenTimeline} />;
  }

  if (activeTab === "Analisis IA") {
    return <AIAnalysisTab data={data} />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[420px_1fr]">
      <div className="space-y-5">
        <RecentFormCard
          leftPlayer={data.players.left}
          rightPlayer={data.players.right}
        />

        <PerformanceCard
          leftPlayer={data.players.left}
          rightPlayer={data.players.right}
        />

        <WearCard
          leftPlayer={data.players.left}
          rightPlayer={data.players.right}
        />
      </div>

      <div className="space-y-5">
        <H2HCard data={data} onOpenTimeline={onOpenTimeline} />

        <KeyStatsCard />
      </div>
    </div>
  );
}

function StatisticsTab({ data }: { data: MatchPageData }) {
  const { left, right } = data.players;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
      <CardShell title="Estadisticas del partido" subtitle="Comparativo principal">
        <div className="space-y-4">
          {data.matchStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div className="mb-3 grid grid-cols-[70px_1fr_70px] items-center gap-3 text-sm">
                <span className="font-bold text-green-400">{stat.leftValue}</span>
                <span className="text-center text-white/70">{stat.label}</span>
                <span className="text-right font-bold text-yellow-300">{stat.rightValue}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Progress
                  percent={stat.leftPercent}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />
                <Progress
                  percent={stat.rightPercent}
                  showInfo={false}
                  strokeColor="#facc15"
                  trailColor="rgba(255,255,255,.08)"
                />
              </div>
            </div>
          ))}
        </div>
      </CardShell>

      <div className="space-y-5">
        <CardShell title="Pulso por momentos" subtitle="0 a 100">
          <div className="space-y-5">
            {data.performanceSplits.map((split) => (
              <div key={split.title}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{split.title}</p>
                  <p className="text-xs text-white/45">{split.insight}</p>
                </div>
                <div className="space-y-2">
                  <PlayerMeter name={left.name} value={split.left} color="#22c55e" />
                  <PlayerMeter name={right.name} value={split.right} color="#facc15" />
                </div>
              </div>
            ))}
          </div>
        </CardShell>

        <CardShell title="Lectura rapida">
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Ritmo esperado" value="Alto" />
            <MiniStat label="Sets probables" value="3" />
            <MiniStat label="Breaks proyectados" value="5.2" />
            <MiniStat label="Duracion" value="2h 24m" />
          </div>
        </CardShell>
      </div>
    </div>
  );
}

function H2HTab({
  data,
  onOpenTimeline,
}: {
  data: MatchPageData;
  onOpenTimeline: () => void;
}) {
  const { left, right } = data.players;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_1fr]">
      <H2HCard data={data} onOpenTimeline={onOpenTimeline} />

      <div className="space-y-5">
        <CardShell title="Cara a cara" subtitle="Patrones principales">
          <p className="mb-5 text-sm leading-6 text-white/60">
            {data.h2hProfile.summary}
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {data.h2hProfile.patterns.map((pattern) => (
              <div key={pattern.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  {pattern.title}
                </p>
                <p
                  className={[
                    "mt-2 text-xl font-bold",
                    pattern.owner === "left"
                      ? "text-green-400"
                      : pattern.owner === "right"
                        ? "text-yellow-300"
                        : "text-white",
                  ].join(" ")}
                >
                  {pattern.value}
                </p>
              </div>
            ))}
          </div>
        </CardShell>

        <CardShell title="Mapa de ventajas">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AdvantageBox
              title={left.name}
              color="green"
              items={["Primer saque mas estable", "Mejor cierre de sets", "Menos desgaste reciente"]}
            />
            <AdvantageBox
              title={right.name}
              color="yellow"
              items={["Rallies largos", "Tie-breaks cerrados", "Mayor agresividad al resto"]}
            />
          </div>
        </CardShell>
      </div>
    </div>
  );
}

function AIAnalysisTab({ data }: { data: MatchPageData }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
      <CardShell title="Analisis IA" subtitle={`${data.aiAnalysis.confidence}% confianza`}>
        <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.05] p-5">
          <p className="text-xs uppercase tracking-wide text-green-400">
            Lectura principal
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight">
            {data.aiAnalysis.headline}
          </h3>
          <Progress
            className="mt-5"
            percent={data.aiAnalysis.confidence}
            showInfo={false}
            strokeColor="#22c55e"
            trailColor="rgba(255,255,255,.08)"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.aiAnalysis.comments.map((comment) => (
            <div
              key={comment.title}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
            >
              <span
                className={[
                  "inline-flex rounded-lg px-2 py-1 text-[11px] font-bold uppercase",
                  comment.tone === "green"
                    ? "bg-green-500/10 text-green-400"
                    : comment.tone === "yellow"
                      ? "bg-yellow-500/10 text-yellow-300"
                      : "bg-sky-500/10 text-sky-300",
                ].join(" ")}
              >
                IA
              </span>
              <h4 className="mt-3 font-bold">{comment.title}</h4>
              <p className="mt-2 text-sm leading-6 text-white/60">{comment.text}</p>
            </div>
          ))}
        </div>
      </CardShell>

      <div className="space-y-5">
        <CardShell title="Riesgos detectados">
          <div className="space-y-3">
            {data.aiAnalysis.riskFactors.map((factor) => (
              <p key={factor} className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm leading-6 text-white/65">
                {factor}
              </p>
            ))}
          </div>
        </CardShell>

        <CardShell title="Mercados sugeridos">
          <div className="space-y-4">
            {data.aiAnalysis.recommendedMarkets.map((market) => (
              <div key={market.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{market.label}</p>
                  <span className="text-lg font-bold text-green-400">{market.odd}</span>
                </div>
                <Progress
                  percent={market.confidence}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />
              </div>
            ))}
          </div>
        </CardShell>
      </div>
    </div>
  );
}

function PlayerMeter({
  name,
  value,
  color,
}: {
  name: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/55">
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={color}
        trailColor="rgba(255,255,255,.08)"
      />
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function AdvantageBox({
  title,
  color,
  items,
}: {
  title: string;
  color: "green" | "yellow";
  items: string[];
}) {
  const colorClass =
    color === "green"
      ? "border-green-500/20 bg-green-500/[0.04] text-green-400"
      : "border-yellow-500/20 bg-yellow-500/[0.04] text-yellow-300";

  return (
    <div className={["rounded-2xl border p-4", colorClass].join(" ")}>
      <h4 className="font-bold">{title}</h4>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="text-sm leading-6 text-white/65">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function H2HTimelineDrawer({
  data,
  open,
  onClose,
}: {
  data: MatchPageData;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width="min(620px, 100vw)"
      closeIcon={<span className="text-lg text-white/70 hover:text-white">x</span>}
      title={
        <div className="text-white">
          <p className="text-xs uppercase tracking-wide text-green-400">
            Historial completo
          </p>
          <h2 className="mt-1 text-xl font-bold">
            {data.players.left.name} vs {data.players.right.name}
          </h2>
        </div>
      }
      styles={{
        content: {
          background: "#0a1117",
          borderLeft: "1px solid rgba(34,197,94,.18)",
          color: "#fff",
          boxShadow: "-24px 0 60px rgba(0,0,0,.45)",
        },
        header: {
          background: "#0a1117",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          color: "#fff",
        },
        body: { background: "#0a1117", paddingTop: 18 },
        mask: { background: "rgba(3, 7, 10, .68)" },
      }}
    >
      <div className="relative space-y-5 pl-6">
        <span className="absolute bottom-4 left-[10px] top-2 w-px bg-green-500/25" />

        {data.h2h.matches.map((match, index) => {
          const leftWon = match.winner.includes("Sinner");

          return (
            <article
              key={`${match.date}-${match.tournament}`}
              className="relative rounded-2xl border border-white/5 bg-[#111820] p-4 shadow-lg shadow-black/20"
            >
              <span className="absolute -left-[22px] top-5 flex h-5 w-5 items-center justify-center rounded-full border border-green-500/40 bg-[#0a1117]">
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </span>

              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-white/45">{match.date}</p>
                  <h3 className="mt-1 font-bold text-green-400">{match.tournament}</h3>
                </div>
                <Tag color={leftWon ? "green" : "gold"}>
                  Ganador: {match.winner}
                </Tag>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <TimelineInfo label="Marcador" value={match.score} />
                <TimelineInfo label="Duracion" value={match.duration} />
                <TimelineInfo label="Superficie" value={match.surface} />
              </div>

              <p className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm leading-6 text-white/65">
                {match.note}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-green-500/10 bg-green-500/[0.04] px-3 py-2">
                <span className="text-xs uppercase tracking-wide text-white/40">
                  Dato clave
                </span>
                <span className="text-sm font-bold text-green-400">
                  {match.keyStat}
                </span>
              </div>

              {index === 0 && (
                <span className="mt-3 inline-flex rounded-lg border border-green-500/20 bg-green-500/10 px-2 py-1 text-[11px] font-bold uppercase text-green-400">
                  Enfrentamiento mas reciente
                </span>
              )}
            </article>
          );
        })}
      </div>
    </Drawer>
  );
}

function TimelineInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-white/35">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          {index < items.length - 1 && <span>{">"}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function HeroMatch({ data }: { data: MatchPageData }) {
  const { left, right } = data.players;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1218] px-5 py-6">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
        <PlayerHero player={left} align="left" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/20 text-2xl font-bold">
          VS
        </div>

        <PlayerHero player={right} align="right" />
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] md:grid-cols-5">
        <InfoMini label="Torneo" value={data.tournament} />
        <InfoMini label="Ronda" value={data.round} />
        <InfoMini label="Fecha" value={data.date} />
        <InfoMini label="Superficie" value={data.surface} />
        <InfoMini label="Mejor de" value={data.bestOf} />
      </div>
    </section>
  );
}

function PlayerHero({
  player,
  align,
}: {
  player: Player;
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "flex items-center gap-5",
        align === "right" ? "md:flex-row-reverse md:text-right" : "",
      ].join(" ")}
    >
      <img
        src={player.image}
        alt={player.name}
        className="h-36 w-36 rounded-2xl object-cover grayscale-[20%]"
      />

      <div>
        <h2 className="text-2xl font-bold">{player.name}</h2>

        <div
          className={[
            "mt-3 flex items-center gap-2 text-sm text-white/70",
            align === "right" ? "md:justify-end" : "",
          ].join(" ")}
        >
          <span>{player.country}</span>
          <span>{player.ranking}</span>
        </div>
      </div>
    </div>
  );
}

function InfoMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-r border-white/5 px-4 py-3 last:border-r-0 md:border-b-0">
      <p className="text-[11px] text-white/40">{label}</p>
      <p className="mt-1 text-xs font-semibold text-white/90">{value}</p>
    </div>
  );
}

function Tabs({
  activeTab,
  onChange,
}: {
  activeTab: DetailTab;
  onChange: (tab: DetailTab) => void;
}) {
  const tabs: { label: string; value: DetailTab }[] = [
    { label: "Resumen", value: "Resumen" },
    { label: "Estadisticas", value: "Estadisticas" },
    { label: "H2H", value: "H2H" },
    { label: "Analisis IA", value: "Analisis IA" },
  ];

  return (
    <div className="flex gap-7 overflow-x-auto border-b border-white/10">
      {tabs.map((tab) => {
        const active = activeTab === tab.value;

        return (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={[
            "whitespace-nowrap pb-3 text-sm font-semibold uppercase tracking-wide cursor-pointer",
            active
              ? "border-b-2 border-green-500 text-green-400"
              : "text-white/60",
          ].join(" ")}
        >
          {tab.label}
        </button>
        );
      })}
    </div>
  );
}

function CardShell({
  title,
  children,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#0c1319] p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">
          {title}
        </h3>

        {subtitle && <span className="text-xs text-white/45">{subtitle}</span>}
      </div>

      {children}
    </section>
  );
}

function RecentFormCard({
  leftPlayer,
  rightPlayer,
}: {
  leftPlayer: Player;
  rightPlayer: Player;
}) {
  return (
    <CardShell title="Forma reciente">
      <div className="grid grid-cols-2 gap-5">
        {[leftPlayer, rightPlayer].map((player) => (
          <div key={player.name}>
            <p className="mb-3 text-xs text-white/70">{player.name}</p>

            <div className="flex gap-2">
              {player.recentForm.map((result, index) => (
                <span
                  key={`${result}-${index}`}
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold",
                    result === "W" ? "bg-green-500 text-white" : "bg-red-500 text-white",
                  ].join(" ")}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function PerformanceCard({
  leftPlayer,
  rightPlayer,
}: {
  leftPlayer: Player;
  rightPlayer: Player;
}) {
  return (
    <CardShell title="Nivel de rendimiento" subtitle="Últimos 12 meses">
      <div className="space-y-4">
        {leftPlayer.stats.map((stat, index) => {
          const rightStat = rightPlayer.stats[index];

          return (
            <div
              key={stat.label}
              className="grid grid-cols-[95px_1fr_55px] items-center gap-3 text-sm"
            >
              <span className="text-white/65">{stat.label}</span>

              <div className="grid grid-cols-2 gap-4">
                <Progress
                  percent={Number(stat.value.replace("%", ""))}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />

                <Progress
                  percent={Number(rightStat.value.replace("%", ""))}
                  showInfo={false}
                  strokeColor="#f59e0b"
                  trailColor="rgba(255,255,255,.08)"
                />
              </div>

              <div className="flex justify-between text-white/80">
                <span>{stat.value}</span>
                <span>{rightStat.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

function WearCard({
  leftPlayer,
  rightPlayer,
}: {
  leftPlayer: Player;
  rightPlayer: Player;
}) {
  return (
    <CardShell title="Desgaste físico">
      <div className="grid grid-cols-2 gap-8">
        {[leftPlayer, rightPlayer].map((player) => (
          <div key={player.name} className="text-center">
            <Progress
              type="circle"
              percent={player.wearLevel}
              size={92}
              strokeColor={player.wearLevel > 60 ? "#ef4444" : "#22c55e"}
              trailColor="rgba(255,255,255,.08)"
              format={(value) => (
                <span className="text-lg font-bold text-white">{value}%</span>
              )}
            />

            <p
              className={[
                "mt-2 text-xs font-semibold",
                player.wearLevel > 60 ? "text-red-400" : "text-green-400",
              ].join(" ")}
            >
              {player.wearLabel}
            </p>

            <p className="mt-4 text-xs text-white/45">Últimos 7 días</p>

            <p className="mt-1 text-sm font-semibold">
              {player.wearLevel > 60 ? "4 partidos" : "2 partidos"}
            </p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function H2HCard({
  data,
  onOpenTimeline,
}: {
  data: MatchPageData;
  onOpenTimeline: () => void;
}) {
  const { left, right } = data.players;

  return (
    <CardShell title="H2H - Enfrentamientos directos">
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-400">{data.h2h.leftWins}</p>
          <p className="text-xs text-white/55">Victorias</p>
          <p className="mt-1 text-sm font-semibold">{left.name}</p>
        </div>

        <div className="text-center">
          <Progress
            type="circle"
            percent={(data.h2h.leftWins / data.h2h.total) * 100}
            size={96}
            strokeColor="#22c55e"
            trailColor="rgba(255,255,255,.08)"
            format={() => (
              <div>
                <p className="text-2xl font-bold text-white">{data.h2h.total}</p>
                <p className="text-[10px] text-white/45">Total</p>
              </div>
            )}
          />
        </div>

        <div className="text-center">
          <p className="text-4xl font-bold text-orange-400">
            {data.h2h.rightWins}
          </p>
          <p className="text-xs text-white/55">Victorias</p>
          <p className="mt-1 text-sm font-semibold">{right.name}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-white/5 pt-4">
        <p className="mb-3 text-xs font-semibold text-white/60">
          Últimos enfrentamientos
        </p>

        <div className="space-y-3">
          {data.h2h.matches.map((match) => (
            <div
              key={`${match.date}-${match.tournament}`}
              className="grid grid-cols-[80px_1fr_auto] gap-3 text-xs text-white/60"
            >
              <span>{match.date}</span>
              <span>{match.tournament}</span>
              <span className="text-white/90">
                {match.winner} {match.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        block
        onClick={onOpenTimeline}
        className="mt-5 border-green-500/50 bg-green-500/[0.04] text-green-400 hover:!border-green-400 hover:!text-green-300"
      >
        Ver todos los enfrentamientos
      </Button>
    </CardShell>
  );
}

function KeyStatsCard() {
  const stats = [
    ["Aces", "8.7", "6.2"],
    ["Dobles faltas", "1.3", "2.1"],
    ["% primer servicio", "68%", "62%"],
    ["Puntos ganados con 1er serv.", "74%", "70%"],
    ["Puntos ganados con 2do serv.", "55%", "52%"],
    ["Break points convertidos", "42%", "39%"],
    ["Puntos de break salvados", "61%", "58%"],
    ["Puntos totales ganados", "63%", "61%"],
  ];

  return (
    <CardShell title="Estadísticas clave" subtitle="Promedio por partido">
      <div className="space-y-3">
        {stats.map(([label, left, right]) => (
          <div
            key={label}
            className="grid grid-cols-[45px_1fr_45px] items-center gap-4 text-xs"
          >
            <span className="font-semibold text-white">{left}</span>

            <div className="grid grid-cols-[1fr_150px_1fr] items-center gap-3">
              <Progress
                percent={Number(left.replace("%", ""))}
                showInfo={false}
                strokeColor="#22c55e"
                trailColor="rgba(255,255,255,.08)"
              />

              <span className="text-center text-white/60">{label}</span>

              <Progress
                percent={Number(right.replace("%", ""))}
                showInfo={false}
                strokeColor="#facc15"
                trailColor="rgba(255,255,255,.08)"
              />
            </div>

            <span className="text-right font-semibold text-white">{right}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function PredictionCard({
  prediction,
}: {
  prediction: MatchPageData["prediction"];
}) {
  return (
    <CardShell title="Pick IA del partido">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold">{prediction.title}</h4>
          <p className="mt-4 text-xs uppercase text-white/45">Factores clave</p>
        </div>

        <Progress
          type="circle"
          percent={prediction.confidence}
          size={88}
          strokeColor="#22c55e"
          trailColor="rgba(255,255,255,.08)"
          format={(value) => (
            <span className="text-xl font-bold text-green-400">{value}%</span>
          )}
        />
      </div>

      <div className="mt-4 space-y-3">
        {prediction.factors.map((factor) => (
          <div key={factor} className="flex items-start gap-2 text-sm text-white/65">
            <span className="mt-0.5 text-green-400">✓</span>
            <span>{factor}</span>
          </div>
        ))}
      </div>

      {/* <Button block className="mt-5 border-white/10 bg-transparent text-white/80">
        Ver análisis completo
      </Button> */}
    </CardShell>
  );
}

function LastMatchesCard({ matches }: { matches: LastMatch[] }) {
  const difficultyColor: Record<LastMatch["difficulty"], string> = {
    Fácil: "green",
    Moderado: "gold",
    Difícil: "red",
  };

  return (
    <CardShell title="Últimos partidos - Análisis detallado">
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={`${match.date}-${match.opponent}`}
            className="grid grid-cols-[76px_1fr_auto] items-center gap-3 border-b border-white/5 pb-3 text-xs last:border-b-0"
          >
            <div className="text-white/50">
              <p>{match.date}</p>
              <p>{match.round}</p>
            </div>

            <div>
              <p className="font-semibold text-white/80">vs {match.opponent}</p>
              <p className="text-white/45">{match.duration}</p>
            </div>

            <div className="text-right">
              <p className="mb-1 font-bold text-white">{match.score}</p>
              <Tag color={difficultyColor[match.difficulty]}>
                {match.difficulty}
              </Tag>
            </div>
          </div>
        ))}
      </div>

      {/* <Button block className="mt-5 border-white/10 bg-transparent text-white/80">
        Ver todos los partidos
      </Button> */}
    </CardShell>
  );
}

function AdditionalInfoCard({ data }: { data: MatchPageData }) {
  return (
    <CardShell title="Información adicional">
      <div className="space-y-4">
        {data.additionalInfo.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[1fr_80px_80px] items-center gap-3 text-sm"
          >
            <span className="text-white/55">{item.label}</span>
            <span className="text-right text-white/90">{item.leftValue}</span>
            <span className="text-right text-white/90">{item.rightValue}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

import { Head, router } from "@inertiajs/react";
import { Button, Progress } from "antd";
import DashboardLayout from "@/components/layout/DashboardLayout";
import type { DashboardData, FeaturedMatch, HighlightStat, LiveMatch } from "@/interface";
import { dashboardData } from "@/services/datosMock";

export default function Welcome() {
  return (
    <>
      <Head title="Inicio" />
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-5 px-5 pb-8 pt-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <FeaturedMatches matches={dashboardData.featuredMatches} />

          <LiveNow matches={dashboardData.liveMatches} />

          <HighlightedStats stats={dashboardData.highlightStats} />
        </section>

        <aside className="space-y-5">
          <PickOfDay data={dashboardData.pickOfDay} />

          <Trends trends={dashboardData.trends} />

          <CommunityPicks picks={dashboardData.communityPicks} />
        </aside>
        </div>
      </DashboardLayout>
    </>
  );
}

function FeaturedMatches({ matches }: { matches: FeaturedMatch[] }) {
  return (
    <section>
      <SectionTitle title="Partidos destacados" />

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {matches.map((match) => (
          <FeaturedMatchCard key={`${match.league}-${match.leftName}`} match={match} />
        ))}
      </div>
    </section>
  );
}

function FeaturedMatchCard({ match }: { match: FeaturedMatch }) {
  return (
    <article className="cursor-pointer rounded-2xl border border-white/5 bg-[#111820] p-4 shadow-xl shadow-black/20" onClick={() => router.visit("/detalle")}>
      <div className="mb-5 flex items-center justify-between text-xs text-white/55">
        <span>{match.league}</span>
        <span>{match.time}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamPreview name={match.leftName} image={match.leftImage} />

        <span className="font-bold text-green-400">VS</span>

        <TeamPreview name={match.rightName} image={match.rightImage} />
      </div>

      <p className="mt-5 text-center text-xs text-white/55">Cuota promedio</p>

      <div
        className={[
          "mt-2 grid gap-2",
          match.odds.length === 3 ? "grid-cols-3" : "grid-cols-2",
        ].join(" ")}
      >
        {match.odds.map((odd) => (
          <button
            key={odd}
            className="rounded-lg border border-green-500/10 bg-green-500/[0.03] py-2 text-lg font-semibold text-green-400"
          >
            {odd}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 border-t border-white/5 pt-4">
        <div>
          <p className="text-xs text-white/45">Confianza IA</p>
          <p className="text-2xl font-bold">{match.confidence}%</p>
        </div>

        <div>
          <p className="text-xs text-white/45">Tendencia</p>
          <p className="flex items-center gap-2 text-lg font-semibold">
            {match.trend}

            {match.trend === "Al alza" && (
              <span className="text-green-400">↑</span>
            )}

            {match.trend === "Estable" && (
              <span className="text-white/60">—</span>
            )}

            {match.trend === "A la baja" && (
              <span className="text-red-400">↓</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

function TeamPreview({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="h-16 w-16 rounded-xl object-contain"
      />

      <p className="mt-3 text-base font-semibold leading-5">{name}</p>
    </div>
  );
}

function LiveNow({ matches }: { matches: LiveMatch[] }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-red-500">((●))</span>
          <h2 className="text-base font-bold uppercase tracking-wide">
            En vivo ahora
          </h2>
        </div>

        {/* <div className="flex gap-5 text-sm">
          {["Todos", "Fútbol", "Tenis", "NBA"].map(
            (item, index) => (
              <button
                key={item}
                className={index === 0 ? "text-green-400" : "text-white/55"}
              >
                {item}
              </button>
            )
          )}
        </div> */}
      </div>

      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.7fr] px-3 pb-2 text-xs uppercase text-white/45 md:grid">
        <span>Partido</span>
        <span>Marcador</span>
        <span>Tiempo</span>
        <span>Estadísticas rápidas</span>
        {/* <span>Ver</span> */}
      </div>

      <div className="divide-y divide-white/5">
        {matches.map((match) => (
          <div
            key={`${match.league}-${match.leftName}`}
            className="grid grid-cols-1 gap-4 px-3 py-4 md:grid-cols-[1.5fr_1fr_1fr_1.7fr] md:items-center"
          >
            <div>
              <p className="mb-1 text-xs text-white/45">{match.league}</p>
              <p className="font-semibold leading-5">{match.leftName}</p>
              <p className="font-semibold leading-5">{match.rightName}</p>
            </div>

            <p className="font-mono text-lg font-bold text-white/90">
              {match.score}
            </p>

            <p className="text-sm font-semibold text-green-400">{match.time}</p>

            <div>
              <div className="mb-1 flex justify-between text-xs text-white/60">
                <span>{match.quickStatLabel}</span>
                <span>
                  {match.leftStat}% / {match.rightStat}%
                </span>
              </div>

              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <Progress
                  percent={match.leftStat}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />

                <Progress
                  percent={match.rightStat}
                  showInfo={false}
                  strokeColor="#6b7280"
                  trailColor="rgba(255,255,255,.08)"
                />
              </div>
            </div>

            {/* <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:border-green-500/60 hover:text-green-400">
              <BarChartOutlined />
            </button> */}
          </div>
        ))}
      </div>
    </section>
  );
}

function HighlightedStats({ stats }: { stats: HighlightStat[] }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex flex-wrap items-center gap-8">
        <SectionTitle title="Estadísticas destacadas" />

        {/* <div className="flex gap-7 text-sm">
          <button className="border-b border-green-500 pb-1 text-green-400">
            Tenis
          </button>
          <button className="text-white/55">Fútbol</button>
          <button className="text-white/55">NBA</button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
          >
            <h3 className="font-bold">{stat.title}</h3>

            {stat.subtitle && (
              <p className="text-xs text-white/45">{stat.subtitle}</p>
            )}

            <div className="mt-5 space-y-4">
              {stat.rows.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-[34px_1fr_auto] items-center gap-3"
                >
                  <img
                    src={row.image}
                    alt={row.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm text-white/80">{row.name}</p>
                    <Progress
                      percent={row.percent}
                      showInfo={false}
                      strokeColor="#22c55e"
                      trailColor="rgba(255,255,255,.12)"
                    />
                  </div>

                  <p className="text-sm font-semibold">{row.value}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PickOfDay({ data }: { data: DashboardData["pickOfDay"] }) {
  return (
    <section className="rounded-2xl border border-green-500/40 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <h2 className="mb-5 text-base font-bold uppercase tracking-wide">
        Pick IA del día
      </h2>

      <div className="mb-5 rounded-xl border border-white/5 bg-white/[0.03] p-3">
        <div className="flex items-center justify-between text-xs text-white/55">
          <span>{data.league}</span>
          <span>{data.time}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold">{data.title}</h3>

        <Progress
          type="circle"
          percent={data.confidence}
          size={86}
          strokeColor="#22c55e"
          trailColor="rgba(255,255,255,.08)"
          format={(value) => (
            <div className="leading-none">
              <p className="text-[10px] text-green-400">Confianza IA</p>
              <p className="text-xl font-bold text-white">{value}%</p>
            </div>
          )}
        />
      </div>

      <p className="mt-4 text-sm font-semibold">Razones:</p>

      <div className="mt-3 space-y-3">
        {data.reasons.map((reason) => (
          <p key={reason} className="flex gap-3 text-sm text-white/65">
            <span className="text-green-400">✓</span>
            {reason}
          </p>
        ))}
      </div>

      {/* <Button
        block
        className="mt-6 border-green-500/60 bg-transparent text-green-400 hover:!border-green-400 hover:!text-green-300"
      >
        Ver análisis completo
      </Button> */}
    </section>
  );
}

function Trends({ trends }: { trends: string[] }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <h2 className="mb-5 text-base font-bold uppercase tracking-wide">
        Tendencias del día
      </h2>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend}
            className="grid grid-cols-[20px_1fr_20px] gap-3 text-sm text-white/75"
          >
            <span className="text-green-400">↗</span>
            <span>{trend}</span>
            <span className="text-green-400">↑</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommunityPicks({
  picks,
}: {
  picks: DashboardData["communityPicks"];
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <h2 className="mb-5 text-base font-bold uppercase tracking-wide">
        Picks comunidad
      </h2>

      <div className="space-y-5">
        {picks.map((pick) => (
          <div key={pick.title}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-white/80">{pick.title}</p>
              <p className="font-semibold">{pick.odd}</p>
            </div>

            <div className="grid grid-cols-[35px_1fr_35px] items-center gap-2">
              <span className="text-xs font-bold text-green-400">
                {pick.change}
              </span>

              <Progress
                percent={pick.percent}
                showInfo={false}
                strokeColor="#22c55e"
                trailColor="rgba(255,255,255,.12)"
              />

              <span className="text-right text-xs text-white/45">
                {pick.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button
        block
        className="mt-6 border-green-500/60 bg-transparent text-green-400 hover:!border-green-400 hover:!text-green-300"
      >
        Ver más
      </Button>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-1 rounded-full bg-green-500" />
      <h2 className="text-base font-bold uppercase tracking-wide">{title}</h2>
    </div>
  );
}

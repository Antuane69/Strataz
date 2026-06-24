import {
  AlertOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Head } from "@inertiajs/react";
import { Button, Progress, Tag } from "antd";
import type { ReactNode } from "react";
import type {
  LiveGame} from "@/services/enVivoMock";
import {
  liveGamesPageMock,
} from "@/services/enVivoMock";

export default function Page() {
  return (
    <>
      <Head title="En vivo" />
      <div className="px-5 pb-8 pt-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-red-400">
              Marcadores en directo
            </p>
            <h1 className="mt-2 text-3xl font-bold">Juegos en vivo</h1>
            {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Cards para partidos activos con cuotas, momentum, eventos y stats
              listas para conectarse a informacion real.
            </p> */}
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111820] px-4 py-3 text-sm text-white/60">
            Actualizado:{" "}
            <span className="font-semibold text-white">
              {liveGamesPageMock.generatedAt}
            </span>
          </div>
        </div>

        {/* <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {liveGamesPageMock.summary.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-white/5 bg-[#111820] p-5"
            >
              <p className="text-xs uppercase tracking-wide text-white/45">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold">{item.value}</p>
            </article>
          ))}
        </section> */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <section className="space-y-5">
            {/* <div className="flex flex-wrap gap-2">
              <button className="rounded-xl border border-green-500/60 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                Todos
              </button>
              {liveGamesPageMock.filters.map((sport) => (
                <button
                  key={sport}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/65"
                >
                  {sport}
                </button>
              ))}
            </div> */}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {liveGamesPageMock.matches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <SideCard title="Movimientos de mercado" icon={<FireOutlined />}>
              <div className="space-y-4">
                {liveGamesPageMock.marketMovers.map((move) => (
                  <div
                    key={move.label}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Tag
                        color={
                          move.sport === "Futbol"
                            ? "green"
                            : move.sport === "Tenis"
                              ? "gold"
                              : "blue"
                        }
                      >
                        {move.sport}
                      </Tag>
                      <span className="text-xs font-bold text-green-400">
                        {move.change}
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{move.label}</p>
                    <p className="mt-2 text-2xl font-bold">{move.odd}</p>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard title="Alertas IA" icon={<AlertOutlined />}>
              <div className="space-y-3 text-sm text-white/65">
                <p>Madrid supera 65% de momentum y mantiene presion alta.</p>
                <p>Sinner aumenta efectividad al primer servicio en puntos clave.</p>
                <p>Celtics generan mas tiros abiertos tras bloqueo indirecto.</p>
              </div>
              <Button
                block
                className="mt-5 border-green-500/60 bg-transparent text-green-400 hover:!border-green-400 hover:!text-green-300"
              >
                Ver más
              </Button>
            </SideCard>
          </aside>
        </div>
      </div>
    </>
  );
}

function LiveMatchCard({ match }: { match: LiveGame }) {
  const sportColor =
    match.sport === "Futbol"
      ? "green"
      : match.sport === "Tenis"
        ? "gold"
        : "blue";

  return (
    <article className="rounded-2xl border border-white/5 bg-[#0c1319] p-5 shadow-xl shadow-black/20">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Tag color={sportColor}>{match.sport}</Tag>
          <p className="mt-2 text-sm text-white/55">{match.competition}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
          <ClockCircleOutlined />
          {match.clock}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamBlock team={match.home} align="left" />
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
          <p className="font-mono text-2xl font-bold">
            {match.home.score} - {match.away.score}
          </p>
          <p className="mt-1 text-[11px] uppercase text-white/40">Live</p>
        </div>
        <TeamBlock team={match.away} align="right" />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-white/55">
          <span>Momentum</span>
          <span>{match.momentum}%</span>
        </div>
        <Progress
          percent={match.momentum}
          showInfo={false}
          strokeColor="#22c55e"
          trailColor="rgba(255,255,255,.08)"
        />
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        <OddButton label="Local" value={match.odds.home} />
        {match.odds.draw && <OddButton label="Empate" value={match.odds.draw} />}
        <OddButton label="Visita" value={match.odds.away} />
      </div>

      <div className="mt-5 grid gap-3">
        {match.keyStats.map((stat) => (
          <div
            key={stat.label}
            className="grid grid-cols-[48px_1fr_48px] items-center gap-3 text-xs"
          >
            <span className="font-bold">{stat.home}</span>
            <div>
              <div className="mb-1 text-center text-white/45">{stat.label}</div>
              <div className="grid grid-cols-2 gap-1">
                <Progress
                  percent={stat.home}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />
                <Progress
                  percent={stat.away}
                  showInfo={false}
                  strokeColor="#38bdf8"
                  trailColor="rgba(255,255,255,.08)"
                />
              </div>
            </div>
            <span className="text-right font-bold">{stat.away}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
        {match.events.map((event) => (
          <div
            key={`${event.minute}-${event.text}`}
            className="grid grid-cols-[48px_1fr] gap-3 text-xs text-white/60"
          >
            <span className="font-bold text-green-400">{event.minute}</span>
            <span>{event.text}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function TeamBlock({
  team,
  align,
}: {
  team: LiveGame["home"];
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        align === "right" ? "flex-row-reverse text-right" : "",
      ].join(" ")}
    >
      <img src={team.image} alt={team.name} className="h-12 w-12 rounded-xl object-contain" />
      <p className="text-sm font-semibold leading-5">{team.name}</p>
    </div>
  );
}

function OddButton({ label, value }: { label: string; value: string }) {
  return (
    <button className="rounded-xl border border-green-500/15 bg-green-500/[0.04] px-3 py-2 text-left">
      <span className="block text-[11px] text-white/45">{label}</span>
      <span className="text-lg font-bold text-green-400">{value}</span>
    </button>
  );
}

function SideCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <div className="mb-5 flex items-center gap-3">
        <span className="text-green-400">{icon}</span>
        <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}

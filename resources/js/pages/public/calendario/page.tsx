import {
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Head } from "@inertiajs/react";
import { Drawer, Progress, Tag } from "antd";
import { useMemo, useState } from "react";
import type { CalendarMatch } from "@/services/calendarioMock";
import { calendarPageMock } from "@/services/calendarioMock";

const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const days = useMemo(() => buildMonthDays(calendarPageMock.month), []);
  const matchesByDate = useMemo(() => {
    return calendarPageMock.matches.reduce<Record<string, CalendarMatch[]>>(
      (acc, match) => {
        acc[match.date] = [...(acc[match.date] ?? []), match].sort((a, b) =>
          a.time.localeCompare(b.time)
        );

        return acc;
      },
      {}
    );
  }, []);

  const selectedMatches = selectedDate ? matchesByDate[selectedDate] ?? [] : [];

  return (
    <>
      <Head title="Calendario" />
      <div className="px-5 pb-8 pt-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-400">
              Agenda deportiva
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Calendario de {calendarPageMock.monthLabel}
            </h1>
            {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Los partidos mas interesantes de futbol, tenis y NBA por dia. Al
              seleccionar una fecha se abre el detalle ordenado por hora.
            </p> */}
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111820] px-4 py-3 text-sm text-white/60">
            Actualizado:{" "}
            <span className="font-semibold text-white">
              {calendarPageMock.generatedAt}
            </span>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/5 bg-[#0c1319] p-4 shadow-xl shadow-black/20">
            <div className="overflow-x-auto">
              <div className="mb-4 grid min-w-[860px] grid-cols-7 gap-2 xl:min-w-0">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="rounded-xl border border-white/5 bg-white/[0.03] py-3 text-center text-xs font-bold uppercase tracking-wide text-white/45"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid min-w-[860px] grid-cols-7 gap-2 xl:min-w-0">
                {days.map((day, index) =>
                  day ? (
                    <CalendarDay
                      key={day.date}
                      day={day}
                      matches={matchesByDate[day.date] ?? []}
                      onClick={() => setSelectedDate(day.date)}
                    />
                  ) : (
                    <div key={`blank-${index}`} className="min-h-[188px]" />
                  )
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <SummaryCard matches={calendarPageMock.matches} />

            <section className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
              <div className="mb-5 flex items-center gap-3">
                <FireOutlined className="text-green-400" />
                <h2 className="text-sm font-bold uppercase tracking-wide">
                  Dias fuertes
                </h2>
              </div>

              <div className="space-y-4">
                {getTopDays(matchesByDate).map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] p-4 text-left transition hover:border-green-500/40"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">{formatDate(day.date)}</span>
                      <Tag color="green">{day.count} juegos</Tag>
                    </div>
                    <p className="text-sm text-white/55">{day.featured}</p>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>

      <Drawer
        open={Boolean(selectedDate)}
        onClose={() => setSelectedDate(null)}
        placement="right"
        width="min(560px, 100vw)"
        className="calendar-drawer"
        closeIcon={<span className="text-lg text-white/70 hover:text-white">x</span>}
        title={
          <div className="text-white">
            <p className="text-xs uppercase tracking-wide text-green-400">
              Juegos del dia
            </p>
            <h2 className="mt-1 text-xl font-bold">
              {selectedDate ? formatDate(selectedDate) : ""}
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
          body: { background: "#0a1117", paddingTop: 16 },
          mask: { background: "rgba(3, 7, 10, .68)" },
        }}
      >
        <div className="space-y-4 pr-1">
          {selectedMatches.map((match) => (
            <MatchDetailCard key={match.id} match={match} />
          ))}
        </div>
      </Drawer>
    </>
  );
}

function CalendarDay({
  day,
  matches,
  onClick,
}: {
  day: MonthDay;
  matches: CalendarMatch[];
  onClick: () => void;
}) {
  const featured = matches[0];
  const highCount = matches.filter((match) => match.importance === "Alta").length;

  return (
    <button
      onClick={onClick}
      className="flex min-h-[188px] flex-col rounded-2xl border border-white/5 bg-[#111820] p-3 text-left transition hover:border-green-500/50 hover:bg-[#14202a]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-sm font-bold">
          {day.day}
        </span>
        <span className="text-xs text-white/45">{matches.length} juegos</span>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="h-6">
          {featured ? (
            <Tag color={sportColor(featured.sport)}>{featured.sport}</Tag>
          ) : (
            <span className="inline-flex h-[22px]" />
          )}
        </div>

        <p className="mt-2 min-h-10 overflow-hidden text-sm font-semibold leading-5 text-white">
          {featured?.title ?? "Sin partidos destacados"}
        </p>

        <p className="mt-2 flex min-h-5 items-center gap-2 text-xs text-white/45">
          {featured && (
            <>
              <ClockCircleOutlined />
              {featured.time}
            </>
          )}
        </p>

        <div className="mt-3 min-h-6">
          {matches.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {matches.slice(1, 4).map((match) => (
                <span
                  key={match.id}
                  className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/55"
                >
                  {match.sport}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-white/5 pt-3">
          <p className="min-h-4 text-xs font-semibold text-green-400">
            {highCount > 0 ? `${highCount} de alta relevancia` : null}
          </p>
        </div>
      </div>
    </button>
  );
}

function MatchDetailCard({ match }: { match: CalendarMatch }) {
  return (
    <article className="rounded-2xl border border-white/8 bg-[#111820] p-4 shadow-lg shadow-black/20">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <InfoPill label="Deporte" value={match.sport} tone={match.sport} />
          <InfoPill
            label="Relevancia"
            value={match.importance}
            tone={match.importance}
          />
        </div>
        <span className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm font-bold text-green-300">
          <ClockCircleOutlined />
          {match.time}
        </span>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#0c1319] p-4">
        <h3 className="text-lg font-bold leading-6 text-white">{match.title}</h3>
        <p className="mt-2 text-sm text-white/55">{match.competition}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-white/35">
              Sede
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/75">
              <PushpinOutlined className="text-green-400" />
              {match.venue}
            </p>
          </div>

          <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-white/35">
              Pick sugerido
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {match.prediction}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
        <Odd label="Local / Favorito" value={match.odds.home} />
        {match.odds.draw && <Odd label="Empate" value={match.odds.draw} />}
        <Odd label="Visita / Rival" value={match.odds.away} />
      </div>
    </article>
  );
}

function SummaryCard({ matches }: { matches: CalendarMatch[] }) {
  const total = matches.length;
  const counts = {
    Futbol: matches.filter((match) => match.sport === "Futbol").length,
    Tenis: matches.filter((match) => match.sport === "Tenis").length,
    NBA: matches.filter((match) => match.sport === "NBA").length,
  };

  return (
    <section className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <div className="mb-5 flex items-center gap-3">
        <CalendarOutlined className="text-green-400" />
        <h2 className="text-sm font-bold uppercase tracking-wide">
          Resumen del mes
        </h2>
      </div>

      <p className="text-4xl font-bold">{total}</p>
      <p className="mt-2 text-sm text-white/55">partidos destacados</p>

      <div className="mt-5 space-y-4">
        {(Object.keys(counts) as CalendarMatch["sport"][]).map((sport) => (
          <div key={sport}>
            <div className="mb-1 flex justify-between text-xs text-white/55">
              <span>{sport}</span>
              <span>{counts[sport]}</span>
            </div>
            <Progress
              percent={Math.round((counts[sport] / total) * 100)}
              showInfo={false}
              strokeColor={
                sport === "Futbol"
                  ? "#22c55e"
                  : sport === "Tenis"
                    ? "#f59e0b"
                    : "#38bdf8"
              }
              trailColor="rgba(255,255,255,.08)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Odd({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0c1319] px-3 py-2">
      <p className="text-[11px] text-white/45">{label}</p>
      <p className="mt-1 text-lg font-bold text-green-300">{value}</p>
    </div>
  );
}

function InfoPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: CalendarMatch["sport"] | CalendarMatch["importance"];
}) {
  const color =
    tone === "Futbol" || tone === "Alta"
      ? "border-green-500/25 bg-green-500/10 text-green-300"
      : tone === "Tenis" || tone === "Media"
        ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-200"
        : "border-sky-500/25 bg-sky-500/10 text-sky-200";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs",
        color,
      ].join(" ")}
    >
      <span className="text-white/45">{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

type MonthDay = {
  date: string;
  day: number;
};

function buildMonthDays(month: string): Array<MonthDay | null> {
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDate = new Date(year, monthNumber - 1, 1);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const firstWeekDay = (firstDate.getDay() + 6) % 7;
  const blanks = Array.from({ length: firstWeekDay }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    return {
      day,
      date: `${year}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });

  return [...blanks, ...days];
}

function getTopDays(matchesByDate: Record<string, CalendarMatch[]>) {
  return Object.entries(matchesByDate)
    .map(([date, matches]) => ({
      date,
      count: matches.length,
      featured: matches[0]?.title ?? "Sin partidos destacados",
      highCount: matches.filter((match) => match.importance === "Alta").length,
    }))
    .sort((a, b) => b.highCount - a.highCount || b.count - a.count)
    .slice(0, 4);
}

function formatDate(date: string) {
  const [, month, day] = date.split("-");

  return `${day}/${month}/${date.slice(0, 4)}`;
}

function sportColor(sport: CalendarMatch["sport"]) {
  if (sport === "Futbol") {
    return "green";
  }

  if (sport === "Tenis") {
    return "gold";
  }

  return "blue";
}

import {
  BarChartOutlined,
  FireOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Head } from "@inertiajs/react";
import { Progress, Tag } from "antd";
import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  DonutPoint,
  LinePoint,
  MarketBarPoint,
  MetricCard,
  RankingRow} from "@/services/estadisticasMock";
import {
  statisticsPageMock,
} from "@/services/estadisticasMock";

const sportColors = {
  futbol: "#22c55e",
  tenis: "#f59e0b",
  nba: "#38bdf8",
};

export default function Page() {
  return (
    <>
      <Head title="Estadísticas" />
      <div className="px-5 pb-8 pt-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-400">
              Centro de analitica
            </p>
            <h1 className="mt-2 text-3xl font-bold">Estadisticas deportivas</h1>
            {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Lectura inventada para futbol, tenis y NBA con la misma forma que
              podrias llenar desde una API o scraping deportivo.
            </p> */}
          </div>

          {/* <div className="flex flex-wrap gap-2">
            {statisticsPageMock.filters.sports.map((sport, index) => (
              <button
                key={sport}
                className={[
                  "rounded-xl border px-4 py-2 text-sm font-semibold",
                  index === 0
                    ? "border-green-500/60 bg-green-500/10 text-green-400"
                    : "border-white/10 bg-white/[0.03] text-white/65",
                ].join(" ")}
              >
                {sport}
              </button>
            ))}
          </div> */}
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statisticsPageMock.heroMetrics.map((metric) => (
            <MetricTile key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_.65fr]">
          <CardShell
            title="Oportunidad por mercado"
            subtitle="Score de valor 0-100 para decidir donde mirar primero"
            icon={<BarChartOutlined />}
          >
            <GroupedBarChart data={statisticsPageMock.marketOpportunity} />
          </CardShell>

          <CardShell
            title="Calidad de picks"
            subtitle="Que porcentaje merece accion real"
            icon={<PieChartOutlined />}
          >
            <DonutChart data={statisticsPageMock.pickQualityMix} />
          </CardShell>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <CardShell
            title="Indice de anotacion"
            subtitle="Ultimas jornadas"
            icon={<LineChartOutlined />}
          >
            <LineChart data={statisticsPageMock.scoringTrend} />
          </CardShell>

          <CardShell title="Ranking de rendimiento" icon={<FireOutlined />}>
            <RankingTable rows={statisticsPageMock.teamRankings} />
          </CardShell>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <CardShell title="Mapa de valor por mercado" subtitle="Verde fuerte = mejor oportunidad">
            <HeatMap
              rows={statisticsPageMock.opportunityMatrix.rows}
              sports={statisticsPageMock.opportunityMatrix.sports}
              values={statisticsPageMock.opportunityMatrix.values}
              actions={statisticsPageMock.opportunityMatrix.actions}
            />
          </CardShell>

          <div className="space-y-5">
            {statisticsPageMock.insights.map((insight) => (
              <article
                key={insight.title}
                className="rounded-2xl border border-white/5 bg-[#0c1319] p-5 shadow-xl shadow-black/20"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Tag color="green">{insight.sport}</Tag>
                  <span className="text-xs text-white/45">
                    {insight.confidence}% confianza
                  </span>
                </div>
                <h3 className="text-base font-bold">{insight.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {insight.text}
                </p>
                <Progress
                  className="mt-4"
                  percent={insight.confidence}
                  showInfo={false}
                  strokeColor="#22c55e"
                  trailColor="rgba(255,255,255,.08)"
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function MetricTile({ metric }: { metric: MetricCard }) {
  const trendColor =
    metric.trend === "up"
      ? "text-green-400"
      : metric.trend === "down"
        ? "text-red-400"
        : "text-sky-300";

  return (
    <article className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
      <p className="text-xs uppercase tracking-wide text-white/45">{metric.label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-3xl">{metric.value}</strong>
        <span className={`text-sm font-bold ${trendColor}`}>{metric.change}</span>
      </div>
      <p className="mt-3 text-sm text-white/50">{metric.helper}</p>
    </article>
  );
}

function CardShell({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[#0c1319] p-5 shadow-xl shadow-black/20">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && <span className="text-lg text-green-400">{icon}</span>}
          <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-white/45">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function GroupedBarChart({ data }: { data: MarketBarPoint[] }) {
  return (
    <div className="h-[310px]">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,.55)", fontSize: 12 }} />
          <YAxis tick={{ fill: "rgba(255,255,255,.45)", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,.04)" }}
            contentStyle={{
              background: "#111820",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 12,
              color: "#fff",
            }}
          />
          <Bar dataKey="futbol" fill={sportColors.futbol} radius={[6, 6, 0, 0]} />
          <Bar dataKey="tenis" fill={sportColors.tenis} radius={[6, 6, 0, 0]} />
          <Bar dataKey="nba" fill={sportColors.nba} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/55">
        {(["futbol", "tenis", "nba"] as const).map((sport) => (
          <span key={sport} className="flex items-center gap-2 capitalize">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: sportColors[sport] }}
            />
            {sport === "futbol" ? "Futbol" : sport === "tenis" ? "Tenis" : "NBA"}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-white/45">
        Un score alto significa mejor combinacion entre forma reciente, linea disponible y riesgo.
      </p>
    </div>
  );
}

function LineChart({ data }: { data: LinePoint[] }) {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,.55)", fontSize: 12 }} />
          <YAxis tick={{ fill: "rgba(255,255,255,.45)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#111820",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 12,
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={4}
            dot={{ r: 4, fill: "#f8fafc", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#22c55e", stroke: "#f8fafc" }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

function DonutChart({ data }: { data: DonutPoint[] }) {
  return (
    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[180px_1fr]">
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={54}
              outerRadius={78}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.label} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#111820",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm text-white/70">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <strong>{item.value}%</strong>
          </div>
        ))}
        <p className="pt-2 text-xs leading-5 text-white/45">
          La dona separa picks accionables de selecciones que conviene vigilar o evitar.
        </p>
      </div>
    </div>
  );
}

function RankingTable({ rows }: { rows: RankingRow[] }) {
  return (
    <div className="divide-y divide-white/5">
      {rows.map((row) => (
        <div
          key={row.team}
          className="grid grid-cols-1 gap-4 py-4 md:grid-cols-[44px_1fr_90px_150px] md:items-center"
        >
          <span className="text-lg font-bold text-white/45">#{row.rank}</span>
          <div>
            <p className="font-semibold">{row.team}</p>
            <p className="text-xs text-white/45">{row.league}</p>
          </div>
          <Tag color={row.sport === "futbol" ? "green" : row.sport === "tenis" ? "gold" : "blue"}>
            {row.sport.toUpperCase()}
          </Tag>
          <div>
            <div className="mb-1 flex justify-between text-xs text-white/55">
              <span>Rating</span>
              <span>{row.rating}</span>
            </div>
            <Progress
              percent={row.rating}
              showInfo={false}
              strokeColor={sportColors[row.sport]}
              trailColor="rgba(255,255,255,.08)"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HeatMap({
  rows,
  sports,
  values,
  actions,
}: {
  rows: string[];
  sports: string[];
  values: number[][];
  actions: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[150px_repeat(3,1fr)_180px] gap-2 text-xs text-white/45">
          <span />
          {sports.map((sport) => (
            <span key={sport} className="text-center">
              {sport}
            </span>
          ))}
          <span>Accion sugerida</span>
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((row, rowIndex) => (
            <div
              key={row}
              className="grid grid-cols-[150px_repeat(3,1fr)_180px] items-center gap-2"
            >
              <span className="text-sm text-white/65">{row}</span>
              {values[rowIndex].map((value, index) => (
                <div
                  key={`${row}-${sports[index]}`}
                  className="rounded-xl border border-white/5 px-3 py-3 text-center"
                  style={{
                    backgroundColor: heatColor(value),
                  }}
                >
                  <p className="text-base font-bold text-white">{value}</p>
                  <p className="mt-1 text-[11px] text-white/50">
                    {value >= 80 ? "Fuerte" : value >= 65 ? "Interesante" : "Cuidado"}
                  </p>
                </div>
              ))}
              <div className="rounded-xl border border-green-500/10 bg-green-500/[0.04] px-3 py-3 text-sm leading-5 text-white/70">
                {actions[rowIndex]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function heatColor(value: number) {
  if (value >= 80) {
return "rgba(34, 197, 94, .36)";
}

  if (value >= 65) {
return "rgba(245, 158, 11, .26)";
}

  return "rgba(239, 68, 68, .16)";
}

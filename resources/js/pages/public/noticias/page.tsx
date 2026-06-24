import {
  ClockCircleOutlined,
  FireOutlined,
  ReadOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Head } from "@inertiajs/react";
import { Button, Tag } from "antd";
import type { ReactNode } from "react";
import type {
  NewsSport,
  SportArticle} from "@/services/noticiasMock";
import {
  newsPageMock,
} from "@/services/noticiasMock";

export default function Page() {
  return (
    <>
      <Head title="Noticias" />
      <div className="px-5 pb-8 pt-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-400">
              Sala de noticias
            </p>
            <h1 className="mt-2 text-3xl font-bold">Noticias deportivas</h1>
            {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Bloques editoriales listos para conectar con fuentes externas:
              portada, notas, etiquetas, impacto y resumen rapido.
            </p> */}
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111820] px-4 py-3 text-sm text-white/60">
            Actualizado:{" "}
            <span className="font-semibold text-white">{newsPageMock.generatedAt}</span>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <FeaturedNews article={newsPageMock.featured} />

          <aside className="space-y-5">
            <SideCard title="Temas calientes" icon={<FireOutlined />}>
              <div className="space-y-3">
                {newsPageMock.topics.map((topic) => (
                  <div
                    key={topic.label}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <TagOutlined className="text-green-400" />
                      {topic.label}
                    </span>
                    <strong>{topic.count}</strong>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard title="Briefing rapido" icon={<ReadOutlined />}>
              <div className="space-y-4">
                {newsPageMock.briefings.map((briefing) => (
                  <div key={briefing.title} className="border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                    <Tag color={sportColor(briefing.sport)}>{briefing.sport}</Tag>
                    <h3 className="mt-2 text-sm font-bold">{briefing.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {briefing.text}
                    </p>
                  </div>
                ))}
              </div>
            </SideCard>
          </aside>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {newsPageMock.articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </section>
      </div>
    </>
  );
}

function FeaturedNews({ article }: { article: SportArticle }) {
  return (
    <article className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/5 bg-[#0c1319] shadow-xl shadow-black/20">
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070c10] via-[#070c10]/65 to-transparent" />

      <div className="relative flex min-h-[420px] flex-col justify-end p-6 lg:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Tag color={sportColor(article.sport)}>{article.sport}</Tag>
          <Tag color={impactColor(article.impact)}>Impacto {article.impact}</Tag>
        </div>

        <h2 className="max-w-3xl text-3xl font-bold leading-tight lg:text-4xl">
          {article.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
          {article.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-white/55">
          <span>{article.source}</span>
          <span className="flex items-center gap-2">
            <ClockCircleOutlined />
            {article.publishedAt}
          </span>
          <span>{article.readTime} lectura</span>
        </div>

        <Button className="mt-6 w-fit border-green-500/60 bg-green-500/10 text-green-400 hover:!border-green-400 hover:!text-green-300">
          Leer analisis
        </Button>
      </div>
    </article>
  );
}

function NewsCard({ article }: { article: SportArticle }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/5 bg-[#111820] shadow-xl shadow-black/20">
      <img
        src={article.image}
        alt={article.title}
        className="h-48 w-full object-cover opacity-85"
      />

      <div className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Tag color={sportColor(article.sport)}>{article.sport}</Tag>
          <Tag color={impactColor(article.impact)}>{article.impact}</Tag>
        </div>

        <h2 className="text-lg font-bold leading-6">{article.title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/55">{article.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/5 pt-4 text-xs text-white/45">
          <span>{article.source}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </article>
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

function sportColor(sport: NewsSport) {
  if (sport === "Futbol") {
return "green";
}

  if (sport === "Tenis") {
return "gold";
}

  return "blue";
}

function impactColor(impact: SportArticle["impact"]) {
  if (impact === "Alta") {
return "red";
}

  if (impact === "Media") {
return "gold";
}

  return "default";
}

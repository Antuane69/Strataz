import { FilterOutlined, LoginOutlined, StarFilled } from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";
import { Button, Flex } from "antd";
import type { SportItem } from "@/interface";
import DashboardLogo from "./DashboardLogo";

export default function DashboardSidebar({ sports }: { sports: SportItem[] }) {
  const { auth } = usePage().props;
  const user = auth.user;

  return (
    <aside className="hidden w-[300px] shrink-0 border-r border-white/5 bg-[#070c10] p-5 xl:block">
      <div className="sticky top-5 space-y-5">
        <DashboardLogo/>
        {/* <nav className="space-y-2">
          {menuNavegacionUsuario.map((item) => (
            <button
              key={item.label}
              className={[
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                item.active
                  ? "bg-green-500/10 text-green-400"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav> */}

        <div className="rounded-2xl border border-white/5 bg-[#111820] p-5 shadow-xl shadow-black/20">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wide text-green-400">
            Deportes
          </h3>

          <div className="space-y-2">
            <button
              className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Flex align="center" gap={18}>
                <span className="text-lg"><FilterOutlined style={{fontSize: "15px", color: "#05df72"}}/></span>
                TODOS
              </Flex>
            </button>

            {sports.map((sport) => (
              <button
                key={sport.name}
                className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.04] hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{sport.icon}</span>
                  {sport.name}
                </span>

                <span className="rounded-lg bg-white/[0.06] px-2 py-1 text-xs text-white/80">
                  {sport.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111820] p-5 text-center shadow-xl shadow-black/20">
          <div className="mb-4 flex items-center gap-2 text-left">
            <StarFilled className="text-yellow-400" />
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Mis favoritos
            </h3>
          </div>

          <p className="mx-auto max-w-[220px] text-sm leading-6 text-white/55">
            Agrega tus equipos o jugadores favoritos para verlos aquí.
          </p>

          {!user && (
            <Link href="/iniciar_sesion">
              <Button
                block
                className="mt-6 border-green-500/70 bg-transparent text-green-400 hover:!border-green-400 hover:!text-green-600"
                icon={<LoginOutlined />}
              >
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>

        <br></br>
      </div>
    </aside>
  );
}

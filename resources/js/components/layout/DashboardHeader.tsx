import { SearchOutlined } from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";
import { Flex, Input } from "antd";
import { menuNavegacionUsuario } from "@/services/datosMock";
import DashboardLogo from "./DashboardLogo";
import DashboardUsuarioConectado from "./DashboardUsuarioConectado";

export default function DashboardHeader() {
  const { url } = usePage();
  const pathname = url.split("?")[0] ?? "/";

  const esRutaActiva = (ruta: string) => {
    if (ruta === "/") {
      return pathname === "/";
    }

    return pathname === ruta || pathname.startsWith(`${ruta}/`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#070c10]/90 px-5 py-4 backdrop-blur">
      <Flex align="center" justify="space-between" gap={20}>
        <div className="hidden items-center gap-10 xl:flex">
          {/* <DashboardLogo /> */}

          <nav className="flex items-center gap-7">
            {menuNavegacionUsuario.map((item) => {
              const activo = esRutaActiva(item.ruta);

              return (
                <Link
                  key={item.label}
                  href={item.ruta}
                  className={[
                    "relative cursor-pointer text-sm font-medium transition hover:!text-green-400",
                    activo ? "!text-green-400" : "!text-white/80",
                  ].join(" ")}
                >
                  <Flex align="center" gap={8}>
                    {item.icon}
                    {item.label}
                  </Flex>

                  {activo && (
                    <span className="absolute -bottom-5 left-0 h-[2px] w-full rounded-full bg-green-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="xl:hidden">
          <DashboardLogo />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Input
            className="hidden max-w-[320px] border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 md:flex"
            placeholder="Buscar equipos, jugadores..."
            suffix={<SearchOutlined className="text-white/60" />}
          />

          {/* <BellOutlined className="text-lg text-white/70 md:hidden" /> */}

          <DashboardUsuarioConectado/>

          {/* <Avatar className="md:hidden" icon={<UserOutlined />} /> */}
        </div>
      </Flex>
    </header>
  );
}

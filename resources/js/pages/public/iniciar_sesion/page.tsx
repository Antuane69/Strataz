import {
  LockOutlined,
  MailOutlined,
  LoginOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Head, router } from "@inertiajs/react";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import DashboardLogo from "@/components/layout/DashboardLogo";

export default function LoginPage() {
  useAuthPageScrollLock();

  const onFinish = (values: { email: string; password: string }) => {
    console.log("Datos de login:", values);
    message.success("Login simulado correctamente");
    router.visit("/");
  };

  return (
    <>
      <Head title="Iniciar sesión" />
      <section className="fixed inset-0 isolate overflow-y-auto overflow-x-hidden bg-[#070c10] px-5 py-8 text-white">
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[340px] w-[340px] rounded-full bg-green-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[360px] w-[360px] rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-64px)] max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] border border-white/5 bg-[#0b1117] shadow-2xl shadow-black/40 lg:grid-cols-[1fr_470px]">
        <aside className="hidden border-r border-white/5 bg-[#080e13] p-8 lg:flex lg:flex-col">
          <DashboardLogo/>

          <div className="flex flex-1 items-center py-12">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
                <ThunderboltOutlined />
                Plataforma inteligente de picks deportivos
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-white xl:text-5xl">
                Entra a tu panel de análisis y pronósticos.
              </h1>

              <p className="max-w-lg text-base leading-7 text-white/60">
                Consulta estadísticas, tendencias, partidos en vivo y picks con
                IA desde un dashboard diseñado para tomar mejores decisiones.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <FeatureCard
                  icon={<BarChartOutlined />}
                  title="Estadísticas"
                  description="Datos actualizados"
                />

                <FeatureCard
                  icon={<ThunderboltOutlined />}
                  title="Picks IA"
                  description="Análisis automático"
                />

                <FeatureCard
                  icon={<CheckCircleOutlined />}
                  title="Tendencias"
                  description="Lectura rápida"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MiniMetric label="Partidos" value="230+" />
            <MiniMetric label="Confianza IA" value="87%" />
            <MiniMetric label="Deportes" value="12" />
          </div>
        </aside>

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[390px]">
            <div className="mb-8 flex justify-center lg:hidden">
              <DashboardLogo/>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111820] p-7 shadow-2xl shadow-black/30">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 text-2xl text-green-400">
                  <LoginOutlined />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-white">
                  Iniciar sesión
                </h2>

                <p className="text-sm text-white/50">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Form.Item
                  label={<span className="text-white/75">Correo</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Por favor ingresa tu correo" },
                    { type: "email", message: "Ingresa un correo válido" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined className="text-white/35" />}
                    placeholder="correo@ejemplo.com"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white/75">Contraseña</span>}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu contraseña",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="text-white/35" />}
                    placeholder="Ingresa tu contraseña"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<LoginOutlined />}
                  className="mt-2 !border-green-500 !bg-green-500 !font-semibold hover:!border-green-400 hover:!bg-green-400"
                >
                  Entrar
                </Button>

                <Button
                  size="large"
                  block
                  icon={<UserAddOutlined />}
                  className="mt-3 !border-green-500/50 !bg-transparent !font-semibold !text-green-400 hover:!border-green-400 hover:!text-green-300"
                  onClick={() => router.visit("/registrarme")}
                >
                  Registrarme
                </Button>
              </Form>

              <div className="mt-6 border-t border-white/5 pt-5 text-center">
                <p className="text-xs text-white/40">
                  Información segura y protegida dentro de tu cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function useAuthPageScrollLock() {
  useEffect(() => {
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, []);
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111820] p-4 shadow-xl shadow-black/20">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-xl text-green-400">
        {icon}
      </div>

      <p className="font-bold text-white">{title}</p>
      <p className="mt-1 text-sm text-white/45">{description}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111820] p-4">
      <p className="text-2xl font-black text-green-400">{value}</p>
      <p className="mt-1 text-sm text-white/45">{label}</p>
    </div>
  );
}

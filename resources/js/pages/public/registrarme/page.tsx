import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Form, Input, message } from "antd";
import DashboardLogo from "@/components/layout/DashboardLogo";

type RegisterFormValues = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterPage() {
  const onFinish = (values: RegisterFormValues) => {
    console.log("Datos de registro:", values);

    message.success("Registro simulado correctamente");
    router.visit("/iniciar_sesion");
  };

  return (
    <>
      <Head title="Registrarme" />
      <section className="relative min-h-screen bg-[#070c10] px-5 py-8 text-white">
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[340px] w-[340px] rounded-full bg-green-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[360px] w-[360px] rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] border border-white/5 bg-[#0b1117] shadow-2xl shadow-black/40 lg:grid-cols-[470px_1fr]">
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[410px]">
            <div className="mb-8 flex justify-center lg:hidden">
              <DashboardLogo/>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111820] p-7 shadow-2xl shadow-black/30">
              <Link
                href="/iniciar_sesion"
                className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-green-400"
              >
                <ArrowLeftOutlined />
                Volver al login
              </Link>

              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 text-2xl text-green-400">
                  <UserAddOutlined />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-white">
                  Crear cuenta
                </h2>

                <p className="text-sm text-white/50">
                  Regístrate para acceder al panel
                </p>
              </div>

              <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Form.Item
                  label={<span className="text-white/75">Nombre completo</span>}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu nombre",
                    },
                    {
                      min: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="text-white/35" />}
                    placeholder="Ej. Carlos López"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

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
                  label={<span className="text-white/75">Teléfono</span>}
                  name="phone"
                >
                  <Input
                    size="large"
                    prefix={<PhoneOutlined className="text-white/35" />}
                    placeholder="Opcional"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white/75">Contraseña</span>}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa una contraseña",
                    },
                    {
                      min: 8,
                      message: "La contraseña debe tener mínimo 8 caracteres",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="text-white/35" />}
                    placeholder="Mínimo 8 caracteres"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/75">Confirmar contraseña</span>
                  }
                  name="password_confirmation"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Por favor confirma tu contraseña",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Las contraseñas no coinciden")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={
                      <SafetyCertificateOutlined className="text-white/35" />
                    }
                    placeholder="Repite tu contraseña"
                    className="!border-white/10 !bg-white/[0.04] !text-white placeholder:!text-white/35"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<UserAddOutlined />}
                  className="mt-2 !border-green-500 !bg-green-500 !font-semibold hover:!border-green-400 hover:!bg-green-400"
                >
                  Crear cuenta
                </Button>

                <Link href="/iniciar_sesion">
                  <Button
                    size="large"
                    block
                    className="mt-3 !border-white/10 !bg-transparent !font-semibold !text-white/70 hover:!border-green-400 hover:!text-green-300"
                  >
                    Ya tengo una cuenta
                  </Button>
                </Link>
              </Form>
            </div>
          </div>
        </div>

        <aside className="hidden border-l border-white/5 bg-[#080e13] p-8 lg:flex lg:flex-col">
          <DashboardLogo/>

          <div className="flex flex-1 items-center py-12">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
                <CheckCircleOutlined />
                Empieza a usar el dashboard
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-white xl:text-5xl">
                Crea tu cuenta y personaliza tus picks.
              </h1>

              <p className="max-w-lg text-base leading-7 text-white/60">
                Guarda favoritos, consulta partidos destacados, revisa
                estadísticas clave y accede a análisis con IA desde un mismo
                lugar.
              </p>

              <div className="mt-10 space-y-4">
                <Benefit text="Dashboard con partidos destacados" />
                <Benefit text="Picks IA y tendencias del día" />
                <Benefit text="Estadísticas rápidas y comparativas" />
                <Benefit text="Diseño preparado para crecer con tu API" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-sm leading-6 text-white/65">
              Tu cuenta podrá conectarse después con favoritos, historial,
              preferencias de deportes y alertas personalizadas.
            </p>
          </div>
        </aside>
      </div>
      </section>
    </>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#111820] p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
        <CheckCircleOutlined />
      </div>

      <p className="text-sm font-medium text-white/75">{text}</p>
    </div>
  );
}

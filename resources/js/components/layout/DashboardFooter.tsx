import { BellOutlined, FireOutlined, LineChartOutlined, TrophyOutlined } from "@ant-design/icons";
import { Flex } from "antd";

export default function DashboardFooter() {
  const items = [
    {
      icon: <LineChartOutlined />,
      text: "Estadísticas en tiempo real",
    },
    {
      icon: <FireOutlined />,
      text: "Análisis con IA",
    },
    {
      icon: <TrophyOutlined />,
      text: "Los mejores pronósticos",
    },
    {
      icon: <BellOutlined />,
      text: "Información 100% actualizada",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 hidden border-t border-white/5 bg-[#070c10]/95 px-8 py-4 backdrop-blur xl:block">
      <Flex>
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-center gap-3 text-sm text-white/65"
            >
              <span className="text-xl text-green-400">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </Flex>
    </div>
  );
}

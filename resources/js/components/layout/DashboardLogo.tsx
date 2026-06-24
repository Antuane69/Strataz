export default function DashboardLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 items-end gap-1">
        <span className="h-4 w-2 rounded-sm bg-green-500" />
        <span className="h-6 w-2 rounded-sm bg-green-500" />
        <span className="h-8 w-2 rounded-sm bg-green-500" />
      </div>

      <div className="leading-none">
        <h1 className="text-1xl font-black tracking-wide">STRATAZ</h1>
        {/* <p className="text-[10px] font-semibold text-white/70">
          PARA TU APUESTA
        </p> */}
      </div>
    </div>
  );
}
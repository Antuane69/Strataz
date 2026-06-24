import type { ReactNode } from "react";
import { dashboardData } from "@/services/datosMock";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSiderbar";

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <main className="min-h-screen bg-[#070c10] text-white">
      <div className="flex min-h-screen">
        <DashboardSidebar sports={dashboardData.sports} />

        <section className="flex-1">
          <DashboardHeader />

          {children}
          {/* <div className="grid grid-cols-1 gap-5 px-5 pb-8 pt-5 xl:grid-cols-[1fr_360px]">
            <section className="space-y-5">
              <FeaturedMatches matches={dashboardData.featuredMatches} />

              <LiveNow matches={dashboardData.liveMatches} />

              <HighlightedStats stats={dashboardData.highlightStats} />
            </section>

            <aside className="space-y-5">
              <PickOfDay data={dashboardData.pickOfDay} />

              <Trends trends={dashboardData.trends} />

              <CommunityPicks picks={dashboardData.communityPicks} />
            </aside>
          </div> */}
        </section>
      </div>

      <DashboardFooter />
    </main>
  );
}

import DashboardNav from "@/components/dashboard/DashboardNav";
import StatCard from "@/components/dashboard/StatCard";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import AppBreakdownChart from "@/components/dashboard/AppBreakdownChart";
import CategoryBubbleChart from "@/components/dashboard/CategoryBubbleChart";
import PeakDistractionChart from "@/components/dashboard/PeakDistractionChart";
import { statCards } from "@/lib/focusMapData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />

      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 space-y-6 flex-1">
        {/* Greeting */}
        <div className="animate-fade-up">
          <h1 className="text-xl font-bold">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, John 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your digital wellbeing overview for today.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {statCards.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 60} />
          ))}
        </div>

        {/* Heatmap */}
        <ActivityHeatmap />

        {/* Insight Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AppBreakdownChart />
          <CategoryBubbleChart />
          <PeakDistractionChart />
        </div>
      </main>
    </div>
  );
};

export default Index;

import { weeklyData } from "@/lib/mockData";

const WeeklyTrendCard = () => {
  const maxScore = 100;

  return (
    <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Weekly Focus Trend</h3>
      <div className="flex items-end gap-2 h-24">
        {weeklyData.map((day) => {
          const height = (day.focusScore / maxScore) * 100;
          const isToday = day.date === "Sun";
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">{day.focusScore}</span>
              <div className="w-full bg-muted rounded-t-md overflow-hidden" style={{ height: "100%" }}>
                <div className={`w-full rounded-t-md transition-all duration-700 ease-out ${isToday ? "bg-primary glow-primary" : "bg-primary/40"}`} style={{ height: `${height}%`, marginTop: `${100 - height}%` }} />
              </div>
              <span className={`text-[10px] ${isToday ? "text-primary font-semibold" : "text-muted-foreground"}`}>{day.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTrendCard;

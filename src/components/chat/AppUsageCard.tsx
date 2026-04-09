import { todayData } from "@/lib/mockData";

const categoryColors: Record<string, string> = {
  social: "bg-destructive/20 text-destructive",
  productivity: "bg-focus-positive/20 text-focus-positive",
  entertainment: "bg-focus-warning/20 text-focus-warning",
  communication: "bg-primary/20 text-primary",
  other: "bg-muted text-muted-foreground",
};

const AppUsageCard = () => {
  const maxMinutes = Math.max(...todayData.apps.map(a => a.minutes));

  return (
    <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">App Usage Today</h3>
      <div className="space-y-3">
        {todayData.apps.map((app) => (
          <div key={app.name} className="flex items-center gap-3">
            <span className="text-lg w-7 text-center">{app.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium truncate">{app.name}</span>
                <span className="text-xs text-muted-foreground">{app.minutes}m</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: `${(app.minutes / maxMinutes) * 100}%` }} />
              </div>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${categoryColors[app.category]}`}>{app.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppUsageCard;

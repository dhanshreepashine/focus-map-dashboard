import { appBreakdown } from "@/lib/focusMapData";

const typeStyles = {
  productive: { bar: "bg-focus-positive", badge: "text-focus-positive bg-focus-positive/15" },
  distracting: { bar: "bg-focus-danger", badge: "text-focus-danger bg-focus-danger/15" },
  neutral: { bar: "bg-accent", badge: "text-accent bg-accent/15" },
};

const AppBreakdownChart = () => {
  const maxMin = Math.max(...appBreakdown.map((a) => a.minutes));

  return (
    <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: "400ms" }}>
      <h3 className="text-sm font-semibold mb-4">App Breakdown</h3>
      <div className="space-y-3">
        {appBreakdown.map((app, i) => {
          const style = typeStyles[app.type];
          return (
            <div key={app.name} className="group">
              <div className="flex items-center gap-3">
                <span className="text-base w-6 text-center">{app.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{app.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">
                        {app.minutes >= 60 ? `${Math.floor(app.minutes / 60)}h ${app.minutes % 60}m` : `${app.minutes}m`}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${style.badge}`}>
                        {app.type}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${style.bar} animate-bar-grow`}
                      style={{
                        width: `${(app.minutes / maxMin) * 100}%`,
                        animationDelay: `${500 + i * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppBreakdownChart;

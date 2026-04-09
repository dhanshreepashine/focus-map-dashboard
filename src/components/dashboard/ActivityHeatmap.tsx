import { useState, useMemo } from "react";
import { heatmapData, days, hours, getHeatColor } from "@/lib/focusMapData";

type ViewMode = "overall" | "app" | "category";

const ActivityHeatmap = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("overall");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const modes: { key: ViewMode; label: string }[] = [
    { key: "overall", label: "Overall" },
    { key: "app", label: "By App" },
    { key: "category", label: "Category" },
  ];

  const formatHour = (h: number) => {
    if (h === 0) return "12A";
    if (h === 12) return "12P";
    return h > 12 ? `${h - 12}P` : `${h}A`;
  };

  return (
    <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Activity Heatmap</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Distraction intensity across the week</p>
        </div>
        <div className="flex items-center bg-secondary/50 rounded-lg p-0.5">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setViewMode(m.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === m.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {/* Hour labels */}
        <div className="flex ml-10 mb-1.5">
          {hours.map((h) => (
            <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground min-w-[18px]">
              {h % 3 === 0 ? formatHour(h) : ""}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="space-y-1">
          {days.map((day, d) => (
            <div key={day} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-8 text-right font-medium">{day}</span>
              <div className="flex gap-[3px] flex-1">
                {hours.map((h) => {
                  const cell = heatmapData.find((c) => c.day === d && c.hour === h)!;
                  return (
                    <div
                      key={h}
                      className="flex-1 aspect-square rounded-[3px] min-w-[14px] cursor-pointer transition-all duration-150 hover:scale-150 hover:z-10 relative"
                      style={{ backgroundColor: getHeatColor(cell.value) }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                          content: `${day} ${h === 0 ? 12 : h > 12 ? h - 12 : h}${h >= 12 ? "PM" : "AM"} — ${cell.value}min on ${cell.app}`,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-[9px] text-muted-foreground mr-1">Less</span>
          {[0, 20, 40, 60, 80, 95].map((v) => (
            <div
              key={v}
              className="w-3 h-3 rounded-[2px]"
              style={{ backgroundColor: getHeatColor(v) }}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-1">More</span>
        </div>
      </div>

      {/* Tooltip portal */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-lg text-xs font-medium"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            background: "hsl(220 18% 12%)",
            border: "1px solid hsl(220 14% 24%)",
            color: "hsl(210 20% 92%)",
            boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;

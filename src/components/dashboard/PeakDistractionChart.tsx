import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { peakDistractionData } from "@/lib/focusMapData";

const PeakDistractionChart = () => {
  return (
    <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: "600ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Peak Distraction</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">24-hour distraction pattern</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-focus-danger" />
            <span className="text-[10px] text-muted-foreground">Distraction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-[1px] border-t border-dashed border-focus-positive" />
            <span className="text-[10px] text-muted-foreground">Goal</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={peakDistractionData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="distractionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 72% 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(0 72% 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 9, fill: "hsl(215 12% 50%)" }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "hsl(215 12% 50%)" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(220 18% 12%)",
              border: "1px solid hsl(220 14% 24%)",
              borderRadius: "8px",
              fontSize: "11px",
              color: "hsl(210 20% 92%)",
            }}
          />
          <ReferenceLine
            y={35}
            stroke="hsl(142 60% 45%)"
            strokeDasharray="6 4"
            strokeOpacity={0.6}
            label={{ value: "Goal", position: "right", fontSize: 9, fill: "hsl(142 60% 45%)" }}
          />
          <Area
            type="monotone"
            dataKey="distraction"
            stroke="hsl(0 72% 55%)"
            fill="url(#distractionGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-2 mt-3 px-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-focus-danger/10 border border-focus-danger/20">
          <span className="text-[10px] text-focus-danger font-medium">⚠ Peak risk: 9PM–12AM</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-focus-positive/10 border border-focus-positive/20">
          <span className="text-[10px] text-focus-positive font-medium">✓ Best focus: 9AM–11AM</span>
        </div>
      </div>
    </div>
  );
};

export default PeakDistractionChart;

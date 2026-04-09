import { categoryBubbles } from "@/lib/focusMapData";

const typeColors = {
  productive: { bg: "hsl(142 60% 45%)", glow: "hsl(142 60% 45% / 0.3)" },
  distracting: { bg: "hsl(0 72% 55%)", glow: "hsl(0 72% 55% / 0.3)" },
  neutral: { bg: "hsl(174 72% 50%)", glow: "hsl(174 72% 50% / 0.3)" },
};

const CategoryBubbleChart = () => {
  const maxVal = Math.max(...categoryBubbles.map((c) => c.value));

  return (
    <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: "500ms" }}>
      <h3 className="text-sm font-semibold mb-4">Category Breakdown</h3>
      <div className="flex items-center justify-center gap-3 flex-wrap py-4 min-h-[180px]">
        {categoryBubbles.map((cat, i) => {
          const size = 48 + (cat.value / maxVal) * 56;
          const colors = typeColors[cat.type];
          return (
            <div
              key={cat.name}
              className="flex flex-col items-center gap-2 animate-float"
              style={{ animationDelay: `${i * 400}ms` }}
            >
              <div
                className="rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: colors.bg,
                  boxShadow: `0 0 20px -4px ${colors.glow}`,
                  opacity: 0.85,
                }}
              >
                <span className="text-[10px] font-bold text-primary-foreground">
                  {cat.value >= 60 ? `${Math.floor(cat.value / 60)}h${cat.value % 60 > 0 ? `${cat.value % 60}m` : ""}` : `${cat.value}m`}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{cat.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        {(["productive", "distracting", "neutral"] as const).map((t) => (
          <div key={t} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColors[t].bg }} />
            <span className="text-[10px] text-muted-foreground capitalize">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBubbleChart;

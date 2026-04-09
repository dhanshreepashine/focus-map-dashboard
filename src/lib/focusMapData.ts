// Mock data for FocusMap dashboard

export const statCards = [
  { label: "Total Screen Time", value: "6h 42m", sub: "↓ 8% from yesterday", icon: "clock" as const },
  { label: "Focus Score", value: "78", sub: "Good – above average", icon: "target" as const, scoreColor: "warning" as const },
  { label: "Most Distracting", value: "Instagram", sub: "1h 35m today", icon: "alert" as const },
  { label: "Deep Focus Sessions", value: "4", sub: "2h 15m total", icon: "zap" as const },
  { label: "Distraction-Free Streak", value: "2h 48m", sub: "Best: 3h 12m", icon: "flame" as const },
];

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const hours = Array.from({ length: 24 }, (_, i) => i);

// Heatmap: 7 days × 24 hours, value 0-100 representing distraction intensity
const seed = (d: number, h: number) => {
  const x = Math.sin(d * 12.9898 + h * 78.233) * 43758.5453;
  return Math.abs(x - Math.floor(x));
};

export const heatmapData: { day: number; hour: number; value: number; app: string }[] = [];
const apps = ["Instagram", "YouTube", "Twitter/X", "TikTok", "Reddit", "Chrome", "Slack", "VS Code"];
for (let d = 0; d < 7; d++) {
  for (let h = 0; h < 24; h++) {
    // More distraction at night and afternoon
    let base = seed(d, h) * 60;
    if (h >= 21 || h <= 1) base += 30;
    else if (h >= 13 && h <= 15) base += 15;
    else if (h >= 6 && h <= 8) base -= 10;
    const value = Math.max(0, Math.min(100, Math.round(base)));
    const app = apps[Math.floor(seed(d + 1, h + 2) * apps.length)];
    heatmapData.push({ day: d, hour: h, value, app });
  }
}

export const appBreakdown = [
  { name: "VS Code", minutes: 145, type: "productive" as const, icon: "💻" },
  { name: "Instagram", minutes: 95, type: "distracting" as const, icon: "📸" },
  { name: "YouTube", minutes: 72, type: "distracting" as const, icon: "▶️" },
  { name: "Chrome", minutes: 67, type: "productive" as const, icon: "🌐" },
  { name: "WhatsApp", minutes: 58, type: "neutral" as const, icon: "💬" },
  { name: "Twitter/X", minutes: 43, type: "distracting" as const, icon: "🐦" },
  { name: "Slack", minutes: 38, type: "productive" as const, icon: "💼" },
  { name: "TikTok", minutes: 34, type: "distracting" as const, icon: "🎵" },
];

export const categoryBubbles = [
  { name: "Social", value: 138, type: "distracting" as const },
  { name: "Productivity", value: 183, type: "productive" as const },
  { name: "Entertainment", value: 106, type: "distracting" as const },
  { name: "Communication", value: 96, type: "neutral" as const },
  { name: "Browsing", value: 67, type: "productive" as const },
];

export const peakDistractionData = Array.from({ length: 24 }, (_, h) => {
  let base = 20 + seed(3, h) * 30;
  if (h >= 21 || h <= 1) base += 35;
  else if (h >= 13 && h <= 15) base += 20;
  else if (h >= 9 && h <= 11) base -= 10;
  return {
    hour: `${h === 0 ? 12 : h > 12 ? h - 12 : h}${h >= 12 ? "PM" : "AM"}`,
    distraction: Math.max(5, Math.min(95, Math.round(base))),
    goal: 35,
  };
});

export function getHeatColor(value: number): string {
  if (value < 10) return "hsl(220 14% 14%)";
  if (value < 25) return "hsl(142 40% 20%)";
  if (value < 45) return "hsl(100 50% 30%)";
  if (value < 65) return "hsl(82 60% 40%)";
  if (value < 80) return "hsl(82 70% 50%)";
  return "hsl(82 80% 60%)";
}

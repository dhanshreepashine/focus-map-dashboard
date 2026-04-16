import { TrendingUp, TrendingDown, CircleAlert as AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface StatCardMilitaryProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  status: "normal" | "warning" | "critical";
}

const StatCardMilitary = ({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  status,
}: StatCardMilitaryProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "critical":
        return {
          border: "border-red-700/50",
          bg: "bg-red-950/20",
          accent: "text-red-400",
          accentBg: "bg-red-950/30",
        };
      case "warning":
        return {
          border: "border-yellow-700/50",
          bg: "bg-yellow-950/20",
          accent: "text-yellow-400",
          accentBg: "bg-yellow-950/30",
        };
      default:
        return {
          border: "border-green-700/50",
          bg: "bg-green-950/20",
          accent: "text-green-400",
          accentBg: "bg-green-950/30",
        };
    }
  };

  const styles = getStatusStyles();
  const isTrendingUp = trend.startsWith("+");

  return (
    <div className={`border ${styles.border} ${styles.bg} backdrop-blur-sm rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-slate-900/50`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`${styles.accentBg} p-2 rounded-lg`}>
          <Icon className={`w-5 h-5 ${styles.accent}`} />
        </div>
        <span className={`text-xs font-mono ${styles.accent}`}>
          {trend}
        </span>
      </div>

      <p className="text-xs text-slate-400 font-mono uppercase mb-1">{label}</p>
      <div className="mb-3">
        <p className="text-2xl font-bold text-slate-100 font-mono">{value}</p>
        <p className="text-xs text-slate-500">{unit}</p>
      </div>

      <div className="flex items-center gap-1 text-xs text-slate-400">
        {isTrendingUp ? (
          <TrendingUp className="w-3 h-3 text-red-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-green-400" />
        )}
        <span>vs. yesterday</span>
      </div>
    </div>
  );
};

export default StatCardMilitary;

import { Clock, Target, AlertTriangle, Zap, Flame } from "lucide-react";

const icons = { clock: Clock, target: Target, alert: AlertTriangle, zap: Zap, flame: Flame };

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: keyof typeof icons;
  scoreColor?: "positive" | "warning" | "danger";
  delay?: number;
}

const StatCard = ({ label, value, sub, icon, scoreColor, delay = 0 }: StatCardProps) => {
  const Icon = icons[icon];
  return (
    <div
      className="glass-card p-5 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-2xl font-bold tracking-tight ${
        scoreColor === "positive" ? "text-focus-positive" :
        scoreColor === "warning" ? "text-focus-warning" :
        scoreColor === "danger" ? "text-focus-danger" : ""
      }`}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>}
    </div>
  );
};

export default StatCard;

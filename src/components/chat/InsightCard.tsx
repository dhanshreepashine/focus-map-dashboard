import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";

type InsightType = "warning" | "tip" | "positive";

interface InsightCardProps {
  type: InsightType;
  title: string;
  description: string;
}

const config: Record<InsightType, { icon: React.ElementType; className: string }> = {
  warning: { icon: AlertTriangle, className: "border-focus-warning/30 glow-accent" },
  tip: { icon: Lightbulb, className: "border-primary/30 glow-primary" },
  positive: { icon: TrendingUp, className: "border-focus-positive/30" },
};

const InsightCard = ({ type, title, description }: InsightCardProps) => {
  const { icon: Icon, className } = config[type];

  return (
    <div className={`glass-card p-4 ${className} animate-fade-up`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className={`w-4 h-4 ${
            type === "warning" ? "text-focus-warning" :
            type === "positive" ? "text-focus-positive" : "text-primary"
          }`} />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;

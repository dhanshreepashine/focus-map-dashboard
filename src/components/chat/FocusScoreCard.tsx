import { todayData, getFocusScoreColor, getFocusScoreLabel } from "@/lib/mockData";
import { Flame, TrendingUp } from "lucide-react";

const FocusScoreCard = () => {
  const score = todayData.focusScore;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card p-5 glow-primary animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Today's Focus Score</h3>
        <div className="flex items-center gap-1.5 text-focus-warning">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-semibold">{todayData.streak} day streak</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getFocusScoreColor(score)}`}>{score}</span>
          </div>
        </div>
        <div className="flex-1">
          <p className={`text-lg font-semibold ${getFocusScoreColor(score)}`}>{getFocusScoreLabel(score)}</p>
          <p className="text-sm text-muted-foreground mt-1">{(todayData.totalMinutes / 60).toFixed(1)}h screen time</p>
          <div className="flex items-center gap-1 mt-2 text-focus-positive text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+5 from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusScoreCard;

import { Brain, Flame, Moon, Sun } from "lucide-react";
import { useState } from "react";

const navTabs = ["Dashboard", "Insights", "Chat", "Settings"];

const DashboardNav = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background/70 backdrop-blur-xl">
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5">
        <Brain className="w-5 h-5 text-primary" />
        <span className="font-semibold text-sm tracking-tight">FocusMap</span>
        <span className="relative flex h-2.5 w-2.5 ml-0.5">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
      </div>

      {/* Center: Tabs */}
      <nav className="hidden md:flex items-center bg-secondary/40 rounded-lg p-0.5">
        {navTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Right: Avatar, Streak, Dark mode */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-focus-warning">
          <Flame className="w-4 h-4" />
          <span className="text-xs font-semibold">7 days</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary">
          JD
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;

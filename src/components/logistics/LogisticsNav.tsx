import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LogisticsNavProps {
  onMenuClick: () => void;
  userName: string;
}

const LogisticsNav = ({ onMenuClick, userName }: LogisticsNavProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-slate-800 rounded transition-colors"
          >
            <Menu className="w-5 h-5 text-green-400" />
          </button>
          <div>
            <h1 className="text-sm uppercase tracking-widest font-bold text-green-400">
              Military Logistics Command System
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Real-time Supply & Logistics Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded border border-slate-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-950/30 rounded transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LogisticsNav;

import { LayoutDashboard, Package, Truck, MapPin, Radar, X } from "lucide-react";

interface LogisticsSidebarProps {
  activePage: string;
  onPageChange: (page: any) => void;
  isOpen: boolean;
}

const LogisticsSidebar = ({ activePage, onPageChange, isOpen }: LogisticsSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "requests", label: "Supply Requests", icon: Truck },
    { id: "routes", label: "Route Optimization", icon: MapPin },
    { id: "status", label: "System Status", icon: Radar },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => onPageChange(activePage)}
        ></div>
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 border-r border-slate-700/50 bg-slate-900/80 backdrop-blur-sm transition-transform z-40 md:z-auto ${
          !isOpen ? "-translate-x-full md:translate-x-0" : ""
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold">
                  Command
                </h2>
                <p className="text-xs text-slate-500 mt-1">Navigation</p>
              </div>
              <button
                onClick={() => onPageChange(activePage)}
                className="md:hidden p-1 hover:bg-slate-800 rounded"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-green-900/40 text-green-400 border border-green-600/50"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-700/50 space-y-2 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="text-slate-600">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LogisticsSidebar;

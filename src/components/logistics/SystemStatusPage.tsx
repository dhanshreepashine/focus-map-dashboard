import { Activity, Zap, Wifi, HardDrive, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from "lucide-react";

const SystemStatusPage = () => {
  const systemMetrics = [
    {
      name: "Network Connectivity",
      status: "operational",
      value: "99.8%",
      details: "All communication channels active",
      icon: Wifi,
    },
    {
      name: "Database Status",
      status: "operational",
      value: "Synced",
      details: "All warehouses connected and updated",
      icon: HardDrive,
    },
    {
      name: "Server Response Time",
      status: "operational",
      value: "45ms",
      details: "Average response within acceptable range",
      icon: Zap,
    },
    {
      name: "Active Connections",
      status: "operational",
      value: "247",
      details: "Connected users and terminals",
      icon: Activity,
    },
  ];

  const operationalNodes = [
    { id: "central", name: "Central HQ", region: "Capital", status: "online", lastSync: "2 min ago" },
    { id: "regional1", name: "Regional Base 1", region: "Northern", status: "online", lastSync: "3 min ago" },
    { id: "regional2", name: "Regional Base 2", region: "Eastern", status: "online", lastSync: "1 min ago" },
    { id: "divisional", name: "Divisional HQ", region: "Western", status: "online", lastSync: "5 min ago" },
    { id: "brigade1", name: "Brigade Unit 1", region: "South", status: "online", lastSync: "2 min ago" },
    { id: "brigade2", name: "Brigade Unit 2", region: "North", status: "online", lastSync: "4 min ago" },
  ];

  const recentEvents = [
    { timestamp: "14:32", event: "Supply request #245 approved", severity: "info" },
    { timestamp: "14:28", event: "Route optimization completed", severity: "success" },
    { timestamp: "14:15", event: "Inventory sync - Central HQ", severity: "info" },
    { timestamp: "14:10", event: "Critical stock alert - Divisional HQ", severity: "warning" },
    { timestamp: "14:05", event: "New delivery registered - Firebase Alpha", severity: "success" },
    { timestamp: "13:58", event: "System backup completed", severity: "info" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
      case "success":
      case "online":
        return "border-green-700/50 bg-green-950/20 text-green-400";
      case "warning":
        return "border-yellow-700/50 bg-yellow-950/20 text-yellow-400";
      case "critical":
      case "offline":
        return "border-red-700/50 bg-red-950/20 text-red-400";
      default:
        return "border-blue-700/50 bg-blue-950/20 text-blue-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">
          System Status
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Real-time operational health and performance monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className={`border ${getStatusColor(metric.status)} backdrop-blur-sm rounded-lg p-4 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className="w-5 h-5" />
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xs text-slate-400 font-mono uppercase mb-1">{metric.name}</p>
              <p className="text-2xl font-bold text-slate-100 font-mono mb-2">{metric.value}</p>
              <p className="text-xs text-slate-500">{metric.details}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
              Operational Nodes
            </h2>
            <div className="space-y-2">
              {operationalNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-3 rounded border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-sm font-mono text-slate-100 uppercase">{node.name}</p>
                      <p className="text-xs text-slate-500">{node.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-mono ${getStatusColor(node.status).split(" ")[2]}`}>
                      {node.status.toUpperCase()}
                    </p>
                    <p className="text-xs text-slate-500">{node.lastSync}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
            System Statistics
          </h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-400">CPU Usage</p>
                <p className="text-sm font-mono text-slate-300">42%</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-5/12"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-400">Memory Usage</p>
                <p className="text-sm font-mono text-slate-300">68%</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-8/12"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-400">Disk Storage</p>
                <p className="text-sm font-mono text-slate-300">55%</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-7/12"></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/50">
              <p className="text-xs text-green-400 font-mono">All parameters normal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
          Event Log
        </h2>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {recentEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-700/50"
            >
              <div className="flex-shrink-0">
                {event.severity === "success" ? (
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                ) : event.severity === "warning" ? (
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                ) : (
                  <Activity className="w-4 h-4 text-blue-400 mt-0.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-300">{event.event}</p>
                  <p className="text-xs text-slate-500 font-mono flex-shrink-0">{event.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPage;

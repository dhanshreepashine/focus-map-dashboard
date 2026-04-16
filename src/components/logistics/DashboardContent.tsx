import { useMemo } from "react";
import { Package, TriangleAlert as AlertTriangle, Truck, Boxes } from "lucide-react";
import StatCardMilitary from "./StatCardMilitary";

const DashboardContent = () => {
  const mockStats = useMemo(() => [
    {
      label: "Total Inventory",
      value: "12,450",
      unit: "Units",
      icon: Boxes,
      trend: "+5.2%",
      status: "normal",
    },
    {
      label: "Active Requests",
      value: "48",
      unit: "Pending",
      icon: Truck,
      trend: "+12%",
      status: "warning",
    },
    {
      label: "Pending Deliveries",
      value: "23",
      unit: "In Transit",
      icon: Package,
      trend: "-2.1%",
      status: "normal",
    },
    {
      label: "Critical Alerts",
      value: "7",
      unit: "Items",
      icon: AlertTriangle,
      trend: "+3",
      status: "critical",
    },
  ], []);

  const mockInventoryByWarehouse = [
    { name: "Central HQ", ammo: 5200, fuel: 3100, medical: 890 },
    { name: "Regional Base 1", ammo: 2100, fuel: 1800, medical: 450 },
    { name: "Divisional HQ", ammo: 1800, fuel: 1200, medical: 320 },
    { name: "Brigade Units", ammo: 3350, fuel: 1900, medical: 600 },
  ];

  const mockRecentRequests = [
    { id: 1, basecamp: "Firebase Alpha", item: "Ammunition", qty: 500, urgency: "high", status: "approved" },
    { id: 2, basecamp: "Forward Operating Base", item: "Fuel", qty: 1200, urgency: "medium", status: "pending" },
    { id: 3, basecamp: "Medical Camp", item: "Medical Supplies", qty: 200, urgency: "high", status: "in_transit" },
    { id: 4, basecamp: "Supply Depot", item: "Rations", qty: 800, urgency: "low", status: "delivered" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
      case "critical":
      case "approved":
        return "text-red-400 bg-red-950/30";
      case "warning":
      case "medium":
      case "pending":
        return "text-yellow-400 bg-yellow-950/30";
      case "in_transit":
        return "text-blue-400 bg-blue-950/30";
      default:
        return "text-green-400 bg-green-950/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">
          Logistics Command Center
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Real-time operational overview and resource management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat) => (
          <StatCardMilitary key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
            Warehouse Inventory Status
          </h2>
          <div className="space-y-4">
            {mockInventoryByWarehouse.map((warehouse, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-xs text-slate-300 font-mono">{warehouse.name}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-800/50 border border-slate-700 rounded p-2">
                    <p className="text-xs text-slate-500">Ammunition</p>
                    <p className="text-lg font-mono text-yellow-400">{warehouse.ammo}</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded p-2">
                    <p className="text-xs text-slate-500">Fuel</p>
                    <p className="text-lg font-mono text-blue-400">{warehouse.fuel}</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded p-2">
                    <p className="text-xs text-slate-500">Medical</p>
                    <p className="text-lg font-mono text-red-400">{warehouse.medical}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
            System Health
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-400 mb-1">Network Connectivity</p>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Database Status</p>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Server Response</p>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-72"></div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-700/50">
              <p className="text-xs text-green-400">All systems nominal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
          Recent Supply Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-4 py-2 text-left text-xs text-slate-400 font-mono uppercase">Basecamp</th>
                <th className="px-4 py-2 text-left text-xs text-slate-400 font-mono uppercase">Item</th>
                <th className="px-4 py-2 text-left text-xs text-slate-400 font-mono uppercase">Quantity</th>
                <th className="px-4 py-2 text-left text-xs text-slate-400 font-mono uppercase">Urgency</th>
                <th className="px-4 py-2 text-left text-xs text-slate-400 font-mono uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentRequests.map((req) => (
                <tr key={req.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-300">{req.basecamp}</td>
                  <td className="px-4 py-3 text-slate-300">{req.item}</td>
                  <td className="px-4 py-3 text-slate-300 font-mono">{req.qty}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(req.urgency)}`}>
                      {req.urgency.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(req.status)}`}>
                      {req.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

import { useState, useMemo } from "react";
import { TriangleAlert as AlertTriangle, Check, CircleAlert as AlertCircle } from "lucide-react";

const InventoryPage = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | "critical" | "low" | "normal">("all");

  const mockInventory = useMemo(() => [
    { id: 1, warehouse: "Central HQ", level: "Central", item_type: "ammo", quantity: 5200, max: 10000, status: "normal" },
    { id: 2, warehouse: "Central HQ", level: "Central", item_type: "fuel", quantity: 3100, max: 5000, status: "normal" },
    { id: 3, warehouse: "Central HQ", level: "Central", item_type: "medical", quantity: 890, max: 2000, status: "normal" },
    { id: 4, warehouse: "Regional Base 1", level: "Regional", item_type: "ammo", quantity: 2100, max: 5000, status: "low" },
    { id: 5, warehouse: "Regional Base 1", level: "Regional", item_type: "fuel", quantity: 1800, max: 3000, status: "normal" },
    { id: 6, warehouse: "Regional Base 1", level: "Regional", item_type: "supplies", quantity: 450, max: 2000, status: "low" },
    { id: 7, warehouse: "Divisional HQ", level: "Divisional", item_type: "ammo", quantity: 800, max: 3000, status: "critical" },
    { id: 8, warehouse: "Divisional HQ", level: "Divisional", item_type: "fuel", quantity: 1200, max: 2000, status: "normal" },
    { id: 9, warehouse: "Divisional HQ", level: "Divisional", item_type: "medical", quantity: 320, max: 1000, status: "low" },
    { id: 10, warehouse: "Brigade Units", level: "Brigade", item_type: "ammo", quantity: 3350, max: 6000, status: "normal" },
    { id: 11, warehouse: "Brigade Units", level: "Brigade", item_type: "rations", quantity: 150, max: 1000, status: "critical" },
    { id: 12, warehouse: "Brigade Units", level: "Brigade", item_type: "medical", quantity: 600, max: 1500, status: "normal" },
  ], []);

  const filteredInventory = useMemo(() => {
    if (statusFilter === "all") return mockInventory;
    return mockInventory.filter(item => item.status === statusFilter);
  }, [statusFilter, mockInventory]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "low":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Check className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return "px-2 py-1 rounded text-xs font-mono bg-red-950/30 text-red-400 border border-red-700/50";
      case "low":
        return "px-2 py-1 rounded text-xs font-mono bg-yellow-950/30 text-yellow-400 border border-yellow-700/50";
      default:
        return "px-2 py-1 rounded text-xs font-mono bg-green-950/30 text-green-400 border border-green-700/50";
    }
  };

  const getPercentage = (current: number, max: number) => Math.round((current / max) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">
          Inventory Management
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Real-time stock levels across all military warehouses
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "critical", "low", "normal"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              statusFilter === status
                ? "bg-green-900/40 text-green-400 border border-green-600"
                : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600"
            }`}
          >
            {status === "all" ? "All Items" : `${status} Stock`}
          </button>
        ))}
      </div>

      <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700/50">
              <tr className="bg-slate-800/50">
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Warehouse</th>
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Level</th>
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Item Type</th>
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Capacity</th>
                <th className="px-4 py-3 text-left text-xs text-slate-400 font-mono uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, idx) => {
                const percentage = getPercentage(item.quantity, item.max);
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-slate-700/30 transition-colors ${
                      idx % 2 === 0 ? "hover:bg-slate-800/30" : "hover:bg-slate-800/50"
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-300 font-mono">{item.warehouse}</td>
                    <td className="px-4 py-3 text-slate-400">
                      <span className="inline-block px-2 py-1 bg-slate-800/50 rounded text-xs">{item.level}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 uppercase text-xs">{item.item_type}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{item.quantity}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="w-32 bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              percentage > 80
                                ? "bg-green-500"
                                : percentage > 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">{percentage}% / {item.max}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className={getStatusBadge(item.status)}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-4">
          <p className="text-xs text-slate-400 font-mono uppercase mb-2">Normal Stock</p>
          <p className="text-2xl font-bold text-green-400 font-mono">
            {filteredInventory.filter(i => i.status === "normal").length}
          </p>
        </div>
        <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-4">
          <p className="text-xs text-slate-400 font-mono uppercase mb-2">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-400 font-mono">
            {filteredInventory.filter(i => i.status === "low").length}
          </p>
        </div>
        <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-4">
          <p className="text-xs text-slate-400 font-mono uppercase mb-2">Critical</p>
          <p className="text-2xl font-bold text-red-400 font-mono">
            {filteredInventory.filter(i => i.status === "critical").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;

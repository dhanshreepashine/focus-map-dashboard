import { useState } from "react";
import { Send, CircleCheck as CheckCircle } from "lucide-react";

const SupplyRequestPage = () => {
  const [formData, setFormData] = useState({
    basecamp: "",
    item: "",
    quantity: "",
    urgency: "medium",
  });
  const [submitted, setSubmitted] = useState(false);
  const [requestHistory, setRequestHistory] = useState([
    { id: 1, basecamp: "Firebase Alpha", item: "Ammunition", qty: 500, urgency: "high", date: "2026-04-16", status: "approved" },
    { id: 2, basecamp: "Forward Operating Base", item: "Fuel", qty: 1200, urgency: "medium", date: "2026-04-16", status: "pending" },
    { id: 3, basecamp: "Medical Camp", item: "Medical Supplies", qty: 200, urgency: "high", date: "2026-04-15", status: "in_transit" },
    { id: 4, basecamp: "Supply Depot", item: "Rations", qty: 800, urgency: "low", date: "2026-04-15", status: "delivered" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.basecamp && formData.item && formData.quantity) {
      const newRequest = {
        id: requestHistory.length + 1,
        basecamp: formData.basecamp,
        item: formData.item,
        qty: parseInt(formData.quantity),
        urgency: formData.urgency,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      };
      setRequestHistory([newRequest, ...requestHistory]);
      setFormData({ basecamp: "", item: "", quantity: "", urgency: "medium" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-green-700/50 bg-green-950/20 text-green-400";
      case "pending":
        return "border-yellow-700/50 bg-yellow-950/20 text-yellow-400";
      case "in_transit":
        return "border-blue-700/50 bg-blue-950/20 text-blue-400";
      case "delivered":
        return "border-slate-700/50 bg-slate-800/20 text-slate-400";
      default:
        return "border-slate-700/50 bg-slate-800/20 text-slate-400";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-red-700/50 bg-red-950/20 text-red-400";
      case "medium":
        return "border-yellow-700/50 bg-yellow-950/20 text-yellow-400";
      case "low":
        return "border-green-700/50 bg-green-950/20 text-green-400";
      default:
        return "border-slate-700/50 bg-slate-800/20 text-slate-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">
          Supply Request Management
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Submit and track supply requests from operational units
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold">
              New Request
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Basecamp Name</label>
              <input
                type="text"
                value={formData.basecamp}
                onChange={(e) => setFormData({ ...formData, basecamp: e.target.value })}
                placeholder="e.g., Firebase Alpha"
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Item Required</label>
              <input
                type="text"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                placeholder="e.g., Ammunition"
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="0"
                min="1"
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Urgency Level</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-green-600 bg-green-900/40 hover:bg-green-800/50 text-green-300 font-mono font-medium text-sm transition-all uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              Submit Request
            </button>

            {submitted && (
              <div className="p-3 rounded border border-green-700/50 bg-green-950/30 flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-300">Request submitted successfully</p>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold mb-4">
              Request History
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {requestHistory.map((req) => (
                <div
                  key={req.id}
                  className="border border-slate-700/50 bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-mono text-slate-100 uppercase">{req.basecamp}</p>
                      <p className="text-xs text-slate-500">{req.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-mono border ${getStatusColor(req.status)}`}>
                        {req.status.replace("_", " ").toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-mono border ${getUrgencyColor(req.urgency)}`}>
                        {req.urgency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-500">Item</p>
                      <p className="text-slate-300 font-mono">{req.item}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Quantity</p>
                      <p className="text-slate-300 font-mono">{req.qty} units</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyRequestPage;

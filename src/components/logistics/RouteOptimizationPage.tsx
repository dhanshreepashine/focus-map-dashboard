import { useState } from "react";
import { MapPin, Navigation, ArrowRight } from "lucide-react";

const RouteOptimizationPage = () => {
  const [source, setSource] = useState("central");
  const [destination, setDestination] = useState("");
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const warehouses = [
    { id: "central", name: "Central HQ", location: "Capital City", coords: [40.7128, -74.0060] },
    { id: "regional1", name: "Regional Base 1", location: "Northern Province", coords: [41.8781, -87.6298] },
    { id: "divisional", name: "Divisional HQ", location: "Eastern Region", coords: [42.3601, -71.0589] },
    { id: "brigade", name: "Brigade Units", location: "Southern Base", coords: [33.7490, -84.3880] },
  ];

  const mockRoutes = [
    {
      id: 1,
      warehouse: "Central HQ",
      destination: "Firebase Alpha",
      distance: 245.5,
      time: 4.2,
      waypoints: ["Central HQ", "Highway Route-1", "Provincial Border", "Firebase Alpha"],
    },
    {
      id: 2,
      warehouse: "Central HQ",
      destination: "Forward Operating Base",
      distance: 189.2,
      time: 3.1,
      waypoints: ["Central HQ", "Regional Highway", "Forward Operating Base"],
    },
    {
      id: 3,
      warehouse: "Regional Base 1",
      destination: "Medical Camp",
      distance: 92.3,
      time: 1.8,
      waypoints: ["Regional Base 1", "Local Road", "Medical Camp"],
    },
  ];

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (source && destination) {
      const route = mockRoutes.find(
        (r) => r.warehouse === warehouses.find((w) => w.id === source)?.name && r.destination === destination
      );
      setSelectedRoute(route);
      setRouteCalculated(true);
    }
  };

  const selectedWarehouse = warehouses.find((w) => w.id === source);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">
          Route Optimization
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Find optimal delivery routes between warehouses and operational bases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <form onSubmit={handleCalculateRoute} className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-green-400 font-bold">
              Route Planner
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Source Warehouse</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              >
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-mono uppercase mb-1.5 block">Destination Basecamp</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Firebase Alpha"
                className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-green-600 bg-green-900/40 hover:bg-green-800/50 text-green-300 font-mono font-medium text-sm transition-all uppercase tracking-wider"
            >
              <Navigation className="w-4 h-4" />
              Find Optimal Route
            </button>
          </form>

          <div className="mt-4 border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-4">
            <p className="text-xs text-slate-400 font-mono uppercase mb-3">Source Details</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500">Warehouse</p>
                <p className="text-sm font-mono text-slate-100">{selectedWarehouse?.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm text-slate-300">{selectedWarehouse?.location}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Coordinates</p>
                <p className="text-xs font-mono text-slate-400">{selectedWarehouse?.coords.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {routeCalculated && selectedRoute ? (
            <div className="space-y-4">
              <div className="border border-green-700/50 bg-green-950/20 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-green-400 uppercase">Route Found</h3>
                    <p className="text-xs text-slate-400 mt-1">Optimal path calculated</p>
                  </div>
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-500 mb-1">Total Distance</p>
                    <p className="text-2xl font-bold text-green-400 font-mono">{selectedRoute.distance} km</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-500 mb-1">Estimated Time</p>
                    <p className="text-2xl font-bold text-blue-400 font-mono">{selectedRoute.time} hrs</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-mono uppercase mb-3">Route Path</p>
                  <div className="space-y-2">
                    {selectedRoute.waypoints.map((waypoint: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          {idx < selectedRoute.waypoints.length - 1 && (
                            <div className="w-0.5 h-6 bg-slate-700/50"></div>
                          )}
                        </div>
                        <p className="text-sm text-slate-300 font-mono">{waypoint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setRouteCalculated(false);
                  setSelectedRoute(null);
                  setDestination("");
                }}
                className="w-full px-4 py-2 rounded border border-slate-700 bg-slate-800/50 text-slate-300 font-mono text-sm transition-all hover:border-slate-600"
              >
                Calculate Another Route
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-slate-700 bg-slate-900/30 backdrop-blur-sm rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-mono">Enter source and destination to calculate route</p>
              </div>
            </div>
          )}

          <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 mt-4">
            <p className="text-xs text-slate-400 font-mono uppercase mb-3">Available Routes</p>
            <div className="space-y-2">
              {mockRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => {
                    setSource(warehouses.find((w) => w.name === route.warehouse)?.id || "central");
                    setDestination(route.destination);
                    setSelectedRoute(route);
                    setRouteCalculated(true);
                  }}
                  className="w-full p-3 rounded border border-slate-700 bg-slate-800/30 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-300 uppercase">{route.warehouse}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        {route.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-slate-300">{route.distance} km</p>
                      <p className="text-xs text-slate-500">{route.time} hrs</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationPage;

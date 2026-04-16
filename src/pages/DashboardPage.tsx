import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LogisticsSidebar from "@/components/logistics/LogisticsSidebar";
import LogisticsNav from "@/components/logistics/LogisticsNav";
import DashboardContent from "@/components/logistics/DashboardContent";
import InventoryPage from "@/components/logistics/InventoryPage";
import SupplyRequestPage from "@/components/logistics/SupplyRequestPage";
import RouteOptimizationPage from "@/components/logistics/RouteOptimizationPage";
import SystemStatusPage from "@/components/logistics/SystemStatusPage";

type ActivePage = "dashboard" | "inventory" | "requests" | "routes" | "status";

const DashboardPage = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (activePage) {
      case "inventory":
        return <InventoryPage />;
      case "requests":
        return <SupplyRequestPage />;
      case "routes":
        return <RouteOptimizationPage />;
      case "status":
        return <SystemStatusPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex">
      <LogisticsSidebar activePage={activePage} onPageChange={setActivePage} isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <LogisticsNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} userName={user?.email || "Operator"} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

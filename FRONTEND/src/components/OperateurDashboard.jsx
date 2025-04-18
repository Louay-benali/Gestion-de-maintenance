import React from "react";
import NavBarDashboard from "./NavBarDashboard";
import Sidebar from "./SideBar";
import QuickStats from "./QuickStats";
import StatisticsSection from "./StatisticsSection";

const OperateurDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top navbar */}
        <NavBarDashboard />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <QuickStats />
          <div className="flex gap-6 p-6">
            <div className="w-2/3">
              <StatisticsSection />
            </div>
            {/* You can add another component here in the future */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OperateurDashboard;

import React, { useState } from "react";
import NavBarDashboard from "../components/NavBarDashboard";
import Sidebar from "../components/SideBar";
import QuickStats from "../components/QuickStats";
import StatisticsSection from "../components/StatisticsSection";
import RevenueCard from "../components/RevenueCard";
import MachineTable from "../components/MachineTable"; // ✅ Import du tableau

const OperateurDashboard = () => {
  // ✅ État pour suivre quelle page est sélectionnée
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  // ✅ Fonction qui affiche le contenu selon la page sélectionnée
  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return (
          <>
            <QuickStats />
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <div className="w-full lg:w-2/3">
                <StatisticsSection />
              </div>
              <div className="w-full lg:w-1/3">
                <RevenueCard />
              </div>
            </div>
          </>
        );
      case "Basic Table":
        return <MachineTable />; // ✅ Affiche la table
      default:
        return <div>Page not found</div>; // ✅ Optionnel : pour les pages non reconnues
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Passe setSelectedPage à Sidebar */}
      <Sidebar setSelectedPage={setSelectedPage} />

      <div className="flex-1 flex flex-col min-h-screen">
        <NavBarDashboard />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* ✅ Affiche dynamiquement le contenu */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default OperateurDashboard;

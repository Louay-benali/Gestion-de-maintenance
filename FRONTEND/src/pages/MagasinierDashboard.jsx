import React, { useState } from "react";
import NavBarDashboard from "../layout/NavBarDashboard.jsx";
import Sidebar from "../components/SideBar";
import QuickStats from "../components/QuickStats";
import StatisticsSection from "../components/StatisticsSection";
import StockAlertCard from "../components/StockAlertCard";
import CommandeTable from "../components/CommandeTable";
import UserProfile from "../layout/UserProfile.jsx";
import StockManager from "../components/StockManager.jsx";
import DemandesPiecesTable from "../components/DemandesPiecesTable.jsx";
import PasserCommandeForm from "../components/PasserCommandeForm.jsx";
import RevenueCard from "../components/RevenueCard.jsx";

// Importation des icônes nécessaires
import {
  MdDashboard,
  MdPerson,
  MdTableChart,
  MdInventory,
  MdShoppingCart,
  MdAssignment,
  MdAssessment,
} from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";


const MagasinierDashboard = () => {
  // État pour suivre quelle page est sélectionnée
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  // État pour gérer l'état de collapse de la sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Définition des éléments du menu principal
  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard size={24} /> },
    { label: "Gérer Stock", icon: <MdInventory size={24} /> },
    { label: "Commandes", icon: <MdShoppingCart size={24} /> },
    { label: "Demandes de Pièces", icon: <MdAssignment size={24} /> },
    { label: "Rapports", icon: <MdAssessment size={24} /> },
    { label: "UserProfile", icon: <MdPerson size={24} /> },
  ];

  // Définition des éléments du menu de table
  const tableMenuItems = [
    {
      icon: <MdTableChart size={24} />,
      label: "Stock Table",
    },
    {
      icon: <MdTableChart size={24} />,
      label: "Commandes Table",
    },
    {
      icon: <MdTableChart size={24} />,
      label: "Demandes Table",
    },
  ];

  // Fonction qui affiche le contenu selon la page sélectionnée
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

      case "Gérer Stock":
        return <StockManager />;
      case "Commandes":
        return <PasserCommandeForm />;
      case "Commandes Table":
        return <CommandeTable />;
      case "Demandes de Pièces":
        return <DemandesPiecesTable />;
      case "Alertes de Stock":
        return <StockAlertCard />;
      case "User Profile":
        return <UserProfile />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Passez tous les props nécessaires à Sidebar */}
      <Sidebar
        setSelectedPage={setSelectedPage}
        menuItems={menuItems}
        tableMenuItems={tableMenuItems}
        isCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <NavBarDashboard
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MagasinierDashboard;

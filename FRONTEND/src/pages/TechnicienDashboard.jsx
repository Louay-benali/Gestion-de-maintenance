import React, { useState } from "react";
import NavBarDashboard from "../components/NavBarDashboard";
import Sidebar from "../components/SideBar";
import QuickStats from "../components/QuickStats";
import StatisticsSection from "../components/StatisticsSection";
import RevenueCard from "../components/RevenueCard";
import MachineTable from "../components/MachineTable";
import UserProfile from "./UserProfile.jsx";
import Task from "../components/Task.jsx";
import Calendar from "../components/Calender.jsx";
import InterventionTable from "../components/InterventionTable.jsx";
import CreerRapportIntervention from "../components/CreerRapportIntervention.jsx";
import { MdInventory } from "react-icons/md";
import { MdDashboard, MdTableChart } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbForms } from "react-icons/tb";
import DemanderPieces from "../components/DemanderPieces.jsx";

const TechnicienDashboard = () => {
  // ✅ État pour suivre quelle page est sélectionnée
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  // ✅ Définition des menuItems spécifiques pour le technicien
  const technicienMenuItems = [
    {
      icon: <MdDashboard size={24} />,
      label: "Dashboard",
    },
    {
      icon: <BsCalendarEvent size={24} />,
      label: "Calendar",
    },
    {
      icon: <FiUser size={24} />,
      label: "UserProfile",
    },
    {
      icon: <AiOutlineSchedule size={24} />,
      label: "Task",
    },
    {
      icon: <TbForms size={24} />,
      label: "Creer Rapport",
    },
    {
      icon: <MdInventory size={24} />,
      label: "Demande Pièces",
    },
  ];

  // ✅ Définition des éléments de menu pour les tables
  const tableMenuItems = [
    {
      icon: <MdTableChart size={24} />,
      label: "Machine Table",
    },
    {
      icon: <MdTableChart size={24} />,
      label: "Intervention Table",
    },
  ];

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
      case "UserProfile":
        return <UserProfile />;
      case "Machine Table":
        return <MachineTable />;
      case "Intervention Table":
        return <InterventionTable />;
      case "Creer Rapport":
        return <CreerRapportIntervention />;
      case "Task":
        return <Task />;
      case "Calendar":
        return <Calendar />;
      case "Demande Pièces":
        return <DemanderPieces />
      case "Chat":
        return <div>Chat Component</div>; // Ajout d'un placeholder pour le Chat
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Passe les menuItems et tableMenuItems à Sidebar */}
      <Sidebar
        setSelectedPage={setSelectedPage}
        menuItems={technicienMenuItems}
        tableMenuItems={tableMenuItems}
      />

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

export default TechnicienDashboard;

import React, { useState, useEffect } from "react";
import NavBarDashboard from "../layout/NavBarDashboard.jsx";
import Sidebar from "../components/SideBar";
import QuickStats from "../components/QuickStats";
import StatisticsSection from "../components/StatisticsSection";
import CommandeTable from "../components/CommandeTable";
import UserProfile from "../layout/UserProfile.jsx";
import StockManager from "../components/StockManager.jsx";
import DemandesPiecesTable from "../components/DemandesPiecesTable.jsx";
import PasserCommandeForm from "../components/PasserCommandeForm.jsx";
import RevenueCard from "../components/RevenueCard.jsx";
import DemandesTable from "../components/DemandesTable.jsx";

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
import StockTable from "../components/StockTable.jsx";

const MagasinierDashboard = () => {
  // État pour suivre quelle page est sélectionnée
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  // État pour gérer l'état de collapse de la sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // États pour les demandes
  const [demandes, setDemandes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Définition des éléments du menu principal
  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard size={24} /> },
    { label: "Gérer Stock", icon: <MdInventory size={24} /> },
    { label: "Commandes", icon: <MdShoppingCart size={24} /> },
    { label: "Demandes de Pièces", icon: <MdAssignment size={24} /> },
    { label: "Rapports", icon: <MdAssessment size={24} /> },
    { label: "User Profile", icon: <MdPerson size={24} /> },
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
    }
  ];

  // Effet pour charger les données des demandes quand nécessaire
  useEffect(() => {
    // Cette fonction serait votre appel API réel en production
    const fetchDemandes = async () => {
      setIsLoading(true);
      try {
        // Remplacer par votre appel API réel
        // const response = await fetch('/api/demandes');
        // const data = await response.json();

        // Données de démonstration pour l'instant - modifiées selon les nouvelles colonnes
        const mockData = [
          {
            id: 1,
            reference: "REF-2025-001",
            date: "2025-05-01",
            pieces: [{ id: 1, nom: "Filtre à huile" }],
            quantite: 5,
            priorite: "haute",
          },
          {
            id: 2,
            reference: "REF-2025-002",
            date: "2025-05-03",
            pieces: [{ id: 3, nom: "Courroie de distribution" }],
            quantite: 2,
            priorite: "moyenne",
          },
          {
            id: 3,
            reference: "REF-2025-003",
            date: "2025-05-06",
            pieces: [{ id: 5, nom: "Plaquette de frein" }],
            quantite: 8,
            priorite: "basse",
          },
          {
            id: 4,
            reference: "REF-2025-004",
            date: "2025-05-07",
            pieces: [{ id: 7, nom: "Pompe à eau" }],
            quantite: 1,
            priorite: "haute",
          },
          {
            id: 5,
            reference: "REF-2025-005",
            date: "2025-05-08",
            pieces: [{ id: 9, nom: "Batterie 12V" }],
            quantite: 3,
            priorite: "moyenne",
          },
        ];

        // Simuler un délai réseau
        setTimeout(() => {
          setDemandes(mockData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erreur lors du chargement des demandes:", error);
        setIsLoading(false);
      }
    };

    if (selectedPage === "Demandes Table") {
      fetchDemandes();
    }
  }, [selectedPage]);

  // Fonctions pour la table des demandes
  const openDemandeDetails = (demande) => {
    console.log("Ouverture des détails pour la demande:", demande);
    // Implémentez votre logique ici
  };

  const handleValidation = (demandeId, isApproved) => {
    console.log(`Demande ${demandeId} ${isApproved ? "approuvée" : "rejetée"}`);
    // Mettre à jour le statut dans votre état/backend
    setDemandes((prevDemandes) =>
      prevDemandes.map((d) =>
        d.id === demandeId
          ? { ...d, statut: isApproved ? "approuvee" : "rejetee" }
          : d
      )
    );
  };

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
      case "Stock Table":
        return <StockTable />;
      case "User Profile":
        return <UserProfile />;
      case "Demandes Table":
        return isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Chargement des demandes...</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Demandes de Pièces</h2>
            <DemandesTable
              demandes={demandes}
              openDemandeDetails={openDemandeDetails}
              handleValidation={handleValidation}
            />
          </div>
        );
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

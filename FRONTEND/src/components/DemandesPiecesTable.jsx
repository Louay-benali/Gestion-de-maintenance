import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdCancel, MdMoreVert, MdSearch } from "react-icons/md";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const DemandesPiecesTable = ({ showAll = false }) => {
  // États pour gérer les données et les fonctionnalités
  const [demandesPieces, setDemandesPieces] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "dateCreation",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Données de démonstration
  useEffect(() => {
    // Simulation d'une requête API
    const fetchData = () => {
      const mockData = [
        {
          id: "DEM-1001",
          numeroDemande: "DEM-2025-001",
          dateCreation: new Date(2025, 3, 30), // 30 avril 2025
          demandeur: "Jean Dupont",
          atelier: "Mécanique",
          reference: "PTR-3456",
          designation: "Filtre à huile",
          quantite: 5,
          urgence: "Élevée",
          status: "En attente",
          notes: "Besoin urgent pour réparation camion C789",
        },
        {
          id: "DEM-1002",
          numeroDemande: "DEM-2025-002",
          dateCreation: new Date(2025, 4, 1), // 1 mai 2025
          demandeur: "Sophie Martin",
          atelier: "Électricité",
          reference: "ELT-2234",
          designation: "Relais 24V",
          quantite: 2,
          urgence: "Moyenne",
          status: "Validée",
          notes: "Pour station de pompage S23",
        },
        {
          id: "DEM-1003",
          numeroDemande: "DEM-2025-003",
          dateCreation: new Date(2025, 4, 2), // 2 mai 2025
          demandeur: "Ahmed Benoît",
          atelier: "Maintenance",
          reference: "MTN-5578",
          designation: "Kit joints hydrauliques",
          quantite: 1,
          urgence: "Faible",
          status: "Livrée",
          notes: "Maintenance préventive",
        },
        {
          id: "DEM-1004",
          numeroDemande: "DEM-2025-004",
          dateCreation: new Date(2025, 4, 3), // 3 mai 2025
          demandeur: "Claire Dubois",
          atelier: "Carrosserie",
          reference: "CRS-9987",
          designation: "Peinture blanche 5L",
          quantite: 3,
          urgence: "Moyenne",
          status: "Refusée",
          notes: "Stock insuffisant",
        },
        {
          id: "DEM-1005",
          numeroDemande: "DEM-2025-005",
          dateCreation: new Date(2025, 4, 3), // 3 mai 2025
          demandeur: "Robert Leroy",
          atelier: "Mécanique",
          reference: "PTR-5566",
          designation: "Jeu de plaquettes de frein",
          quantite: 2,
          urgence: "Élevée",
          status: "En attente",
          notes: "Pour bus lignes régulières",
        },
        {
          id: "DEM-1006",
          numeroDemande: "DEM-2025-006",
          dateCreation: new Date(2025, 4, 3), // 3 mai 2025
          demandeur: "Marie Lenoir",
          atelier: "Électricité",
          reference: "ELT-7789",
          designation: "Boîtier électronique",
          quantite: 1,
          urgence: "Moyenne",
          status: "Validée",
          notes: "Remplacement suite à diagnostic",
        },
        {
          id: "DEM-1007",
          numeroDemande: "DEM-2025-007",
          dateCreation: new Date(2025, 4, 4), // 4 mai 2025
          demandeur: "Thomas Petit",
          atelier: "Carrosserie",
          reference: "CRS-1122",
          designation: "Mastics et résines",
          quantite: 8,
          urgence: "Faible",
          status: "En attente",
          notes: "Réapprovisionnement stock atelier",
        },
      ];

      // Si showAll est false, ne montrer que les demandes récentes ou en attente
      const filteredMockData = showAll
        ? mockData
        : mockData.filter(
            (item) =>
              item.status === "En attente" ||
              (new Date() - item.dateCreation) / (1000 * 60 * 60 * 24) < 7
          ); // 7 derniers jours

      setDemandesPieces(filteredMockData);
      setFilteredDemandes(filteredMockData);
    };

    fetchData();
  }, [showAll]);

  // Filtrer les données en fonction du terme de recherche et du statut
  useEffect(() => {
    let result = demandesPieces;

    // Filtre de recherche
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.numeroDemande.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.demandeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre de statut
    if (selectedStatus !== "all") {
      result = result.filter((item) => item.status === selectedStatus);
    }

    // Tri des données
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredDemandes(result);
    setCurrentPage(1); // Réinitialiser à la première page après filtrage
  }, [searchTerm, selectedStatus, demandesPieces, sortConfig]);

  // Fonction pour gérer le tri
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Fonctions pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDemandes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour gérer le changement de statut
  const handleStatusChange = (id, newStatus) => {
    setDemandesPieces(
      demandesPieces.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setOpenMenuId(null);
  };

  // Format de date français
  const formatDate = (date) => {
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // Fonction pour afficher la couleur selon l'urgence
  const getUrgenceColor = (urgence) => {
    switch (urgence) {
      case "Élevée":
        return "text-red-600";
      case "Moyenne":
        return "text-orange-500";
      case "Faible":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Fonction pour afficher la couleur selon le statut
  const getStatusColor = (status) => {
    switch (status) {
      case "Validée":
        return "bg-green-100 text-green-800";
      case "Livrée":
        return "bg-blue-100 text-blue-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Refusée":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {showAll
          ? "Toutes les demandes de pièces"
          : "Demandes de pièces récentes"}
      </h2>

      {/* Barre de recherche et filtres */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MdSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Validée">Validée</option>
            <option value="Livrée">Livrée</option>
            <option value="Refusée">Refusée</option>
          </select>

          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="5">5 par page</option>
            <option value="10">10 par page</option>
            <option value="20">20 par page</option>
          </select>
        </div>
      </div>

      {/* Tableau des demandes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("numeroDemande")}
              >
                N° Demande
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("dateCreation")}
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("demandeur")}
              >
                Demandeur
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("reference")}
              >
                Référence
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("designation")}
              >
                Désignation
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("quantite")}
              >
                Quantité
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("urgence")}
              >
                Urgence
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                Statut
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((demande) => (
                <tr key={demande.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {demande.numeroDemande}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(demande.dateCreation)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.demandeur}
                    <div className="text-xs text-gray-400">
                      {demande.atelier}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.reference}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.designation}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.quantite}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={getUrgenceColor(demande.urgence)}>
                      {demande.urgence}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        demande.status
                      )}`}
                    >
                      {demande.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === demande.id ? null : demande.id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MdMoreVert size={20} />
                    </button>

                    {/* Menu d'actions */}
                    {openMenuId === demande.id && (
                      <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        {demande.status === "En attente" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(demande.id, "Validée")
                              }
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <MdCheckCircle className="mr-2 text-green-500" />
                              Valider la demande
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(demande.id, "Refusée")
                              }
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <MdCancel className="mr-2 text-red-500" />
                              Refuser
                            </button>
                          </>
                        )}
                        {demande.status === "Validée" && (
                          <button
                            onClick={() =>
                              handleStatusChange(demande.id, "Livrée")
                            }
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <MdCheckCircle className="mr-2 text-blue-500" />
                            Marquer comme livrée
                          </button>
                        )}
                        <button
                          onClick={() => setOpenMenuId(null)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Voir détails
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  Aucune demande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredDemandes.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstItem + 1} à{" "}
            {Math.min(indexOfLastItem, filteredDemandes.length)} sur{" "}
            {filteredDemandes.length} résultats
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Précédent
            </button>
            {Array.from(
              { length: Math.ceil(filteredDemandes.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredDemandes.length / itemsPerPage)
              }
              className={`px-3 py-1 rounded ${
                currentPage ===
                Math.ceil(filteredDemandes.length / itemsPerPage)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesPiecesTable;

import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdAdd,
  MdSave,
  MdClose,
  MdWarning,
} from "react-icons/md";

const StockManager = () => {
  // États pour gérer les données et les fonctionnalités
  const [stockItems, setStockItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "reference",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    reference: "",
    designation: "",
    categorie: "",
    emplacement: "",
    quantite: 0,
    seuilAlerte: 5,
    prixUnitaire: 0,
    fournisseur: "",
  });

  // Données de démonstration
  useEffect(() => {
    // Simulation d'une requête API
    const fetchData = () => {
      const mockData = [
        {
          id: 1,
          reference: "FIL-001",
          designation: "Filtre à huile",
          categorie: "Filtration",
          emplacement: "A-12-3",
          quantite: 25,
          seuilAlerte: 10,
          prixUnitaire: 15.5,
          fournisseur: "AutoParts Pro",
          derniereMaj: new Date(2025, 3, 15),
        },
        {
          id: 2,
          reference: "BAT-002",
          designation: "Batterie 12V",
          categorie: "Électrique",
          emplacement: "B-05-1",
          quantite: 8,
          seuilAlerte: 5,
          prixUnitaire: 89.99,
          fournisseur: "ElectroParts",
          derniereMaj: new Date(2025, 4, 1),
        },
        {
          id: 3,
          reference: "FRE-003",
          designation: "Plaquettes de frein avant",
          categorie: "Freinage",
          emplacement: "C-08-4",
          quantite: 12,
          seuilAlerte: 6,
          prixUnitaire: 45.75,
          fournisseur: "BrakeMaster",
          derniereMaj: new Date(2025, 4, 2),
        },
        {
          id: 4,
          reference: "HUI-004",
          designation: "Huile moteur 5W30 (1L)",
          categorie: "Lubrifiants",
          emplacement: "D-01-2",
          quantite: 30,
          seuilAlerte: 15,
          prixUnitaire: 12.25,
          fournisseur: "LubriTech",
          derniereMaj: new Date(2025, 3, 28),
        },
        {
          id: 5,
          reference: "AMO-005",
          designation: "Amortisseur arrière",
          categorie: "Suspension",
          emplacement: "E-04-3",
          quantite: 4,
          seuilAlerte: 4,
          prixUnitaire: 125.5,
          fournisseur: "SuspensionPro",
          derniereMaj: new Date(2025, 4, 3),
        },
        {
          id: 6,
          reference: "PNE-006",
          designation: "Pneu 205/55R16",
          categorie: "Pneumatiques",
          emplacement: "F-10-1",
          quantite: 16,
          seuilAlerte: 8,
          prixUnitaire: 78.99,
          fournisseur: "TireExpress",
          derniereMaj: new Date(2025, 3, 20),
        },
        {
          id: 7,
          reference: "ESS-007",
          designation: "Essuie-glace 60cm",
          categorie: "Visibilité",
          emplacement: "G-02-5",
          quantite: 22,
          seuilAlerte: 10,
          prixUnitaire: 18.75,
          fournisseur: "VisioClean",
          derniereMaj: new Date(2025, 4, 1),
        },
        {
          id: 8,
          reference: "COU-008",
          designation: "Courroie de distribution",
          categorie: "Moteur",
          emplacement: "H-06-2",
          quantite: 7,
          seuilAlerte: 5,
          prixUnitaire: 32.5,
          fournisseur: "EngineParts",
          derniereMaj: new Date(2025, 3, 25),
        },
        {
          id: 9,
          reference: "LIQ-009",
          designation: "Liquide de refroidissement (5L)",
          categorie: "Refroidissement",
          emplacement: "I-03-4",
          quantite: 3,
          seuilAlerte: 5,
          prixUnitaire: 22.99,
          fournisseur: "CoolTech",
          derniereMaj: new Date(2025, 4, 2),
        },
        {
          id: 10,
          reference: "FLU-010",
          designation: "Fluide de transmission",
          categorie: "Transmission",
          emplacement: "J-09-1",
          quantite: 9,
          seuilAlerte: 6,
          prixUnitaire: 28.75,
          fournisseur: "TransFlow",
          derniereMaj: new Date(2025, 3, 30),
        },
      ];

      setStockItems(mockData);
      setFilteredItems(mockData);
    };

    fetchData();
  }, []);

  // Filtrer les articles en fonction du terme de recherche et de la catégorie
  useEffect(() => {
    let result = stockItems;

    // Filtre de recherche
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fournisseur.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre de catégorie
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.categorie === selectedCategory);
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

    setFilteredItems(result);
    setCurrentPage(1); // Réinitialiser à la première page après filtrage
  }, [searchTerm, selectedCategory, stockItems, sortConfig]);

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
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Obtenir toutes les catégories uniques
  const categories = [...new Set(stockItems.map((item) => item.categorie))];

  // Fonction pour formater la date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fonction pour déterminer si un article est en niveau d'alerte
  const isAlertLevel = (item) => {
    return item.quantite <= item.seuilAlerte;
  };

  // Fonction pour mettre à jour un article
  const handleSaveEdit = () => {
    if (editingItem) {
      setStockItems(
        stockItems.map((item) =>
          item.id === editingItem.id
            ? { ...editingItem, derniereMaj: new Date() }
            : item
        )
      );
      setEditingItem(null);
    }
  };

  // Fonction pour ajouter un nouvel article
  const handleAddItem = () => {
    const newItemWithId = {
      ...newItem,
      id: Math.max(...stockItems.map((item) => item.id)) + 1,
      derniereMaj: new Date(),
    };
    setStockItems([...stockItems, newItemWithId]);
    setShowAddModal(false);
    setNewItem({
      reference: "",
      designation: "",
      categorie: "",
      emplacement: "",
      quantite: 0,
      seuilAlerte: 5,
      prixUnitaire: 0,
      fournisseur: "",
    });
  };

  // Fonction pour supprimer un article
  const handleDeleteItem = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article?")) {
      setStockItems(stockItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Gestion du Stock
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <MdAdd size={20} className="mr-1" /> Ajouter un article
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Rechercher par référence, désignation..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MdSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>

        <select
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
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

      {/* Tableau de stock */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                onClick={() => requestSort("categorie")}
              >
                Catégorie
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("emplacement")}
              >
                Emplacement
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
                onClick={() => requestSort("prixUnitaire")}
              >
                Prix unitaire
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("fournisseur")}
              >
                Fournisseur
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("derniereMaj")}
              >
                Dernière MAJ
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${
                  isAlertLevel(item) ? "bg-red-50" : ""
                }`}
              >
                {editingItem && editingItem.id === item.id ? (
                  // Mode édition
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        value={editingItem.reference}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            reference: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        value={editingItem.designation}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            designation: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full p-1 border rounded"
                        value={editingItem.categorie}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            categorie: e.target.value,
                          })
                        }
                      >
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        value={editingItem.emplacement}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            emplacement: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="w-full p-1 border rounded"
                        value={editingItem.quantite}
                        min="0"
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            quantite: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        className="w-full p-1 border rounded"
                        value={editingItem.prixUnitaire}
                        min="0"
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            prixUnitaire: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        value={editingItem.fournisseur}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            fournisseur: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      {formatDate(item.derniereMaj)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <MdSave size={20} />
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <MdClose size={20} />
                      </button>
                    </td>
                  </>
                ) : (
                  // Mode affichage
                  <>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.reference}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.designation}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.categorie}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.emplacement}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${
                          isAlertLevel(item)
                            ? "text-red-600 font-semibold flex items-center"
                            : "text-gray-500"
                        }`}
                      >
                        {isAlertLevel(item) && (
                          <MdWarning className="mr-1 text-red-600" />
                        )}
                        {item.quantite}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.prixUnitaire.toFixed(2)} €
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.fournisseur}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.derniereMaj)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  Aucun article trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstItem + 1} à{" "}
            {Math.min(indexOfLastItem, filteredItems.length)} sur{" "}
            {filteredItems.length} articles
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
              { length: Math.ceil(filteredItems.length / itemsPerPage) },
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
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
              }
              className={`px-3 py-1 rounded ${
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Modal d'ajout d'article */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Ajouter un nouvel article
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Référence
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.reference}
                  onChange={(e) =>
                    setNewItem({ ...newItem, reference: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Désignation
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.designation}
                  onChange={(e) =>
                    setNewItem({ ...newItem, designation: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={newItem.categorie}
                  onChange={(e) =>
                    setNewItem({ ...newItem, categorie: e.target.value })
                  }
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="Nouvelle">+ Nouvelle catégorie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emplacement
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.emplacement}
                  onChange={(e) =>
                    setNewItem({ ...newItem, emplacement: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantité
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.quantite}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantite: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seuil d'alerte
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.seuilAlerte}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      seuilAlerte: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix unitaire (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.prixUnitaire}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      prixUnitaire: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fournisseur
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newItem.fournisseur}
                  onChange={(e) =>
                    setNewItem({ ...newItem, fournisseur: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={!newItem.reference || !newItem.designation}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManager;

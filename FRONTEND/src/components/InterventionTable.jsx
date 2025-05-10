import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { VscSettings } from "react-icons/vsc";
import { Calendar, Wrench, Edit, Save, XCircle } from "lucide-react";
import { MdEdit } from "react-icons/md";

const interventions = [
  {
    id: "INT-2025-001",
    machine: "Compressor A1",
    type: "Maintenance",
    technician: "Jean Dupont",
    date: "12 avr. 2025",
    status: "Completed",
  },
  {
    id: "INT-2025-002",
    machine: "Lathe B2",
    type: "Réparation",
    technician: "Sophie Martin",
    date: "08 avr. 2025",
    status: "En cours",
  },
  {
    id: "INT-2025-003",
    machine: "Pump C3",
    type: "Réparation",
    technician: "Pierre Lefebvre",
    date: "05 avr. 2025",
    status: "Completed",
  },
  {
    id: "INT-2025-004",
    machine: "Mixer D4",
    type: "Maintenance",
    technician: "Marie Dubois",
    date: "20 mars 2025",
    status: "Reporté",
  },
  {
    id: "INT-2025-005",
    machine: "Conveyor E5",
    type: "Maintenance",
    technician: "Lucas Bernard",
    date: "15 mars 2025",
    status: "Completed",
  },
];

// Liste des techniciens disponibles
const techniciansList = [
  "Jean Dupont",
  "Sophie Martin",
  "Pierre Lefebvre",
  "Marie Dubois",
  "Lucas Bernard",
  "Thomas Robert",
  "Emilie Petit",
];

// Liste des machines disponibles
const machinesList = [
  "Compressor A1",
  "Lathe B2",
  "Pump C3",
  "Mixer D4",
  "Conveyor E5",
  "Generator F6",
  "Robot G7",
];

// Liste des statuts disponibles
const statusList = ["Completed", "En cours", "Reporté"];

const getStatusStyles = (status) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-700";
    case "En cours":
      return "bg-blue-50 dark:bg-blue-500/15 dark:text-blue-700";
    case "Reporté":
      return "bg-orange-50 dark:bg-orange-500/15 dark:text-amber-900";
    case "Cancel":
      return "bg-red-50 dark:bg-red-500/15 dark:text-red-700";
    default:
      return "";
  }
};

const getInterventionTypeIcon = (type) => {
  switch (type) {
    case "Maintenance":
      return <Calendar size={16} className="text-blue-600" />;
    case "Réparation":
      return <Wrench size={16} className="text-orange-600" />;
    default:
      return <Wrench size={16} className="text-gray-600" />;
  }
};

const InterventionTable = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    technician: "",
    status: "", // Ajout du filtre status
  });
  const [interventionsData, setInterventionsData] = useState(interventions);
  const [filteredInterventions, setFilteredInterventions] =
    useState(interventions);
  const [isAnyFilterActive, setIsAnyFilterActive] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    machine: "",
    technician: "",
    status: "",
    date: "",
  });

  // Vérification de la taille d'écran lors du montage et du redimensionnement
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Appliquer les filtres et la recherche
  useEffect(() => {
    let result = interventionsData;

    // Appliquer la recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.id.toLowerCase().includes(search) ||
          item.machine.toLowerCase().includes(search) ||
          item.technician.toLowerCase().includes(search) ||
          item.type.toLowerCase().includes(search)
      );
    }

    // Appliquer les filtres
    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.technician) {
      result = result.filter((item) => item.technician === filters.technician);
    }

    // Filtre par statut
    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    setFilteredInterventions(result);
    setIsAnyFilterActive(
      filters.type !== "" || filters.technician !== "" || filters.status !== ""
    );
  }, [searchTerm, filters, interventionsData]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      type: "",
      technician: "",
      status: "", // Réinitialiser également le filtre status
    });
  };

  // Commencer à éditer une ligne
  const startEdit = (intervention) => {
    setEditingId(intervention.id);
    setEditValues({
      machine: intervention.machine,
      technician: intervention.technician,
      status: intervention.status,
      date: intervention.date,
    });
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Sauvegarder les modifications
  const saveEdit = (id) => {
    const updatedInterventions = interventionsData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          machine: editValues.machine,
          technician: editValues.technician,
          status: editValues.status,
          date: editValues.date,
        };
      }
      return item;
    });

    setInterventionsData(updatedInterventions);
    setEditingId(null);
  };

  return (
    <div className="border py-4 rounded-3xl dark:border-gray-200 bg-white">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Historique des Interventions</h1>
        <div className="flex gap-2 justify-end w-full sm:w-auto">
          <SearchInput
            className="w-full sm:w-48 md:w-72"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`border dark:border-gray-300 p-2 rounded-lg sm:w-24 flex flex-row gap-2 items-center hover:bg-gray-50 ${
              showFilters ? "bg-blue-50 border-blue-300 text-blue-700" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <VscSettings size={20} />
            Filtrer
          </button>
        </div>
      </div>

      {/* Section des filtres */}
      {showFilters && (
        <div className="px-5 pb-4 border-t border-gray-200 dark:border-gray-200 pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">
                Type d'intervention
              </label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Tous les types</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Réparation">Réparation</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">Technicien</label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.technician}
                onChange={(e) =>
                  setFilters({ ...filters, technician: e.target.value })
                }
              >
                <option value="">Tous les techniciens</option>
                {techniciansList.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Nouveau filtre pour le statut */}
            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">Statut</label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Tous les statuts</option>
                {statusList.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {isAnyFilterActive && (
              <button
                className="mt-6 flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                onClick={resetFilters}
              >
                <XCircle size={14} />
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      )}

      {/* Vue de bureau */}
      {!isSmallScreen && (
        <div className="border-t dark:border-gray-200 pt-6 pb-3 px-7">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-200 dark:bg-white/[0.03]">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-300">
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      ID Intervention
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Machine
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Type
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Technicien
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Date
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Status
                    </th>
                    <th className="px-5 py-3 text-center sm:px-6 text-gray-600 text-theme-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterventions.length > 0 ? (
                    filteredInterventions.map((intervention) => (
                      <tr
                        key={intervention.id}
                        className="border-b border-gray-100 dark:border-gray-300"
                      >
                        <td className="px-5 py-4 sm:px-6 text-theme-xs dark:text-gray-500">
                          {intervention.id}
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          {editingId === intervention.id ? (
                            <select
                              className="border border-gray-300 rounded p-1 text-sm bg-white w-full"
                              value={editValues.machine}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  machine: e.target.value,
                                })
                              }
                            >
                              {machinesList.map((machine) => (
                                <option key={machine} value={machine}>
                                  {machine}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="block text-theme-xs dark:text-gray-500">
                                {intervention.machine}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-2">
                            {getInterventionTypeIcon(intervention.type)}
                            <span className="text-theme-sm dark:text-gray-500">
                              {intervention.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                          {editingId === intervention.id ? (
                            <select
                              className="border border-gray-300 rounded p-1 text-sm bg-white w-full"
                              value={editValues.technician}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  technician: e.target.value,
                                })
                              }
                            >
                              {techniciansList.map((tech) => (
                                <option key={tech} value={tech}>
                                  {tech}
                                </option>
                              ))}
                            </select>
                          ) : (
                            intervention.technician
                          )}
                        </td>
                        <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                          {intervention.date}
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          {editingId === intervention.id ? (
                            <select
                              className="border border-gray-300 rounded p-1 text-sm bg-white w-full"
                              value={editValues.status}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  status: e.target.value,
                                })
                              }
                            >
                              {statusList.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <p
                              className={`${getStatusStyles(
                                intervention.status
                              )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                            >
                              {intervention.status}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4 sm:px-6 text-center">
                          {editingId === intervention.id ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => saveEdit(intervention.id)}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                              >
                                <XCircle size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <button
                                onClick={() => startEdit(intervention)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <MdEdit size={20} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-5 py-8 text-center text-gray-500"
                      >
                        Aucune intervention trouvée avec les critères
                        sélectionnés
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Vue mobile responsive */}
      {isSmallScreen && (
        <div className="border-t dark:border-gray-200 pt-4 pb-3 px-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredInterventions.length > 0 ? (
              filteredInterventions.map((intervention) => (
                <div
                  key={intervention.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">
                      {intervention.id}
                    </span>
                    {editingId === intervention.id ? (
                      <select
                        className="border border-gray-300 rounded text-sm bg-white"
                        value={editValues.status}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            status: e.target.value,
                          })
                        }
                      >
                        {statusList.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p
                        className={`${getStatusStyles(
                          intervention.status
                        )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                      >
                        {intervention.status}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Machine</p>
                      {editingId === intervention.id ? (
                        <select
                          className="border border-gray-300 rounded text-sm bg-white w-full"
                          value={editValues.machine}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              machine: e.target.value,
                            })
                          }
                        >
                          {machinesList.map((machine) => (
                            <option key={machine} value={machine}>
                              {machine}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm dark:text-gray-500">
                          {intervention.machine}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <div className="flex items-center gap-1">
                        {getInterventionTypeIcon(intervention.type)}
                        <span className="text-sm dark:text-gray-500">
                          {intervention.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Technicien</p>
                      {editingId === intervention.id ? (
                        <select
                          className="border border-gray-300 rounded text-sm bg-white w-full"
                          value={editValues.technician}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              technician: e.target.value,
                            })
                          }
                        >
                          {techniciansList.map((tech) => (
                            <option key={tech} value={tech}>
                              {tech}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm dark:text-gray-500">
                          {intervention.technician}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm dark:text-gray-500">
                        {intervention.date}
                      </p>
                    </div>
                  </div>

                  {editingId === intervention.id ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => saveEdit(intervention.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 p-2 rounded text-green-600"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 p-2 rounded text-red-600"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        onClick={() => startEdit(intervention)}
                        className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded text-blue-600"
                      >
                        <Edit size={16} />
                        <span className="text-sm">Modifier</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
                Aucune intervention trouvée avec les critères sélectionnés
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionTable;

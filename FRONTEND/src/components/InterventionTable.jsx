import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { Filter, X, Save, XCircle } from "lucide-react";
import { Calendar, Wrench } from "lucide-react";
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
    type: "Reparation",
    technician: "Sophie Martin",
    date: "08 avr. 2025",
    status: "En cours",
  },
  {
    id: "INT-2025-003",
    machine: "Pump C3",
    type: "Maintenance",
    technician: "Pierre Lefebvre",
    date: "05 avr. 2025",
    status: "Completed",
  },
  {
    id: "INT-2025-004",
    machine: "Mixer D4",
    type: "Reparation",
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
      return "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
    case "En cours":
      return "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400";
    case "Reporté":
      return "bg-orange-50 dark:bg-orange-500/15 text-amber-700 dark:text-amber-400";
    default:
      return "";
  }
};

const getInterventionTypeIcon = (type) => {
  switch (type) {
    case "Maintenance":
      return <Calendar size={16} className="text-blue-500" />;
    case "Reparation":
      return <Wrench size={16} className="text-orange-500" />;
    default:
      return <Wrench size={16} className="text-gray-500" />;
  }
};

// Extraction des valeurs uniques pour les filtres
const uniqueTypes = [...new Set(interventions.map((item) => item.type))];
const uniqueTechnicians = [
  ...new Set(interventions.map((item) => item.technician)),
];

const InterventionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    technician: "",
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

    setFilteredInterventions(result);
    setIsAnyFilterActive(filters.type !== "" || filters.technician !== "");
  }, [searchTerm, filters, interventionsData]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      type: "",
      technician: "",
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
    <div className="border py-4 rounded-3xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold dark:text-white">
          Historique des Interventions
        </h1>
        <div className="flex gap-2 justify-end w-full sm:w-auto">
          <SearchInput
            className="w-full sm:w-48 md:w-72"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`border p-2 rounded-lg sm:w-24 flex flex-row gap-2 items-center justify-center transition-colors ${
              showFilters
                ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filtrer
          </button>
        </div>
      </div>

      {/* Section des filtres */}
      {showFilters && (
        <div className="px-5 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Type d'intervention
              </label>
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-700 dark:text-white"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Tous les types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Technicien
              </label>
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-700 dark:text-white"
                value={filters.technician}
                onChange={(e) =>
                  setFilters({ ...filters, technician: e.target.value })
                }
              >
                <option value="">Tous les techniciens</option>
                {uniqueTechnicians.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {isAnyFilterActive && (
              <button
                className="mt-6 flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                onClick={resetFilters}
              >
                <X size={14} />
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-3 px-7">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[1102px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    ID Intervention
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Machine
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Type
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Technicien
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Date
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right sm:px-6 text-gray-600 dark:text-gray-300 text-theme-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInterventions.length > 0 ? (
                  filteredInterventions.map((intervention) => (
                    <tr
                      key={intervention.id}
                      className="border-b border-gray-100 dark:border-gray-700"
                    >
                      <td className="px-5 py-4 sm:px-6 text-theme-xs dark:text-gray-300">
                        {intervention.id}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        {editingId === intervention.id ? (
                          <select
                            className="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-200 w-full"
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
                            <span className="block text-theme-xs dark:text-gray-300">
                              {intervention.machine}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          {getInterventionTypeIcon(intervention.type)}
                          <span className="text-theme-sm dark:text-gray-300">
                            {intervention.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        {editingId === intervention.id ? (
                          <select
                            className="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-200 w-full"
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
                          <span className="text-theme-sm dark:text-gray-300">
                            {intervention.technician}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-300">
                        {intervention.date}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        {editingId === intervention.id ? (
                          <select
                            className="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-200 w-full"
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
                      <td className="px-5 py-4 sm:px-6 text-right">
                        {editingId === intervention.id ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => saveEdit(intervention.id)}
                              className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                              title="Enregistrer"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                              title="Annuler"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(intervention)}
                            className="p-1 rounded dark:bg-blue-900/30 dark:text-blue-400"
                            title="Modifier"
                          >
                            <MdEdit size={20} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      Aucune intervention trouvée avec les critères sélectionnés
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionTable;
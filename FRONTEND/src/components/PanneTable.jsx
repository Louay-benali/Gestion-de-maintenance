import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { VscSettings } from "react-icons/vsc";
import { XCircle } from "lucide-react";
import { FaRegCheckCircle } from "react-icons/fa";

const EtatEnum = {
  ouverte: "Ouverte",
  encours: "En cours",
  resolue: "Resolue",
};

const brokenMachines = [
  {
    name: "Generator X1",
    Description: "Power Generator",
    status: EtatEnum.ouverte,
  },
  {
    name: "Drill Y2",
    Description: "Industrial Drill",
    status: EtatEnum.encours,
  },
  {
    name: "Robot Z3",
    Description: "Assembly Robot",
    status: EtatEnum.ouverte,
  },
  {
    name: "Furnace A4",
    Description: "Industrial Furnace",
    status: EtatEnum.encours,
  },
  {
    name: "Press B5",
    Description: "Hydraulic Press",
    status: EtatEnum.ouverte,
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case EtatEnum.ouverte:
      return "bg-red-50 dark:bg-red-500/15 dark:text-red-700";
    case EtatEnum.encours:
      return "bg-orange-50 dark:bg-orange-500/15 dark:text-amber-900";
    case EtatEnum.resolue:
      return "bg-green-50 dark:bg-green-500/15 dark:text-green-700";
    default:
      return "";
  }
};

const PanneTable = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    Description: "",
    location: "",
    status: "",
  });
  const [machines, setMachines] = useState(brokenMachines);
  const [filteredMachines, setFilteredMachines] = useState(brokenMachines);
  const [isAnyFilterActive, setIsAnyFilterActive] = useState(false);

  // Liste des Descriptions de machines disponibles
  const DescriptionsList = [
    ...new Set(brokenMachines.map((machine) => machine.Description)),
  ];

  // Liste des emplacements disponibles
  const locationsList = [
    ...new Set(brokenMachines.map((machine) => machine.location)),
  ];

  // Liste des statuts disponibles
  const statusList = [
    ...new Set(brokenMachines.map((machine) => machine.status)),
  ];

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
    let result = machines;

    // Appliquer la recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.Description.toLowerCase().includes(search) ||
          item.location.toLowerCase().includes(search)
      );
    }

    // Appliquer les filtres
    if (filters.Description) {
      result = result.filter(
        (item) => item.Description === filters.Description
      );
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    setFilteredMachines(result);
    setIsAnyFilterActive(filters.Description !== "" || filters.status !== "");
  }, [searchTerm, filters, machines]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      Description: "",
      location: "",
      status: "",
    });
  };

  const handleCheckPanne = (machineId) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.name === machineId
          ? { ...machine, status: EtatEnum.resolue }
          : machine
      )
    );
    // Update filtered machines as well
    setFilteredMachines((prevFiltered) =>
      prevFiltered.map((machine) =>
        machine.name === machineId
          ? { ...machine, status: EtatEnum.resolue }
          : machine
      )
    );
  };

  return (
    <div className="border py-4 rounded-3xl dark:border-gray-200 bg-white">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Machines en Panne</h1>
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
                Description de machine
              </label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.Description}
                onChange={(e) =>
                  setFilters({ ...filters, Description: e.target.value })
                }
              >
                <option value="">Tous les Descriptions</option>
                {DescriptionsList.map((Description) => (
                  <option key={Description} value={Description}>
                    {Description}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">Gravité</label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Toutes les gravités</option>
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
                <XCircle size={16} />
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
                      Machine
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Description
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      État
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMachines.length > 0 ? (
                    filteredMachines.map((machine, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-300"
                      >
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <span className="block text-theme-xs dark:text-gray-500">
                              {machine.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                          {machine.Description}
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <p
                            className={`${getStatusStyles(
                              machine.status
                            )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                          >
                            {machine.status}
                          </p>
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <button
                            onClick={() => handleCheckPanne(machine.name)}
                            className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50"
                            title="Marquer comme réparé"
                          >
                            <FaRegCheckCircle size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-8 text-center text-gray-500"
                      >
                        Aucune machine en panne trouvée avec les critères
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
            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{machine.name}</span>
                    <div className="flex items-center gap-2">
                      <p
                        className={`${getStatusStyles(
                          machine.status
                        )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                      >
                        {machine.status}
                      </p>
                      <button
                        onClick={() => handleCheckPanne(machine.name)}
                        className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50"
                        title="Marquer comme réparé"
                      >
                        <FaRegCheckCircle size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm dark:text-gray-500">
                        {machine.Description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
                Aucune machine en panne trouvée avec les critères sélectionnés
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PanneTable;

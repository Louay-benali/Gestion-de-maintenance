import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { VscSettings } from "react-icons/vsc";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

// Function to map backend machine states to UI display states
const mapMachineStateToStatus = (etat) => {
  switch (etat) {
    case "Fonctionnelle":
      return "Fonctionnelle";
    case "En panne":
      return "En panne";
    case "Maintenance":
      return "Maintenance";
    default:
      return etat;
  }
};

// Status style logic for different machine states
const getStatusStyles = (status) => {
  switch (status) {
    case "Fonctionnelle":
      return "bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-700";
    case "En panne":
      return "bg-orange-50 dark:bg-orange-500/15 dark:text-amber-900";
    case "Maintenance":
      return "bg-red-50 dark:bg-red-500/15 dark:text-red-700";
    default:
      return "";
  }
};

const MachineTable = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 1,
    totalMachines: 0,
  });

  const fetchMachines = async () => {
    try {
      setLoading(true);
      
      // Construire l'URL avec les paramètres de filtrage
      let url = `http://localhost:3001/machine?page=${pagination.page}&limit=${pagination.limit}`;
      
      if (searchTerm) {
        url += `&nomMachine=${encodeURIComponent(searchTerm)}`;
      }
      
      if (statusFilter) {
        url += `&etat=${encodeURIComponent(statusFilter)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        withCredentials: true,
      });

      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }

      const data = await response.json();

      setMachines(data.results);
      setPagination({
        ...pagination,
        totalPages: data.totalPages,
        totalMachines: data.totalMachines,
      });

      setError(null);
    } catch (err) {
      setError(`Erreur de chargement des données: ${err.message}`);
      console.error("Failed to fetch machines:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, [pagination.page, pagination.limit, searchTerm, statusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Reset to first page when searching
    setPagination({ ...pagination, page: 1 });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPagination({ ...pagination, page: 1 });
    setShowFilterMenu(false);
  };

  const clearFilters = () => {
    setStatusFilter("");
    setSearchTerm("");
    setPagination({ ...pagination, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  // Utiliser les véritables états de machine du backend
  const statusOptions = ["Fonctionnelle", "En panne", "Maintenance"];

  return (
    <div className="border py-4 rounded-3xl dark:border-gray-200 bg-white">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Tableau des Machines</h1>
        <div className="flex gap-2 justify-end w-full sm:w-auto">
          <SearchInput
            className="w-full sm:w-48 md:w-72"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="relative">
            <button 
              className="border dark:border-gray-300 p-2 rounded-lg sm:w-24 flex flex-row gap-2 items-center hover:bg-gray-50"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <VscSettings size={20} />
              Filtrer
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 top-12 z-10 w-56 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium">Filtrer par état</h3>
                </div>
                <div className="py-1">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        statusFilter === status ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className={`${getStatusStyles(status)} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium mr-2`}>
                        {status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {(searchTerm || statusFilter) && (
        <div className="px-5 pb-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Filtres actifs:</span>
          {searchTerm && (
            <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>Nom: {searchTerm}</span>
              <button onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={16} />
              </button>
            </div>
          )}
          {statusFilter && (
            <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>État: {statusFilter}</span>
              <button onClick={() => setStatusFilter("")} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={16} />
              </button>
            </div>
          )}
          {(searchTerm || statusFilter) && (
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 ml-2"
            >
              Effacer tous
            </button>
          )}
        </div>
      )}

      <div className="border-t dark:border-gray-200 pt-6 pb-3 px-7">
        {loading ? (
          <div className="flex justify-center p-8">
            <p>Chargement des données...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center p-8 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-200 dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[1102px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-300">
                      <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                        ID
                      </th>
                      <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                        Machine
                      </th>
                      <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                        Fiche Technique
                      </th>
                      <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                        État
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {machines.length > 0 ? (
                      machines.map((machine, index) => {
                        const status = mapMachineStateToStatus(machine.etat);
                        return (
                          <tr
                            key={machine._id || index}
                            className="border-b border-gray-100 dark:border-gray-300"
                          >
                            <td className="px-5 py-4 sm:px-6 text-theme-xs dark:text-gray-500">
                              {machine._id}
                            </td>
                            <td className="px-5 py-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div>
                                  <span className="block text-theme-xs dark:text-gray-500">
                                    {machine.nomMachine}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                              {machine.dataSheet}
                            </td>
                            <td className="px-5 py-4 sm:px-6">
                              <p
                                className={`${getStatusStyles(
                                  status
                                )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                              >
                                {status}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-5 py-8 text-center text-gray-500">
                          Aucune machine ne correspond aux critères de recherche
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500">
                Affichage de {machines.length} sur {pagination.totalMachines} machines
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className={`p-2 rounded-md ${
                    pagination.page <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="text-sm">
                  Page {pagination.page} sur {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className={`p-2 rounded-md ${
                    pagination.page >= pagination.totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MachineTable;
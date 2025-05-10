import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { VscSettings } from "react-icons/vsc";
import { XCircle } from "lucide-react";
import { FaRegCheckCircle } from "react-icons/fa";

const EtatPieceEnum = {
  disponible: "Disponible",
  utilisee: "Utilisée",
};

const piecesData = [
  {
    id: 1,
    name: "Filtre A1",
    category: "Filtration",
    status: EtatPieceEnum.disponible,
  },
  {
    id: 2,
    name: "Pompe B2",
    category: "Hydraulique",
    status: EtatPieceEnum.disponible,
  },
  {
    id: 3,
    name: "Vis C3",
    category: "Fixation",
    status: EtatPieceEnum.utilisee,
  },
  {
    id: 4,
    name: "Capteur D4",
    category: "Électronique",
    status: EtatPieceEnum.disponible,
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case EtatPieceEnum.disponible:
      return "bg-green-50 dark:bg-green-500/15 dark:text-green-700";
    case EtatPieceEnum.utilisee:
      return "bg-gray-100 dark:bg-gray-500/15 dark:text-gray-700";
    default:
      return "";
  }
};

const PiecesStockTable = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ category: "", status: "" });
  const [pieces, setPieces] = useState(piecesData);
  const [filteredPieces, setFilteredPieces] = useState(piecesData);
  const [isAnyFilterActive, setIsAnyFilterActive] = useState(false);

  const categoryList = [...new Set(piecesData.map((p) => p.category))];
  const statusList = [...new Set(piecesData.map((p) => p.status))];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let result = pieces;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    setFilteredPieces(result);
    setIsAnyFilterActive(filters.category || filters.status);
  }, [searchTerm, filters, pieces]);

  const resetFilters = () => {
    setFilters({ category: "", status: "" });
  };

  const handleUsePiece = (id) => {
    setPieces((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: EtatPieceEnum.utilisee } : p
      )
    );
  };

  return (
    <div className="border py-4 rounded-3xl dark:border-gray-200 bg-white">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Pièces en Stock</h1>
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

      {showFilters && (
        <div className="px-5 pb-4 border-t border-gray-200 dark:border-gray-200 pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">Catégorie</label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Toutes les catégories</option>
                {categoryList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-sm text-gray-600">État</label>
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Tous les états</option>
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

      {/* Vue Bureau */}
      {!isSmallScreen && (
        <div className="border-t dark:border-gray-200 pt-6 pb-3 px-7">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-gray-600">Nom</th>
                    <th className="px-5 py-3 text-left text-gray-600">
                      Catégorie
                    </th>
                    <th className="px-5 py-3 text-left text-gray-600">État</th>
                    <th className="px-5 py-3 text-left text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPieces.length > 0 ? (
                    filteredPieces.map((piece) => (
                      <tr key={piece.id} className="border-b border-gray-100">
                        <td className="px-5 py-4">{piece.name}</td>
                        <td className="px-5 py-4">{piece.category}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`${getStatusStyle(
                              piece.status
                            )} inline-block rounded-full px-2 py-0.5 text-xs font-medium`}
                          >
                            {piece.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {piece.status !== EtatPieceEnum.utilisee && (
                            <button
                              onClick={() => handleUsePiece(piece.id)}
                              className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
                              title="Marquer comme utilisée"
                            >
                              <FaRegCheckCircle size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-5 py-8 text-center text-gray-500"
                      >
                        Aucune pièce trouvée avec les critères sélectionnés
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Vue Mobile */}
      {isSmallScreen && (
        <div className="border-t dark:border-gray-200 pt-4 pb-3 px-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPieces.length > 0 ? (
              filteredPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{piece.name}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`${getStatusStyle(
                          piece.status
                        )} inline-block rounded-full px-2 py-0.5 text-xs font-medium`}
                      >
                        {piece.status}
                      </span>
                      {piece.status !== EtatPieceEnum.utilisee && (
                        <button
                          onClick={() => handleUsePiece(piece.id)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
                          title="Marquer comme utilisée"
                        >
                          <FaRegCheckCircle size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Catégorie</p>
                  <p className="text-sm">{piece.category}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
                Aucune pièce trouvée avec les critères sélectionnés
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PiecesStockTable;

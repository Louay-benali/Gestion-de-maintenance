import React, { useState } from "react";
import SearchInput from "./SearchInput";

const CreerRapportIntervention = () => {
  const [rapport, setRapport] = useState({
    interventionId: "",
    piecesUtilisees: "",
    observations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRapport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rapport soumis :", rapport);
    // 👉 Ici tu peux faire un POST vers ton backend
    alert("Rapport envoyé avec succès !");
    setRapport({
      interventionId: "",
      piecesUtilisees: "",
      observations: "",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md mt-2 sm:mt-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
        Créer un rapport d'intervention
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="w-full">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
            ID Intervention
          </label>
          <SearchInput className="w-full" placeholder="Id Intervention" />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
            Pièces utilisées
          </label>
          <textarea
            name="piecesUtilisees"
            value={rapport.piecesUtilisees}
            onChange={handleChange}
            rows={window.innerWidth < 640 ? 2 : 3}
            className="w-full border rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2 border-gray-300 bg-transparent pl-8 sm:pl-10 pr-2 sm:pr-4 text-xs sm:text-sm shadow-theme-xs transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/10"
            placeholder="Ex: Roulement X123, Filtre Y456"
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
            Observations
          </label>
          <textarea
            name="observations"
            value={rapport.observations}
            onChange={handleChange}
            rows={window.innerWidth < 640 ? 3 : 4}
            className="w-full border rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2 border-gray-300 bg-transparent pl-8 sm:pl-10 pr-2 sm:pr-4 text-xs sm:text-sm shadow-theme-xs transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/10"
            placeholder="Décris les étapes réalisées, anomalies constatées, recommandations..."
          />
        </div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm sm:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-blue-700 transition"
          >
            Valider et envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerRapportIntervention;

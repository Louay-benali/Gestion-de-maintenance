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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">
        Créer un rapport d'intervention
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            ID Intervention
          </label>
          <SearchInput
            className=" sm:w-[400px] "
            placeholder="Id Intervention"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Pièces utilisées
          </label>
          <textarea
            name="piecesUtilisees"
            value={rapport.piecesUtilisees}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full border rounded-lg px-4 py-2"
            placeholder="Ex: Roulement X123, Filtre Y456"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Observations
          </label>
          <textarea
            name="observations"
            value={rapport.observations}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border rounded-lg px-4 py-2"
            placeholder="Décris les étapes réalisées, anomalies constatées, recommandations..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Valider et envoyer
        </button>
      </form>
    </div>
  );
};

export default CreerRapportIntervention;

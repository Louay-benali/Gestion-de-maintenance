import React, { useState } from "react";
import { TbAlertTriangle } from "react-icons/tb";

const DeclarePanneForm = () => {


    const [panneData, setPanneData] = useState({
        machineId: "",
        responableName: "",
        panneType: "",
        description: "",
        date: "",
     });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPanneData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Déclaration de panne :", panneData);
    // Add your submission logic (API call, toast, etc.)
  };

  return (
    <div className="max-w-3xl mx-auto border border-gray-300 p-10 bg-white rounded-3xl">
        <h1  className="pb-6 text-2xl font-bold text-gray-700 font-style">Declarer Panne</h1>
      <div className="p-5 space-y-6 border-t bg-white dark:border-gray-300 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="-mx-2.5 flex flex-wrap gap-y-5">
            <div className="w-3xs px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                Machine ID
              </label>
              <input
                type="text"
                name="machineId"
                value={panneData.machineId}
                onChange={handleChange}
                placeholder="Ex: MCH-0021"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                Nom de Responsable
              </label>
              <input
                type="text"
                name="machineName"
                value={panneData.machineName}
                placeholder="Nom"
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                Type de panne
              </label>
              <select
                name="panneType"
                value={panneData.panneType}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="" disabled>
                  Choisir un type
                </option>
                <option value="Ouverte">Ouverte</option>
                <option value="En cours">En cours</option>
                <option value="Resolue">Resolue</option>
              </select>
            </div>


            <div className="w-full px-2.5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                Description
              </label>
              <textarea
                name="description"
                rows="5"
                placeholder="Détaillez la nature de la panne..."
                value={panneData.description}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                Date de la panne
              </label>
              <input
                type="date"
                name="date"
                value={panneData.date}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 flex justify-end  ">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-red-500 hover:bg-red-600"
              >
                Déclarer la panne
                <TbAlertTriangle size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeclarePanneForm;

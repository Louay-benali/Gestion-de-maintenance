import React, { useState } from "react";
import { TbTools } from "react-icons/tb";

const CreateIntervention = () => {
  const [interventionData, setInterventionData] = useState({
    interventionId: "",
    machineId: "",
    interventionType: "",
    technicianName: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterventionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Déclaration d'intervention :", interventionData);
    // Add your submission logic (API call, toast, etc.)
  };

  return (
    <div className="max-w-3xl mx-auto border border-gray-300 p-10 bg-white rounded-3xl">
      <h1 className="pb-6 text-2xl font-bold text-gray-700 font-style">
        Déclarer une Intervention
      </h1>
      <div className="p-5 space-y-6 border-t bg-white dark:border-gray-300 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="-mx-2.5 flex flex-wrap gap-y-5">
            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                ID Intervention
              </label>
              <input
                type="text"
                name="interventionId"
                value={interventionData.interventionId}
                onChange={handleChange}
                placeholder="Ex: INT-0045"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Machine
              </label>
              <input
                type="text"
                name="machineId"
                value={interventionData.machineId}
                onChange={handleChange}
                placeholder="Ex: MCH-0021"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Type d'intervention
              </label>
              <select
                name="interventionType"
                value={interventionData.interventionType}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="" disabled>
                  Choisir un type
                </option>
                <option value="Maintenance">Maintenance</option>
                <option value="Réparation">Réparation</option>
              </select>
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Technicien
              </label>
              <input
                type="text"
                name="technicianName"
                value={interventionData.technicianName}
                onChange={handleChange}
                placeholder="Nom du technicien"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 xl:w-1/2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Date d'intervention
              </label>
              <input
                type="date"
                name="date"
                value={interventionData.date}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="w-full px-2.5 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Enregistrer l'intervention
                <TbTools size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIntervention;

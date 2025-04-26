import React from "react";
import SearchInput from "./SearchInput";
import { VscSettings } from "react-icons/vsc";
import { Calendar, Clock } from "lucide-react";
import { Wrench } from "lucide-react"; // ✔️ existe


const interventions = [
  {
    id: "INT-2025-001",
    machine: "Compressor A1",
    type: "Preventive",
    technician: "Jean Dupont",
    date: "12 avr. 2025",
    duration: "2h 30m",
    status: "Completed",
  },
  {
    id: "INT-2025-002",
    machine: "Lathe B2",
    type: "Corrective",
    technician: "Sophie Martin",
    date: "08 avr. 2025",
    duration: "4h 15m",
    status: "En cours",
  },
  {
    id: "INT-2025-003",
    machine: "Pump C3",
    type: "Emergency",
    technician: "Pierre Lefebvre",
    date: "05 avr. 2025",
    duration: "1h 45m",
    status: "Completed",
  },
  {
    id: "INT-2025-004",
    machine: "Mixer D4",
    type: "Inspection",
    technician: "Marie Dubois",
    date: "20 mars 2025",
    duration: "0h 45m",
    status: "Reporté",
  },
  {
    id: "INT-2025-005",
    machine: "Conveyor E5",
    type: "Preventive",
    technician: "Lucas Bernard",
    date: "15 mars 2025",
    duration: "3h 00m",
    status: "Completed",
  },
];

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
    case "Preventive":
      return <Calendar size={16} className="text-blue-600" />;
    case "Corrective":
      return <Wrench size={16} className="text-orange-600" />;
    case "Emergency":
      return <Clock size={16} className="text-red-600" />;
    case "Inspection":
      return <Wrench size={16} className="text-gray-600" />;
    default:
      return <Wrench size={16} className="text-gray-600" />;
  }
};

const InterventionTable = () => {
  return (
    <div className="border py-4 rounded-3xl dark:border-gray-200 bg-white">
      <div className="px-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Historique des Interventions</h1>
        <div className="flex gap-2 justify-end w-full sm:w-auto">
          <SearchInput
            className="w-full sm:w-48 md:w-72"
            placeholder="Rechercher..."
          />
          <button className="border dark:border-gray-300 p-2 rounded-lg sm:w-24 flex flex-row gap-2 items-center hover:bg-gray-50">
            <VscSettings size={20} />
            Filtrer
          </button>
        </div>
      </div>
      <div className="border-t dark:border-gray-200 pt-6 pb-3 px-7">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-200 dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[1102px]">
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
                    Durée
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((intervention, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-300"
                  >
                    <td className="px-5 py-4 sm:px-6 text-theme-xs dark:text-gray-500">
                      {intervention.id}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block text-theme-xs dark:text-gray-500">
                            {intervention.machine}
                          </span>
                        </div>
                      </div>
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
                      {intervention.technician}
                    </td>
                    <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                      {intervention.date}
                    </td>
                    <td className="px-5 py-4 sm:px-6 text-theme-sm dark:text-gray-500">
                      {intervention.duration}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p
                        className={`${getStatusStyles(
                          intervention.status
                        )} inline-block rounded-full px-2 py-0.5 text-theme-xs font-medium`}
                      >
                        {intervention.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionTable;

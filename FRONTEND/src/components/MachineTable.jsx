import React from "react";

const machines = [
  {
    name: "Compressor A1",
    type: "Compressor",
    location: "Plant 1",
    status: "Active",
    cost: "3.9K",
  },
  {
    name: "Lathe B2",
    type: "Lathe Machine",
    location: "Workshop A",
    status: "En attente",
    cost: "24.9K",
  },
  {
    name: "Pump C3",
    type: "Water Pump",
    location: "Plant 2",
    status: "Active",
    cost: "12.7K",
  },
  {
    name: "Mixer D4",
    type: "Industrial Mixer",
    location: "Factory Floor",
    status: "Cancel",
    cost: "2.8K",
  },
  {
    name: "Conveyor E5",
    type: "Conveyor Belt",
    location: "Loading Dock",
    status: "Active",
    cost: "4.5K",
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-700";
    case "En attente":
      return "bg-orange-50 dark:bg-orange-500/15 dark:text-amber-900";
    case "Cancel":
      return "bg-red-50  dark:bg-red-500/15 dark:text-red-700";
    default:
      return "";
  }
};

const MachineTable = () => {
  return (
    <div className="border-t border-gray-100 p-5 dark:border-gray-300 sm:p-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-300 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1102px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-300">
                <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs ">
                  Machine
                </th>
                <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs ">
                  Type
                </th>
                <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs ">
                  Location
                </th>
                <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs ">
                  Status
                </th>
                <th className="px-5 py-3 text-left sm:px-6 text-gray-600 text-theme-xs ">
                  Last Maintenance Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-300"
                >
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block text-theme-xs dark:text-gray-500">
                          {machine.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 sm:px-6  text-theme-sm dark:text-gray-500">
                    {machine.type}
                  </td>
                  <td className="px-5 py-4 sm:px-6  text-theme-sm dark:text-gray-500">
                    {machine.location}
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
                  <td className="px-5 py-4 sm:px-6  text-theme-sm dark:text-gray-500">
                    {machine.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MachineTable;

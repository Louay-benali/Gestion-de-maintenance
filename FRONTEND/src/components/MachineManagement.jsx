import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  MdEdit,
  MdDeleteForever,
  MdSettingsApplications,
} from "react-icons/md";

const MachineManagement = () => {
  // State for machines data
  const [machines, setMachines] = useState([
    {
      id: 1,
      name: "Machine 01",
      serialNumber: "SN-001-2025",
      type: "CNC",
      status: "Operational",
      location: "Floor 1",
    },
    {
      id: 2,
      name: "Machine 02",
      serialNumber: "SN-002-2025",
      type: "Laser Cutter",
      status: "Maintenance",
      location: "Floor 2",
    },
    {
      id: 3,
      name: "Machine 03",
      serialNumber: "SN-003-2025",
      type: "3D Printer",
      status: "Offline",
      location: "Floor 1",
    },
    {
      id: 4,
      name: "Machine 04",
      serialNumber: "SN-004-2025",
      type: "Assembly",
      status: "Operational",
      location: "Floor 3",
    },
  ]);

  // Form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Current machine being edited/deleted
  const [currentMachine, setCurrentMachine] = useState(null);

  // New machine form data
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    type: "CNC",
    status: "Operational",
    location: "Floor 1",
  });

  // Available machine types
  const machineTypes = [
    "CNC",
    "Laser Cutter",
    "3D Printer",
    "Assembly",
    "Packaging",
  ];

  // Available statuses
  const statuses = ["Operational", "Maintenance", "Offline", "Standby"];

  // Available locations
  const locations = ["Floor 1", "Floor 2", "Floor 3", "Warehouse"];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle current machine input changes
  const handleCurrentMachineChange = (e) => {
    const { name, value } = e.target;
    setCurrentMachine({
      ...currentMachine,
      [name]: value,
    });
  };

  // Add a new machine
  const handleAddMachine = () => {
    const newMachine = {
      id:
        machines.length > 0
          ? Math.max(...machines.map((machine) => machine.id)) + 1
          : 1,
      ...formData,
    };
    setMachines([...machines, newMachine]);
    // Reset form
    setFormData({
      name: "",
      serialNumber: "",
      type: "CNC",
      status: "Operational",
      location: "Floor 1",
    });
    setIsAddModalOpen(false);
  };

  // Update existing machine
  const handleUpdateMachine = () => {
    setMachines(
      machines.map((machine) =>
        machine.id === currentMachine.id ? currentMachine : machine
      )
    );
    setIsEditModalOpen(false);
  };

  // Delete machine
  const handleDeleteMachine = () => {
    setMachines(machines.filter((machine) => machine.id !== currentMachine.id));
    setIsDeleteModalOpen(false);
  };

  // Update machine settings
  const handleUpdateSettings = () => {
    setMachines(
      machines.map((machine) =>
        machine.id === currentMachine.id ? currentMachine : machine
      )
    );
    setIsSettingsModalOpen(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-red-100 text-red-800";
      case "Standby":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-300">
        <h2 className="text-xl font-semibold">Machine Management</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoMdAdd className="mr-1" /> Add Machine
        </button>
      </div>

      {/* Machines Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Machine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {machines.map((machine) => (
              <tr key={machine.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-200 rounded-md">
                      <MdSettingsApplications
                        size={24}
                        className="text-gray-600"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {machine.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.serialNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      machine.status
                    )}`}
                  >
                    {machine.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-600 hover:text-blue-900"
                      onClick={() => {
                        setCurrentMachine(machine);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        setCurrentMachine(machine);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      onClick={() => {
                        setCurrentMachine(machine);
                        setIsSettingsModalOpen(true);
                      }}
                    >
                      <MdSettingsApplications size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Machine Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Machine</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Machine Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Machine 01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SN-XXX-XXXX"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Machine Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {machineTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddMachine}
              >
                Add Machine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Machine Modal */}
      {isEditModalOpen && currentMachine && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Machine</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Machine Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentMachine.name}
                  onChange={handleCurrentMachineChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={currentMachine.serialNumber}
                  onChange={handleCurrentMachineChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Machine Type
                  </label>
                  <select
                    name="type"
                    value={currentMachine.type}
                    onChange={handleCurrentMachineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {machineTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentMachine.status}
                    onChange={handleCurrentMachineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={currentMachine.location}
                  onChange={handleCurrentMachineChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpdateMachine}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Machine Modal */}
      {isDeleteModalOpen && currentMachine && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Machine</h3>
            <p className="text-gray-700">
              Are you sure you want to delete the machine{" "}
              <strong>{currentMachine.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteMachine}
              >
                Delete Machine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Machine Settings Modal */}
      {isSettingsModalOpen && currentMachine && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Machine Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Machine
                </label>
                <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                  <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-md">
                    <MdSettingsApplications
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">
                      {currentMachine.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentMachine.serialNumber}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={currentMachine.status}
                  onChange={handleCurrentMachineChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={currentMachine.location}
                  onChange={handleCurrentMachineChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Log
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-24"
                  placeholder="Enter maintenance notes here..."
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsSettingsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpdateSettings}
              >
                Update Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineManagement;

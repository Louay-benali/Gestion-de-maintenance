import React, { useState } from "react";
import { FiPackage, FiCalendar, FiAlertCircle, FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const DemanderPieces = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    partName: "",
    partReference: "",
    quantity: "",
    urgency: "normal",
    neededDate: "",
    machineId: "",
    reason: "",
  });
  const [requests, setRequests] = useState([
    {
      id: 1,
      partName: "Courroie de transmission",
      partReference: "CT-2023-45B",
      quantity: 2,
      urgency: "high",
      neededDate: "2025-05-10",
      machineId: "M-2045",
      status: "pending",
      requestDate: "2025-04-20",
    },
    {
      id: 2,
      partName: "Filtre hydraulique",
      partReference: "FH-389-A2",
      quantity: 5,
      urgency: "normal",
      neededDate: "2025-05-15",
      machineId: "M-1078",
      status: "approved",
      requestDate: "2025-04-18",
    },
    {
      id: 3,
      partName: "Joint d'étanchéité",
      partReference: "JE-567-C",
      quantity: 10,
      urgency: "low",
      neededDate: "2025-05-30",
      machineId: "M-3092",
      status: "delivered",
      requestDate: "2025-04-10",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: requests.length + 1,
      ...formData,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
    };
    setRequests([...requests, newRequest]);
    setFormData({
      partName: "",
      partReference: "",
      quantity: "",
      urgency: "normal",
      neededDate: "",
      machineId: "",
      reason: "",
    });
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyBadgeClass = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.partReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.machineId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Demande de Pièces
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
        >
          <FiPackage />
          Nouvelle Demande
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Rechercher une pièce, référence ou machine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Requests table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pièce
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Machine
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantité
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Urgence
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Nécessaire
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {request.partName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.partReference}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.machineId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.quantity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyBadgeClass(
                      request.urgency
                    )}`}
                  >
                    {request.urgency === "high"
                      ? "Urgente"
                      : request.urgency === "normal"
                      ? "Normale"
                      : "Basse"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.neededDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      request.status
                    )}`}
                  >
                    {request.status === "pending"
                      ? "En attente"
                      : request.status === "approved"
                      ? "Approuvée"
                      : request.status === "delivered"
                      ? "Livrée"
                      : "Rejetée"}
                  </span>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucune demande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for new request */}
      {isModalOpen && (
        <>
          {/* Backdrop avec effet de flou */}
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Nouvelle Demande de Pièce
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoCloseOutline />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nom de la Pièce
                  </label>
                  <input
                    type="text"
                    name="partName"
                    value={formData.partName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Référence
                  </label>
                  <input
                    type="text"
                    name="partReference"
                    value={formData.partReference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Quantité
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      ID Machine
                    </label>
                    <input
                      type="text"
                      name="machineId"
                      value={formData.machineId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Urgence
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="low"
                        checked={formData.urgency === "low"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Basse
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={formData.urgency === "normal"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Normale
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="high"
                        checked={formData.urgency === "high"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="flex items-center gap-1">
                        Urgente
                        <FiAlertCircle className="text-red-500" />
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FiCalendar />
                      Date Nécessaire
                    </div>
                  </label>
                  <input
                    type="date"
                    name="neededDate"
                    value={formData.neededDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Raison / Commentaire
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Soumettre la Demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DemanderPieces;

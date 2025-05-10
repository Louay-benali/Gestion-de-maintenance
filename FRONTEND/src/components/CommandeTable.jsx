import React, { useState } from "react";
import { MdSearch, MdVisibility, MdCheck } from "react-icons/md";
import SearchInput from "../components/SearchInput.jsx";

const CommandeTable = () => {
  // États pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  // Données simulées des commandes
  const commandes = [
    {
      id: 1,
      reference: "CMD-001",
      date: "2025-04-28",
      fournisseur: "AutomotiveParts",
      montant: 256.75,
      status: "en attente",
      items: [
        {
          id: 1,
          reference: "FH-12345",
          name: "Filtre à huile",
          quantity: 5,
          price: 15.99,
        },
        {
          id: 3,
          reference: "JE-23456",
          name: "Joints d'étanchéité",
          quantity: 20,
          price: 8.75,
        },
      ],
    },
    {
      id: 2,
      reference: "CMD-002",
      date: "2025-04-30",
      fournisseur: "MechTech",
      montant: 390.5,
      status: "livrée",
      livraison: "2025-05-02",
      items: [
        {
          id: 2,
          reference: "CT-78901",
          name: "Courroie de transmission",
          quantity: 11,
          price: 35.5,
        },
      ],
    },
    {
      id: 3,
      reference: "CMD-003",
      date: "2025-05-01",
      fournisseur: "BrakeSupreme",
      montant: 452.0,
      status: "en transit",
      items: [
        {
          id: 4,
          reference: "PF-34567",
          name: "Plaquettes de frein",
          quantity: 10,
          price: 45.2,
        },
      ],
    },
    {
      id: 4,
      reference: "CMD-004",
      date: "2025-05-02",
      fournisseur: "ElectricPro",
      montant: 723.0,
      status: "en attente",
      items: [
        {
          id: 6,
          reference: "AM-56789",
          name: "Alternateur",
          quantity: 6,
          price: 120.5,
        },
      ],
    },
  ];

  // Filtrage des commandes
  const filteredCommandes = commandes.filter(
    (commande) =>
      (statusFilter === "all" || commande.status === statusFilter) &&
      (commande.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commande.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Fonction pour ouvrir le modal de détails
  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setIsDetailsModalOpen(true);
  };

  // Fonction pour valider la réception d'une commande (simulée)
  const handleConfirmDelivery = (id) => {
    console.log(`Réception de la commande ${id} confirmée`);
    // Logique pour mettre à jour le statut
  };

  // Fonction pour obtenir la classe de couleur en fonction du statut
  const getStatusColorClass = (status) => {
    switch (status) {
      case "en attente":
        return "text-amber-600 bg-amber-100";
      case "en transit":
        return "text-blue-600 bg-blue-100";
      case "livrée":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Suivi des Commandes
      </h2>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/2">
          <SearchInput
            type="text"
            placeholder="Rechercher une commande..."
            className="w-[400px] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <span className="mr-2">Statut:</span>
          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="en attente">En attente</option>
            <option value="en transit">En transit</option>
            <option value="livrée">Livrée</option>
          </select>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="border-b border-b-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left ">Référence</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Fournisseur</th>
              <th className="py-3 px-4 text-left">Montant</th>
              <th className="py-3 px-4 text-left">Statut</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCommandes.map((commande) => (
              <tr key={commande.id}>
                <td className="py-3 px-4">{commande.reference}</td>
                <td className="py-3 px-4">{commande.date}</td>
                <td className="py-3 px-4">{commande.fournisseur}</td>
                <td className="py-3 px-4">{commande.montant.toFixed(2)} €</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(
                      commande.status
                    )}`}
                  >
                    {commande.status.charAt(0).toUpperCase() +
                      commande.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(commande)}
                    >
                      <MdVisibility size={20} />
                    </button>
                    {commande.status === "en transit" && (
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleConfirmDelivery(commande.id)}
                      >
                        <MdCheck size={20} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCommandes.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">Aucune commande trouvée</p>
        </div>
      )}

      {/* Modal de détails */}
      {isDetailsModalOpen && selectedCommande && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Détails de la commande {selectedCommande.reference}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date de commande</p>
                <p>{selectedCommande.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fournisseur</p>
                <p>{selectedCommande.fournisseur}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <p
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(
                    selectedCommande.status
                  )}`}
                >
                  {selectedCommande.status.charAt(0).toUpperCase() +
                    selectedCommande.status.slice(1)}
                </p>
              </div>
              {selectedCommande.livraison && (
                <div>
                  <p className="text-sm text-gray-500">Date de livraison</p>
                  <p>{selectedCommande.livraison}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Articles commandés</h4>
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Référence
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedCommande.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-3">{item.reference}</td>
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3">{item.quantity}</td>
                      <td className="py-2 px-3">{item.price.toFixed(2)} €</td>
                      <td className="py-2 px-3">
                        {(item.price * item.quantity).toFixed(2)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan="4"
                      className="py-2 px-3 text-right font-medium"
                    >
                      Total:
                    </td>
                    <td className="py-2 px-3 font-medium">
                      {selectedCommande.montant.toFixed(2)} €
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end space-x-2">
              {selectedCommande.status === "en transit" && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => {
                    handleConfirmDelivery(selectedCommande.id);
                    setIsDetailsModalOpen(false);
                  }}
                >
                  Confirmer la réception
                </button>
              )}
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandeTable;

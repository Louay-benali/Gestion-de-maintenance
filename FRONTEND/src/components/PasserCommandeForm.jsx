import React, { useState } from "react";
import { MdAdd, MdRemove, MdShoppingCart, MdSearch } from "react-icons/md";

const PasserCommandeForm = () => {
  // États du formulaire
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [fournisseur, setFournisseur] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Données simulées pour le catalogue de pièces
  const catalogItems = [
    {
      id: 1,
      reference: "FH-12345",
      name: "Filtre à huile",
      price: 15.99,
      supplier: "AutomotiveParts",
    },
    {
      id: 2,
      reference: "CT-78901",
      name: "Courroie de transmission",
      price: 35.5,
      supplier: "MechTech",
    },
    {
      id: 3,
      reference: "JE-23456",
      name: "Joints d'étanchéité",
      price: 8.75,
      supplier: "SealMaster",
    },
    {
      id: 4,
      reference: "PF-34567",
      name: "Plaquettes de frein",
      price: 45.2,
      supplier: "BrakeSupreme",
    },
    {
      id: 5,
      reference: "BA-45678",
      name: "Batterie 12V",
      price: 89.99,
      supplier: "PowerCell",
    },
    {
      id: 6,
      reference: "AM-56789",
      name: "Alternateur",
      price: 120.5,
      supplier: "ElectricPro",
    },
    {
      id: 7,
      reference: "HU-67890",
      name: "Huile moteur 5W30",
      price: 12.25,
      supplier: "LubriTech",
    },
    {
      id: 8,
      reference: "ES-78901",
      name: 'Essuie-glace 20"',
      price: 18.5,
      supplier: "VisibilityPlus",
    },
  ];

  // Liste des fournisseurs (unique)
  const suppliers = [...new Set(catalogItems.map((item) => item.supplier))];

  // Filtrage des articles du catalogue
  const filteredItems = catalogItems.filter(
    (item) =>
      (fournisseur === "" || item.supplier === fournisseur) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Fonction pour ajouter un article à la commande
  const addItemToOrder = (item) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Fonction pour mettre à jour la quantité d'un article
  const updateItemQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // Calcul du total de la commande
  const orderTotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fonction pour soumettre la commande
  const handleSubmitOrder = () => {
    // Simulation de l'envoi de la commande
    console.log("Commande soumise:", {
      items: selectedItems,
      totalAmount: orderTotal.toFixed(2),
      date: new Date().toISOString(),
    });

    // Réinitialisation du formulaire
    setSelectedItems([]);
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Passer une Commande de Réapprovisionnement
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalogue de pièces */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher une pièce..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fournisseur}
              onChange={(e) => setFournisseur(e.target.value)}
            >
              <option value="">Tous les fournisseurs</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left">Référence</th>
                  <th className="py-2 px-3 text-left">Nom</th>
                  <th className="py-2 px-3 text-left">Prix</th>
                  <th className="py-2 px-3 text-left">Fournisseur</th>
                  <th className="py-2 px-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3">{item.reference}</td>
                    <td className="py-3 px-3">{item.name}</td>
                    <td className="py-3 px-3">{item.price.toFixed(2)} €</td>
                    <td className="py-3 px-3">{item.supplier}</td>
                    <td className="py-3 px-3">
                      <button
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        onClick={() => addItemToOrder(item)}
                      >
                        <MdAdd size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length === 0 && (
              <p className="text-center py-4 text-gray-500">
                Aucun article trouvé
              </p>
            )}
          </div>
        </div>

        {/* Panier de commande */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <MdShoppingCart className="mr-2" />
            Votre Commande
          </h3>

          {selectedItems.length === 0 ? (
            <p className="text-center py-4 text-gray-500">
              Votre panier est vide
            </p>
          ) : (
            <>
              <div className="max-h-56 overflow-y-auto mb-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.reference}</p>
                      <p className="text-sm">
                        {item.price.toFixed(2)} € / unité
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 p-1 rounded"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <MdRemove size={16} />
                      </button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-gray-200 p-1 rounded"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <MdAdd size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 mb-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{orderTotal.toFixed(2)} €</span>
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsConfirmationModalOpen(true)}
                disabled={selectedItems.length === 0}
              >
                Passer la commande
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmation */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Confirmer la commande
            </h3>
            <p className="mb-4">
              Êtes-vous sûr de vouloir passer cette commande ?
            </p>

            <div className="max-h-40 overflow-y-auto mb-4">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm">
                    {item.quantity} x {item.price.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{orderTotal.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmitOrder}
              >
                Confirmer
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsConfirmationModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasserCommandeForm;

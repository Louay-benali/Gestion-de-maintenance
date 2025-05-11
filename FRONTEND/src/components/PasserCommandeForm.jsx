import React, { useState, useEffect } from "react";
import { MdAdd, MdRemove, MdShoppingCart } from "react-icons/md";
import SearchInput from "./SearchInput";
import axios from "axios"; // Assurez-vous d'installer axios via npm/yarn
import Cookies from "js-cookie"; // Assurez-vous d'installer js-cookie via npm/yarn

const PasserCommandeForm = ({ userId }) => {
  // États du formulaire
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [fournisseur, setFournisseur] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Données simulées pour le catalogue de pièces (à remplacer par une API dans une vraie application)
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

  // Détermine le fournisseur principal pour la commande (si tous les articles sont du même fournisseur)
  const determineMainSupplier = () => {
    if (selectedItems.length === 0) return "";

    const suppliers = selectedItems.map((item) => item.supplier);
    const uniqueSuppliers = [...new Set(suppliers)];

    // Si tous les articles sont du même fournisseur, utiliser ce fournisseur
    if (uniqueSuppliers.length === 1) {
      return uniqueSuppliers[0];
    }

    // Sinon, utiliser le fournisseur avec le plus d'articles
    const supplierCounts = suppliers.reduce((acc, supplier) => {
      acc[supplier] = (acc[supplier] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(supplierCounts).reduce((a, b) =>
      supplierCounts[a] > supplierCounts[b] ? a : b
    );
  };

  // Fonction pour soumettre la commande au backend
  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Créer la commande principale
      const commandeResponse = await axios.post(
        "http://localhost:3001/commande",
        {
          magasinier: userId,
          fournisseur: determineMainSupplier(),
          statut: "En attente",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      const commandeId = commandeResponse.data.commande._id;

      // Ici, vous pourriez ajouter une requête supplémentaire pour ajouter les articles à la commande
      // Par exemple, si vous avez un modèle LigneCommande ou similar:
      /*
      for (const item of selectedItems) {
        await axios.post('/api/lignes-commande', {
          commande: commandeId,
          article: item.id,
          quantite: item.quantity,
          prixUnitaire: item.price
        });
      }
      */

      setSuccessMessage("Commande créée avec succès!");
      setSelectedItems([]);
      setIsConfirmationModalOpen(false);

      // Afficher le message de succès pendant 3 secondes
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la création de la commande"
      );
      console.error("Erreur lors de la soumission de la commande:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Passer une Commande de Réapprovisionnement
      </h2>

      {/* Message de succès */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalogue de pièces */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <SearchInput
                type="text"
                placeholder="Rechercher une pièce..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 bg-transparent text-sm shadow-theme-xs transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
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

          <div className="bg-white p-4 rounded-lg max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-300 text-gray-700 ">
                  <th className="py-2 px-3 text-left ">Référence</th>
                  <th className="py-2 px-3 text-left">Nom</th>
                  <th className="py-2 px-3 text-left">Prix</th>
                  <th className="py-2 px-3 text-left">Fournisseur</th>
                  <th className="py-2 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3">{item.reference}</td>
                    <td className="py-3 px-3">{item.name}</td>
                    <td className="py-3 px-3">{item.price.toFixed(2)} €</td>
                    <td className="py-3 px-3">{item.supplier}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 inline-flex items-center justify-center"
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
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                onClick={() => setIsConfirmationModalOpen(true)}
                disabled={selectedItems.length === 0 || isLoading}
              >
                {isLoading ? "Traitement en cours..." : "Passer la commande"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmation */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Confirmer la commande
            </h3>
            <p className="mb-4">
              Êtes-vous sûr de vouloir passer cette commande ?
            </p>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

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
              <div className="text-sm text-gray-600 mt-2">
                Fournisseur principal:{" "}
                {determineMainSupplier() || "Non spécifié"}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handleSubmitOrder}
                disabled={isLoading}
              >
                {isLoading ? "Traitement..." : "Confirmer"}
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsConfirmationModalOpen(false)}
                disabled={isLoading}
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

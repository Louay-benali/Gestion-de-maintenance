import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEngineering } from "react-icons/md";
import Loader from "./AuthForm/Loader";

const CreateMaintenanceForm = () => {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [machines, setMachines] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState({
    titre: "",
    description: "",
    datePlanifiee: "",
    nomTechnicien: "",
    Machine: "",
    typeMaintenance: "Préventive",
    observations: ""
  });

  // Charger la liste des machines au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("accessToken");
        
        // Récupérer les machines
        const machineResponse = await axios.get(
          "http://localhost:3001/machine",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        
        setMachines(machineResponse.data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Impossible de charger les données nécessaires", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Validate nomTechnicien format
    if (name === 'nomTechnicien' && value.trim() !== '') {
      const nameParts = value.trim().split(' ');
      if (nameParts.length < 2) {
        setValidationErrors(prev => ({ 
          ...prev, 
          nomTechnicien: "Format invalide. Utilisez le format 'Nom Prénom'"
        }));
      } else {
        setValidationErrors(prev => ({ ...prev, nomTechnicien: null }));
      }
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Vérifier le format du nom du technicien
    if (maintenanceData.nomTechnicien) {
      const nameParts = maintenanceData.nomTechnicien.trim().split(' ');
      if (nameParts.length < 2) {
        errors.nomTechnicien = "Format invalide. Utilisez le format 'Nom Prénom'";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider le formulaire avant soumission
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const token = Cookies.get("accessToken");
      
      // Conversion des formats pour l'API
      const formData = {
        ...maintenanceData,
        Machine: [maintenanceData.Machine], // Convertir en tableau pour l'API
        datePlanifiee: new Date(maintenanceData.datePlanifiee).toISOString()
      };
      
      await axios.post(
        "http://localhost:3001/maintenance",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      
      toast.success("Maintenance planifiée avec succès!", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      
      // Réinitialiser le formulaire
      setMaintenanceData({
        titre: "",
        description: "",
        datePlanifiee: "",
        nomTechnicien: "",
        Machine: "",
        typeMaintenance: "Préventive",
        observations: ""
      });
      
      // Réinitialiser les erreurs de validation
      setValidationErrors({});
      
    } catch (error) {
      console.error("Erreur lors de la création de la maintenance:", error);
      const errorMsg = error.response?.data?.message || "Erreur lors de la création";
      toast.error(`Erreur: ${errorMsg}`, {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="max-w-3xl mx-auto border border-gray-300 p-10 bg-white rounded-3xl">
        <h1 className="pb-6 text-2xl font-bold text-gray-700 font-style">
          Planifier une maintenance
        </h1>
        <div className="p-5 space-y-6 border-t bg-white dark:border-gray-300 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="-mx-2.5 flex flex-wrap gap-y-5">
              {/* Titre */}
              <div className="w-full px-2.5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  value={maintenanceData.titre}
                  onChange={handleChange}
                  required
                  placeholder="Titre de la maintenance"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Champ texte pour le technicien */}
              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Technicien (Nom Prénom)
                </label>
                <input
                  type="text"
                  name="nomTechnicien"
                  value={maintenanceData.nomTechnicien}
                  onChange={handleChange}
                  placeholder="Entrez le nom et prénom du technicien"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
                {validationErrors.nomTechnicien && (
                  <div className="mt-1 text-xs text-red-500">
                    {validationErrors.nomTechnicien}
                  </div>
                )}
              </div>

              {/* Sélection de la Machine */}
              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Machine
                </label>
                <select
                  name="Machine"
                  value={maintenanceData.Machine}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">Sélectionner une machine</option>
                  {machines.map((machine) => (
                    <option key={machine._id} value={machine._id}>
                      {machine.nomMachine}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type de maintenance */}
              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Type de maintenance
                </label>
                <select
                  name="typeMaintenance"
                  value={maintenanceData.typeMaintenance}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="Préventive">Préventive</option>
                  <option value="Corrective">Corrective</option>
                  <option value="Prédictive">Prédictive</option>
                </select>
              </div>

              {/* Date planifiée */}
              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Date planifiée
                </label>
                <input
                  type="datetime-local"
                  name="datePlanifiee"
                  value={maintenanceData.datePlanifiee}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              
              {/* Description */}
              <div className="w-full px-2.5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Description détaillée de la maintenance à effectuer..."
                  value={maintenanceData.description}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  style={{ minHeight: "120px" }}
                />
              </div>

              {/* Observations */}
              <div className="w-full px-2.5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Observations
                </label>
                <textarea
                  name="observations"
                  rows="3"
                  placeholder="Instructions ou observations supplémentaires (optionnel)..."
                  value={maintenanceData.observations}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Bouton de soumission */}
              <div className="w-full px-2.5 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-md ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition-colors"
                  }`}
                >
                  {loading ? "Création en cours..." : "Planifier la maintenance"}
                  {!loading && <MdEngineering size={20} />}
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateMaintenanceForm; 
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbAlertTriangle } from "react-icons/tb";
import Loader from "../components/AuthForm/Loader";
import axios from "axios";

const DeclarePanneForm = () => {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [panneData, setState] = useState({
    nomMachine: "",
    responsableNom: "",
    description: "",
    dateDeclaration: new Date().toISOString().split('T')[0],
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Validate responsable name format
    if (name === 'responsableNom' && value.trim() !== '') {
      const nameParts = value.trim().split(' ');
      if (nameParts.length < 2) {
        setValidationErrors(prev => ({ 
          ...prev, 
          responsableNom: "Format invalide. Utilisez le format 'Nom Prénom'"
        }));
      } else {
        setValidationErrors(prev => ({ ...prev, responsableNom: null }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Vérifier le format du nom du responsable
    if (panneData.responsableNom) {
      const nameParts = panneData.responsableNom.trim().split(' ');
      if (nameParts.length < 2) {
        errors.responsableNom = "Format invalide. Utilisez le format 'Nom Prénom'";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
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
      const response = await axios.post(
        "http://localhost:3001/panne",
        panneData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          withCredentials: true,
        }
      );
  
      console.log("Panne créée avec succès :", response.data);
  
      toast.success("Panne déclarée avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
  
      // Réinitialiser le formulaire mais conserver la date actuelle
      setState({
        nomMachine: "",
        responsableNom: "",
        description: "",
        dateDeclaration: new Date().toISOString().split('T')[0],
      });
      
      // Réinitialiser les erreurs de validation
      setValidationErrors({});
    } catch (err) {
      const msg = err.response?.data.message || "Erreur serveur";
      toast.error(`Erreur : ${msg}`, {
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
          Déclarer une Panne
        </h1>
        <div className="p-5 space-y-6 border-t bg-white dark:border-gray-300 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="-mx-2.5 flex flex-wrap gap-y-5">
              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Machine
                </label>
                <input
                  type="text"
                  name="nomMachine"
                  value={panneData.nomMachine}
                  onChange={handleChange}
                  placeholder="Entrez le nom de la machine"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
                {validationErrors.nomMachine && (
                  <div className="mt-1 text-xs text-red-500">
                    {validationErrors.nomMachine}
                  </div>
                )}
              </div>

              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Responsable (Nom Prénom)
                </label>
                <input
                  type="text"
                  name="responsableNom"
                  value={panneData.responsableNom}
                  onChange={handleChange}
                  placeholder="Entrez le nom et prénom du responsable"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
                {validationErrors.responsableNom && (
                  <div className="mt-1 text-xs text-red-500">
                    {validationErrors.responsableNom}
                  </div>
                )}
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
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  style={{ minHeight: "120px" }}
                  required
                />
                {validationErrors.description && (
                  <div className="mt-1 text-xs text-red-500">
                    {validationErrors.description}
                  </div>
                )}
              </div>

              <div className="w-full px-2.5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                  Date de la panne
                </label>
                <input
                  type="date"
                  name="dateDeclaration"
                  value={panneData.dateDeclaration}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
                {validationErrors.dateDeclaration && (
                  <div className="mt-1 text-xs text-red-500">
                    {validationErrors.dateDeclaration}
                  </div>
                )}
              </div>

              <div className="w-full px-2.5 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loading ? "Traitement..." : "Déclarer la panne"}
                  {!loading && <TbAlertTriangle size={20} />}
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

export default DeclarePanneForm;
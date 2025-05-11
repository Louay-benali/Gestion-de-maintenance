import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { TbAlertTriangle } from "react-icons/tb";
import Loader from "../components/AuthForm/Loader";
import axios from "axios";

const DeclarePanneForm = () => {
  const [loading, setLoading] = useState(false);
  const [panneData, setState] = useState({
    machine: "",
    responsableNom: "",
    description: "",
    dateDeclaration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  
      setState({
        machine: "",
        responsableNom: "",
        description: "",
        dateDeclaration: "",
      });
    } catch (error) {
      const msg = error.response?.data.message || "Erreur réseau";
  
      toast.error(`Erreur : ${msg}`, {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
  
      console.error("Erreur :", error);
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
              <div className="w-3xs px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                  ID de la Machine
                </label>
                <input
                  type="text"
                  name="machine"
                  value={panneData.machine}
                  onChange={handleChange}
                  placeholder="Ex: 64a7b3c2e5f..." 
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="w-full px-2.5 xl:w-1/2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
                  Nom du Responsable
                </label>
                <input
                  type="text"
                  name="responsableNom"
                  value={panneData.responsableNom}
                  placeholder="Nom du responsable"
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
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
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  style={{ minHeight: "120px" }}
                />
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
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
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
      </div>
    </>
  );
};

export default DeclarePanneForm;
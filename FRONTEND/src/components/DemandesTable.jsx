import { Eye, Check, X } from "lucide-react";
import { getStatusColor, getStatusText, getPriorityColor } from "./utils";

export default function DemandesTable({
  demandes,
  openDemandeDetails,
  handleValidation,
}) {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
      <table className="min-w-full">
        <thead>
          <tr className="text-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Référence
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Demandeur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Équipement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Priorité
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {demande.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{demande.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {demande.demandeur}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {demande.equipement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                      demande.priorite
                    )}`}
                  >
                    {demande.priorite.charAt(0).toUpperCase() +
                      demande.priorite.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      demande.statut
                    )}`}
                  >
                    {getStatusText(demande.statut)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDemandeDetails(demande)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Voir les détails"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {demande.statut === "en_attente" && (
                      <>
                        <button
                          onClick={() => handleValidation(demande.id, true)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Valider la demande"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleValidation(demande.id, false)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Rejeter la demande"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                Aucune demande ne correspond aux critères de recherche
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

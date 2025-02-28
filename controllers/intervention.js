import Intervention from "../models/intervention.js";

// ✅ 1️⃣ Créer une nouvelle intervention
export const creerIntervention = async (req, res) => {
  try {
    const { technicien, machine, rapport } = req.body;

    const nouvelleIntervention = new Intervention({
      technicien,
      machine,
      rapport
    });

    await nouvelleIntervention.save();
    res.status(201).json(nouvelleIntervention);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 2️⃣ Récupérer toutes les interventions
export const getAllInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find()
      .populate("technicien", "nom prenom email")
      .populate("machine", "nomMachine etat");

    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 3️⃣ Récupérer une intervention par ID
export const getInterventionById = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id)
      .populate("technicien", "nom prenom email")
      .populate("machine", "nomMachine etat");

    if (!intervention) {
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    res.status(200).json(intervention);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 4️⃣ Modifier une intervention
export const updateIntervention = async (req, res) => {
  try {
    const { rapport , machine} = req.body;

    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    intervention.rapport = rapport || intervention.rapport;
    intervention.machine = machine || intervention.machine;

    const interventionModifiee = await intervention.save();

    res.status(200).json(interventionModifiee);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 5️⃣ Supprimer une intervention
export const deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    await intervention.deleteOne();
    res.status(200).json({ message: "Intervention supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

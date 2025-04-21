import Intervention from "../models/intervention.js";
import Machine from "../models/machine.js";
import { Utilisateur } from "../models/user.js";
import logger from "../utils/logger.js"; // Vérifie que le chemin est correct

// ✅ 1️⃣ Créer une nouvelle intervention
export const creerIntervention = async (req, res) => {
  try {
    const { technicien, machine, rapport } = req.body;

    const existingTechnicien = await Utilisateur.findById(technicien);
    if (!existingTechnicien) {
      logger.warn(`[INTERVENTION] technicien non trouvé : ID ${technicien}`);
      return res.status(404).json({ message: "technicien non trouvé" });
    }

    // Vérification existence machine
    const existingMachine = await Machine.findById(machine);
    if (!existingMachine) {
      logger.warn(`[INTERVENTION] Machine non trouvée : ID ${machine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }

    const nouvelleIntervention = new Intervention({
      technicien,
      machine,
      rapport,
    });

    await nouvelleIntervention.save();

    logger.info(`[INTERVENTION] Intervention créée pour la machine ${machine} par technicien ${technicien}`);
    res.status(201).json({ message: "Intervention créée avec succès", intervention: nouvelleIntervention });
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur création : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 2️⃣ Récupérer toutes les interventions
export const getAllInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find()
      .populate("technicien", "nom prenom email")
      .populate("machine", "nomMachine etat");

    logger.info(`[INTERVENTION] Récupération de toutes les interventions (${interventions.length})`);
    res.status(200).json(interventions);
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur récupération toutes interventions : ${error.message}`);
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
      logger.warn(`[INTERVENTION] Intervention non trouvée avec l'ID : ${req.params.id}`);
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    logger.info(`[INTERVENTION] Intervention récupérée : ${req.params.id}`);
    res.status(200).json(intervention);
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur récupération intervention : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 4️⃣ Modifier une intervention
export const updateIntervention = async (req, res) => {
  try {
    const { rapport, machine } = req.body;

    const existingTechnicien = await Utilisateur.findById(technicien);
    if (!existingTechnicien) {
      logger.warn(`[INTERVENTION] technicien non trouvé : ID ${technicien}`);
      return res.status(404).json({ message: "technicien non trouvé" });
    }

    // Vérification existence machine
    const existingMachine = await Machine.findById(machine);
    if (!existingMachine) {
      logger.warn(`[INTERVENTION] Machine non trouvée : ID ${machine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }

    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      logger.warn(`[INTERVENTION] Intervention non trouvée pour mise à jour : ${req.params.id}`);
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    intervention.rapport = rapport || intervention.rapport;
    intervention.machine = machine || intervention.machine;

    const interventionModifiee = await intervention.save();
    logger.info(`[INTERVENTION] Intervention mise à jour : ${req.params.id}`);
    res.status(200).json({ message: "Intervention mise à jour avec succès", intervention: interventionModifiee });
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur mise à jour intervention : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 5️⃣ Supprimer une intervention
export const deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      logger.warn(`[INTERVENTION] Intervention non trouvée pour suppression : ${req.params.id}`);
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    await intervention.deleteOne();
    logger.info(`[INTERVENTION] Intervention supprimée : ${req.params.id}`);
    res.status(200).json({ message: "Intervention supprimée avec succès" });
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur suppression intervention : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

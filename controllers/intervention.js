import Intervention from "../models/intervention.js";
import Machine from "../models/machine.js";
import { Utilisateur } from "../models/user.js";
import logger from "../utils/logger.js"; // Vérifie que le chemin est correct
import mongoose from "mongoose";

// ✅ 1️⃣ Créer une nouvelle intervention
export const creerIntervention = async (req, res) => {
  try {
    const { technicien, machine, rapport, type } = req.body;

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
      type,
    });

    await nouvelleIntervention.save();

    logger.info(
      `[INTERVENTION] Intervention créée pour la machine ${machine} par technicien ${technicien}`
    );
    res.status(201).json({
      message: "Intervention créée avec succès",
      intervention: nouvelleIntervention,
    });
  } catch (error) {
    logger.error(`[INTERVENTION] Erreur création : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 2️⃣ Récupérer toutes les interventions avec pagination
export const getAllInterventions = async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination (ou mettre des valeurs par défaut)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Récupérer les interventions avec pagination
    const interventions = await Intervention.find()
      .populate("technicien", "nom prenom email")
      .populate("machine", "nomMachine etat")
      .skip(skip)
      .limit(limit);

    // 3. Compter le nombre total d'interventions
    const totalInterventions = await Intervention.countDocuments();

    // 4. Répondre avec les données paginées + infos
    res.status(200).json({
      results: interventions,
      totalInterventions,
      totalPages: Math.ceil(totalInterventions / limit),
      page,
      limit,
    });

    logger.info(
      `[INTERVENTION] Récupération de toutes les interventions (${interventions.length}) avec pagination`
    );
  } catch (error) {
    logger.error(
      `[INTERVENTION] Erreur récupération toutes interventions : ${error.message}`
    );
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
      logger.warn(
        `[INTERVENTION] Intervention non trouvée avec l'ID : ${req.params.id}`
      );
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    logger.info(`[INTERVENTION] Intervention récupérée : ${req.params.id}`);
    res.status(200).json(intervention);
  } catch (error) {
    logger.error(
      `[INTERVENTION] Erreur récupération intervention : ${error.message}`
    );
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
      logger.warn(
        `[INTERVENTION] Intervention non trouvée pour mise à jour : ${req.params.id}`
      );
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    intervention.rapport = rapport || intervention.rapport;
    intervention.machine = machine || intervention.machine;

    const interventionModifiee = await intervention.save();
    logger.info(`[INTERVENTION] Intervention mise à jour : ${req.params.id}`);
    res.status(200).json({
      message: "Intervention mise à jour avec succès",
      intervention: interventionModifiee,
    });
  } catch (error) {
    logger.error(
      `[INTERVENTION] Erreur mise à jour intervention : ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 5️⃣ Supprimer une intervention
export const deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      logger.warn(
        `[INTERVENTION] Intervention non trouvée pour suppression : ${req.params.id}`
      );
      return res.status(404).json({ message: "Intervention non trouvée." });
    }

    await intervention.deleteOne();
    logger.info(`[INTERVENTION] Intervention supprimée : ${req.params.id}`);
    res.status(200).json({ message: "Intervention supprimée avec succès" });
  } catch (error) {
    logger.error(
      `[INTERVENTION] Erreur suppression intervention : ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 6️⃣ Filtrer les interventions avec pagination
export const filterInterventions = async (req, res) => {
  const { date, type, technician, page = 1, limit = 5 } = req.query; // Extract filters and pagination parameters

  try {
    // Build the filter object explicitly
    let filters = {};
    if (date) filters.date = date; // Assuming 'date' is stored as a string or Date in the database
    if (type) filters.type = type; // Map 'type' query parameter to the 'type' field in the database
    if (technician) {
      // Validate that 'technician' is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(technician)) {
        return res.status(400).json({ message: "Invalid technician ID." });
      }
      filters.technicien = technician; // Add to filters if valid
    }

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Query the database with the constructed filters and pagination
    const interventions = await Intervention.find(filters)
      .populate("technicien", "nom prenom email") // Populate technician details
      .populate("machine", "nomMachine etat") // Populate machine details
      .skip(skip)
      .limit(parseInt(limit));

    // Count total interventions matching the filters
    const totalInterventions = await Intervention.countDocuments(filters);

    // Log and return the filtered interventions with pagination info
    logger.info(
      `[INTERVENTION] ${
        interventions.length
      } interventions trouvées avec les filtres : ${JSON.stringify(filters)}`
    );
    res.status(200).json({
      results: interventions,
      totalInterventions,
      totalPages: Math.ceil(totalInterventions / limit),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    logger.error(
      `[INTERVENTION] Erreur lors du filtrage des interventions : ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ 7️⃣ Définir un calendrier pour une intervention
export const defineInterventionSchedule = async (req, res) => {
  try {
    const { interventionId, scheduledDate } = req.body;

    // Validate input
    if (!interventionId || !scheduledDate) {
      return res
        .status(400)
        .json({ message: "Intervention ID and scheduled date are required." });
    }

    // Validate that interventionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(interventionId)) {
      return res.status(400).json({ message: "Invalid Intervention ID." });
    }

    // Find the intervention
    const intervention = await Intervention.findById(interventionId);
    if (!intervention) {
      return res.status(404).json({ message: "Intervention not found." });
    }

    // Update the intervention with the scheduled date
    intervention.scheduledDate = scheduledDate;
    await intervention.save();

    res.status(200).json({
      message: "Intervention schedule defined successfully.",
      intervention,
    });
  } catch (error) {
    logger.error(`[INTERVENTION] Error defining schedule: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ 8️⃣ Assigner un technicien à une intervention
export const assignTechnician = async (req, res) => {
  try {
    const { interventionId, technicianId } = req.body;

    // Validate input
    if (!interventionId || !technicianId) {
      return res
        .status(400)
        .json({ message: "Intervention ID and Technician ID are required." });
    }

    // Validate that interventionId and technicianId are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(interventionId) ||
      !mongoose.Types.ObjectId.isValid(technicianId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid Intervention ID or Technician ID." });
    }

    // Find the intervention
    const intervention = await Intervention.findById(interventionId);
    if (!intervention) {
      return res.status(404).json({ message: "Intervention not found." });
    }

    // Find the technician
    const technician = await Utilisateur.findById(technicianId);
    if (!technician || technician.role !== "technicien") {
      return res
        .status(404)
        .json({ message: "Technician not found or invalid role." });
    }

    // Assign the technician to the intervention
    intervention.technicien = technicianId;
    await intervention.save();

    res.status(200).json({
      message: "Technician assigned successfully.",
      intervention,
    });
  } catch (error) {
    logger.error(`[INTERVENTION] Error assigning technician: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

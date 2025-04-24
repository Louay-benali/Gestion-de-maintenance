import Demande from "../models/demande.js";
import logger from "../utils/logger.js";
import { Utilisateur } from "../models/user.js"; // Import the Utilisateur model

// 📌 Suivre l'état des demandes
export const getDemandes = async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination (ou mettre des valeurs par défaut)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Récupérer les demandes avec pagination
    const demandes = await Demande.find().skip(skip).limit(limit);

    // 3. Compter le nombre total de demandes
    const totalDemandes = await Demande.countDocuments();

    // 4. Répondre avec les données paginées + infos
    res.status(200).json({
      results: demandes,
      totalDemandes,
      totalPages: Math.ceil(totalDemandes / limit),
      page,
      limit,
    });

    logger.info(
      `[DEMANDE] Récupération de toutes les demandes (${demandes.length}) avec pagination`
    );
  } catch (error) {
    logger.error(`[DEMANDE] Erreur récupération demandes : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Valider une demande
export const validerDemande = async (req, res) => {
  try {
    const { idDemande } = req.params;
    const demande = await Demande.findById(idDemande);

    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    demande.status = "validée";
    await demande.save();

    logger.info(`[DEMANDE] Demande validée : ${idDemande}`);
    res.status(200).json({ message: "Demande validée avec succès", demande });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur validation demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Rejeter une demande
export const rejeterDemande = async (req, res) => {
  try {
    const { idDemande } = req.params;
    const demande = await Demande.findById(idDemande);

    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    demande.status = "rejetée";
    await demande.save();

    logger.info(`[DEMANDE] Demande rejetée : ${idDemande}`);
    res.status(200).json({ message: "Demande rejetée avec succès", demande });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur rejet demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Approuver une demande d'intervention
export const approveDemandeIntervention = async (req, res) => {
  try {
    const { idDemande } = req.params;
    const demande = await Demande.findById(idDemande);

    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    demande.status = "validée";
    await demande.save();

    logger.info(`[DEMANDE] Demande d'intervention approuvée : ${idDemande}`);
    res.status(200).json({
      message: "Demande d'intervention approuvée avec succès",
      demande,
    });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur approbation demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Modifier une demande d'intervention
export const updateDemandeIntervention = async (req, res) => {
  try {
    const { idDemande } = req.params;
    const { description } = req.body;

    const demande = await Demande.findById(idDemande);

    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    if (description) demande.description = description;
    await demande.save();

    logger.info(`[DEMANDE] Demande d'intervention modifiée : ${idDemande}`);
    res.status(200).json({
      message: "Demande d'intervention modifiée avec succès",
      demande,
    });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur modification demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Créer une nouvelle demande
export const createDemande = async (req, res) => {
  try {
    const { description, demandeur } = req.body;

    // Validate input
    if (!description || !demandeur) {
      logger.warn(
        "[DEMANDE] Champs requis manquants : description ou demandeur"
      );
      return res
        .status(400)
        .json({ message: "Description et demandeur sont requis." });
    }

    // Verify the existence of the demandeur
    const existingDemandeur = await Utilisateur.findById(demandeur);
    if (!existingDemandeur) {
      logger.warn(`[DEMANDE] Demandeur non trouvé : ${demandeur}`);
      return res.status(404).json({ message: "Demandeur non trouvé." });
    }

    // Create a new demande
    const newDemande = new Demande({
      description,
      demandeur,
    });

    await newDemande.save();

    logger.info(
      `[DEMANDE] Nouvelle demande créée par l'utilisateur : ${demandeur}`
    );
    res
      .status(201)
      .json({ message: "Demande créée avec succès", demande: newDemande });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur création demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Supprimer une demande
export const deleteDemande = async (req, res) => {
  try {
    const { idDemande } = req.params;

    // Find and delete the demande
    const demande = await Demande.findByIdAndDelete(idDemande);

    if (!demande) {
      logger.warn(
        `[DEMANDE] Demande non trouvée pour suppression : ${idDemande}`
      );
      return res.status(404).json({ message: "Demande non trouvée." });
    }

    logger.info(`[DEMANDE] Demande supprimée : ${idDemande}`);
    res.status(200).json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur suppression demande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

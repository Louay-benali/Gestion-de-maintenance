import Demande from "../models/demande.js";
import logger from "../utils/logger.js";
import { Utilisateur } from "../models/user.js";

// 📌 Suivre l'état des demandes
export const getDemandes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const demandes = await Demande.find()
      .populate("demandeur", "nom prenom email")
      .populate("pieces.pieceId", "nomPiece quantite")
      .skip(skip)
      .limit(limit);

    const totalDemandes = await Demande.countDocuments();

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
    const { description, demandeur, pieces } = req.body;

    if (!description || !demandeur || !pieces || pieces.length === 0) {
      logger.warn(
        "[DEMANDE] Champs requis manquants : description, demandeur ou pièces"
      );
      return res
        .status(400)
        .json({ message: "Description, demandeur et pièces sont requis." });
    }

    const existingDemandeur = await Utilisateur.findById(demandeur);
    if (!existingDemandeur) {
      logger.warn(`[DEMANDE] Demandeur non trouvé : ${demandeur}`);
      return res.status(404).json({ message: "Demandeur non trouvé." });
    }

    const newDemande = new Demande({ description, demandeur, pieces });
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

// 📌 Consulter les demandes de pièces des techniciens
export const consulterDemandesTechniciens = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const demandes = await Demande.find({})
      .populate("demandeur", "nom prenom email")
      .populate("pieces.pieceId", "nomPiece quantite")
      .skip(skip)
      .limit(limit);

    const totalDemandes = await Demande.countDocuments();

    res.status(200).json({
      results: demandes,
      totalDemandes,
      totalPages: Math.ceil(totalDemandes / limit),
      page,
      limit,
    });

    logger.info(
      `[DEMANDE] Récupération des demandes de pièces des techniciens (${demandes.length}) avec pagination`
    );
  } catch (error) {
    logger.error(
      `[DEMANDE] Erreur récupération des demandes des techniciens : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des demandes.",
      error,
    });
  }
};

// 📌 Vérifier la disponibilité des pièces demandées
export const verifierDisponibilitePieces = async (req, res) => {
  try {
    const { idDemande } = req.params;

    const demande = await Demande.findById(idDemande).populate(
      "pieces.pieceId"
    );
    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée." });
    }

    const disponibilite = demande.pieces.map((piece) => ({
      pieceId: piece.pieceId._id,
      nomPiece: piece.pieceId.nomPiece,
      quantiteDemandee: piece.quantite,
      quantiteDisponible: piece.pieceId.quantite,
      disponible: piece.pieceId.quantite >= piece.quantite,
    }));

    logger.info(
      `[DEMANDE] Vérification de la disponibilité des pièces pour la demande : ${idDemande}`
    );
    res.status(200).json({ disponibilite });
  } catch (error) {
    logger.error(
      `[DEMANDE] Erreur vérification disponibilité des pièces : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur serveur lors de la vérification des pièces.",
      error,
    });
  }
};

// 📌 Suivre l'approbation d'une demande
export const suivreApprobationDemande = async (req, res) => {
  try {
    const { idDemande } = req.params;

    const demande = await Demande.findById(idDemande)
      .populate("demandeur", "nom prenom email")
      .populate("pieces.pieceId", "nomPiece quantite");

    if (!demande) {
      logger.warn(`[DEMANDE] Demande non trouvée : ID ${idDemande}`);
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    logger.info(
      `[DEMANDE] Suivi de l'approbation de la demande : ID ${idDemande}`
    );
    res.status(200).json({
      message: "Suivi de l'approbation récupéré avec succès",
      demande: {
        id: demande._id,
        description: demande.description,
        status: demande.status,
        pieces: demande.pieces,
        dateDemande: demande.dateDemande,
        demandeur: demande.demandeur,
      },
    });
  } catch (error) {
    logger.error(`[DEMANDE] Erreur suivi de l'approbation : ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors du suivi de l'approbation", error });
  }
};

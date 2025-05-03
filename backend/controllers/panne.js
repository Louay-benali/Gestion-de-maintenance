// controllers/panneController.js
import Panne from "../models/panne.js";
import Machine from "../models/machine.js";
import { Utilisateur } from "../models/user.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../services/email.service.js";

// Créer une nouvelle panne
export const createPanne = async (req, res) => {
  try {
    const { description, operateur, machine, dateDeclaration, responsableId } =
      req.body;

    // Vérification existence opérateur
    const existingOperateur = await Utilisateur.findById(operateur);
    if (!existingOperateur) {
      logger.warn(`[PANNE] Opérateur non trouvé : ID ${operateur}`);
      return res.status(404).json({ message: "Opérateur non trouvé" });
    }

    // Vérification existence machine
    const existingMachine = await Machine.findById(machine);
    if (!existingMachine) {
      logger.warn(`[PANNE] Machine non trouvée : ID ${machine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }

    // Saisir les détails d'une panne
    const newPanne = new Panne({
      description,
      operateur,
      machine,
      dateDeclaration: dateDeclaration || new Date(),
      etat: "ouverte", // Par défaut, la panne est ouverte
    });

    await newPanne.save();

    // Récupérer l'email du responsable spécifié
    const responsibleUser = await Utilisateur.findById(responsableId);
    if (!responsibleUser) {
      logger.warn(`[PANNE] Responsable non trouvé : ID ${responsableId}`);
      return res
        .status(404)
        .json({ message: `Responsable non trouvé : ID ${responsableId}` });
    }

    const responsibleEmail = responsibleUser.email;

    // Envoyer une alerte au responsable par email
    const emailSubject = `Nouvelle panne déclarée sur la machine ${existingMachine.nomMachine}`;
    const emailBody = `
      <p>Une nouvelle panne a été déclarée :</p>
      <ul>
        <li><strong>Description :</strong> ${description}</li>
        <li><strong>Machine :</strong> ${existingMachine.nomMachine}</li>
        <li><strong>Opérateur :</strong> ${existingOperateur.nom} ${
      existingOperateur.prenom
    }</li>
        <li><strong>Date :</strong> ${new Date().toLocaleString()}</li>
      </ul>
    `;
    await sendEmail(responsibleEmail, emailSubject, emailBody);

    logger.info(
      `[PANNE] Alerte envoyée pour la panne déclarée sur la machine : ${existingMachine.nomMachine}`
    );

    // Recevoir une confirmation de prise en charge par le responsable
    const confirmationSubject = `Confirmation de prise en charge de la panne sur la machine ${existingMachine.nomMachine}`;
    const confirmationBody = `
      <p>La panne déclarée a été prise en charge par le responsable.</p>
      <ul>
        <li><strong>Description :</strong> ${description}</li>
        <li><strong>Machine :</strong> ${existingMachine.nomMachine}</li>
        <li><strong>Date :</strong> ${new Date().toLocaleString()}</li>
      </ul>
    `;
    await sendEmail(
      existingOperateur.email,
      confirmationSubject,
      confirmationBody
    );

    logger.info(
      `[PANNE] Confirmation de prise en charge envoyée par le responsable à l'opérateur : ${existingOperateur.email}`
    );

    res.status(201).json({
      message: "Panne déclarée avec succès",
      panne: newPanne,
      confirmation: "La panne a été prise en charge par le responsable.",
    });

    logger.info(`[PANNE] Nouvelle panne déclarée : ${newPanne._id}`);
  } catch (error) {
    logger.error(`[PANNE] Erreur déclaration panne : ${error.message}`);
    res.status(500).json({
      message: "Erreur lors de la déclaration de la panne",
      error,
    });
  }
};

// Obtenir toutes les pannes avec pagination
export const getPannes = async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination (ou mettre des valeurs par défaut)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Récupérer les pannes avec pagination
    const pannes = await Panne.find()
      .populate("operateur machine")
      .skip(skip)
      .limit(limit);

    // 3. Compter le nombre total de pannes
    const totalPannes = await Panne.countDocuments();

    // 4. Répondre avec les données paginées + infos
    res.status(200).json({
      results: pannes,
      totalPannes,
      totalPages: Math.ceil(totalPannes / limit),
      page,
      limit,
    });

    logger.info(
      `[PANNE] Récupération de toutes les pannes (${pannes.length}) avec pagination`
    );
  } catch (error) {
    logger.error(`[PANNE] Erreur récupération pannes : ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des pannes", error });
  }
};

// Obtenir une panne par ID
export const getPanneById = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const panne = await Panne.findById(idPanne).populate("operateur machine");
    if (!panne) {
      logger.warn(`[PANNE] Panne non trouvée pour ID : ${idPanne}`);
      return res.status(404).json({ message: "Panne non trouvée" });
    }
    logger.info(`[PANNE] Détail de la panne récupéré : ID ${idPanne}`);
    res.status(200).json(panne);
  } catch (error) {
    logger.error(
      `[PANNE] Erreur récupération panne ID ${req.params.idPanne} : ${error.message}`
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la panne", error });
  }
};

// Mettre à jour une panne
export const updatePanne = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const { description, etat, operateur, machine, dateDeclaration } = req.body;

    const existingOperateur = await Utilisateur.findById(operateur);
    if (!existingOperateur) {
      logger.warn(`[PANNE] Opérateur non trouvé : ID ${operateur}`);
      return res.status(404).json({ message: "Opérateur non trouvé" });
    }

    // Vérification existence machine
    const existingMachine = await Machine.findById(machine);
    if (!existingMachine) {
      logger.warn(`[PANNE] Machine non trouvée : ID ${machine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }

    const updatedPanne = await Panne.findByIdAndUpdate(
      idPanne,
      { description, etat, operateur, machine, dateDeclaration },
      { new: true }
    );
    if (!updatedPanne) {
      logger.warn(
        `[PANNE] Mise à jour échouée, panne non trouvée : ID ${idPanne}`
      );
      return res.status(404).json({ message: "Panne non trouvée" });
    }
    logger.info(`[PANNE] Panne mise à jour : ID ${idPanne}`);
    res
      .status(200)
      .json({ message: "Panne mise à jour avec succès", panne: updatedPanne });
  } catch (error) {
    logger.error(
      `[PANNE] Erreur mise à jour panne ID ${req.params.idPanne} : ${error.message}`
    );
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour de la panne", error });
  }
};

// Supprimer une panne
export const deletePanne = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const deletedPanne = await Panne.findByIdAndDelete(idPanne);
    if (!deletedPanne) {
      logger.warn(
        `[PANNE] Suppression échouée, panne non trouvée : ID ${idPanne}`
      );
      return res.status(404).json({ message: "Panne non trouvée" });
    }
    logger.info(`[PANNE] Panne supprimée : ID ${idPanne}`);
    res.status(200).json({ message: "Panne supprimée avec succès" });
  } catch (error) {
    logger.error(
      `[PANNE] Erreur suppression panne ID ${req.params.idPanne} : ${error.message}`
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la panne", error });
  }
};

// Confirmer la résolution d'une panne
export const confirmerResolution = async (req, res) => {
  try {
    const { idPanne } = req.params;

    const panne = await Panne.findById(idPanne);
    if (!panne) {
      logger.warn(`[PANNE] Panne non trouvée : ID ${idPanne}`);
      return res.status(404).json({ message: "Panne non trouvée" });
    }

    panne.etat = "resolue";
    await panne.save();

    logger.info(`[PANNE] Panne confirmée comme "résolue" : ID ${idPanne}`);
    res.status(200).json({ message: "Panne résolue avec succès", panne });
  } catch (error) {
    logger.error(`[PANNE] Erreur confirmation résolution panne : ${error.message}`);
    res.status(500).json({ message: "Erreur lors de la confirmation de la résolution", error });
  }
};

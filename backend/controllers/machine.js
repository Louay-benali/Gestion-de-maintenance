// controllers/machineController.js
import Machine from "../models/machine.js";
import logger from "../utils/logger.js"; // Assure-toi que ce chemin est correct

// Créer une machine
export const createMachine = async (req, res) => {
  try {
    const { nomMachine, dataSheet, etat } = req.body;
    const newMachine = new Machine({ nomMachine, dataSheet, etat });
    await newMachine.save();

    logger.info(`[MACHINE] Machine créée : ${nomMachine}`);
    res
      .status(201)
      .json({ message: "Machine créée avec succès", machine: newMachine });
  } catch (error) {
    logger.error(`[MACHINE] Erreur création machine : ${error.message}`);
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la machine", error });
  }
};

// Lire toutes les machines avec pagination
export const getMachines = async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination (ou mettre des valeurs par défaut)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Récupérer les machines avec pagination
    const machines = await Machine.find().skip(skip).limit(limit);

    // 3. Compter le nombre total de machines
    const totalMachines = await Machine.countDocuments();

    // 4. Répondre avec les données paginées + infos
    res.status(200).json({
      results: machines,
      totalMachines,
      totalPages: Math.ceil(totalMachines / limit),
      page,
      limit,
    });

    logger.info(
      `[MACHINE] Liste des machines récupérée (${machines.length}) avec pagination`
    );
  } catch (error) {
    logger.error(`[MACHINE] Erreur récupération machines : ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des machines", error });
  }
};

// Lire une machine par ID
export const getMachineById = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const machine = await Machine.findById(idMachine);
    if (!machine) {
      logger.warn(`[MACHINE] Machine non trouvée avec ID : ${idMachine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }
    logger.info(`[MACHINE] Machine récupérée : ${idMachine}`);
    res.status(200).json(machine);
  } catch (error) {
    logger.error(`[MACHINE] Erreur récupération machine : ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la machine", error });
  }
};

// Mettre à jour une machine
export const updateMachine = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const { nomMachine, etat, datasheet } = req.body;
    const updatedMachine = await Machine.findByIdAndUpdate(
      idMachine,
      { nomMachine, etat, datasheet },
      { new: true }
    );
    if (!updatedMachine) {
      logger.warn(
        `[MACHINE] Machine à mettre à jour non trouvée : ${idMachine}`
      );
      return res.status(404).json({ message: "Machine non trouvée" });
    }
    logger.info(`[MACHINE] Machine mise à jour : ${idMachine}`);
    res.status(200).json({
      message: "Machine mise à jour avec succès",
      machine: updatedMachine,
    });
  } catch (error) {
    logger.error(`[MACHINE] Erreur mise à jour machine : ${error.message}`);
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour de la machine", error });
  }
};

// Supprimer une machine
export const deleteMachine = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const deletedMachine = await Machine.findByIdAndDelete(idMachine);
    if (!deletedMachine) {
      logger.warn(`[MACHINE] Machine à supprimer non trouvée : ${idMachine}`);
      return res.status(404).json({ message: "Machine non trouvée" });
    }
    logger.info(`[MACHINE] Machine supprimée : ${idMachine}`);
    res.status(200).json({ message: "Machine supprimée avec succès" });
  } catch (error) {
    logger.error(`[MACHINE] Erreur suppression machine : ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la machine", error });
  }
};

// Consulter l'état des machines (statut en temps réel) avec pagination
export const getMachineStatus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const machines = await Machine.find()
      .select("nomMachine etat")
      .skip(skip)
      .limit(limit);

    const totalMachines = await Machine.countDocuments();

    res.status(200).json({
      results: machines,
      totalMachines,
      totalPages: Math.ceil(totalMachines / limit),
      page,
      limit,
    });

    logger.info(
      `[MACHINE] Récupération du statut des machines (${machines.length}) avec pagination`
    );
  } catch (error) {
    logger.error(
      `[MACHINE] Erreur récupération statut des machines : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur lors de la récupération du statut des machines",
      error,
    });
  }
};

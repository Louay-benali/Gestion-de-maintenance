// controllers/machineController.js
import Machine from '../models/machine.js';

// Créer une machine
export const createMachine = async (req, res) => {
  try {
    const { nomMachine, dataSheet, etat } = req.body;
    const newMachine = new Machine({ nomMachine, dataSheet, etat });
    await newMachine.save();
    res.status(201).json({ message: 'Machine créée avec succès', newMachine });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la machine', error });
  }
};

// Lire toutes les machines
export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des machines', error });
  }
};

// Lire une machine par ID
export const getMachineById = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const machine = await Machine.findById(idMachine);
    if (!machine) {
      return res.status(404).json({ message: 'Machine non trouvée' });
    }
    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la machine', error });
  }
};

// Mettre à jour une machine
export const updateMachine = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const { nomMachine, etat, datasheet } = req.body;
    const updatedMachine = await Machine.findByIdAndUpdate(idMachine, { nomMachine, etat, datasheet }, { new: true });
    if (!updatedMachine) {
      return res.status(404).json({ message: 'Machine non trouvée' });
    }
    res.status(200).json({ message: 'Machine mise à jour avec succès', updatedMachine });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la machine', error });
  }
};

// Supprimer une machine
export const deleteMachine = async (req, res) => {
  try {
    const { idMachine } = req.params;
    const deletedMachine = await Machine.findByIdAndDelete(idMachine);
    if (!deletedMachine) {
      return res.status(404).json({ message: 'Machine non trouvée' });
    }
    res.status(200).json({ message: 'Machine supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la machine', error });
  }
};

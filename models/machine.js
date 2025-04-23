import mongoose from "mongoose";
import MachineEnum from "../models/etatmachine.js";

const machineSchema = new mongoose.Schema({
    nomMachine: { type: String, required: true },
    dataSheet : {type: String , required: true},
    etat: {
      type: String,
      enum: [MachineEnum.fonctionelle, MachineEnum.enpanne, MachineEnum.maintenance],
      required: true,
    },
  });
  
  const Machine = mongoose.model("Machine", machineSchema);
  export default Machine;
  
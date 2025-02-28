import mongoose from "mongoose";
const machineSchema = new mongoose.Schema({
    nomMachine: { type: String, required: true },
    dataSheet : {type: String , required: true},
    etat: { type: String, enum: ["fonctionnelle", "en panne", "maintenance"], default: "fonctionnelle" },
  });
  
  const Machine = mongoose.model("Machine", machineSchema);
  export default Machine;
  
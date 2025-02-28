import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import commandeRoutes from "./routes/commande.js";
import interventionRoutes from "./routes/intervention.js";
import machineRoutes from "./routes/machine.js"
import panneRoutes from "./routes/panne.js";
import pieceRoutes from "./routes/piece.js";
import utilisateurRoutes from "./routes/user.js";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

// Utilisation du port défini dans le fichier .env ou du port par défaut
const port = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Connexion à MongoDB avec l'URL de la base de données définie dans le fichier .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connecté à MongoDB"))
.catch((error) => console.log("Erreur de connexion à MongoDB", error));

// Utilisation des routes pour les utilisateurs
app.use("/user", utilisateurRoutes);

app.use("/piece", pieceRoutes);
app.use("/panne", panneRoutes);
app.use("/machine", machineRoutes);
app.use("/intervention", interventionRoutes);
app.use("/commande", commandeRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

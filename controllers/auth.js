import jwt from "jsonwebtoken";
import { Utilisateur } from "../models/user.js";
import { loginUser } from "../controllers/user.js"; // Correction de l'import


// ✅ Liste temporaire des refresh tokens (à remplacer par une BD)
let refreshTokens = [];

// ✅ Connexion (Login) → Génère accessToken et refreshToken
export const login = async (req, res) => {
  await loginUser(req, res, refreshTokens);
};

// ✅ Rafraîchir l'access token
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Accès interdit" });

  const user = await Utilisateur.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Refresh Token invalide" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedUser) => {
    if (err) return res.status(403).json({ message: "Refresh Token invalide" });

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};


// ✅ Déconnexion (Logout) → Supprime le refreshToken
export const logout = async (req, res) => {
     try {
       const refreshToken = req.cookies.refreshToken;
       if (!refreshToken) return res.status(400).json({ message: "Déjà déconnecté" });
   
       // Supprimer le refreshToken de la base de données
       await Utilisateur.findOneAndUpdate({ refreshToken }, { refreshToken: null });
   
       res.clearCookie("refreshToken");
       res.status(200).json({ message: "Déconnecté avec succès" });
     } catch (error) {
       res.status(500).json({ message: "Erreur lors de la déconnexion" });
     }
   };
   
   // ✅ Middleware pour protéger les routes avec JWT
   export const verifyToken = (req, res, next) => {
     const token = req.headers.authorization?.split(" ")[1];
     if (!token) return res.status(401).json({ message: "Accès interdit" });
   
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) return res.status(403).json({ message: "Token invalide ou expiré" });
   
       req.user = user; // Ajouter les infos utilisateur à la requête
       next();
     });
   };
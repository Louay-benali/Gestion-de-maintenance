import jwt from "jsonwebtoken";

// Middleware pour vérifier le token d'accès
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Accès interdit, token manquant" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide ou expiré" });

    req.user = user; // Ajouter l'utilisateur décodé à la requête
    next();
  });
};

// Middleware pour vérifier les rôles (ex: ADMIN, MANAGER...)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé, rôle insuffisant" });
    }
    next();
  };
};

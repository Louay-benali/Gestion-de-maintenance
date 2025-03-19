import express from "express";
import { login, refreshToken, logout } from "../controllers/auth.js";

const router = express.Router();

// Routes pour l'authentification
router.post("/login", login);
router.post("/token", refreshToken);
router.post("/logout", logout);

export default router;

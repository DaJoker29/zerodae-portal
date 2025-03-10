import express from "express";
import { generate, login, logout } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/generate", generate);
router.post("/login", login);
router.post("/logout", logout);

export default router;

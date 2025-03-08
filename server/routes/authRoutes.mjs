import express from "express";
import authController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/", authController.sendMagicLink);
router.get("/token", authController.authenticateToken);

export default router;

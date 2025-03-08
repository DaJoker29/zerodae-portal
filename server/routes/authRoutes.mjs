import express from "express";
import authController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/", authController.sendMagicLink);

export default router;

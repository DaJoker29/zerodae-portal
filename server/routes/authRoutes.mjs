import express from "express";
import {
  check,
  generate,
  login,
  logout,
  refreshToken,
  whoami,
} from "../controllers/authController.mjs";
import { authenticateJWT } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/generate", generate);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/whoami", authenticateJWT, whoami);
router.post("/check", authenticateJWT, check);

export default router;

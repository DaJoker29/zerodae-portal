import express from "express";
import customerController from "../controllers/customerController.mjs";

const router = express.Router();

router.post("/", customerController.createCustomer);

export default router;

import express from "express";
import customerController from "../controllers/customerController.mjs";

const router = express.Router();

router.get("/", customerController.listAllCustomers);
router.post("/", customerController.createCustomer);

export default router;

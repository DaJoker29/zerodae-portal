import express from "express";
import subscriptionController from "../controllers/subscriptionController.mjs";

const router = express.Router();

router.post("/", subscriptionController.createSubscription);
router.get("/types", subscriptionController.listSubscriptionTypes);

export default router;

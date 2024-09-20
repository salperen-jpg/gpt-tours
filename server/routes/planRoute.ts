import { Router } from "express";
import { getPlans, updatePlan ,getSinglePlan, createPaymentIntent, getAllPlans, getCurrentUserPlan} from "../controllers/planController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(getPlans);
router.get("/current-user-plan",authMiddleware,getCurrentUserPlan)
router.get('/allPlans',getAllPlans)
router.post("/create-payment-intent",createPaymentIntent)
router.route("/:id").get(getSinglePlan).patch(authMiddleware,updatePlan);

export default router;

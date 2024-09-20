import { Router } from "express";
import {
  getCurrentUser,
  getTotalUserAndTours,
  updateUser,
} from "../controllers/userController.js";
import { updateUserValidator } from "../middlewares/validatorMiddleware.js";

const router = Router();

router.get("/currentUser", getCurrentUser);
router.get("/admin", getTotalUserAndTours);
router.patch("/update-user", updateUserValidator, updateUser);

export default router;

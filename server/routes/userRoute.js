import { Router } from "express";
import {
  getCurrentUser,
  getTotalUserAndTours,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/currentUser", getCurrentUser);
router.get("/admin", getTotalUserAndTours);
router.patch("/update-user", updateUser);

export default router;

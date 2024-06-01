import { Router } from "express";
import {
  createTokenInstance,
  getCurrentUserTokenAmount,
} from "../controllers/tokenController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post(createTokenInstance)
  .get(authMiddleware, getCurrentUserTokenAmount);

export default router;

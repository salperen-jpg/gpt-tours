import { Router } from "express";
import {
  createTokenInstance,
  getCurrentUserTokenAmount,
  subtractUsedTokenAmount,
} from "../controllers/tokenController.js";

const router = Router();

router
  .route("/")
  .post(createTokenInstance)
  .get(getCurrentUserTokenAmount)
  .patch(subtractUsedTokenAmount);

export default router;

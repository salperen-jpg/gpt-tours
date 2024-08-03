import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validatorMiddleware.js";
import { createTokenInstance } from "../controllers/tokenController.js";
import { createPlan } from "../controllers/planController.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  register,
  createTokenInstance,
  createPlan
);
router.post("/login", loginValidator, login);
router.get("/logout", logout);

export default router;

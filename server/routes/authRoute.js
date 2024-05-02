import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validatorMiddleware.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/logout", logout);

export default router;

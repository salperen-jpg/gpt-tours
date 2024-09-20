import { Router } from "express";
import { createQuery } from "../controllers/queriesController.js";
import { queryValidator } from "../middlewares/validatorMiddleware.js";

const router = Router();

router.post("/", queryValidator, createQuery);

export default router;

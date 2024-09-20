import { Router } from "express";
import tourRoute from './tourRoute.js'
import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import queryRoute from './queryRoute.js'
import planRoute from './planRoute.js'
import tokenRoute from './tokenRoute.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router= Router();

router.use("/token", authMiddleware, tokenRoute);
router.use("/tours", authMiddleware, tourRoute);
router.use("/auth", authRoute);
router.use("/user", authMiddleware, userRoute);
router.use("/queries", queryRoute);
router.use("/plans", planRoute);
router.use("/token", authMiddleware, tokenRoute);

export default router;


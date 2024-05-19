import { Router } from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  getTourByCityAndCountry,
  updateTour,
} from "../controllers/tourController.js";
import {
  createTourValidator,
  updateTourValidator,
  validateIdParam,
} from "../middlewares/validatorMiddleware.js";

const router = Router();

router.route("/").get(getAllTours).post(createTourValidator, createTour);
router
  .route("/:id")
  .get(validateIdParam, getTour)
  .patch(updateTourValidator, validateIdParam, updateTour)
  .delete(validateIdParam, deleteTour);
router.get("/:city/:country", getTourByCityAndCountry);

export default router;

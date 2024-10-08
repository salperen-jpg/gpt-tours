import {
  body,
  param,
  ValidationChain,
  validationResult,
} from "express-validator";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import Tour from "../models/tourModel.js";
import { RequestHandler } from "express";

const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    throw new BadRequestError(errorMessages.join(", "));
  }
  next();
};

export const validatorMiddleware = (
  validatorChain: ValidationChain | ValidationChain[]
): RequestHandler[] => {
  // Spread the validatorChain if it's an array or convert it to an array if it's a single ValidationChain
  const chainArray = Array.isArray(validatorChain)
    ? validatorChain
    : [validatorChain];

  // Return the spread of chains followed by the validateRequest handler
  return [...chainArray, validateRequest];
};

// AUTH ROUTES
export const registerValidator = validatorMiddleware([
  body("name").notEmpty().withMessage("name can not be empty"),
  body("lastName").notEmpty().withMessage("last name can not be empty"),
  body("location").notEmpty().withMessage("location can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email: string) => {
      const isEmailInUse = await User.findOne({ email: email });
      if (isEmailInUse) {
        throw new BadRequestError("email already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password can not be empty")
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
]);

export const loginValidator = validatorMiddleware([
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password can not be empty"),
]);
// TOUR ROUTES
export const createTourValidator = validatorMiddleware([
  body("city").notEmpty().withMessage("city can not be empty!"),
  body("country").notEmpty().withMessage("country can not be empty!"),
  body("title").notEmpty().withMessage("title can not be empty!"),
  body("description").notEmpty().withMessage("description can not be empty!"),
  body("image").notEmpty().withMessage("image can not be empty!"),
]);

export const updateTourValidator = validatorMiddleware([
  body("city").notEmpty().withMessage("city can not be empty!"),
  body("country").notEmpty().withMessage("country can not be empty!"),
  body("title").notEmpty().withMessage("title can not be empty!"),
  body("description").notEmpty().withMessage("description can not be empty!"),
  body("image").notEmpty().withMessage("image can not be empty!"),
]);

export const validateIdParam = validatorMiddleware([
  param("id").custom(async (id: string, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const tour = await Tour.findById(id);
    const isOwner = req.user.userId === tour!.createdBy!.toString();
    if (!isOwner) throw new UnauthorizedError("not authorized to access!");
  }),
]);

// USER ROUTE
export const updateUserValidator = validatorMiddleware([
  body("name").notEmpty().withMessage("name can not be empty!"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty!")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email: string, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already in use");
      }
    }),
]);

// QUERIES ROUTE
export const queryValidator = validatorMiddleware([
  body("title").notEmpty().withMessage("title can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email format"),
  body("message").notEmpty().withMessage("message can not be empty"),
]);

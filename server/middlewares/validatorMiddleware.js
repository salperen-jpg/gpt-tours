import { body, matchedData, query, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/userModel.js";

export const validatorMiddleware = (validatorChain) => [
  validatorChain,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      throw new BadRequestError(errorMessages);
    }
    next();
  },
];

export const registerValidator = validatorMiddleware([
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const isEmailInUse = await User.findOne({ email: email });
      if (isEmailInUse) {
        throw new BadRequestError("email already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password can not be empty")
    .isLength({ min: 8 })
    .withMessage("password should be at least 6 characters"),
]);

export const loginValidator = validatorMiddleware([
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password can not be empty"),
]);

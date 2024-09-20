import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Tour from "../models/tourModel.js";
import { RequestHandler } from "express";
import { CustomRequestWithUser } from "./authController.js";

export const getCurrentUser: RequestHandler = async (req, res) => {
  const currentUser = await User.findById(
    (req as CustomRequestWithUser).user.userId
  );
  const userWithoutPass = currentUser!.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPass });
};
export const getTotalUserAndTours: RequestHandler = async (req, res) => {
  const users = await User.countDocuments();
  const tours = await Tour.countDocuments();
  res.status(StatusCodes.OK).json({ users, tours });
};
export const updateUser: RequestHandler = async (req, res) => {
  const user = { ...req.body };
  // delete user password just in case
  delete user.password;
  const updatedUser = await User.findByIdAndUpdate(
    (req as CustomRequestWithUser).user.userId,
    user
  );
  res.status(StatusCodes.OK).json({ msg: "user updated!", user: updatedUser });
};

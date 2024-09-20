import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/jwt.js";
import { NextFunction, Request, RequestHandler, Response } from "express";

export interface CustomRequest extends Request {
  userTokenId?: string;
}
type UserReq = {
  userId: string;
  role: string;
};
export interface CustomRequestWithUser extends Request {
  user: UserReq;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  req.body.password = await hashPassword(req.body.password);
  const user = await User.create(req.body);
  (req as CustomRequest).userTokenId = user._id.toString();
  next();
};

export const login: RequestHandler = async (req, res) => {
  const loggedInUser = await User.findOne({ email: req.body.email });
  // check if user exists and passwords are matching
  const isUserValid =
    loggedInUser &&
    (await comparePassword(req.body.password, loggedInUser.password!));
  if (!isUserValid) throw new UnauthenticatedError("invalid credentials");

  // attach cookie
  const token = createJWT({
    userId: loggedInUser._id.toString(),
    role: loggedInUser.role,
  });
  // one day in sec
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in!" });
};

export const logout: RequestHandler = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

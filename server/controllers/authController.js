import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  req.body.password = await hashPassword(req.body.password);
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};

export const login = async (req, res) => {
  const loggedInUser = await User.findOne({ email: req.body.email });
  // check if user exists and passwords are matching
  const isUserValid =
    loggedInUser &&
    (await comparePassword(req.body.password, loggedInUser.password));
  if (!isUserValid) throw new UnauthenticatedError("invalid credentials");

  // attach cookie
  const token = createJWT({
    userId: loggedInUser._id,
    role: loggedInUser.role,
  });
  // one day in sec
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in!" });
};

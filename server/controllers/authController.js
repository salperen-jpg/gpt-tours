import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import jwt from "jsonwebtoken";
import { createJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  req.body.password = await hashPassword(req.body.password);
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};
export const login = async (req, res) => {
  const { password } = req.body;
  const loggedInUser = await User.findOne({ email: req.body.email });
  // check if user exists and passwords are matching
  const isUserValid =
    loggedInUser && (await comparePassword(password, loggedInUser.password));
  if (!isUserValid) throw new UnauthenticatedError("invalid credentials");

  // attach cookie
  const token = createJWT({
    name: loggedInUser.name,
    role: loggedInUser.role,
  });
  console.log(token);

  res.status(StatusCodes.OK).send("login");
};

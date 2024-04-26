import { StatusCodes } from "http-status-codes";

export const register = (req, res) => {
  res.status(StatusCodes.CREATED).send("register");
};
export const login = (req, res) => {
  res.status(StatusCodes.OK).send("login");
};

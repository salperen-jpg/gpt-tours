import Query from "../models/queriesModel.js";
import { StatusCodes } from "http-status-codes";

export const createQuery = async (req, res) => {
  await Query.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Query created successfully!" });
};

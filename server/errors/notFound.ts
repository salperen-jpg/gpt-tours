import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res) =>
  res.status(404).json({ msg: "not found" });

import { JwtPayload } from "jsonwebtoken";
import { CustomRequestWithUser } from "../controllers/authController.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwt.js";
import { RequestHandler } from "express";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token) as CustomJwtPayload;
    (req as CustomRequestWithUser).user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

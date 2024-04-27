import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  if (!req.cookies.token)
    throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(req.cookies.token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

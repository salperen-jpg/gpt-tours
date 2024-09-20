import jwt from "jsonwebtoken";

export const createJWT = (payload: { userId: string; role: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};

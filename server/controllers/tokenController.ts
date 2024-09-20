import { StatusCodes } from "http-status-codes";
import Token from "../models/tokenModel.js";
import { RequestHandler } from "express";
import { CustomRequest, CustomRequestWithUser } from "./authController.js";

export const createTokenInstance: RequestHandler = async (req, res, next) => {
  await Token.create({
    tokenOwner: (req as CustomRequest).userTokenId,
    tokenAmount: process.env.INITIAL_TOKEN_AMOUNT,
  });
  next();
};

export const getCurrentUserTokenAmount: RequestHandler = async (req, res) => {
  const currentUserToken = await Token.findOne({
    tokenOwner: (req as CustomRequestWithUser).user.userId,
  });
  if (currentUserToken) {
    const { tokenAmount } = currentUserToken;
    res.status(StatusCodes.OK).json({
      tokenAmount,
    });
  }
};

export const subtractUsedTokenAmount: RequestHandler = async (req, res) => {
  const { usedToken } = req.body;
  const getCurrentToken = await Token.findOne({
    tokenOwner: (req as CustomRequestWithUser).user.userId,
  });
  const { tokenAmount } = getCurrentToken!;
  // update the token;
  const latest = await Token.findOneAndUpdate(
    { tokenOwner: (req as CustomRequestWithUser).user.userId },
    { tokenAmount: tokenAmount! - usedToken },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    msg: "Updated Successfully!",
    token: latest!.tokenAmount,
  });
};

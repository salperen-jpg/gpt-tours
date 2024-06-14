import { StatusCodes } from "http-status-codes";
import Token from "../models/tokenModel.js";

export const createTokenInstance = async (req, res) => {
  await Token.create({
    tokenOwner: req.userTokenId,
    tokenAmount: process.env.INITIAL_TOKEN_AMOUNT,
  });
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};

export const getCurrentUserTokenAmount = async (req, res) => {
  const currentUserToken = await Token.findOne({
    tokenOwner: req.user.userId,
  });
  const { tokenAmount } = currentUserToken;
  res.status(StatusCodes.OK).json({
    tokenAmount,
  });
};

export const subtractUsedTokenAmount = async (req, res) => {
  const { usedToken } = req.body;
  const getCurrentToken = await Token.findOne({ tokenOwner: req.user.userId });
  const { tokenAmount } = getCurrentToken;
  // update the token;
  const latest = await Token.findOneAndUpdate(
    { tokenOwner: req.user.userId },
    { tokenAmount: tokenAmount - usedToken },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    msg: "Updated Successfully!",
    token: latest.tokenAmount,
  });
};

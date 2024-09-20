import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenAmount: Number,
  tokenOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Token", tokenSchema);

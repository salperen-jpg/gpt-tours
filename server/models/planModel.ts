import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  tokens: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  planOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Plan", planSchema);

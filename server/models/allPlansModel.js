import mongoose from "mongoose";

const allPlanSchema = new mongoose.Schema({
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
});

export default mongoose.model("AllPlan", allPlanSchema);

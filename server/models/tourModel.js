import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    city: String,
    country: String,
    title: String,
    description: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tour", tourSchema);

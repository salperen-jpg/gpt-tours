import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    city: String,
    country: String,
    title: String,
    description: String,
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

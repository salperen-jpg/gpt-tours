import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  email: String,
  title: String,
  message: String,
});

export default mongoose.model("Query", querySchema);

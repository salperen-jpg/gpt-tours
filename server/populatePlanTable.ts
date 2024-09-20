import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connectDB.js";
import AllPlan from "./models/allPlansModel.js";

const plans = [
  {
    title: "Starter",
    cost: "Free",
    tokens: 1000,
    description:
      "Ideal for beginners, allowing basic interaction with the chat and tour creation.",
  },
  {
    title: "Basic",
    cost: 300,
    tokens: 10000,
    description:
      "Suitable for regular users needing more interactions and tour creation.",
  },
  {
    title: "Advanced",
    cost: 500,
    tokens: 20000,
    description:
      "Perfect for users requiring extensive interaction and comprehensive tours.",
  },
];

const populate = async () => {
  // connect db first
  try {
    await connectDB(process.env.MONGO_URI);
    await AllPlan.deleteMany({});
    await AllPlan.create(plans);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
// middlewares
import { notFound } from "./errors/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
// routes
import tourRoute from "./routes/tourRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import queryRoute from "./routes/queryRoute.js";

const app = express();

// access body
app.use(express.json());
// others
app.use(cookieParser());

if ((process.env.NODE_ENV = "development")) app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.get("/api/v1", (req, res) => {
  res.send({ msg: "Hi There" });
});

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", authMiddleware, tourRoute);
app.use("/api/v1/user", authMiddleware, userRoute);
app.use("/api/v1/queries", queryRoute);

// ERRORS
app.use(notFound);
app.use(errorHandlerMiddleware);

try {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
// middlewares
import { notFound } from "./errors/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
// routes
import router from "./routes/index.js";

const app = express();

// access body
app.use(express.json());
// others
app.use(cookieParser());

// deployment stuff goes in
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

if ((process.env.NODE_ENV = "development")) app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

// ROUTES
app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// ERRORS
app.use(notFound);
app.use(errorHandlerMiddleware);

try {
  await connectDB(process.env.MONGO_URI!);
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

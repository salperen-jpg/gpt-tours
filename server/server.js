import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

if ((process.env.NODE_ENV = "development")) app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.get("/api/v1", (req, res) => {
  res.send({ msg: "Hi There" });
});

// ROUTES

// ERRORS

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

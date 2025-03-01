import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errHandler } from "./middlewares/ErrHandlerMiddleware.js";
import { loggerMiddleware, logger } from "./middlewares/LoggerMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(loggerMiddleware);

mongoose.connect(
  `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@online-bookstore.ql6vl.mongodb.net/online-bookstore?retryWrites=true&w=majority&appName=online-bookstore`
);
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
  process.exit(1);
});

app.use(errHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

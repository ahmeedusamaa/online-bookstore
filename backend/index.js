import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errHandler } from "./middlewares/ErrHandlerMiddleware.js";
import { loggerMiddleware, logger } from "./middlewares/LoggerMiddleware.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(loggerMiddleware);

mongoose.connect(
  `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@online-bookstore.ql6vl.mongodb.net/online-bookstore?retryWrites=true&w=majority&appName=online-bookstore`
);

mongoose.connection.on("connected", () => {
  logger.info(`Connected to the database successfully`);
});

mongoose.connection.on("error", (err) => {
  logger.info(`MongoDB connection error: ${err}`);
  process.exit(1);
});

app.use('/covers', express.static('uploads'));

app.use(router);
app.use(errHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

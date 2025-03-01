import express from "express";
import { errHandler } from "./middlewares/ErrHandlerMiddleware.js";
import { loggerMiddleware, logger } from "./middlewares/LoggerMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use(errHandler);

app.listen(process.env.PORT, () =>
  logger.info(`Server started on port ${PORT}`)
);

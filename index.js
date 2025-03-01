import express from "express";
import { errHandler } from "./middlewares/ErrHandlerMiddleware.js";
import { loggerMiddleware, logger } from "./middlewares/LoggerMiddleware.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use(errHandler);

const PORT = 5000;
app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

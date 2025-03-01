import express from "express";
import { errHandler } from "./middlewares/ErrHandlerMiddleware.js";

const app = express();
app.use(express.json);

app.use(errHandler);

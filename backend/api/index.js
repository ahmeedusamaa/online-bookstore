import app from "../index.js";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req, res) => {
  app(req, res);
};

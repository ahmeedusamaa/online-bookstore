import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    const error = "Not authorized, token missing";
    res.status(401);
    return next(error);
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    return next(new Error("Invalid Token"));
  }
};

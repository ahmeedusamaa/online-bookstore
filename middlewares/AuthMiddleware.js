import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const error = "Not authorized, token missing";
    res.status(401);
    return next(error);
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

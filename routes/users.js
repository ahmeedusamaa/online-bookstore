import express from "express";
import {
  regUsr,
  LoginUsr,
  LogOut,
  updateUsr,
  getUsrsPag,
  getUserById,
  getUserReviews,
  getUserOrders,
} from "../controllers/UserController.js";
import userAuth from "../middlewares/AuthMiddleware.js";

const usersRouter = express.Router();
usersRouter.post("/register", regUsr);
usersRouter.post("/login", LoginUsr);
usersRouter.post("/logout", userAuth, LogOut);
usersRouter.patch("/:id", userAuth, updateUsr);
usersRouter.get("/", userAuth, getUsrsPag);
//http://localhost:3000/users?page=1&limit=10
usersRouter.get("/:id", userAuth, getUserById);
usersRouter.get("/:id/reviews", userAuth, getUserReviews);
// http://localhost:3000/users/67c330dae1eb9cc7c971e2ff/reviews
usersRouter.get("/:id/orders", userAuth, getUserOrders);
//http://localhost:3000/users/67c330dae1eb9cc7c971e2ff/orders

export default usersRouter;

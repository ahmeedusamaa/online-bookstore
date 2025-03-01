import express from "express";
import { regUsr, LoginUsr, LogOut } from "../controllers/UserController.js";
import userAuth from "../middlewares/AuthMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/register", regUsr);

usersRouter.post("/login", LoginUsr);

usersRouter.post("/logout", userAuth, LogOut);

usersRouter.patch("/:id", (req, res) => {});

usersRouter.get("/", (req, res) => {});

usersRouter.get("/:id", (req, res) => {});

usersRouter.get("/:id/reviews", (req, res) => {});

usersRouter.get("/:id/orders", (req, res) => {});

export default usersRouter;

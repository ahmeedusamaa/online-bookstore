import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { logger } from "../middlewares/LoggerMiddleware.js";
import { generateToken } from "../utils/tokenUtil.js";

export const regUsr = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role } = req.body;

    const exists = await User.findOne({ Email });

    if (exists) {
      logger.warn(`Registration failed - Email already in use: ${Email}`);
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    const newUser = new User({ Name, Email, Password, Role });
    await newUser.save();

    const token = generateToken({ id: newUser._id, role: newUser.Role });
    logger.info(`User registered successfully: ${Email}`);
    res.status(201).json({
      status: "success",
      data: { user: { id: newUser._id, Name, Email, Role }, token },
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    next(error);
  }
};

export const LoginUsr = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    const usr = await User.findOne({ Email });
    if (!usr) {
      logger.warn(`Login failed - User not found: ${Email}`);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      logger.warn(`Login failed - Incorrect password for: ${Email}`);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: user.Role });

    logger.info(`User logged in successfully: ${Email}`);
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role,
        },
        token,
      },
    });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    next(error);
  }
};

export const LogOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error(`Error logging out: ${err.message}`);
        return next(err);
      }

      res.clearCookie("connect.sid");
      logger.info(`User logged out: ${req.user.id}`);
      res
        .status(200)
        .json({ status: "success", message: "Logged out successfully" });
    });
  } catch (error) {
    logger.error(`Error logging out: ${error.message}`);
    next(error);
  }
};

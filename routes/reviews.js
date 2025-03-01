import express from "express";
import { createReview, getReviewById, updateReview, deleteReview } from "../controllers/ReviewsController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/", authMiddleware, createReview); 
router.get("/:id", getReviewById); 
router.put("/:id", authMiddleware, updateReview); 
router.delete("/:id", authMiddleware, deleteReview); 

export default router;

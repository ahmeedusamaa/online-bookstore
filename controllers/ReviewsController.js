import Review from "../models/ReviewModel.js";
import Book from "../models/BookModel.js";

export const createReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const userId = req.user.id; 

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ status: "fail", message: "Book not found" });

        const review = new Review({ User_ID: userId, Book_ID: bookId, Rating: rating, Comment: comment });
        await review.save();

        book.ReviewID.push(review._id);
        await book.save();

        res.status(201).json({ status: "success", data: review });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("User_ID", "Name");
        if (!review) return res.status(404).json({ status: "fail", message: "Review not found" });
        res.status(200).json({ status: "success", data: review });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) return res.status(404).json({ status: "fail", message: "Review not found" });
        if (review.User_ID.toString() !== req.user.id) return res.status(403).json({ status: "fail", message: "Unauthorized" });

        review.Rating = rating || review.Rating;
        review.Comment = comment || review.Comment;
        await review.save();

        res.status(200).json({ status: "success", data: review });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ status: "fail", message: "Review not found" });
        if (review.User_ID.toString() !== req.user.id) return res.status(403).json({ status: "fail", message: "Unauthorized" });

        await review.deleteOne();
        res.status(200).json({ status: "success", message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
import Order from "../models/OrderModel.js";
import Book from "../models/BookModel.js";
import mongoose from "mongoose";

const create = async (orderData, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { books, totalPrice } = orderData;

        if (!books || books.length === 0 || totalPrice < 0) {
            throw new Error("Invalid order data");
        }

        const validBooks = await Book.find({ _id: { $in: books } }).session(session);
        if (validBooks.length !== books.length) {
            throw new Error("One or more books not found");
        }

        for (const book of validBooks) {
            if (book.Stock <= 0) {
                throw new Error(`Book ${book.Title} is out of stock`);
            }
            book.Stock -= 1;
            await book.save({ session });
        }

        const order = await Order.create([{ User_ID: userId, Books: books, TotalPrice: totalPrice }], { session });

        await session.commitTransaction();
        session.endSession();

        return order[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getMany = (skip, limit) => {
    return Order.find().populate("User_ID", "Name Email").populate("Books").skip(skip).limit(limit);
};

const getById = (orderId) => {
    return Order.findById(orderId).populate("User_ID", "Name Email").populate("Books");
};

const remove = (orderId) => {
    return Order.findByIdAndDelete(orderId);
};

export default { create, getMany, getById, remove };

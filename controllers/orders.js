import Order from "../models/OrderModel.js";
import Book from "../models/BookModel.js";

const create = async (orderData, userId) => {
    const { books, totalPrice } = orderData;

    if (!books || books.length === 0 || totalPrice < 0) {
        throw new Error("Invalid order data");
    }

    const validBooks = await Book.find({ _id: { $in: books } });
    if (validBooks.length !== books.length) {
        throw new Error("Book or more not found");
    }

    return Order.create({ User_ID: userId, Books: books, TotalPrice: totalPrice });
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

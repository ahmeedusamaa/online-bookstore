import Book from '../models/BookModel.js';

const create = (bookData) => {
    return Book.insertOne(bookData);
}

const getMany = (skip, limit) => {
    return Book.find().skip(skip).limit(limit);
}

const getById = (bookId) => {
    return Book.findById(bookId);
}

const getReviews = () => {
    // Import reviews controller, then call a function to retrieve the reviews by Book ID
}

const update = (bookId, newData) => {
    return Book.findByIdAndUpdate(bookId, newData);
}

const remove = (bookId) => {
    return Book.findByIdAndDelete(bookId);
}

export default { create, getMany, getById, getReviews, update, remove };
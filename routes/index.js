import express from 'express';
import usersRouter from './users.js';
import booksRouter from './books.js';
import cartRouter from './cart.js';
import ordersRouter from './orders.js';
import reviewsRouter from './reviews.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/books', booksRouter);
router.use('/cart', cartRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);

export default router;
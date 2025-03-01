import express from 'express';
import booksController from '../controllers/books.js';
import userAuth from '../middlewares/AuthMiddleware.js';

const booksRouter = express.Router();

booksRouter.post('/', async (req, res, next) => {
    await booksController.create(...req.body)
        .then(data => res.status(200).send({ status: "success", data: data }))
        .catch(error => next(error));
});

booksRouter.get('/', async (req, res, next) => {
    const limit = req.query.limit || 4;
    const skip = ((req.query.page || 1) - 1) * limit;
    await booksController.getMany(skip, limit)
        .then(data => res.status(200).send({ status: "success", data: data }))
        .catch(error => next(error));
});

booksRouter.get('/:id', async (req, res, next) => {
    await booksController.getById(req.params.id)
        .then(data => res.status(200).send({ status: "success", data: data }))
        .catch(error => next(error));
});

booksRouter.get('/:id/reviews', async (req, res, next) => {
    await booksController.getReviews(req.params.id)
        .then(data => res.status(200).send({ status: "success", data: data }))
        .catch(error => next(error));
});

booksRouter.patch('/:id', async (req, res, next) => {
    await booksController.update(req.params.id, ...req.body)
        .then(data => res.status(200).send({ status: "success", data: req.body }))
        .catch(error => next(error));
});

booksRouter.delete('/:id', async (req, res, next) => {
    await booksController.remove(req.params.id)
        .then(data => res.status(200).send({ status: "success", data: data }))
        .catch(error => next(error));
});

export default booksRouter;
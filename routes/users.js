import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/register', (req, res) => {

});

usersRouter.post('/login', (req, res) => {

});

usersRouter.post('/logout', (req, res) => {

});

usersRouter.patch('/:id', (req, res) => {

});

usersRouter.get('/', (req, res) => {

});

usersRouter.get('/:id', (req, res) => {

});

usersRouter.get('/:id/reviews', (req, res) => {

});

usersRouter.get('/:id/orders', (req, res) => {

});

export default usersRouter;
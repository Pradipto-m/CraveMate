import express from 'express';
import auth from '../Middlewares/auth';
import cartController from '../Controllers/cartController';

const cartRouter = express.Router();

cartRouter.get('/api/v1/cart/:id', auth, cartController.fetchUserCart);

cartRouter.post('/api/v1/cart/add', auth, cartController.addToCart);

cartRouter.delete('/api/v1/cart/remove', auth, cartController.removeItem);

export default cartRouter;
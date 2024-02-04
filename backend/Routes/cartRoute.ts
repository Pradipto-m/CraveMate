import express from 'express';
import auth from '../Middlewares/auth';
import cartController from '../Controllers/cartController';

const cartRouter = express.Router();

cartRouter.get('/api/cart/:id', auth, cartController.fetchUserCart);

cartRouter.post('/api/cart/add', auth, cartController.addToCart);

cartRouter.delete('/api/cart/remove', auth, cartController.removeItem);

export default cartRouter;
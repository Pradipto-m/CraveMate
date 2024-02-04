import express from 'express';
import auth from '../Middlewares/auth';
import orderController from '../Controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/api/cart/order', auth, orderController.placeOrder);

export default orderRouter;
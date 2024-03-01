import express from 'express';
import auth from '../Middlewares/auth';
import orderController from '../Controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/api/cart/order', auth, orderController.placeOrder);

orderRouter.get('/api/orders/user/:id', auth, orderController.getOrders);

orderRouter.post('/api/order/pay', orderController.paymentController);

export default orderRouter;
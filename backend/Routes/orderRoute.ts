import express from 'express';
import auth from '../Middlewares/auth';
import orderController from '../Controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/api/v1/cart/order', auth, orderController.placeOrder);

orderRouter.get('/api/v1/orders/user/:id', auth, orderController.getOrders);

orderRouter.post('/api/v1/order/pay', orderController.paymentController);

export default orderRouter;
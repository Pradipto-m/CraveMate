import express from 'express';
import productController from '../Controllers/productController';
import auth from '../Middlewares/auth';

const productRouter = express.Router();

productRouter.post('/api/v1/product/create', productController.addProduct);

productRouter.get('/api/v1/product/all', auth, productController.getProducts);

productRouter.get('/api/v1/product/category', auth, productController.categoryProducts);

productRouter.get('/api/v1/product/search/:name', auth, productController.searchProducts);

productRouter.get('/api/v1/product/:id', auth, productController.fetchById);

export default productRouter;

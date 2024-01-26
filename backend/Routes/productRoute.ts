import express from 'express';
import productController from '../Controllers/productController';
import auth from '../Middlewares/auth';

const productRouter = express.Router();

productRouter.post('/api/product/create', auth, productController.addProduct);

productRouter.get('/api/product/all', auth, productController.getProducts);

productRouter.get('/api/product/category', auth, productController.categoryProducts);

productRouter.get('/api/product/search/:name', auth, productController.searchProducts);

export default productRouter;
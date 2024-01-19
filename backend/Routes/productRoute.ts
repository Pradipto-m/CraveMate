import express from 'express';
import productController from '../Controllers/productController';
// import auth from '../Middlewares/auth';

const productRouter = express.Router();

productRouter.post('/api/product/create', productController.addProduct);

productRouter.get('/api/product/all', productController.getProducts);

productRouter.get('/api/product/category', productController.categoryProducts);

productRouter.get('/api/product/search/:name', productController.searchProducts);

export default productRouter;
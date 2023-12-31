const express = require("express");
const { addProduct, getProducts, categoryProducts } = require("../controllers/productController");
const auth = require("../middleware/auth");

const productRouter = express.Router();

productRouter.post("/api/product/create", addProduct);

productRouter.get("/api/product/all", auth, getProducts);

productRouter.get("/api/product/category", auth, categoryProducts);

module.exports = productRouter;
import { Request, Response } from 'express';
import Product from '../Models/productModel';

const addProduct = async (req: Request, res: Response) => {
  try {
    const {name, restaurant, desc, price, genre, img, rating} = req.body;

    const product = new Product({
      name,
      restaurant,
      desc,
      price,
      genre,
      img,
      rating,
    });

    await product.save().then(() => {
      res.status(201).json(product);
    }).catch((err) => {
      res.status(500).json({ error: err });
    });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const categoryProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ genre: req.query.genre });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: 'i' }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const fetchById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default {addProduct, getProducts, categoryProducts, searchProducts, fetchById};

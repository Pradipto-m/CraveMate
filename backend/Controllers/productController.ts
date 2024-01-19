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
    }).catch((e) => {
      res.status(500).json({ err: e });
    });

  } catch (e) {
    res.status(500).json({ err: e });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ err: e });
  }
};

const categoryProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ genre: req.query.genre });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ err: e });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: 'i' }
    });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ err: e });
  }
};

export default {addProduct, getProducts, categoryProducts, searchProducts};

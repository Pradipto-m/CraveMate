const express = require("express");
const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, restaurant, desc, price, genre, img, rating } = req.body;

    let product = new Product({
      name,
      restaurant,
      desc,
      price,
      genre,
      img,
      rating,
    });

    product = await product.save().then(() => {
      res.status(201).json(product);
    }).catch((e) => {
      res.status(500).json({ err: e.message });
    });

  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

const categoryProducts = async (req, res) => {
  const products = await Product.find({ genre: req.query.genre });
  res.status(200).json(products);
};

module.exports = { addProduct, getProducts, categoryProducts };
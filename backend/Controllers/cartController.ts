import {Request, Response} from 'express';
import UserCart from '../Models/cartModel';
import Product from '../Models/productModel';

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({
        error: 'Please provide a proper userId, productId and amount'
      });
    }
    
    // Check if the user's cart exists
    let cart = await UserCart.findOne({userId});
    const price = await Product.findById(productId)
      .then((product) => { return product?.price });
    if (cart) {
      let itemExists = false;
      // Find if the product already exists in the cart
      for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId === productId) {
          itemExists = true;
          cart.products[i].quantity += 1;
        }
      }
      if (!itemExists) {
        // If the product is not present, add it to cart
        cart.products.push({ productId, quantity: 1 });
      }
      cart.amount += price!; // update the cart amount
    // If the user's cart does not exist, create a new cart
    } else {
      cart = new UserCart({
        userId,
        products: { productId, quantity: 1 },
        amount: price,
      });
    }
    // Save the cart to the database
    await cart.save().then((cart) => {
      res.status(201).json(cart);
    }).catch((err) => {
      res.status(500).json({error: err});
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
};

const removeItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({error: 'Please provide proper userId and productId'});
    }
    
    const cart = await UserCart.findOne({userId});
    if (!cart) {
      return res.status(404).json({error: 'Cart not found'});
    }
    const price = await Product.findById(productId)
      .then((product) => { return product?.price });

    // now find the product and remove it
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].productId === productId) {
        if (cart.products[i].quantity > 1) {
          cart.products[i].quantity -= 1;
        } else {
          cart.products.splice(i, 1);
        }
        cart.amount -= price!;
      }
    }

    await cart.save().then((cart) => {
      // If the cart is empty, delete the cart
      if (cart.products.length === 0) {
        UserCart.findOneAndDelete({userId}).then(() => {
          res.status(200).json({message: 'Cart cleared'});
        }).catch((err) => {
          res.status(500).json({error: err});
        });
      // else return the updated cart
      } else {
        res.status(200).json(cart);
      }
    }).catch((err) => {
      res.status(500).json({error: err});
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
};

const fetchUserCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({error: 'Please provide a valid userId'});
    }
    const cart = await UserCart.findOne({userId: id});
    if (!cart) {
      return res.status(404).json({error: 'Cart doesn\'t exist'});
    }
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
};

export default { addToCart, removeItem, fetchUserCart };

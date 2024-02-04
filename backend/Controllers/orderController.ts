import {Request, Response} from "express";
import OrderItem from "../Models/orderModel";
import UserCart from '../Models/cartModel';

const placeOrder = async (req: Request, res: Response) => {
  try {
    const {userId, amount, address, phone} = req.body;
    if (!userId || !amount || !address || !phone) {
      return res.status(400).json({error: "Order details are required!"});
    }

    // fetching products from the user's cart
    const cart = await UserCart.findOne({userId});
    if (!cart) {
      return res.status(404).json({error: "Cart not found"});
    }
    const products = cart?.products;

    const order = new OrderItem({
      userId,
      products,
      amount,
      address,
      phone,
    });

    // place the order and save it to the database
    await order.save().then((order) => {
      res.status(201).json(order);
      // since the order is placed, we can clear the cart
      UserCart.findOneAndDelete({userId}).then(() => {
        console.log("Cart cleared");
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: err});
    });

  } catch (err) {
    res.status(500).json({error: err});
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const {userId} = req.body;
    if (!userId) {
      return res.status(400).json({error: "userId is required!"});
    }

    const orders = await OrderItem.find({ userId });
    if (!orders) {
      return res.status(404).json({error: "No orders found"});
    }
    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({error: err});
  }
};

export default { placeOrder, getOrders };

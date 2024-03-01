import {Request, Response} from "express";
import Stripe from 'stripe';
import OrderItem from "../Models/orderModel";
import UserCart from '../Models/cartModel';

const stripe = new Stripe(process.env.STRIPE_KEY!);

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({error: "userId is required!"});
    }

    const orders = await OrderItem.find({ userId: userId });
    if (!orders) {
      return res.status(404).json({error: "No orders found"});
    }
    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({error: err});
  }
};

const placeOrder = async (req: Request, res: Response) => {
  try {
    const {userId, address, phone} = req.body;
    if (!userId || !address || !phone) {
      return res.status(400).json({error: "Order details are required!"});
    }

    // fetching products from the user's cart
    const cart = await UserCart.findOne({userId});
    if (!cart) {
      return res.status(404).json({error: "Cart not found"});
    }
    const products = cart?.products;
    const amount = cart?.amount + Math.ceil(cart?.amount * 0.05) + 10;

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
      UserCart.findOneAndDelete({userId})
      .catch((err) => {
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

const paymentController = async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    }, {
      apiKey: process.env.STRIPE_KEY,
    });
    res.json({ paymentIntent: paymentIntent.client_secret });

  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export default { getOrders, placeOrder, paymentController };

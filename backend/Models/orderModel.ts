import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  products: [{
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  }],
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

const OrderItem = mongoose.model("OrderItem", orderSchema);
export default OrderItem;

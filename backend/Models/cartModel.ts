import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [{
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  }],
  amount: { type: Number, required: true },
});

const UserCart = mongoose.model("UserCart", cartSchema);
export default UserCart;

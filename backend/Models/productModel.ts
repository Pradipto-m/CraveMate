import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    restaurant: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
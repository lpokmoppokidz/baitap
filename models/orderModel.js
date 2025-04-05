import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        image: String,
        quantity: Number,
        price: Number
    }],
    shippingAddress: {
        email: String,
        firstName: String,
        lastName: String,
        company: String,
        address: String,
        apartment: String,
        city: String,
        country: String,
        postalCode: String,
        phone: String
    },
    subtotal: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Order", orderSchema); 
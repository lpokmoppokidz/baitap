import Order from "../models/orderModel.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        
        // Create new order
        const order = new Order({
            personalInfo: orderData.personalInfo,
            shippingAddress: orderData.shippingAddress,
            orderItems: orderData.orderItems,
            total: orderData.total
        });

        await order.save();

        res.status(201).json({
            message: "Order created successfully",
            orderId: order._id
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching order",
            error: error.message
        });
    }
}; 
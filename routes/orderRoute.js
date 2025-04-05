import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create new order
router.post("/create", createOrder);

// Get all orders (protected route)
router.get("/", verifyToken, getOrders);

// Get specific order
router.get("/:id", verifyToken, getOrderById);

export default router; 
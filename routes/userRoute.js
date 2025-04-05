import express from "express";
import { create, login, getAllUsers, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/create", create);
router.post("/login", login);

// Protected routes (require authentication)
router.get("/getallusers", verifyToken, verifyAdmin, getAllUsers);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;

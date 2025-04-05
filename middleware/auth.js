import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}; 
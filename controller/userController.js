import path from "path";
import { fileURLToPath } from "url";
import User from "../model/userModel.js";

// For posting data into the database
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const get = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "../views/huhu.html"));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not Found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password." });
    }
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

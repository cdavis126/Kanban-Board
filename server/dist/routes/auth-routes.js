import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const router = Router();
const secretKey = process.env.JWT_SECRET_KEY;
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login Request:", username, password); // 🔥 Debugging: Check if request body is correct
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log("❌ User not found:", username); // 🔥 Debugging
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Validate password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("❌ Incorrect password for user:", username); // 🔥 Debugging
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Generate JWT token for the user
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '2h' });
        console.log("✅ Login successful for user:", username); //  Debugging
        // Send token to the client
        return res.json({ token });
    }
    catch (error) {
        console.error('🔥 Login Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// POST /auth/login - Login a user
router.post('/login', login);
export default router;

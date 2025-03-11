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
        // check status of user and if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // alidate the password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        //Generate a JWT token for user
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '2h' });
        // Send token to the cuser
        return res.json({ token });
    }
    catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// POST /login - Login a user
router.post('/login', login);
export default router;

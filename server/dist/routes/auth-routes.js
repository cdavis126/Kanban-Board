"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const secretKey = process.env.JWT_SECRET_KEY;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login Request:", username, password); // 🔥 Debugging: Check if request body is correct
        // Check if the user exists
        const user = await user_js_1.User.findOne({ where: { username } });
        if (!user) {
            console.log("❌ User not found:", username); // 🔥 Debugging
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Validate password using bcrypt
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            console.log("❌ Incorrect password for user:", username); // 🔥 Debugging
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Generate JWT token for the user
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '2h' });
        console.log("✅ Login successful for user:", username); //  Debugging
        // Send token to the client
        return res.json({ token });
    }
    catch (error) {
        console.error('🔥 Login Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
// POST /auth/login - Login a user
router.post('/login', exports.login);
exports.default = router;

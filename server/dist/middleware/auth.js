"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded; // Attach user info to jwt info
        return next(); // do I need this?
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid Token' });
    }
};
exports.authenticateToken = authenticateToken;

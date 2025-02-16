import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  username: string;
}

const secretKey = process.env.JWT_SECRET_KEY as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    (req as any).user = decoded; // Attach user info to jwt info
    return next(); // do I need this?
  } catch (err) {
    return res.status(403).json({ error: 'Invalid Token' });
  }
};



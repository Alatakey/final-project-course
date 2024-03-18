import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts";
import { Request, Response, NextFunction } from "express";
import { SignData } from "../interfaces";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      signedData?: SignData; // Add user property to Request interface
    }
  }
}

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SignData;
    req.signedData = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
}

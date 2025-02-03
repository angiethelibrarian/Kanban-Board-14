import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization; // Bearer TOKEN
    

  if (authHeader) {   
    const token = authHeader.split(' ')[1]; // TOKEN

    const secretKey = process.env.JWT_SECRET_KEY || ''; // SECRET_KEY

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;  
      return next();
    }); 
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

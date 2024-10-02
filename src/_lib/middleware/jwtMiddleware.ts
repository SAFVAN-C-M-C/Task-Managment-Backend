import { IUser } from "@/domain/entities";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token =
    req.cookies.access_token;
  console.log(token);
  
    if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

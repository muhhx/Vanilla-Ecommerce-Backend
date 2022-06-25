import { Request, Response, NextFunction } from "express";

function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  next();
}

export default verifyAccessToken;

import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

async function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.sendStatus(401);
  }

  const accessTokenKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY as string;
  const decoded = await verifyJWT(accessToken, accessTokenKey);

  if (!decoded) {
    return res.sendStatus(403);
  }

  // @ts-ignore
  req.user = { userId: decoded.userId, role: decoded.role };
  return next();
}

export default verifyAccessToken;

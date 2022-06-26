import { Request, Response, NextFunction } from "express";
import config from "config";
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

  const accessTokenKey = config.get<string>("jwtAccessTokenPrivateKey");
  const decoded = await verifyJWT(accessToken, accessTokenKey);

  if (!decoded) {
    return res.sendStatus(403);
  }

  // @ts-ignore
  req.user = { userId: decoded.userId, role: decoded.role };
  return next();
}

export default verifyAccessToken;

import jwt from "jsonwebtoken";

export const createJWT = (
  payload: object,
  key: string,
  expiresIn: string | number
) => {
  return jwt.sign(payload, key, { expiresIn });
};

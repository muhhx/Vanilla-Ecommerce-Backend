import jwt from "jsonwebtoken";

export const createJWT = (
  payload: object,
  key: string,
  expiresIn: string | number
) => {
  return jwt.sign(payload, key, { expiresIn });
};

export const verifyJWT = async (token: string, key: string) => {
  try {
    const decoded = await jwt.verify(token, key);

    return decoded;
  } catch (error) {
    return null;
  }
};

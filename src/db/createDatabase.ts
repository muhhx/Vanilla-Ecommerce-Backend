import UserModel from "../models/user.model";
import SessionModel from "../models/session.model";

export const createUser = async (payload: {
  name: string;
  email: string;
  hashedPassword: string;
}) => {
  const createdUser = await UserModel.create({
    name: payload.name,
    email: payload.email,
    password: payload.hashedPassword,
  });

  return createdUser;
};

export const createSession = async (userId: string, refreshToken: string) => {    
    const createdSession = await SessionModel.create({
        userId,
        refreshToken,
    });
    
    return createdSession;
};


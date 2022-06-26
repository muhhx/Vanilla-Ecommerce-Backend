import UserModel from "../models/user.model";
import SessionModel from "../models/session.model";

export const findSession = async (userId: string) => {
  const session = SessionModel.findOne({ userId });

  return session;
};

export const findUserByEmail = async (email: string) => {
  const user = UserModel.findOne({ email }).select("+password");

  return user;
};

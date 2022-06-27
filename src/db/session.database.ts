import SessionModel from "../models/session.model";

export const createSession = async (userId: string, refreshToken: string) => {
  const createdSession = await SessionModel.create({
    userId,
    refreshToken,
  });

  return createdSession;
};

export const findSession = async (userId: string) => {
  const session = SessionModel.findOne({ userId });

  return session;
};

export const findSessionByToken = async (refreshToken: string) => {
  return SessionModel.findOne({ refreshToken });
};

export const deleteSession = (userId: string) => {
  return SessionModel.findOneAndDelete({ userId });
};

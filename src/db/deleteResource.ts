import SessionModel from "../models/session.model";

export const deleteSession = (userId: string) => {
  return SessionModel.findOneAndDelete({ userId });
};

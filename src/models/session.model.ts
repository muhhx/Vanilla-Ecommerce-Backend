import mongoose from "mongoose";
import { ISession } from "../interfaces/session.interface";

const sessionSchema = new mongoose.Schema<ISession>(
  {
    userId: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "sessions",
  }
);

const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;

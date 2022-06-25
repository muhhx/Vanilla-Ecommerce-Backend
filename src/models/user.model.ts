import mongoose from "mongoose";
import IUser from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

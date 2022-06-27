import UserModel from "../models/user.model";

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

export const findUser = (id: string) => {
  return UserModel.findById({ _id: id });
};

export const findUserByEmail = async (email: string) => {
  const user = UserModel.findOne({ email }).select("+password");

  return user;
};

export const deleteUser = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};

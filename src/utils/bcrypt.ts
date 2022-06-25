import bcrypt from "bcrypt";
import config from "config";

export const encryptPassword = async (password: string) => {
  try {
    const salt = config.get<string>("bcryptSalt");
    const newPassword = await bcrypt.hash(password, salt);

    return newPassword;
  } catch (error) {
    return null;
  }
};

export const comparePassword = async (
  userPassword: string,
  inputPassword: string
) => {
  const isCorrect = bcrypt.compare(inputPassword, userPassword);

  return isCorrect;
};

const bcrypt = require("bcrypt");

export const encryptPassword = async (password: string) => {
  try {
    const newPassword = await bcrypt.hash(password, 10);

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

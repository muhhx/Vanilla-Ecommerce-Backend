import { Request, Response } from "express";
import config from "config";
import { createUser } from "../db/createDatabase";
import { encryptPassword } from "../utils/bcrypt";

async function handleCreateUser(req: Request, res: Response) {
  const { name, email, password, passwordConfirmation } = req.body;

  try {
    if (!password || !name || !email) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const emailRejex = config.get<RegExp>("emailRejex");
    if (!emailRejex.test(email)) {
      return res.status(400).json({ message: "Informe um email válido." });
    }

    const passwordRejex = config.get<RegExp>("passwordRejex");
    if (!passwordRejex.test(password)) {
      return res.status(400).json({ message: "Informe uma senha válida." });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "As senhas devem ser iguais." });
    }

    const hashedPassword = await encryptPassword(String(password));

    if (!hashedPassword) {
      return res
        .status(400)
        .json({ message: "Algo deu errado ao criar sua conta." });
    }

    const createdUser = await createUser({ name, email, hashedPassword });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function handleDeleteUser(req: Request, res: Response) {
  res.send("user/DeleteUser");
}

async function handleUpdateUser(req: Request, res: Response) {
  res.send("user/UpdateUser");
}

async function handleGetUser(req: Request, res: Response) {
  res.send("user/GetUser");
}

const userController = {
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUser,
};

export default userController;

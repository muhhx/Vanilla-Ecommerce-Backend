import { Request, Response } from "express";
import config from "config";
import { createUser, findUser, deleteUser } from "../db/user.database";
import { encryptPassword } from "../utils/bcrypt";

export async function handleCreateUser(req: Request, res: Response) {
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

export async function handleDeleteUser(req: Request, res: Response) {
  // @ts-ignore
  const jwtUser = req.user;
  const { id } = req.params;

  try {
    const user = await findUser(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (jwtUser.userId !== String(user._id)) {
      return res.sendStatus(401);
    }

    await deleteUser(id);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleGetUser(req: Request, res: Response) {
  // @ts-ignore
  const jwtUser = req.user;
  const { id } = req.params;

  try {
    const user = await findUser(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (jwtUser.userId !== String(user._id)) {
      return res.sendStatus(401);
    }

    return res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.sendStatus(500);
  }
}

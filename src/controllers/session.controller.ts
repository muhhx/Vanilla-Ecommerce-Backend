import { Request, Response } from "express";
import config from "config";
import { findSession, findUserByEmail } from "../db/findResource";
import { deleteSession } from "../db/deleteResource";
import { comparePassword } from "../utils/bcrypt";
import { createSession } from "../db/createDatabase";
import { createJWT } from "../utils/jwt";

export async function handleCreateSession(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email ou senha inválidos. " });
    }

    const isCorrect = await comparePassword(user.password, password);

    if (!isCorrect) {
      return res.status(404).json({ message: "Email ou senha inválidos. " });
    }

    const session = await findSession(String(user._id));

    if (session) {
      return res.status(401).json({ message: "Usuário já está logado. " });
    }

    const accessPrivateKey = config.get<string>("jwtAccessTokenPrivateKey");
    const accessToken = createJWT(
      { userId: user._id, role: user.role },
      accessPrivateKey,
      "600s"
    );

    const refreshPrivateKey = config.get<string>("jwtRefreshTokenPrivateKey");
    const refreshToken = createJWT(
      { userId: user._id, role: user.role },
      refreshPrivateKey,
      "1d"
    );

    await createSession(String(user._id), refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({ userId: user._id, role: user.role });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
}

export async function handleDeleteSession(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const session = await findSession(id);

    if (!session) {
      return res.sendStatus(404);
    }

    await deleteSession(id);

    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function handleRefreshSession(req: Request, res: Response) {
  res.send("Session/RefreshToken");
}

export async function handleVerifySession(req: Request, res: Response) {
  //@ts-ignore
  const user = req.user;

  res.status(200).json(user);
}

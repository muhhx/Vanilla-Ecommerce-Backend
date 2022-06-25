import { Request, Response } from "express";
import config from "config";
import { findSession, findUserByEmail } from "../db/findResource";
import { comparePassword } from "../utils/bcrypt";
import { createSession } from "../db/createDatabase";
import { createJWT } from "../utils/jwt";

async function handleCreateSession(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const session = await findSession(email);

    if (session) {
      return res.status(401).json({ message: "Usuário já está logado. " });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email ou senha inválidos. " });
    }

    const isCorrect = await comparePassword(user.password, password);

    if (!isCorrect) {
      return res.status(404).json({ message: "Email ou senha inválidos. " });
    }

    const accessPrivateKey = config.get<string>("jwtAccessTokenPrivateKey");
    const accessToken = createJWT(
      { userId: user._id },
      accessPrivateKey,
      "600s"
    );

    const refreshPrivateKey = config.get<string>("jwtRefreshTokenPrivateKey");
    const refreshToken = createJWT(
      { userId: user._id },
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

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ data: error });
  }
}

async function handleDeleteSession(req: Request, res: Response) {
  res.send("Session/Logout");
}

async function handleRefreshSession(req: Request, res: Response) {
  res.send("Session/RefreshToken");
}

async function handleVerifySession(req: Request, res: Response) {
  res.send("Session/Verify");
}

const sessionController = {
  handleCreateSession,
  handleDeleteSession,
  handleRefreshSession,
  handleVerifySession,
};

export default sessionController;

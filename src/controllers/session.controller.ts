import { Request, Response } from "express";
import {
  findSession,
  findSessionByToken,
  createSession,
  deleteSession,
} from "../db/session.database";
import { findUser, findUserByEmail } from "../db/user.database";
import { comparePassword } from "../utils/bcrypt";
import { createJWT, verifyJWT } from "../utils/jwt";

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

    const accessPrivateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY as string;
    const accessToken = createJWT(
      { userId: user._id, role: user.role },
      accessPrivateKey,
      "600s"
    );

    const refreshPrivateKey = process.env
      .JWT_REFRESH_TOKEN_PRIVATE_KEY as string;
    const refreshToken = createJWT(
      { userId: user._id, role: user.role },
      refreshPrivateKey,
      "1d"
    );

    await createSession(String(user._id), refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
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
      sameSite: "none",
      secure: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function handleRefreshSession(req: Request, res: Response) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.sendStatus(400);
  }

  try {
    const session = await findSessionByToken(refreshToken);

    if (!session) {
      return res.sendStatus(404);
    }

    const refreshTokenKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY as string;
    const decoded = await verifyJWT(refreshToken, refreshTokenKey);

    if (!decoded) {
      return res.sendStatus(401);
    }

    // @ts-ignore
    const user = await findUser(decoded.userId);

    if (!user) {
      return res.sendStatus(500);
    }

    const accessTokenKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY as string;
    const accessToken = createJWT(
      { userId: user._id, role: user.role },
      accessTokenKey,
      "600s"
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  } catch (error) {}
  res.send("Session/RefreshToken");
}

export async function handleVerifySession(req: Request, res: Response) {
  //@ts-ignore
  const user = req.user;

  res.status(200).json(user);
}

import { Request, Response } from "express";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
} from "../db/favorite.database";

export async function handleCreateFavorite(req: Request, res: Response) {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const favorite = await createFavorite(id, productId);

    return res
      .status(201)
      .json({ _id: favorite._id, productId: favorite.productId });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleDeleteFavorite(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteFavorite(id);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleGetFavorites(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const favorites = await getFavorites(id);

    return res.status(200).json(favorites);
  } catch (error) {
    return res.sendStatus(500);
  }
}

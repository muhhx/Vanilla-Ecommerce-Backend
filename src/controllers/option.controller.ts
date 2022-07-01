import { Request, Response } from "express";
import { createOption } from "../db/option.database";

export async function handleCreateOption(req: Request, res: Response) {
  const { productId, color, name, sizes, images } = req.body;

  try {
    if (!productId || !color || !name || !sizes || !images) {
      return res.sendStatus(400);
    }

    const createdOption = await createOption(
      productId,
      color,
      name,
      sizes,
      images
    );

    return res.json(createdOption);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleDeleteOption(req: Request, res: Response) {
  const { id } = req.params;

  //Delete option + AWS images

  return res.send("Delete Option");
}

export async function handleUpdateOption(req: Request, res: Response) {
  const { id } = req.params;

  return res.send("Update Option");
}

export async function handleGetOption(req: Request, res: Response) {
  const { productId } = req.params;

  return res.send("Delete Option");
}

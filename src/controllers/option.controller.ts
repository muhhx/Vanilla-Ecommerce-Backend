import { Request, Response } from "express";

export async function handleCreateOption(req: Request, res: Response) {
  const files = req.files;
  const { productId, rgb, name, sizes } = req.body;

  return res.send("Create Option");
}

export async function handleDeleteOption(req: Request, res: Response) {
  const { id } = req.params;

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

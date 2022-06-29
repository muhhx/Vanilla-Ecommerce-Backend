import { Request, Response } from "express";

export async function handleUploadImages(req: Request, res: Response) {
  const images = req.files;

  console.log(images);

  res.send();
}

export async function handleDeleteImages(req: Request, res: Response) {}

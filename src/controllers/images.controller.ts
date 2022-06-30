import { Request, Response } from "express";
import { uploadImagesAws, deleteImageAws } from "../services/aws";

export async function handleUploadImages(req: Request, res: Response) {
  const images = req.files as Express.Multer.File[];

  try {
    if (!images) {
      return res.sendStatus(400);
    }

    const uploadedImages = await uploadImagesAws(images);

    const response = uploadedImages.map((image) => {
      return {
        url: image.Location,
        key: image.Key,
      };
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleDeleteImages(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteImageAws(id);

    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

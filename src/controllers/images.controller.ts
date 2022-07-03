import { Request, Response } from "express";
import { uploadImagesAws } from "../services/aws";

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

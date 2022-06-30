import { Request, Response, NextFunction } from "express";
import multer from "multer";

function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        message: "O tamanho limite da imagem é 1MB.",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "O arquivo deve ser uma imagem.",
      });
    }
  }

  console.log(error);
  return res.sendStatus(500);
}

export default errorHandling;

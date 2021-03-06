import { Request } from "express";
import { FileFilterCallback } from "multer";
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimetypes = ["image/jpeg", "image/pjpeg", "image/png"];

  const { mimetype } = file;

  if (allowedMimetypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3000000 },
});

const multerMiddleware = uploader.array("File");

export default multerMiddleware;

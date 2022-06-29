import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    const uniqueId = uuidv4();

    cb(null, `${uniqueId}-${originalname}`);
  },
});

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
  limits: { fileSize: 10 },
});

const multerMiddleware = uploader.array("File");

export default multerMiddleware;

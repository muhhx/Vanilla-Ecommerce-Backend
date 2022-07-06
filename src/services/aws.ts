import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const uploadImagesAws = async (files: Express.Multer.File[]) => {
  const awsBucketName = process.env.AWS_BUCKET_NAME as string;
  const uniqueId = uuidv4();
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      ContentType: file.mimetype,
      Bucket: awsBucketName,
      Key: `${uniqueId}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

export const deleteImageAws = async (fileKey: string) => {
  const awsBucketName = process.env.AWS_BUCKET_NAME as string;

  const s3 = new S3();

  const params = {
    Bucket: awsBucketName,
    Key: fileKey,
  };

  return s3.deleteObject(params).promise();
};

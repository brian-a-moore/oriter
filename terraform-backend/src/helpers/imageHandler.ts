import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { File } from 'formidable';
import { ENV_TYPE } from '../constants';

const s3 = new S3Client({ region: process.env.AWS_REGION });

const dirPath = path.join(__dirname, '../images');

export default async (files: File[], lovedOneId: string) => {
  if (process.env.APP_ENV === ENV_TYPE.LOCAL) {
    await fs.promises.mkdir(dirPath, { recursive: true });
    files.forEach(async (file) => {
      const oldPath = file.filepath;
      const newPath = path.join(dirPath, `${lovedOneId}/${file.originalFilename}`);

      await fs.promises.rename(oldPath, newPath);
    });
  } else {
    for (const file of files) {
      const fileStream = fs.createReadStream(file.filepath);

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `${lovedOneId}/${file.originalFilename as string}`,
        Body: fileStream,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log(`File uploaded successfully: ${file.originalFilename}`);
    }
  }
};

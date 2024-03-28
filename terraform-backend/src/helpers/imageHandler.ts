import { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { ENV_TYPE } from '../constants';

const dirPath = path.join(__dirname, '../images');

export default async (files: File[]) => {
  if (process.env.APP_ENV === ENV_TYPE.LOCAL) {
    await fs.promises.mkdir(dirPath, { recursive: true });
    files.forEach(async (file) => {
      const oldPath = file.filepath;
      const newPath = path.join(dirPath, file.originalFilename as string);

      await fs.promises.rename(oldPath, newPath);
    });
  } else {
    console.log('Image upload to S3 not implemented');
  }
};

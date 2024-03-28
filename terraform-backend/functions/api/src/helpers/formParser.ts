import { Request } from 'express';
import { MasterForm } from '../types/form';
import { File, IncomingForm } from 'formidable';

export default async (req: Request): Promise<{ fields: MasterForm; files: File[] }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, async (err, { fields }, files) => {
      if (err) reject(err);
      else if (fields === undefined || !fields.length || !files) {
        reject(new Error('No fields or files found'));
      } else {
        const filesArray = Object.values(files).map((file) => file?.[0] as File);
        const parsedFields = JSON.parse(fields[0]) as MasterForm;

        console.log({ files: filesArray, fields: parsedFields });

        resolve({ fields: parsedFields, files: filesArray });
      }
    });
  });
};

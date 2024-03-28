import { Request } from 'express';
import db from '../config/db';

export default async (req: Request): Promise<false | string> => {
  const record = await db.lovedOne.findUnique({
    select: {
      bio: true,
      education: true,
      employment: true,
      family: true,
      info: true,
      service: true,
    },
    where: { lovedOneId: req.params.lovedOneId },
  });

  if (record?.bio || record?.education || record?.employment || record?.family || record?.info || record?.service) {
    return 'Form already submitted';
  } else {
    return false;
  }
};

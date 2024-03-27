import { Request } from 'express';
import db from '../config/db';

export default async (req: Request): Promise<false | string> => {
  const count = await db.lovedOne.count({ where: { lovedOneId: req.params.lovedOneId, funeralHomeId: req.user!.id } });
  if (count > 0) {
    return false;
  } else {
    return 'Authenticated user attempted to access a customer that is not theirs';
  }
};

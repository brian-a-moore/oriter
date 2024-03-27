import { Request } from 'express';

export default async (req: Request): Promise<false | string> => {
  if (!req.user?.isAdmin && req.user?.id === req.params.funeralHomeId) {
    return false;
  } else {
    return 'Authenticated user attempted to access a funeral home that is not theirs';
  }
};

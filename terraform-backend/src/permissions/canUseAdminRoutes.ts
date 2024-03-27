import { Request } from 'express';

export default async (req: Request): Promise<false | string> => {
  if (req.user?.isAdmin) {
    return false;
  } else {
    return 'Non-admin user attempted to use admin routes';
  }
};

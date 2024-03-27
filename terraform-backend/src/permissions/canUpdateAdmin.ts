import { Request } from 'express';

export default async (req: Request): Promise<false | string> => {
  if (req.user?.id === req.params.adminId) {
    return false;
  } else {
    return 'Admin user attempted to update another admin user';
  }
};

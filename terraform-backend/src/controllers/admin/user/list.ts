import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';

export default async (_: Request, res: Response) => {
  try {
    const users = await db.admin.findMany({
      select: {
        adminId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ users });
  } catch (e: any | unknown) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

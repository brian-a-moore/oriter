import { Response } from 'express';
import { OriterRequest } from '../../../types';
import { STATUS_CODE } from '../../../constants';
import db from '../../../config/db';

export default async (_: OriterRequest, res: Response) => {
  try {
    const users = await db.admin.findMany({
      select: {
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

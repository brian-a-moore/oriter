import { Response } from 'express';
import { OriterRequest } from '../../../types';
import { STATUS_CODE } from '../../../constants';
import db from '../../../config/db';

export default async (req: OriterRequest<{ adminId: string }>, res: Response) => {
  try {
    const user = await db.admin.findUniqueOrThrow({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { adminId: req.params.adminId },
    });

    res.status(STATUS_CODE.OKAY).json({ user });
  } catch (e: any | unknown) {
    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

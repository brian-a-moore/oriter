import { Response, Request } from 'express';
import { STATUS_CODE } from '../../../constants';
import db from '../../../config/db';
import logger from '../../../utils/logger';

export default async (req: Request<{ adminId: string }>, res: Response) => {
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
    logger.error({
      message: 'Unable to get admin user',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

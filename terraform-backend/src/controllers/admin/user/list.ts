import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request, res: Response) => {
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
    logger.error({
      message: 'Unable to get admin users',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

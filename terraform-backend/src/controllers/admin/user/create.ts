import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { OriterRequest } from '../../../types';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import db from '../../../config/db';
import logger from '../../../utils/logger';
import pw from '../../../utils/password';

export default async (
  req: OriterRequest<
    unknown,
    {
      firstName: string;
      lastName: string;
      email: string;
    }
  >,
  res: Response,
) => {
  const adminId = await uuid();
  const rawPassword = pw();
  const password = await hashString(rawPassword);

  try {
    await db.admin.create({
      data: {
        ...req.body,
        adminId,
        password,
      },
    });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to create new admin user',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Admin user with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }

  res.status(STATUS_CODE.OKAY).json({ tempPassword: rawPassword });
};

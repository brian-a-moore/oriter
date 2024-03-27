import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import logger from '../../../utils/logger';
import pw from '../../../utils/password';
import { Prisma } from '@prisma/client';

export default async (
  req: Request<
    unknown,
    Omit<Prisma.AdminUncheckedCreateInput, 'adminId' | 'password' | 'securityQuestionId' | 'securityAnswer'>
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

    res.status(STATUS_CODE.OKAY).json({ tempPassword: rawPassword });
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
  }
};

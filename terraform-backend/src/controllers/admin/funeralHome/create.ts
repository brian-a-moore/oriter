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
    Omit<Prisma.FuneralHomeUncheckedCreateInput, 'password' | 'securityQuestionId' | 'securityAnswer'>
  >,
  res: Response,
) => {
  const funeralHomeId = await uuid();
  const rawPassword = pw();
  const password = await hashString(rawPassword);

  try {
    await db.funeralHome.create({
      data: {
        ...req.body,
        funeralHomeId,
        password,
      },
    });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to create new funeral home',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Funeral home with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }

  res.status(STATUS_CODE.OKAY).json({
    message: `Please let ${req.body.firstName} ${req.body.lastName} know to update the password and security question for their funeral home after their first login.`,
    funeralHomeId,
    tempPassword: rawPassword,
  });
};

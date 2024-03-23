import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';
import { compareStrings, hashString } from '../../utils/bcrypt';
import { createToken } from '../../utils/jwt';
import { Admin, FuneralHome } from '@prisma/client';

export default async (
  req: OriterRequest<
    unknown,
    {
      email: string;
      answer: string;
      password: string;
      isAdmin: boolean;
    }
  >,
  res: Response,
) => {
  let user;

  if (req.body.isAdmin) {
    user = await db.admin.findUnique({
      select: { adminId: true, securityAnswer: true },
      where: {
        email: req.body.email,
      },
    });
  } else {
    user = await db.funeralHome.findUnique({
      select: { funeralHomeId: true, securityAnswer: true },
      where: {
        email: req.body.email,
      },
    });
  }

  if (!user) {
    logger.info({
      message: 'User not found',
      data: { routeId: req.routeId },
    });
    res.sendStatus(STATUS_CODE.NOT_FOUND);
    return;
  }

  const isAnswerCorrect = await compareStrings(req.body.answer, user.securityAnswer);

  if (isAnswerCorrect) {
    const password = await hashString(req.body.password);

    if (req.body.isAdmin) {
      await db.admin.update({
        where: {
          email: req.body.email,
        },
        data: { password },
      });
    } else {
      await db.funeralHome.update({
        where: {
          email: req.body.email,
        },
        data: { password },
      });
    }

    const token = createToken({
      id: req.body.isAdmin ? (user as Admin).adminId : (user as FuneralHome).funeralHomeId,
      isAdmin: req.body.isAdmin,
    });

    res.status(STATUS_CODE.OKAY).json({ token });
    return;
  }

  logger.info({
    message: 'Cannot update password: Answer incorrect',
    data: { routeId: req.routeId },
  });

  res.sendStatus(STATUS_CODE.BAD_INPUT);
};

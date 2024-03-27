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
  let user: Partial<Admin | FuneralHome>;

  try {
    if (req.body.isAdmin) {
      user = await db.admin.findUniqueOrThrow({
        select: { adminId: true, securityAnswer: true },
        where: {
          email: req.body.email,
        },
      });
    } else {
      user = await db.funeralHome.findUniqueOrThrow({
        select: { funeralHomeId: true, securityAnswer: true },
        where: {
          email: req.body.email,
        },
      });
    }
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable query admin or funeral home user',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }

  if (!user.securityAnswer) {
    logger.warn({
      message: 'Cannot update password: User has not setup security question',
      data: { routeId: req.routeId },
    });

    res.sendStatus(STATUS_CODE.BAD_INPUT).json({
      message: 'User has not setup security question',
    });

    return;
  }

  let isAnswerCorrect: boolean;
  let token: string;

  try {
    isAnswerCorrect = await compareStrings(req.body.answer, user.securityAnswer!);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to compare security question answer',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }

  if (isAnswerCorrect) {
    let password: string;

    try {
      password = await hashString(req.body.password);
    } catch (e: any | unknown) {
      logger.error({
        message: 'Unable to hash password',
        error: e.message,
        data: { routeId: req.routeId },
      });

      res.sendStatus(STATUS_CODE.SERVER_ERROR);

      return;
    }

    try {
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
    } catch (e: any | unknown) {
      logger.error({
        message: 'Unable to update password',
        error: e.message,
        data: { routeId: req.routeId },
      });

      res.sendStatus(STATUS_CODE.SERVER_ERROR);

      return;
    }

    try {
      token = createToken({
        id: req.body.isAdmin ? (user as Admin).adminId : (user as FuneralHome).funeralHomeId,
        isAdmin: req.body.isAdmin,
      });
    } catch (e: any | unknown) {
      logger.error({
        message: 'Unable to create token',
        error: e.message,
        data: { routeId: req.routeId },
      });

      res.sendStatus(STATUS_CODE.SERVER_ERROR);

      return;
    }

    res.status(STATUS_CODE.OKAY).json({ token });

    return;
  }

  logger.info({
    message: 'Cannot update password: Answer incorrect',
    data: { routeId: req.routeId },
  });

  res.sendStatus(STATUS_CODE.BAD_INPUT).json({ message: 'Security question answer is incorrect' });
};

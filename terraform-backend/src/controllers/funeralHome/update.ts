import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import { hashString } from '../../utils/bcrypt';
import logger from '../../utils/logger';

export default async (
  req: Request<{ funeralHomeId: string }, Omit<Prisma.FuneralHomeUncheckedUpdateInput, 'funeralHomeId' | 'password'>>,
  res: Response,
) => {
  const { securityQuestionId, securityAnswer, ...rest } = req.body;
  const insert: Prisma.FuneralHomeUncheckedUpdateInput = { ...rest };

  if (securityQuestionId && securityAnswer) {
    insert.securityQuestionId = securityQuestionId;
    insert.securityAnswer = await hashString(securityAnswer);
  }

  try {
    await db.funeralHome.update({
      data: insert,
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to update funeral home',
      error: e.message,
      data: { funeralHomeId: req.params.funeralHomeId, insert },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Funeral home with this email already exists' });

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

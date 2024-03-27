import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import { hashString } from '../../utils/bcrypt';
import logger from '../../utils/logger';

export default async (
  req: Request<{ funeralHomeId: string }, Omit<Prisma.FuneralHomeUncheckedUpdateInput, 'funeralHomeId'>>,
  res: Response,
) => {
  const { password, securityQuestionId, securityAnswer, ...rest } = req.body;
  const insert: Prisma.FuneralHomeUncheckedUpdateInput = { ...rest };

  if (securityQuestionId && securityAnswer) {
    insert.securityQuestionId = securityQuestionId;
    insert.securityAnswer = await hashString(securityAnswer);
  }

  if (password) {
    insert.password = await hashString(password);
  }

  try {
    await db.funeralHome.update({
      data: insert,
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Failed to update funeral home',
      error: e.message,
      data: { funeralHomeId: req.params.funeralHomeId, insert },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Funeral home with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

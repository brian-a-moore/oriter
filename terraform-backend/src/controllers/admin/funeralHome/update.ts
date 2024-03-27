import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (
  req: Request<
    { funeralHomeId: string },
    Omit<Prisma.FuneralHomeUncheckedUpdateInput, 'funeralHomeId' | 'password' | 'securityQuestionId' | 'securityAnswer'>
  >,
  res: Response,
) => {
  const update: Prisma.FuneralHomeUncheckedUpdateInput = req.body;

  try {
    await db.funeralHome.update({
      data: update,
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to update funeral home',
      error: e.message,
      data: { funeralHomeId: req.params.funeralHomeId, update },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Funeral home with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

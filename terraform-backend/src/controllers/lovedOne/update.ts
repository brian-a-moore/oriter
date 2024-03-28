import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';
import { MasterForm } from '../../types/form';

export default async (
  req: Request<{ funeralHomeId: string; customerId: string; lovedOneId: string }, MasterForm>,
  res: Response,
) => {
  const update: Prisma.LovedOneUncheckedUpdateInput = req.body;
  try {
    await db.lovedOne.update({
      data: update,
      where: {
        lovedOneId: req.params.lovedOneId,
        customerId: req.params.customerId,
        funeralHomeId: req.params.funeralHomeId,
      },
    });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to submit form',
      error: e.message,
      data: { customerId: req.params.customerId, update },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

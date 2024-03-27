import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';
import { Prisma } from '@prisma/client';

export default async (
  req: Request<unknown, Omit<Prisma.CustomerUncheckedCreateInput, 'customerId'>>,
  res: Response,
) => {
  const customerId = await uuid();

  try {
    await db.customer.create({
      data: {
        ...req.body,
        customerId,
        funeralHomeId: req.user?.id,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ customerId });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to create new customer',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Customer with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

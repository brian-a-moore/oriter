import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import { hashString } from '../../utils/bcrypt';
import logger from '../../utils/logger';

export default async (
  req: Request<{ customerId: string }, Omit<Prisma.AdminUncheckedUpdateInput, 'customerId'>>,
  res: Response,
) => {
  const { securityQuestionId, securityAnswer, ...rest } = req.body;

  const update: Prisma.AdminUncheckedUpdateInput = { ...rest };

  if (securityQuestionId && securityAnswer) {
    update.securityQuestionId = securityQuestionId;
    update.securityAnswer = await hashString(securityAnswer);
  }

  try {
    await db.customer.update({
      data: update,
      where: { customerId: req.params.customerId, funeralHomeId: req.user?.id },
    });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to update customer',
      error: e.message,
      data: { customerId: req.params.customerId, update },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Customer with this email already exists' });

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

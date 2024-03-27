import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import logger from '../../../utils/logger';

export default async (
  req: Request<{ adminId: string }, Omit<Prisma.AdminUncheckedUpdateInput, 'adminId' | 'password'>>,
  res: Response,
) => {
  const { securityQuestionId, securityAnswer, ...rest } = req.body;

  const update: Prisma.AdminUncheckedUpdateInput = { ...rest };

  if (securityQuestionId && securityAnswer) {
    update.securityQuestionId = securityQuestionId;
    update.securityAnswer = await hashString(securityAnswer);
  }

  try {
    await db.admin.update({
      data: update,
      where: { adminId: req.params.adminId },
    });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to update admin',
      error: e.message,
      data: { adminId: req.params.adminId, update },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Admin user with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import logger from '../../../utils/logger';

export default async (req: Request<{ adminId: string }, Prisma.AdminUncheckedUpdateInput>, res: Response) => {
  const { password, securityQuestionId, securityAnswer, ...rest } = req.body;

  const insert: Prisma.AdminUncheckedUpdateInput = { ...rest };

  if (securityQuestionId && securityAnswer) {
    insert.securityQuestionId = securityQuestionId;
    insert.securityAnswer = await hashString(securityAnswer);
  }

  if (password) {
    insert.password = await hashString(password);
  }

  try {
    await db.admin.update({
      data: insert,
      where: { adminId: req.params.adminId },
    });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Failed to update admin',
      error: e.message,
      data: { adminId: req.params.adminId, insert },
    });

    if (e.code === 'P2002') {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Admin user with this email already exists' });

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import logger from '../../../utils/logger';

export default async (
  req: Request<
    { adminId: string },
    {
      firstName?: string;
      lastName?: string;
      securityQuestionId?: number;
      securityAnswer?: string;
      email?: string;
      password?: string;
    }
  >,
  res: Response,
) => {
  const insert: Prisma.AdminUncheckedUpdateInput = {};

  if (req.body.firstName) {
    insert.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    insert.lastName = req.body.lastName;
  }

  if (req.body.securityQuestionId && req.body.securityAnswer) {
    insert.securityQuestionId = req.body.securityQuestionId;
    insert.securityAnswer = await hashString(req.body.securityAnswer);
  }

  if (req.body.email) {
    insert.email = req.body.email;
  }

  if (req.body.password) {
    insert.password = await hashString(req.body.password);
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

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

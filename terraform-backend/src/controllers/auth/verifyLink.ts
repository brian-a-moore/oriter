import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';

export default async (req: OriterRequest<unknown, { customerId: string; lovedOneId: string }>, res: Response) => {
  const lovedOneExists = await db.lovedOne.count({
    where: { lovedOneId: req.body.lovedOneId, customerId: req.body.customerId },
  });

  if (lovedOneExists) {
    res.sendStatus(STATUS_CODE.OKAY);
  } else {
    logger.error({
      message: 'No record found',
      error: 'Not a valid link',
      data: { routeId: req.routeId },
    });
    res.sendStatus(STATUS_CODE.BAD_INPUT);
  }
};

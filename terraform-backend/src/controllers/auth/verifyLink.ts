import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (req: Request<unknown, { customerId: string; lovedOneId: string }>, res: Response) => {
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

    res.sendStatus(STATUS_CODE.NOT_FOUND);
  }
};

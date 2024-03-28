import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (
  req: Request<unknown, { customerId: string; lovedOneId: string; funeralHomeId: string }>,
  res: Response,
) => {
  const lovedOneExists = await db.lovedOne.count({
    where: { lovedOneId: req.body.lovedOneId, customerId: req.body.customerId, funeralHomeId: req.body.funeralHomeId },
  });

  if (lovedOneExists) {
    res.status(STATUS_CODE.OKAY).json({});
  } else {
    logger.error({
      message: 'No record found',
      error: 'Not a valid link',
      data: { routeId: req.routeId },
    });

    res.status(STATUS_CODE.NOT_FOUND).json({});
  }
};

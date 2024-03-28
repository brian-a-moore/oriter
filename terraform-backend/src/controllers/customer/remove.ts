import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (req: Request<{ customerId: string }>, res: Response) => {
  try {
    await db.customer.delete({ where: { customerId: req.params.customerId, funeralHomeId: req.user?.id } });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to delete customer',
      error: e.message,
      data: { customerId: req.params.customerId, routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.status(STATUS_CODE.NOT_FOUND).json({});

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

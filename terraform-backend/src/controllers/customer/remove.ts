import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (req: Request<{ customerId: string }>, res: Response) => {
  try {
    await db.customer.delete({ where: { customerId: req.params.customerId, funeralHomeId: req.user?.id } });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to delete customer',
      error: e.message,
      data: { customerId: req.params.customerId, routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

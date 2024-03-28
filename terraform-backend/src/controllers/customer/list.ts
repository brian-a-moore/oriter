import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    const customers = await db.customer.findMany({
      select: {
        customerId: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.status(STATUS_CODE.OKAY).json({ customers });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get customers',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

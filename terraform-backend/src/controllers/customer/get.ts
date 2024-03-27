import { Response, Request } from 'express';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';

export default async (req: Request<{ customerId: string }>, res: Response) => {
  try {
    const customer = await db.customer.findUniqueOrThrow({
      select: {
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { customerId: req.params.customerId, funeralHomeId: req.user?.id },
    });

    res.status(STATUS_CODE.OKAY).json({ customer });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get customer',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

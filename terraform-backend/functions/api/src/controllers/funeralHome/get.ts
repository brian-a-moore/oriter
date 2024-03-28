import { Response, Request } from 'express';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    const funeralHome = await db.funeralHome.findUniqueOrThrow({
      select: {
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        zipCode: true,
        email: true,
        phoneNumber: true,
        funeralHomeName: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.status(STATUS_CODE.OKAY).json({ funeralHome });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get funeral home',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.status(STATUS_CODE.NOT_FOUND).json({});

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

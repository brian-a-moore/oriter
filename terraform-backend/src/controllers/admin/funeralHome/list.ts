import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request, res: Response) => {
  try {
    const funeralHomes = await db.funeralHome.findMany({
      select: {
        funeralHomeId: true,
        funeralHomeName: true,
        city: true,
        state: true,
        zipCode: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ funeralHomes });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get funeral homes',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';

export default async (req: Request<{ customerId: string }>, res: Response) => {
  try {
    const lovedOnes = await db.lovedOne.findMany({
      select: {
        lovedOneId: true,
        funeralHomeId: true,
        customerId: true,
        bio: true,
      },
      where: { customerId: req.params.customerId, funeralHomeId: req.user?.id },
    });

    res.status(STATUS_CODE.OKAY).json({ lovedOnes });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get loved ones',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

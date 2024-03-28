import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    await db.funeralHome.delete({ where: { funeralHomeId: req.params.funeralHomeId } });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to delete funeral home',
      error: e.message,
      data: { funeralHomeId: req.params.funeralHomeId, routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.status(STATUS_CODE.NOT_FOUND).json({});

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    await db.funeralHome.delete({ where: { funeralHomeId: req.params.funeralHomeId } });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to delete funeral home',
      error: e.message,
      data: { funeralHomeId: req.params.funeralHomeId, routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

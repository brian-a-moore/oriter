import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    await db.funeralHome.delete({ where: { funeralHomeId: req.params.funeralHomeId } });

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    if (e.code === 'P2025') {
      logger.error({
        message: 'Failed to delete funeral home',
        error: 'Funeral home does not exist',
        data: { funeralHomeId: req.params.funeralHomeId },
      });

      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

import { Response, Request } from 'express';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';

export default async (req: Request<{ lovedOneId: string }>, res: Response) => {
  try {
    const lovedOne = await db.lovedOne.findUniqueOrThrow({
      where: { lovedOneId: req.params.lovedOneId, funeralHomeId: req.user?.id },
    });

    res.status(STATUS_CODE.OKAY).json({ lovedOne });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to get loved one',
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

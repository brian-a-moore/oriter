import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import logger from '../../utils/logger';

export default async (req: Request<{ customerId: string }>, res: Response) => {
  const lovedOneId = await uuid();

  try {
    await db.lovedOne.create({
      data: {
        lovedOneId,
        customerId: req.params.customerId,
        funeralHomeId: req.user!.id,
      },
    });

    res.status(STATUS_CODE.OKAY).json({
      link: `https://oriter.com/link/${req.user!.id}/${req.params.customerId}/${lovedOneId}`,
    });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to link customer to loved one',
      error: e.message,
      data: { customerId: req.params.customerId, routeId: req.routeId },
    });

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import { createToken, verifyToken } from '../../utils/jwt';
import logger from '../../utils/logger';

export default async (req: OriterRequest<unknown, { token: string }>, res: Response) => {
  try {
    const { id, isAdmin } = await verifyToken(req.body.token);

    const refreshToken = await createToken({ id, isAdmin });

    res.status(STATUS_CODE.OKAY).json({
      user: { id, isAdmin },
      refreshToken,
    });
  } catch (e: any | unknown) {
    logger.error({
      message: 'Token verification failed',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.sendStatus(STATUS_CODE.NO_AUTH);
  }
};

import { Response, Request } from 'express';
import { STATUS_CODE } from '../../constants';
import { createToken, verifyToken } from '../../utils/jwt';
import logger from '../../utils/logger';

export default async (req: Request<unknown, { token: string }>, res: Response) => {
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

    res.status(STATUS_CODE.NO_AUTH).json({});
  }
};

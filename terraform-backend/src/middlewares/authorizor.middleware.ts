import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { STATUS_CODE } from '../constants';
import db from '../config/db';
import { OriterRequest } from '../types';
import logger from '../utils/logger';

export default async (req: OriterRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  try {
    if (req.routeId!.includes('-auth')) {
      logger.debug({ message: 'AUTHORIZATION MIDDLEWARE: Bypassed', data: { routeId: req.routeId } });
      next();
    } else if (!authorization) {
      throw new Error('AUTHORIZATION MIDDLEWARE: Authorization not provided');
    } else {
      const [type, data] = authorization.split(' ');
      if (type === 'Bearer') {
        const decodedData = verifyToken(data);

        const id = decodedData.id;

        let count;

        if (decodedData.isAdmin) {
          count = await db.admin.count({ where: { adminId: id } });
        } else {
          count = await db.funeralHome.count({ where: { funeralHomeId: id } });
        }

        if (!count) {
          logger.debug({
            message: 'AUTHORIZATION MIDDLEWARE: Account found -- Continuing...',
            data: { routeId: req.routeId },
          });
          next();
        } else {
          throw new Error('AUTHORIZATION MIDDLEWARE: Account not found');
        }
      } else {
        throw new Error('AUTHORIZATION MIDDLEWARE: Authentication type is not supported');
      }
    }
  } catch (e: any | unknown) {
    logger.error({
      message: 'AUTHORIZATION MIDDLEWARE: Authorization failed',
      error: e.message,
      data: { routeId: req.routeId },
    });
    res.sendStatus(STATUS_CODE.NO_AUTH);
  }
};

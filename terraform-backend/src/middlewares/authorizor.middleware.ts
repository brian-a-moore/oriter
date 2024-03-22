import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { STATUS_CODE } from '../constants';
import db from '../config/db';
import { OriterRequest } from '../types';

export default async (req: OriterRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  try {
    if (req.routeId!.includes('-auth')) {
      console.debug({ routeId: req.routeId, message: 'AUTHORIZATION MIDDLEWARE: Bypassed' });
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
          console.debug({ routeId: req.routeId, message: 'AUTHORIZATION MIDDLEWARE: Account found -- Continuing...' });
          next();
        } else {
          throw new Error('AUTHORIZATION MIDDLEWARE: Account not found');
        }
      } else {
        throw new Error('AUTHORIZATION MIDDLEWARE: Authentication type is not supported');
      }
    }
  } catch (e: any | unknown) {
    console.error({
      routeId: req.routeId,
      message: 'AUTHORIZATION MIDDLEWARE: Authorization failed',
      error: e.message,
    });
    res.sendStatus(STATUS_CODE.NO_AUTH);
  }
};

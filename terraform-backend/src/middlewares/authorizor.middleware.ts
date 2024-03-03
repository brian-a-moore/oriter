import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';
import { STATUS_CODE } from '../config/constants';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const routeId = req.method.replace(/\//g, '-') + req.originalUrl.replace(/\//g, '-');

  console.debug('AUTHORIZATION MIDDLEWARE: Route ID', routeId);

  try {
    if (routeId.includes('-auth')) {
      console.debug('AUTHORIZATION MIDDLEWARE: Bypassed');
      next();
    } else if (!authorization) {
      throw new Error('AUTHORIZATION MIDDLEWARE: Authorization not provided');
    } else {
      const [type, data] = authorization.split(' ');
      if (type === 'Bearer') {
        const decodedData = verifyToken(data);

        console.debug('AUTHORIZATION MIDDLEWARE: Decoded Data', decodedData);

        const count = 0;
        if (count > 0) {
          // req.userId = decodedData.userId;
          next();
        } else {
          throw new Error('AUTHORIZATION MIDDLEWARE: Account not found');
        }
      } else {
        throw new Error('AUTHORIZATION MIDDLEWARE: Authentication type is not supported');
      }
    }
  } catch (e: any | unknown) {
    console.error(e.message);
    res.sendStatus(STATUS_CODE.NO_AUTH);
    next(e);
  }
};

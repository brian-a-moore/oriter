import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { STATUS_CODE } from '../constants';
import { db } from '../config/old';
import { OriterRequest } from '../types';

export default async (req: OriterRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  console.debug('AUTHORIZATION MIDDLEWARE: Route ID', req.routeId);

  try {
    if (req.routeId!.includes('-auth')) {
      console.debug('AUTHORIZATION MIDDLEWARE: Bypassed');
      next();
    } else if (!authorization) {
      throw new Error('AUTHORIZATION MIDDLEWARE: Authorization not provided');
    } else {
      const [type, data] = authorization.split(' ');
      if (type === 'Bearer') {
        const decodedData = verifyToken(data);

        const id = decodedData.id;

        let records;

        if (decodedData.isAdmin) {
          records = await db.query.admin.findMany({ where: (admins, { eq }) => eq(admins.adminId, id) });
        } else {
          records = await db.query.funeralHome.findMany({
            where: (funeralHomes, { eq }) => eq(funeralHomes.funeralHomeId, id),
          });
        }

        if (records.length > 0) {
          console.debug('AUTHORIZATION MIDDLEWARE: Account found -- Continuing...');
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
  }
};

import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { STATUS_CODE } from '../constants';
import { db } from '../config/db';
import { OriterRequest } from '../types';

export default async (req: OriterRequest, res: Response, next: NextFunction) => {
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

        const id = decodedData.id;
       
        let records;

        if(req.body.isAdmin) {
          records = await db.query.admin.findMany({ where:((admins, { eq }) => eq(admins.adminId, id)) });
        } else {
          records = await db.query.funeralHome.findMany({ where:((funeralHomes, { eq }) => eq(funeralHomes.funeralHomeId, id)) });
        }
      
        if (records.length > 0) {

          req.id = id;
          
          if((req.body as any).isAdmin) {
            req.isAdmin = true;
          } else {
            req.isAdmin = false;
          }

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

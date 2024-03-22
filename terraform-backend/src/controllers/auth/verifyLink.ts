import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';

export default async (req: OriterRequest<unknown, { customerId: string, lovedOneId: string }>, res: Response) => {

  const lovedOneExists = await db.lovedOne.count({ where: { lovedOneId: req.body.lovedOneId, customerId: req.body.customerId }});

  if(lovedOneExists) {
      res.sendStatus(STATUS_CODE.OKAY);
  } else {
    console.error({
      routeId: req.routeId,
      message: 'Not valid link: No record found'
    })
    res.sendStatus(STATUS_CODE.BAD_INPUT);
  }
};

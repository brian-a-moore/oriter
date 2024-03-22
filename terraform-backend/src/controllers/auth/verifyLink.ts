import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import { db } from '../../config/db';

export default async (req: OriterRequest<unknown, { customerId: string, responseId: string }>, res: Response) => {

  const existingResponse = await db.query.formResponse.findFirst({
    where: (formResponse, { eq, and }) => and(eq(formResponse.responseId, req.body.responseId), eq(formResponse.customerId, req.body.customerId))
  });

  if(existingResponse) {
      res.sendStatus(STATUS_CODE.OKAY);
  } else {
    console.error({
      routeId: req.routeId,
      message: 'Not valid link: No record found'
    })
    res.sendStatus(STATUS_CODE.BAD_INPUT);
  }
};

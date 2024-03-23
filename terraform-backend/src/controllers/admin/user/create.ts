import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { OriterRequest } from '../../../types';
import { STATUS_CODE } from '../../../constants';
import { hashString } from '../../../utils/bcrypt';
import db from '../../../config/db';

export default async (
  req: OriterRequest<
    unknown,
    {
      firstName: string;
      lastName: string;
      email: string;
    }
  >,
  res: Response,
) => {
  const adminId = await uuid();
  const password = await hashString('Password1!');

  const user = await db.admin.create({
    data: {
      ...req.body,
      adminId,
      password,
    },
  });

  console.log(user);

  res.sendStatus(STATUS_CODE.OKAY);
};

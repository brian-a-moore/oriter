import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import { compareStrings } from '../../utils/bcrypt';
import { createToken } from '../../utils/jwt';
import logger from '../../utils/logger';

export default async (
  req: OriterRequest<
    unknown,
    {
      email: string;
      password: string;
      isAdmin: boolean;
    }
  >,
  res: Response,
) => {
  let user: any;

  if (req.body.isAdmin) {
    user = await db.admin.findUnique({
      select: { adminId: true, password: true },
      where: { email: req.body.email },
    });
  } else {
    user = await db.funeralHome.findUnique({
      select: { funeralHomeId: true, password: true },
      where: { email: req.body.email },
    });
  }

  if (!user) {
    logger.info({ message: 'User not found', data: { routeId: req.routeId } });
    res.sendStatus(STATUS_CODE.NOT_FOUND);
    return;
  }

  const isPasswordCorrect = await compareStrings(req.body.password, user.password);

  if (isPasswordCorrect) {
    const token = createToken({ id: user[req.body.isAdmin ? 'adminId' : 'funeralHomeId'], isAdmin: req.body.isAdmin });

    res.status(STATUS_CODE.OKAY).json({ token });
    return;
  }

  logger.info({ message: 'Password incorrect', data: { routeId: req.routeId } });
  res.sendStatus(STATUS_CODE.BAD_INPUT);
};

import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';
import { comparePasswords } from '../../utils/bcrypt';
import { createToken } from '../../utils/jwt';

export default async (req: OriterRequest<unknown, {
  email: string;
  password: string;
  isAdmin: boolean;
}>, res: Response) => {
  let user: any;

  if(req.body.isAdmin) {
    user = await db.admin.findUnique({
      select: { adminId: true, password: true },
      where: { email: req.body.email }
    });
  } else {
    user = await db.funeralHome.findUnique({
      select: { funeralHomeId: true, password: true },
      where: { email: req.body.email }
    })
  }

  if(!user) {
    console.log({ routeId: req.routeId, message: 'User not found' });
    res.sendStatus(STATUS_CODE.NOT_FOUND);
    return;
  };

  const isPasswordCorrect = await comparePasswords(req.body.password, user.password);

  if(isPasswordCorrect) {
    const token = createToken({ id: user[req.body.isAdmin ? 'adminId' : 'funeralHomeId'], isAdmin: req.body.isAdmin });

    res.status(STATUS_CODE.OKAY).json({ token });
    return;
  };

  console.log({ routeId: req.routeId, message: 'Password incorrect' });
  res.sendStatus(STATUS_CODE.BAD_INPUT);
};

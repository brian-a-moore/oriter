import { Admin, FuneralHome } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import { compareStrings } from '../../utils/bcrypt';
import { createToken } from '../../utils/jwt';
import logger from '../../utils/logger';

export default async (
  req: Request<
    unknown,
    {
      email: string;
      password: string;
      isAdmin: boolean;
    }
  >,
  res: Response,
) => {
  let user: Partial<Admin | FuneralHome>;

  try {
    if (req.body.isAdmin) {
      user = await db.admin.findUniqueOrThrow({
        select: { adminId: true, password: true },
        where: { email: req.body.email },
      });
    } else {
      user = await db.funeralHome.findUniqueOrThrow({
        select: { funeralHomeId: true, password: true },
        where: { email: req.body.email },
      });
    }
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable query admin or funeral home user',
      error: e.message,
      data: { routeId: req.routeId },
    });

    if (e.code === 'P2025') {
      res.status(STATUS_CODE.NOT_FOUND).json({});

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});

    return;
  }

  let isPasswordCorrect: boolean;
  let token: string;

  try {
    isPasswordCorrect = await compareStrings(req.body.password, user.password!);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to compare password',
      error: e.message,
      data: { routeId: req.routeId },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});

    return;
  }

  if (isPasswordCorrect) {
    try {
      const id = (user as Admin).adminId || (user as FuneralHome).funeralHomeId;
      token = createToken({
        id,
        isAdmin: req.body.isAdmin,
      });

      res.status(STATUS_CODE.OKAY).json({ token, user: { id, isAdmin: req.body.isAdmin } });

      return;
    } catch (e: any | unknown) {
      logger.error({
        message: 'Unable to create token',
        error: e.message,
        data: { routeId: req.routeId },
      });

      res.status(STATUS_CODE.SERVER_ERROR).json({});

      return;
    }
  }

  logger.info({ message: 'Password incorrect', data: { routeId: req.routeId } });

  res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Password incorrect' });
};

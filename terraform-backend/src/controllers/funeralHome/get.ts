import { Response, Request } from 'express';
import { STATUS_CODE } from '../../constants';
import db from '../../config/db';

export default async (req: Request<{ funeralHomeId: string }>, res: Response) => {
  try {
    const funeralHome = await db.funeralHome.findUniqueOrThrow({
      select: {
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        zipCode: true,
        email: true,
        phoneNumber: true,
        funeralHomeName: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { funeralHomeId: req.params.funeralHomeId },
    });

    res.status(STATUS_CODE.OKAY).json({ funeralHome });
  } catch (e: any | unknown) {
    if (e.code === 'P2025') {
      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

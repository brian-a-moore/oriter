import { Response, Request } from 'express';
import db from '../../../config/db';
import { STATUS_CODE } from '../../../constants';
import logger from '../../../utils/logger';

export default async (req: Request<{ adminId: string }>, res: Response) => {
  try {
    await db.admin.delete({ where: { adminId: req.params.adminId } });

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to delete admin user',
      error: e.message,
      data: { adminId: req.params.adminId },
    });

    if (e.code === 'P2025') {
      res.status(STATUS_CODE.NOT_FOUND).json({});

      return;
    }

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

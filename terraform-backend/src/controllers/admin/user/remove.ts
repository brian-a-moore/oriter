import { Response } from 'express';
import { OriterRequest } from '../../../types';
import { STATUS_CODE } from '../../../constants';
import db from '../../../config/db';
import logger from '../../../utils/logger';

export default async (req: OriterRequest<{ adminId: string }>, res: Response) => {
  try {
    const deletedRecord = await db.admin.delete({ where: { adminId: req.params.adminId } });

    if (!deletedRecord) {
      logger.error({
        message: 'Failed to delete admin user',
        error: 'User does not exist',
        data: { adminId: req.params.adminId },
      });

      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.OKAY);
  } catch (e: any | unknown) {
    if (e.code === 'P2025') {
      logger.error({
        message: 'Failed to delete admin user',
        error: 'User does not exist',
        data: { adminId: req.params.adminId },
      });

      res.sendStatus(STATUS_CODE.NOT_FOUND);

      return;
    }

    res.sendStatus(STATUS_CODE.SERVER_ERROR);

    return;
  }
};

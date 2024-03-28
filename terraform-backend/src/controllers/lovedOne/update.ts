import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import db from '../../config/db';
import { STATUS_CODE } from '../../constants';
import logger from '../../utils/logger';
import { MasterForm } from '../../types/form';
import { File } from 'formidable';
import formParser from '../../helpers/formParser';
import imageHandler from '../../helpers/imageHandler';

export default async (
  req: Request<{ funeralHomeId: string; customerId: string; lovedOneId: string }, MasterForm>,
  res: Response,
) => {
  let parsedData: { fields: MasterForm; files: File[] };
  try {
    parsedData = await formParser(req);
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to parse form data',
      error: e.message,
      data: { customerId: req.params.customerId, lovedOneId: req.params.lovedOneId },
    });

    res.status(STATUS_CODE.BAD_INPUT).json({});

    return;
  }

  try {
    await db.lovedOne.update({
      data: parsedData.fields as Prisma.LovedOneUncheckedUpdateInput,
      where: {
        lovedOneId: req.params.lovedOneId,
        customerId: req.params.customerId,
        funeralHomeId: req.params.funeralHomeId,
      },
    });

    try {
      await imageHandler(parsedData.files, req.params.lovedOneId);
    } catch (e: any | unknown) {
      logger.error({
        message: 'Unable to handle image upload -- Rolling back db update',
        error: e.message,
        data: { customerId: req.params.customerId, lovedOneId: req.params.lovedOneId },
      });

      await db.lovedOne.update({
        data: {
          bio: undefined,
          education: undefined,
          employment: undefined,
          family: undefined,
          info: undefined,
          service: undefined,
        },
        where: { lovedOneId: req.params.lovedOneId },
      });

      res.status(STATUS_CODE.SERVER_ERROR).json({});

      return;
    }

    res.status(STATUS_CODE.OKAY).json({});
  } catch (e: any | unknown) {
    logger.error({
      message: 'Unable to submit form',
      error: e.message,
      data: { customerId: req.params.customerId, update: parsedData.fields },
    });

    res.status(STATUS_CODE.SERVER_ERROR).json({});
  }
};

import Joi from 'joi';
import {
  EMPTY_OBJECT,
  OBJECT,
  PHONE_NUMBER,
  RESOURCE_ID,
  STATE,
  STR_LONG,
  STR_MED,
  ZIP_CODE,
} from '../constants/schemas';

export const get = OBJECT({
  params: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    addressLine1: STR_LONG,
    addressLine2: STR_MED,
    city: STR_MED,
    state: STATE,
    zipCode: ZIP_CODE,
    phoneNumber: PHONE_NUMBER,
    funeralHomeName: STR_LONG,
    firstName: STR_MED,
    lastName: STR_MED,
    securityQuestionId: Joi.number().integer().min(1).max(99),
    securityAnswer: STR_LONG.when('securityQuestionId', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  }),
});

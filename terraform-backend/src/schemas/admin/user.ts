import Joi from 'joi';
import { EMAIL, EMPTY_OBJECT, OBJECT, RESOURCE_ID, STR_LONG, STR_MED } from '../../constants/schemas';

export const create = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
    email: EMAIL.required(),
  }),
});

export const get = OBJECT({
  params: OBJECT({
    adminId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  params: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  params: OBJECT({
    adminId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  params: OBJECT({
    userId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    firstName: STR_MED,
    lastName: STR_MED,
    email: EMAIL,
    securityQuestionId: Joi.number().integer().min(1).max(99),
    securityAnswer: STR_LONG.when('securityQuestionId', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    password: STR_LONG,
  }),
});

import Joi from 'joi';
import { EMAIL, EMPTY_OBJECT, OBJECT, RESOURCE_ID, STR_LONG, TOKEN } from '../config/constants/schemas';

export const login = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    email: EMAIL.required(),
    password: STR_LONG.required(),
    isAdmin: Joi.boolean().required(),
  }),
});

export const updatePassword = OBJECT({
  params: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    password: STR_LONG.required(),
  }),
});

export const verifyLink = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    customerId: RESOURCE_ID.required(),
    responseId: RESOURCE_ID.required(),
  }),
});

export const verifyToken = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    token: TOKEN.required(),
  }),
});

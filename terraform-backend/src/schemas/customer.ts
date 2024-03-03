import { EMAIL, EMPTY_OBJECT, OBJECT, PHONE_NUMBER, RESOURCE_ID, STR_MED } from '../config/constants/schemas';

export const create = OBJECT({
  params: EMPTY_OBJECT,
  body: OBJECT({
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
    email: EMAIL.required(),
    phoneNumber: PHONE_NUMBER.required(),
  }),
});

export const get = OBJECT({
  params: OBJECT({
    customerId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const link = OBJECT({
  params: OBJECT({
    customerId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  params: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  params: OBJECT({
    customerId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  params: OBJECT({
    customerId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
    email: EMAIL.required(),
    phoneNumber: PHONE_NUMBER.required(),
  }),
});

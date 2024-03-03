import {
  EMAIL,
  EMPTY_OBJECT,
  OBJECT,
  PHONE_NUMBER,
  RESOURCE_ID,
  STATE,
  STR_LONG,
  STR_MED,
  ZIP_CODE,
} from '../../config/constants/schemas';

export const create = OBJECT({
  query: EMPTY_OBJECT,
  body: OBJECT({
    addressLine1: STR_LONG.required(),
    addressLine2: STR_MED,
    city: STR_MED.required(),
    state: STATE.required(),
    zipCode: ZIP_CODE.required(),
    email: EMAIL.required(),
    phoneNumber: PHONE_NUMBER.required(),
    funeralHomeName: STR_LONG.required(),
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
  }),
});

export const get = OBJECT({
  query: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  query: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  query: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  query: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    addressLine1: STR_LONG.required(),
    addressLine2: STR_MED,
    city: STR_MED.required(),
    state: STATE.required(),
    zipCode: ZIP_CODE.required(),
    phoneNumber: PHONE_NUMBER.required(),
    funeralHomeName: STR_LONG.required(),
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
  }),
});

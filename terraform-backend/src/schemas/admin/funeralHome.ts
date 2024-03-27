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
} from '../../constants/schemas';

export const create = OBJECT({
  params: EMPTY_OBJECT,
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
  params: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  params: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  params: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  params: OBJECT({
    funeralHomeId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    addressLine1: STR_LONG,
    addressLine2: STR_MED,
    city: STR_MED,
    state: STATE,
    zipCode: ZIP_CODE,
    email: EMAIL,
    phoneNumber: PHONE_NUMBER,
    funeralHomeName: STR_LONG,
    firstName: STR_MED,
    lastName: STR_MED,
  }),
});

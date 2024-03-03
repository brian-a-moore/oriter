import { EMPTY_OBJECT, OBJECT, PHONE_NUMBER, STATE, STR_LONG, STR_MED, ZIP_CODE } from '../config/constants/schemas';

export const get = OBJECT({
  query: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  query: EMPTY_OBJECT,
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

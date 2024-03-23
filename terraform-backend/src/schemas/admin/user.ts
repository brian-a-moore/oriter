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
    userId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  params: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  params: OBJECT({
    userId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const update = OBJECT({
  params: OBJECT({
    userId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    firstName: STR_MED.required(),
    lastName: STR_MED.required(),
    email: EMAIL.required(),
    password: STR_LONG.required(),
  }),
});

import { EMPTY_OBJECT, OBJECT, RESOURCE_ID } from '../constants/schemas';
import { bioPage, educationPage, employmentPage, familyPage, infoPage, servicePage } from './form/page';

export const create = OBJECT({
  params: OBJECT({
    customerId: RESOURCE_ID.required(),
    lovedOneId: RESOURCE_ID.required(),
  }),
  body: OBJECT({
    bio: bioPage,
    education: educationPage,
    employment: employmentPage,
    family: familyPage,
    info: infoPage,
    service: servicePage,
  }),
});

export const get = OBJECT({
  params: OBJECT({
    lovedOneId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  params: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  params: OBJECT({
    lovedOneId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

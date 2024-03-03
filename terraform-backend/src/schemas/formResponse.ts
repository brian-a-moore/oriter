import { EMPTY_OBJECT, OBJECT, RESOURCE_ID } from '../config/constants/schemas';
import { bioPage, educationPage, employmentPage, familyPage, infoPage, servicePage } from './form/page';

export const create = OBJECT({
  query: OBJECT({
    customerId: RESOURCE_ID.required(),
    responseId: RESOURCE_ID.required(),
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
  query: OBJECT({
    responseId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

export const list = OBJECT({
  query: EMPTY_OBJECT,
  body: EMPTY_OBJECT,
});

export const remove = OBJECT({
  query: OBJECT({
    responseId: RESOURCE_ID.required(),
  }),
  body: EMPTY_OBJECT,
});

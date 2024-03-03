import Joi from 'joi';
import {
  EDUCATION_LEVEL,
  NUM_OF_YRS,
  OBJECT,
  RESOURCE_ID,
  STATE,
  STR_SHORT,
  YEAR,
} from '../../config/constants/schemas';

export const childItem = OBJECT({
  id: RESOURCE_ID,
  firstName: STR_SHORT.required(),
  lastName: STR_SHORT.required(),
  spouseName: STR_SHORT,
  city: STR_SHORT,
  state: STATE,
  isDeceased: Joi.boolean().required(),
});

export const employerItem = OBJECT({
  id: RESOURCE_ID,
  name: STR_SHORT.required(),
  city: STR_SHORT,
  state: STATE,
  numOfYears: NUM_OF_YRS,
  isRetired: Joi.boolean().required(),
});

export const friendItem = OBJECT({
  id: RESOURCE_ID,
  firstName: STR_SHORT.required(),
  lastName: STR_SHORT.required(),
});

export const institutionItem = OBJECT({
  id: RESOURCE_ID,
  name: STR_SHORT.required(),
  city: STR_SHORT,
  state: STATE,
  major: STR_SHORT,
  degree: EDUCATION_LEVEL,
  graduationYear: YEAR,
});

export const organizationItem = OBJECT({
  id: RESOURCE_ID,
  name: STR_SHORT.required(),
  position: STR_SHORT,
  numOfYears: NUM_OF_YRS,
});

export const siblingItem = OBJECT({
  id: RESOURCE_ID,
  firstName: STR_SHORT.required(),
  lastName: STR_SHORT.required(),
  spouseName: STR_SHORT,
  city: STR_SHORT,
  state: STATE,
  isDeceased: Joi.boolean().required(),
});

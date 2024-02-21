import Joi from 'joi';
import {
  BOOL,
  EDUCATION_LEVEL,
  ID,
  NUM_OF_YRS,
  STATE_OPTIONAL,
  STRING,
  STRING_OPTIONAL,
  YEAR,
} from './constants';

export const childItem = Joi.object({
  id: ID,
  firstName: STRING('First Name'),
  lastName: STRING('Last Name'),
  spouseName: STRING_OPTIONAL('Spouse Name'),
  city: STRING_OPTIONAL('City'),
  state: STATE_OPTIONAL,
  isDeceased: BOOL,
}).options({ stripUnknown: true });

export const employerItem = Joi.object({
  id: ID,
  name: STRING('Company Name'),
  city: STRING_OPTIONAL('City'),
  state: STATE_OPTIONAL,
  numOfYears: NUM_OF_YRS('Years Worked'),
  isRetired: BOOL,
}).options({ stripUnknown: true });

export const friendItem = Joi.object({
  id: ID,
  firstName: STRING('First Name'),
  lastName: STRING('Last Name'),
}).options({ stripUnknown: true });

export const institutionItem = Joi.object({
  id: ID,
  name: STRING('Name'),
  city: STRING_OPTIONAL('City'),
  state: STATE_OPTIONAL,
  major: STRING_OPTIONAL('Major'),
  degree: EDUCATION_LEVEL('Degree'),
  graduationYear: YEAR('Graduation Year'),
}).options({ stripUnknown: true });

export const organizationItem = Joi.object({
  id: ID,
  name: STRING('Name'),
  position: STRING_OPTIONAL('Position'),
  numOfYears: NUM_OF_YRS('Years Active'),
}).options({ stripUnknown: true });

export const siblingItem = Joi.object({
  id: ID,
  firstName: STRING('First Name'),
  lastName: STRING('Last Name'),
  spouseName: STRING_OPTIONAL('Spouse Name'),
  city: STRING_OPTIONAL('City'),
  state: STATE_OPTIONAL,
  isDeceased: BOOL,
}).options({ stripUnknown: true });

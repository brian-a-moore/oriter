import Joi from 'joi';
import {
  EMAIL,
  INCIDENT_LOCATION,
  MILITARY_BRANCH,
  NUM_OF_YRS,
  OBJECT,
  PARAGRAPH,
  STATE,
  STR_SHORT,
  TIME,
} from '../../constants/schemas';
import { IncidentLocation, MilitaryBranch } from '../../types/enums';
import { institutionItem, organizationItem, employerItem, childItem, siblingItem, friendItem } from './item';

export const bioPage = OBJECT({
  images: Joi.array()
    .allow(null)
    .items(Joi.alternatives().try(Joi.any(), Joi.allow(null)))
    .min(0)
    .max(12)
    .required(),
  firstName: STR_SHORT.required(),
  middleName: STR_SHORT.allow(''),
  lastName: STR_SHORT.required(),
  nickname: STR_SHORT.allow(''),
  placeOfIncident: INCIDENT_LOCATION,
  other: Joi.when('placeOfIncident', {
    is: Joi.string().valid(IncidentLocation.OTHER),
    then: STR_SHORT.required(),
    otherwise: Joi.string().valid(''),
  }),
  birth: OBJECT({
    date: Joi.string(),
    city: STR_SHORT.allow(''),
    state: STATE.allow('NONE'),
  }),
  death: OBJECT({
    date: Joi.string().required(),
    city: STR_SHORT.allow(''),
    state: STATE.allow('NONE'),
  }),
  parents: OBJECT({
    father: OBJECT({
      firstName: STR_SHORT.allow(''),
      lastName: STR_SHORT.allow(''),
      isDeceased: Joi.boolean(),
    }),
    mother: OBJECT({
      firstName: STR_SHORT.allow(''),
      lastName: STR_SHORT.allow(''),
      isDeceased: Joi.boolean(),
    }),
  }),
});

export const educationPage = OBJECT({
  institutions: Joi.array().items(institutionItem).min(0).max(10).required(),
  organizations: Joi.array().items(organizationItem).min(0).max(10).required(),
  militaryService: OBJECT({
    branch: Joi.when('position', {
      is: STR_SHORT.required(),
      then: MILITARY_BRANCH,
      otherwise: Joi.string().valid(MilitaryBranch.NONE).required(),
    }),
    position: STR_SHORT.allow(''),
    numOfYears: NUM_OF_YRS.required(),
  }).required(),
});

export const employmentPage = OBJECT({
  employers: Joi.array().items(employerItem).min(0).max(10).required(),
  hobbies: PARAGRAPH.allow(''),
  additionalInfo: PARAGRAPH.allow(''),
});

export const familyPage = OBJECT({
  spouse: OBJECT({
    firstName: STR_SHORT.allow(''),
    lastName: STR_SHORT.allow(''),
    numOfYears: NUM_OF_YRS.required(),
  }).required(),
  children: Joi.array().items(childItem).min(0).max(10).required(),
  siblings: Joi.array().items(siblingItem).min(0).max(10).required(),
  friends: Joi.array().items(friendItem).min(0).max(10).required(),
});

export const infoPage = OBJECT({
  firstName: STR_SHORT.required(),
  lastName: STR_SHORT.required(),
  email: EMAIL.required(),
  funeralHomeName: STR_SHORT.required(),
  city: STR_SHORT.required(),
  state: STATE.required(),
});

export const servicePage = OBJECT({
  service: OBJECT({
    name: STR_SHORT.required(),
    city: STR_SHORT.required(),
    state: STATE.required(),
    ministerName: STR_SHORT.required(),
    date: STR_SHORT.required(),
    time: TIME.required(),
  }),
  viewing: OBJECT({
    name: STR_SHORT.required(),
    city: STR_SHORT.required(),
    state: STATE.required(),
    startTime: TIME.required(),
    endTime: TIME.required(),
  }),
  repass: OBJECT({
    name: STR_SHORT.required(),
    city: STR_SHORT.required(),
    state: STATE.required(),
  }),
});

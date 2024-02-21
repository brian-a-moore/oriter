import Joi from 'joi';
import { IncidentLocation, MilitaryBranch } from '../enums';
import {
  DATE,
  FILE,
  INCIDENT_LOCATION,
  MILITARY_BRANCH,
  NUM_OF_YRS,
  PARAGRAPH_OPTIONAL,
  STATE,
  STATE_OPTIONAL,
  STRING,
  STRING_OPTIONAL,
  TIME,
} from './constants';
import {
  childItem,
  employerItem,
  friendItem,
  institutionItem,
  organizationItem,
  siblingItem,
} from './items';

export const bioResolver = Joi.object({
  images: Joi.array()
    .allow(null)
    .items(Joi.alternatives().try(FILE, Joi.allow(null)))
    .min(0)
    .max(12)
    .required(),
  firstName: STRING('First Name'),
  middleName: STRING_OPTIONAL('Middle Name'),
  lastName: STRING('Last Name'),
  nickname: STRING_OPTIONAL('Nickname'),
  placeOfIncident: INCIDENT_LOCATION,
  other: Joi.when('placeOfIncident', {
    is: Joi.string().valid(IncidentLocation.OTHER),
    then: STRING('Other'),
    otherwise: STRING_OPTIONAL('Other'),
  }),
  birth: Joi.object({
    date: DATE,
    city: STRING_OPTIONAL('City of Birth'),
    state: STATE_OPTIONAL,
  }).options({ stripUnknown: true }),
  death: Joi.object({
    date: DATE,
    city: STRING_OPTIONAL('City of Death'),
    state: STATE_OPTIONAL,
  }).options({ stripUnknown: true }),
  parents: Joi.object({
    father: Joi.object({
      firstName: STRING_OPTIONAL("Father's First Name"),
      lastName: STRING_OPTIONAL("Fathers's Last Name"),
      isDeceased: Joi.boolean(),
    }).options({ stripUnknown: true }),
    mother: Joi.object({
      firstName: STRING_OPTIONAL("Mother's First Name"),
      lastName: STRING_OPTIONAL("Mother's Last Name"),
      isDeceased: Joi.boolean(),
    }).options({ stripUnknown: true }),
  }).options({ stripUnknown: true }),
}).options({ stripUnknown: true });

export const educationResolver = Joi.object({
  institutions: Joi.array().items(institutionItem).min(0).max(10).required(),
  organizations: Joi.array().items(organizationItem).min(0).max(10).required(),
  militaryService: Joi.object({
    branch: Joi.when('position', {
      is: STRING('Position'),
      then: MILITARY_BRANCH,
      otherwise: Joi.string().valid(MilitaryBranch.NONE).required(),
    }),
    position: STRING_OPTIONAL('Position'),
    numOfYears: NUM_OF_YRS('Years of Service'),
  })
    .required()
    .options({ stripUnknown: true }),
}).options({ stripUnknown: true });

export const employmentResolver = Joi.object({
  employers: Joi.array().items(employerItem).min(0).max(10).required(),
  hobbies: PARAGRAPH_OPTIONAL('Hobbies'),
  additionalInfo: PARAGRAPH_OPTIONAL('Additional Info'),
});

export const familyResolver = Joi.object({
  spouse: Joi.object({
    firstName: STRING_OPTIONAL('First Name'),
    lastName: STRING_OPTIONAL('Last Name'),
    numOfYears: NUM_OF_YRS('Years Together'),
  })
    .required()
    .options({ stripUnknown: true }),
  children: Joi.array().items(childItem).min(0).max(10).required(),
  siblings: Joi.array().items(siblingItem).min(0).max(10).required(),
  friends: Joi.array().items(friendItem).min(0).max(10).required(),
});

export const infoResolver = Joi.object({
  firstName: STRING('First Name'),
  lastName: STRING('Last Name'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'E-mail must be a valid e-mail',
      'string.empty': 'E-mail is required',
      'any.required': 'E-mail is required',
    })
    .required(),
  funeralHomeName: STRING('Funeral Home Name'),
  city: STRING('City'),
  state: STATE,
}).options({ stripUnknown: true });

export const serviceResolver = Joi.object({
  service: Joi.object({
    name: STRING('Church/Funeral Home'),
    city: STRING('City'),
    state: STATE,
    ministerName: STRING("Minister's Name"),
    date: DATE,
    time: TIME,
  }).options({ stripUnknown: true }),
  viewing: Joi.object({
    name: STRING('Church/Funeral Home'),
    city: STRING('City'),
    state: STATE,
    startTime: TIME,
    endTime: TIME,
  }).options({ stripUnknown: true }),
  repass: Joi.object({
    name: STRING('Church/Funeral Home'),
    city: STRING('City'),
    state: STATE,
  }).options({ stripUnknown: true }),
});

export const masterForm = Joi.object({
  bio: bioResolver,
  education: educationResolver,
  employment: employmentResolver,
  family: familyResolver,
  info: infoResolver,
  service: serviceResolver,
}).options({ stripUnknown: true });

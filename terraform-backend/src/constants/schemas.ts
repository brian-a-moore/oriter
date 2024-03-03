import Joi from 'joi';
import states from './states';
import { EducationLevel, IncidentLocation, MilitaryBranch } from '../types/enums';

export const EDUCATION_LEVEL = Joi.string().valid(
  ...Object.values(EducationLevel).filter((v) => v !== EducationLevel.NONE),
);
export const EMAIL = Joi.string().min(5).max(64).email();
export const EMPTY_OBJECT = Joi.object({}).options({ stripUnknown: true });
export const INCIDENT_LOCATION = Joi.string().valid(
  ...Object.values(IncidentLocation).filter((v) => v !== IncidentLocation.NONE),
);
export const MILITARY_BRANCH = Joi.string().valid(
  ...Object.values(MilitaryBranch).filter((v) => v !== MilitaryBranch.NONE),
);
export const NUM_OF_YRS = Joi.number().min(0).max(99);
export const OBJECT = (args: Joi.PartialSchemaMap<any> | undefined) => Joi.object(args).options({ stripUnknown: true });
export const PARAGRAPH = Joi.string().min(1).max(2048).allow('');
export const PHONE_NUMBER = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/);
export const RESOURCE_ID = Joi.string().uuid();
export const STATE = Joi.array()
  .min(0)
  .max(10)
  .unique()
  .items(
    Joi.string()
      .min(2)
      .max(2)
      .valid(...states.map((s) => s.code)),
  );
export const STR_SHORT = Joi.string().min(1).max(64);
export const STR_MED = Joi.string().min(1).max(128);
export const STR_LONG = Joi.string().min(1).max(256);
export const TIME = Joi.string()
  .min(5)
  .max(5)
  .regex(/^\d{2}:\d{2}$/);
export const TOKEN = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
export const YEAR = Joi.number().integer().min(1900).max(2100);
export const ZIP_CODE = Joi.string()
  .length(5)
  .pattern(/^[0-9]+$/);

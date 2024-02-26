import Joi from 'joi';
import states from '../../constants/states';
import { masterForm } from './form';

const STATES: string[] = states.map((s) => s.code);

const email = Joi.string().min(6).max(64).email().required();
const shortStr = Joi.string().min(1).max(128).required();
const longStr = Joi.string().min(1).max(256).required();

export const loginRequest = Joi.object({
  email,
  code: Joi.string().min(6).max(6).required(),
}).options({ stripUnknown: true });

export const registerRequest = Joi.object({
  addressLine1: longStr,
  addressLine2: shortStr.optional(),
  city: shortStr,
  state: Joi.string()
    .min(2)
    .max(2)
    .valid(...STATES).required(),
  email,
  funeralHomeName: longStr,
  primaryContactFirstName: shortStr,
  primaryContactLastName: shortStr,
  primaryContactPhoneNumber: Joi.string().min(10).max(10).required(),
}).options({ stripUnknown: true });

export const submitRequest = masterForm;

export const verifyFormLinkRequest = Joi.object({
  funeralHomeCode: Joi.string().min(7).max(7).required(),
  customerId: Joi.string().uuid().required(),
  responseId: Joi.string().uuid().required(),
}).options({ stripUnknown: true });

export const verifyTokenRequest = Joi.object({
  token: Joi.string().required(),
}).options({ stripUnknown: true });

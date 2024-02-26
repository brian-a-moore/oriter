import Joi from 'joi';
import states from '../../constants/states';
import { masterForm } from './form';

const STATES: string[] = states.map((s) => s.code);

const email = Joi.string().min(6).max(64).email();
const shortStr = Joi.string().min(1).max(128);
const longStr = Joi.string().min(1).max(256);

export const loginRequest = Joi.object({
  email,
  code: Joi.string().min(6).max(6).required(),
}).options({ stripUnknown: true });

export const registerRequest = Joi.object({
  addressLine1: longStr,
  addressLine2: shortStr,
  city: shortStr,
  state: Joi.string()
    .min(2)
    .max(2)
    .valid(...STATES),
  email,
  funeralHomeName: longStr,
  primaryContactFirstName: shortStr,
  primaryContactLastName: shortStr,
  primaryContactPhoneNumber: Joi.string().min(10).max(10),
}).options({ stripUnknown: true });

export const submitRequest = masterForm;

export const verifyFormLinkRequest = Joi.object({
  funeralHomeCode: Joi.string().min(7).max(7).required(),
  customerId: Joi.string(),
  requestId: Joi.string(),
}).options({ stripUnknown: true });

export const verifyTokenRequest = Joi.object({
  token: Joi.string(),
}).options({ stripUnknown: true });

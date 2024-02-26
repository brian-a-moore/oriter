import Joi from 'joi';
import states from '../../constants/states';
import { masterForm } from './form';

const STATES: string[] = states.map((s) => s.code);

const email = Joi.string().min(6).max(64).email().required();
const shortStr = Joi.string().min(1).max(128).required();
const longStr = Joi.string().min(1).max(256).required();
const phoneNumber = Joi.string().min(10).max(10).required();
const uuid = Joi.string().uuid().required();

export const addCustomerRequest = Joi.object({
  funeralHomeId: uuid,
  firstName: shortStr,
  lastName: shortStr,
  email,
  phoneNumber,
});

export const generateLinkRequest = Joi.object({
  funeralHomeId: uuid,
  customerId: uuid,
});

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
    .valid(...STATES)
    .required(),
  email,
  phoneNumber,
  funeralHomeName: longStr,
  firstName: shortStr,
  lastName: shortStr,
}).options({ stripUnknown: true });

export const submitRequest = Joi.object({
  customerId: uuid,
  responseId: uuid,
  response: masterForm,
});

export const verifyFormLinkRequest = Joi.object({
  customerId: uuid,
  responseId: uuid,
}).options({ stripUnknown: true });

export const verifyTokenRequest = Joi.object({
  token: Joi.string().required(),
}).options({ stripUnknown: true });

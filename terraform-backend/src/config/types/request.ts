import { State } from './enums';
import { MasterForm } from './form';

export type LoginRequest = {
  email: string;
  code: string;
};

export type RegisterRequest = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: State;
  email: string;
  funeralHomeName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type SubmitRequest = MasterForm;

export type VerifyFormLinkRequest = {
  funeralHomeCode: string;
  customerId: string;
  requestId: string;
};

export type VerifyTokenRequest = {
  token: string;
};

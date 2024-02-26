import { ResponseRecord } from './form';

export type FuneralHome = {
  pk: string; // funeralHomeId
  sk: string; // FUNERAL_HOME
  code: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  email: string;
  phoneNumber: string;
  primaryContactFirstName: string;
  primaryContactLastName: string;
};

export type Customer = {
  pk: string; // customerId
  sk: string; // CUSTOMER#funeralHomeId
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type Response = {
  pk: string; // responseId
  sk: string; // RESPONSE#customerId
} & ResponseRecord;

import { State } from './enums';
import { FilteredMasterForm, MasterForm } from './form';

export type AddCustomerRequest = {
  funeralHomeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type AddCustomerResponse = {
  customerId: string;
}

export type GenerateLinkRequest = {
  funeralHomeId: string;
  customerId: string;
}

export type GenerateLinkResponse = {
  link: string;
}

export type LoginRequest = {
  email: string;
  code: string;
};

export type LoginResponse = {
  funeralHomeId: string;
  funeralHomeCode: string;
  funeralHomeName: string;
}

export type RegisterRequest = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: State;
  email: string;
  phoneNumber: string;
  funeralHomeName: string;
  firstName: string;
  lastName: string;
};

export type RegisterResponse = {
  funeralHomeId: string;
  funeralHomeCode: string;
  funeralHomeName: string;
}

export type SubmitRequest = {
  funeralHomeCode: string;
  customerId: string;
  responseId: string;
  response: MasterForm;
};

export type VerifyFormLinkRequest = {
  funeralHomeCode: string;
  customerId: string;
  responseId: string;
};

export type VerifyTokenRequest = {
  token: string;
};

export type VerifyTokenResponse = {
  refreshToken: string;
  funeralHomeId: string;
  funeralHomeCode: string;
  funeralHomeName: string;
}

export type ApiResponse<D = any> = {
  statusCode: number;
  body: {
    data?: D;
    message?: string;
    error?: string;
  };
};

export type FuneralHomeRecord = {
  PK: string;
  SK: string;
  funeralHomeCode: string;
} & RegisterRequest;

export type CustomerRecord = {
  PK: string;
  SK: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};
export type ResponseRecord = {
  PK: string;
  SK: string;
} & FilteredMasterForm;

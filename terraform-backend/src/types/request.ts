import { State } from "./enums";
import { MasterForm } from "./form";

export type LoginRequest = {
    query: null;
    params: null;
    body: {
        email: string;
        code: string;
    }
};

export type RegisterRequest = {
    query: null;
    params: null;
    body: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: State;
        email: string;
        funeralHomeName: string;
        primaryContactFirstName: string;
        primaryContactLastName: string;
        primaryContactPhoneNumber: string;
    }
}

export type SubmitRequest = {
    query: null;
    params: null;
    body: MasterForm;
}

export type VerifyFormLinkRequest = {
    query: null;
    params: null;
    body: {
        funeralHomeCode: string;
        customerId: string;
        requestId: string;
    }
}

export type VerifyTokenRequest = {
    query: null;
    params: null;
    body: {
        token: string;
    }
}
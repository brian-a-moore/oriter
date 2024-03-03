import { EducationLevel, IncidentLocation, MilitaryBranch, State } from './enums';

type Child = {
  id: string;
  firstName: string;
  lastName: string;
  spouseName: string;
  city: string;
  state: State;
  isDeceased: boolean;
};

type Employer = {
  id: string;
  name: string;
  city: string;
  state: State;
  numOfYears: number;
  isRetired: boolean;
};

type Friend = {
  id: string;
  firstName: string;
  lastName: string;
};

type FormBio = {
  images: File[] | null;
  firstName: string;
  middleName: string;
  lastName: string;
  nickname: string;
  placeOfIncident: IncidentLocation;
  other: string;
  birth: {
    date: string;
    city: string;
    state: State;
  };
  death: {
    date: string;
    city: string;
    state: State;
  };
  parents: {
    father: {
      firstName: string;
      lastName: string;
      isDeceased: boolean;
    };
    mother: {
      firstName: string;
      lastName: string;
      isDeceased: boolean;
    };
  };
};

type FormEducation = {
  institutions: Institution[];
  organizations: Organization[];
  militaryService: {
    branch: MilitaryBranch;
    position: string;
    numOfYears: number;
    isRetired: boolean;
  };
};

type FormEmployment = {
  employers: Employer[];
  hobbies: string;
  additionalInfo: string;
};

type FormFamily = {
  spouse: {
    firstName: string;
    lastName: string;
    numOfYears: number;
  };
  children: Child[];
  siblings: Sibling[];
  friends: Friend[];
};

type FormInfo = {
  firstName: string;
  lastName: string;
  email: string;
  funeralHomeName: string;
  city: string;
  state: State;
};

type FormService = {
  service: {
    name: string;
    city: string;
    state: State;
    ministerName: string;
    date: string;
    time: string;
  };
  viewing: {
    name: string;
    city: string;
    state: State;
    startTime: string;
    endTime: string;
  };
  repass: {
    name: string;
    city: string;
    state: State;
  };
};

type Institution = {
  id: string;
  name: string;
  city: string;
  state: State;
  major: string;
  degree: EducationLevel;
  graduationYear: number;
};

export type MasterForm = {
  bio: FormBio;
  education: FormEducation;
  employment: FormEmployment;
  family: FormFamily;
  info: FormInfo;
  service: FormService;
};

export type FilteredMasterForm = {
  bio: Omit<FormBio, 'images'>;
  education: FormEducation;
  employment: FormEmployment;
  family: FormFamily;
  info: FormInfo;
  service: FormService;
};

type Organization = {
  id: string;
  name: string;
  position: string;
  numOfYears: number;
};

type Sibling = {
  id: string;
  firstName: string;
  lastName: string;
  spouseName: string;
  city: string;
  state: State;
  isDeceased: boolean;
};

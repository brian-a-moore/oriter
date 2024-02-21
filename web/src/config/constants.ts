import { generateId } from '../helpers/generate';
import {
  EducationLevel,
  IncidentLocation,
  MilitaryBranch,
  State,
} from './enums';
import {
  Child,
  Employer,
  FormBio,
  FormEducation,
  FormEmployment,
  FormFamily,
  FormInfo,
  FormService,
  Friend,
  Institution,
  MasterForm,
  Organization,
  Sibling,
} from './types';

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
};

const DEFAULT_DATE = new Date().toISOString().split('T')[0];

export const DEFAULT_CHILD: Omit<Child, 'id'> = {
  firstName: '',
  lastName: '',
  spouseName: '',
  city: '',
  state: State.NONE,
  isDeceased: false,
};

export const DEFAULT_EMPLOYER: Omit<Employer, 'id'> = {
  name: '',
  city: '',
  state: State.NONE,
  numOfYears: 0,
  isRetired: false,
};

export const DEFAULT_FRIEND: Omit<Friend, 'id'> = {
  firstName: '',
  lastName: '',
};

export const DEFAULT_INSTITUTION: Omit<Institution, 'id'> = {
  name: '',
  city: '',
  state: State.NONE,
  major: '',
  degree: EducationLevel.NONE,
  graduationYear: 1999,
};

export const DEFAULT_ORGANIZATION: Omit<Organization, 'id'> = {
  name: '',
  position: '',
  numOfYears: 0,
};

export const DEFAULT_SIBLING: Omit<Sibling, 'id'> = {
  firstName: '',
  lastName: '',
  spouseName: '',
  city: '',
  state: State.NONE,
  isDeceased: false,
};


// export const ENDPOINT = 'https://bs4janalnr2huqnviu4rf7q4gq0chvcf.lambda-url.us-east-1.on.aws/';
export const ENDPOINT = 'http://localhost:3000';

export const FORM_BIO: FormBio = {
  images: null,
  firstName: '',
  middleName: '',
  lastName: '',
  nickname: '',
  placeOfIncident: IncidentLocation.NONE,
  other: '',
  birth: {
    date: DEFAULT_DATE,
    city: '',
    state: State.NONE,
  },
  death: {
    date: DEFAULT_DATE,
    city: '',
    state: State.NONE,
  },
  parents: {
    father: {
      firstName: '',
      lastName: '',
      isDeceased: false,
    },
    mother: {
      firstName: '',
      lastName: '',
      isDeceased: false,
    },
  },
};

export const FORM_EDUCATION: FormEducation = {
  institutions: [],
  organizations: [],
  militaryService: {
    branch: MilitaryBranch.NONE,
    position: '',
    numOfYears: 0,
    isRetired: false,
  },
};

export const FORM_EMPLOYMENT: FormEmployment = {
  employers: [],
  hobbies: '',
  additionalInfo: '',
};

export const FORM_FAMILY: FormFamily = {
  spouse: {
    firstName: '',
    lastName: '',
    numOfYears: 0,
  },
  children: [],
  siblings: [],
  friends: [],
};

export const FORM_INFO: FormInfo = {
  firstName: '',
  lastName: '',
  email: '',
  funeralHomeName: '',
  city: '',
  state: State.NONE,
};

export const FORM_SERVICE: FormService = {
  service: {
    name: '',
    city: '',
    state: State.NONE,
    ministerName: '',
    date: DEFAULT_DATE,
    time: '08:00',
  },
  viewing: {
    name: '',
    city: '',
    state: State.NONE,
    startTime: '09:00',
    endTime: '17:00',
  },
  repass: {
    name: '',
    city: '',
    state: State.NONE,
  },
};

export const FORM_STEPS = [
  'Info',
  'Bio',
  'Education',
  'Family',
  'Employment',
  'Service',
  'Review',
];

export const MASTER_FORM: MasterForm = {
  bio: FORM_BIO,
  education: FORM_EDUCATION,
  employment: FORM_EMPLOYMENT,
  family: FORM_FAMILY,
  info: FORM_INFO,
  service: FORM_SERVICE,
};

export const EXTENSIVE_FORM: MasterForm = {
  bio: {
    images: null,
    firstName: 'John',
    middleName: 'C.',
    lastName: 'Smith',
    nickname: 'JC',
    placeOfIncident: IncidentLocation.HOME,
    other: '',
    birth: {
      date: '1960-10-05',
      city: 'Los Angeles',
      state: State.CALIFORNIA,
    },
    death: {
      date: '2023-12-05',
      city: 'Brooklyn',
      state: State.NEW_YORK,
    },
    parents: {
      father: {
        firstName: 'Richard',
        lastName: 'Smith',
        isDeceased: true,
      },
      mother: {
        firstName: 'Cindy',
        lastName: 'Smith',
        isDeceased: false,
      },
    },
  },
  education: {
    institutions: [
      {
        id: generateId(),
        name: 'John M. Morehead',
        city: 'Eden',
        state: State.NORTH_CAROLINA,
        major: 'Computer Science',
        degree: EducationLevel.HIGH_SCHOOL,
        graduationYear: 1973,
      },
      {
        id: generateId(),
        name: 'University of North Carolina at Pembroke',
        city: 'Pembroke',
        state: State.NORTH_CAROLINA,
        major: 'Computer Science',
        degree: EducationLevel.BACHELORS,
        graduationYear: 1979,
      },
    ],
    organizations: [
      {
        id: generateId(),
        name: 'Humane Society',
        position: 'Director',
        numOfYears: 14,
      },
      {
        id: generateId(),
        name: 'Red Cross',
        position: 'Manager',
        numOfYears: 3,
      },
    ],
    militaryService: {
      branch: MilitaryBranch.NAVY,
      position: 'Admiral',
      numOfYears: 12,
      isRetired: true,
    },
  },
  employment: {
    employers: [
      {
        id: generateId(),
        name: 'United States Government',
        city: 'Alexandria',
        state: State.VIRGINIA,
        numOfYears: 12,
        isRetired: true,
      },
      {
        id: generateId(),
        name: 'Federal Bureau of Investigations',
        city: 'Langley',
        state: State.VIRGINIA,
        numOfYears: 9,
        isRetired: false,
      },
    ],
    hobbies:
      'Kayaking, Hiking, River Dancing, Collecting Bottle Caps, Basketball, Knitting',
    additionalInfo:
      'He loved his family and did not want anyone to cry over him. He said, "Have fun, and eat good! Love you all!"',
  },
  family: {
    spouse: {
      firstName: 'Ginger',
      lastName: 'Ale',
      numOfYears: 52,
    },
    children: [
      {
        id: generateId(),
        firstName: 'Spencer',
        lastName: 'Smith',
        spouseName: 'Virginia',
        city: 'Boston',
        state: State.MASSACHUSETTS,
        isDeceased: false,
      },
      {
        id: generateId(),
        firstName: 'Frieda',
        lastName: 'Smith',
        spouseName: 'Deric',
        city: 'Chicago',
        state: State.ILLINOIS,
        isDeceased: true,
      },
    ],
    siblings: [
      {
        id: generateId(),
        firstName: 'Daniela',
        lastName: 'Tuttle',
        spouseName: 'Frank',
        city: 'Denver',
        state: State.COLORADO,
        isDeceased: false,
      },
      {
        id: generateId(),
        firstName: 'Emil',
        lastName: 'Smith',
        spouseName: 'Victoria',
        city: 'Phoenix',
        state: State.ARIZONA,
        isDeceased: true,
      },
    ],
    friends: [
      {
        id: generateId(),
        firstName: 'Lucas',
        lastName: 'Wright',
      },
      {
        id: generateId(),
        firstName: 'Andrew',
        lastName: 'Tanner',
      },
    ],
  },
  info: {
    firstName: 'Spencer',
    lastName: 'Smith',
    email: 'spencer.smith@gmail.com',
    funeralHomeName: "Warm Horizon's of Atlanta",
    city: 'Boston',
    state: State.MASSACHUSETTS,
  },
  service: {
    service: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
      ministerName: 'Paul Willis',
      date: '2023-12-09',
      time: '11:00',
    },
    viewing: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
      startTime: '09:00',
      endTime: '10:30',
    },
    repass: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
    },
  },
};

export const MINIMAL_FORM: MasterForm = {
  bio: {
    images: null,
    firstName: 'John',
    middleName: '',
    lastName: 'Smith',
    nickname: '',
    placeOfIncident: IncidentLocation.HOME,
    other: '',
    birth: {
      date: '1960-10-05',
      city: '',
      state: State.NONE,
    },
    death: {
      date: '2023-12-05',
      city: '',
      state: State.NONE,
    },
    parents: {
      father: {
        firstName: '',
        lastName: '',
        isDeceased: false,
      },
      mother: {
        firstName: '',
        lastName: '',
        isDeceased: false,
      },
    },
  },
  education: {
    institutions: [],
    organizations: [],
    militaryService: {
      branch: MilitaryBranch.NONE,
      position: '',
      numOfYears: 0,
      isRetired: false,
    },
  },
  employment: {
    employers: [],
    hobbies: '',
    additionalInfo: '',
  },
  family: {
    spouse: {
      firstName: '',
      lastName: '',
      numOfYears: 0,
    },
    children: [],
    siblings: [],
    friends: [],
  },
  info: {
    firstName: 'Spencer',
    lastName: 'Smith',
    email: 'spencer.smith@gmail.com',
    funeralHomeName: "Warm Horizon's of Atlanta",
    city: 'Boston',
    state: State.MASSACHUSETTS,
  },
  service: {
    service: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
      ministerName: 'Paul Willis',
      date: '2023-12-09',
      time: '11:00',
    },
    viewing: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
      startTime: '09:00',
      endTime: '10:30',
    },
    repass: {
      name: "Warm Horizon's of Atlanta",
      city: 'Atlanta',
      state: State.GEORGIA,
    },
  },
};

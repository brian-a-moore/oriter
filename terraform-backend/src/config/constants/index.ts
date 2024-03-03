export const DEFAULT_PORT = 8080;

export enum ENV_TYPE {
  LOCAL = 'local',
  DEV = 'development',
  TEST = 'test',
  PROD = 'production',
}

export const EXP_TIME = '30d';

export enum RESPONSE_TYPE {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export enum STATUS_CODE {
  OKAY = 200,
  NO_CONTENT = 204,
  BAD_INPUT = 400,
  NO_AUTH = 401,
  NOT_IMPLEMENTED = 501,
  NO_PERM = 403,
  NOT_FOUND = 404,
  CANT_PROCESS = 422,
  TOO_MANY_REQ = 429,
  SERVER_ERROR = 500,
}

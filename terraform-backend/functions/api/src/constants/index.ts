export const DEFAULT_PORT = 8080;

export enum ENV_TYPE {
  LOCAL = 'local',
  DEV = 'development',
  TEST = 'test',
  PROD = 'production',
}

export const EXP_TIME = '30d';

/**
 * Password Regex
 * This regex will match a password string that contains between 8 and 24 characters, at least one uppercase letter, at least one of the approved symbols, and only alphanumeric characters, uppercase letters, and the approved symbols.
 * Approved symbols: (!, @, #, $, %, ^, &, *)
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.{8,24}$)[a-zA-Z0-9!@#$%^&*()]*$/;

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

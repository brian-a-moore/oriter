import bcrypt from 'bcrypt';

export const hashString = async (str: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(str, saltRounds);
};

export const compareStrings = async (str: string, hashedStr: string): Promise<boolean> => {
  return bcrypt.compare(str, hashedStr);
};

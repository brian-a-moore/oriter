import jwt, { JwtPayload } from 'jsonwebtoken';

const EXP_TIME = '7d';
const { JWT_SECRET } = process.env;

export interface DecodedData extends JwtPayload {
  id: string;
  isAdmin: boolean;
}

export const createToken = (encodedData: { id: string; isAdmin: boolean }) => {
  try {
    return jwt.sign(encodedData, JWT_SECRET as string, { expiresIn: EXP_TIME });
  } catch (e: any | unknown) {
    throw new Error(`Cannot create token: ${e.message}`);
  }
};

export const verifyToken = (token: string): DecodedData => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as DecodedData;
  } catch (e: any | unknown) {
    throw new Error(`Cannot verify token: ${e.message}`);
  }
};

import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = '1d';

export const signJWT = (payload: object): string => {
  if (!JWT_SECRET) throw new Error('Missing JWT_SECRET');

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyJWT = (token: string) => {
  if (!JWT_SECRET) throw new Error('Missing JWT_SECRET');

  return jwt.verify(token, JWT_SECRET);
};

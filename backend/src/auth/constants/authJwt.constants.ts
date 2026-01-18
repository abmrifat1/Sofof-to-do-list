import * as jwt from 'jsonwebtoken';

export const authJwtConstants: { secret: jwt.Secret; expiresIn: string | number } = {
  secret: process.env.JWT_SECRET || 'sofofTechAuthJwtKey',
  expiresIn: process.env.JWT_EXPIRES_IN || 3600,
};
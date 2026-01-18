import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (!auth) throw new UnauthorizedException('Missing Auth header');

    const obj = String(auth).split(' ');
    if (obj?.length !== 2 || obj[0] !== 'Bearer') throw new UnauthorizedException('Invalid Authorization header');

    const token = obj[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'sofofTechAuthJwtKey');
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
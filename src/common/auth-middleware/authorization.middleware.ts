import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (authToken !== 'Bearer mysecrettoken') {
      return res.status(403).json({ message: 'Request Forbidden' });
    }

    next();
  }
}

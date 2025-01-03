import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import messages from '../common/messages';
import { authService } from '../services/Auth';
import { DecodedToken } from '../interfaces/DecodedToken';

export default function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new UnauthorizedError(messages.auth.noTokenProvided));
  try {
    const decoded = authService.verifyToken(token);
    if (typeof decoded === 'object' && 'id' in decoded) {
      req.user = decoded as DecodedToken;
      next();
    } else {
      next(new UnauthorizedError(messages.auth.invalidToken));
    }
  } catch (error) {
    next(new UnauthorizedError(messages.auth.invalidToken));
  }
}

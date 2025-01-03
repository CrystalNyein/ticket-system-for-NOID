import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import messages from '../common/messages';
import { authService } from '../services/Auth';
import { TUserRole } from '../common/types';

// Middleware to check for authorization based on roles
export const authorize = (roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    if (!decodedToken) return next(new UnauthorizedError(messages.auth.noTokenProvided));
    const currentUser = await authService.getUserFromToken(decodedToken.id);
    if (!currentUser || !roles.includes(currentUser.role!)) {
      return next(new UnauthorizedError(messages.auth.noPermission));
    }
  };
};

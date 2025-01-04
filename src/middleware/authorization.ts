import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import messages from '../common/messages';
import { TUserRole } from '../common/types';

// Middleware to check for authorization based on roles
export const authorize = (roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError(messages.auth.noTokenProvided)); // User not authenticated
    }
    if (!user.role || !roles.includes(user.role!)) {
      return next(new UnauthorizedError(messages.auth.noPermission));
    }
    next();
  };
};

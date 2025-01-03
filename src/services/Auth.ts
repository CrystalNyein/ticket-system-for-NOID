import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../interfaces/User';
import { userRepository } from '../repositories/User';
import { UserModel } from '../models';
import env from '../config/env';
import ConflictError from '../common/errors/types/ConflictError';
import { DecodedToken } from '../interfaces/DecodedToken';
import { userService } from './User';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import messages from '../common/messages';

class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError(messages.auth.loginFail);

    // Use the instance method to compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new UnauthorizedError(messages.auth.loginFail);
    }

    // If password matches, proceed with login logic
    const token = jwt.sign({ id: user.id }, env.jwtSecret as string, {
      expiresIn: env.jwtExpiresIn,
    });
    return { user, token };
  }
  verifyToken(token: string) {
    try {
      return jwt.verify(token, env.jwtSecret as string) as DecodedToken;
    } catch {
      throw new UnauthorizedError(messages.auth.invalidToken);
    }
  }
  async getUserFromToken(token: string): Promise<Partial<UserModel>> {
    const userId = this.verifyToken(token).id;
    return await userService.getMe(userId);
  }
}
export const authService = new AuthService();

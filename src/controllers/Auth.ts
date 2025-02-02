import { Request, Response } from 'express';
import { authService } from '../services/Auth';
import ResponseWrapper from '../utils/ResponseWrapper';
import messages from '../common/messages';

// Login Controller
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier, password } = req.body;
    const user = await authService.login(identifier, password);
    return ResponseWrapper.success(res, user, messages.auth.loginSuccess);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

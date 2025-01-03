import { Request, Response } from 'express';
import { userRepository } from '../repositories/User';
import ResponseWrapper from '../utils/ResponseWrapper';
import { authService } from '../services/Auth';
import { userService } from '../services/User';
import messages from '../common/messages';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';

// Get the current user from token
export const getCurrentUserFromToken = async (authorization?: string) => {
  if (!authorization) {
    throw new UnauthorizedError(messages.auth.tokenRequired);
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError(messages.auth.invalidToken);
  }
  return await authService.getUserFromToken(token!);
};

// Get the current authenticated user (getMe)
export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const currentUser = await getCurrentUserFromToken(req.headers.authorization);
    return ResponseWrapper.success(res, currentUser, messages.model.retrieved('User'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const currentUser = await getCurrentUserFromToken(req.headers.authorization);
    const user = await userService.createUser(req.body, currentUser);
    return ResponseWrapper.success(res, user, messages.model.created('User'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const currentUser = await getCurrentUserFromToken();
    const users = await userService.getAllUsers(req.query, currentUser);
    return ResponseWrapper.success(res, users, messages.model.retrieved('Users'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUser = await getCurrentUserFromToken();
    const user = await userService.getUserById(id, currentUser);
    return ResponseWrapper.success(res, user, messages.model.created('User'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUser = await getCurrentUserFromToken();
    const updatedUser = await userService.updateUser(id, req.body, currentUser);
    return ResponseWrapper.success(res, updatedUser, messages.model.updated('User'));
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUser = await getCurrentUserFromToken();
    const result = await userService.deleteUser(id, currentUser);
    return ResponseWrapper.success(res, result, 'User deleted successfully', 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

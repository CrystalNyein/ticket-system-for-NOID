import ConflictError from '../common/errors/types/ConflictError';
import NotFoundError from '../common/errors/types/NotFoundError';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { UserAttributes, UserCreateAttributes } from '../interfaces/User';
import { UserModel } from '../models';
import { userRepository } from '../repositories/User';

class UserService {
  // Helper function to check for conflicts in user email
  async checkUserConflicts(userData: Partial<UserModel>, isUpdate: boolean = false) {
    // Check if a user with the same email already exists
    const existingUser = await userRepository.findByEmail(userData.email!);
    if (existingUser && (!isUpdate || existingUser.id !== userData.id)) {
      throw new ConflictError(messages.model.conflict('User', 'email'));
    }
  }

  // Helper function to fetch user by ID
  private async getUserByIdOrFail(id: string): Promise<UserAttributes> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(messages.model.notFound('User'));
    }
    return user;
  }
  // Fetch the details of the currently authenticated user
  async getMe(userId: string): Promise<UserAttributes> {
    return this.getUserByIdOrFail(userId);
  }

  // Create a new user (admin only)
  async createUser(userData: UserCreateAttributes, currentUser: Express.User) {
    // Only admin can create a user
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedError(messages.auth.createUser);
    }
    // Check for conflicts email before creating the user
    await this.checkUserConflicts(userData);

    // Create the user using the repository
    const newUser = await userRepository.create(userData);
    return newUser;
  }

  // Get all users (admin only)
  async getAllUsers(query: any, currentUser: Express.User) {
    // Only admin can create a user
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedError(messages.auth.createUser);
    }

    const filters = buildFilters(query, UserModel.filterableColumns, UserModel.searchableColumns);

    // Fetch users with generated filters
    const users = await userRepository.findAll(filters);
    if (!users || users.length === 0) {
      throw new NotFoundError(messages.model.notFound('Users'));
    }
    return users;
  }

  // Get user by ID (admin or the user themselves can access)
  async getUserById(id: string, currentUser: Express.User) {
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedError(messages.auth.getUser);
    }
    const user = await this.getUserByIdOrFail(id);
    return user;
  }

  // Update an existing user by ID (admin only or the user themselves)
  async updateUser(id: string, updatedData: Partial<UserModel>, currentUser: Express.User) {
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedError(messages.auth.getUser);
    }
    const user = await this.getUserByIdOrFail(id);
    // Check for conflicts email before updating the user
    await this.checkUserConflicts(updatedData, true);

    const [updatedRows] = await userRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('User'));
    }
    // Fetch the updated user to return the full entity
    const updatedUser = await this.getUserByIdOrFail(id);
    return updatedUser;
  }

  // Delete an user by ID (admin only)
  async deleteUser(id: string, currentUser: Express.User) {
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedError(messages.auth.deleteUser);
    }
    const user = await this.getUserByIdOrFail(id);
    await userRepository.delete(id);
    return { id };
  }
}
export const userService = new UserService();

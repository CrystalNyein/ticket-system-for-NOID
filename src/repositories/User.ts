import { Op } from 'sequelize';
import { UserCreateAttributes } from '../interfaces/User';
import { UserModel } from '../models';

class UserRepository {
  async findByEmail(email: string) {
    return await UserModel.findOne({ where: { email } });
  }
  // Find all users with optional filters, pagination, and sorting
  async findAll(filters: any) {
    return await UserModel.findAll(filters);
  }
  async findById(id: string) {
    return await UserModel.findByPk(id);
  }
  async create(data: UserCreateAttributes) {
    return await UserModel.create(data);
  }
  async update(id: string, updatedData: Partial<UserModel>) {
    return await UserModel.update(updatedData, { where: { id } });
  }
  async delete(id: string) {
    return await UserModel.destroy({ where: { id } });
  }
}
export const userRepository = new UserRepository();

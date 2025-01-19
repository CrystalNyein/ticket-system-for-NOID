import { Optional } from 'sequelize';
import { TUserRole } from '../common/types';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserCreateAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'password'> {}

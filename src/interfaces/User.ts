import { Optional } from 'sequelize';
import { TUserRole } from '../common/types';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  created_at?: Date;
  updated_at?: Date;
}
export interface UserCreateAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'password'> {}

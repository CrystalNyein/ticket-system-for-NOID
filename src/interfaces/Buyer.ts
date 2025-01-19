import { Optional } from 'sequelize';

export interface BuyerAttributes {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface BuyerCreateAttributes extends Optional<BuyerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

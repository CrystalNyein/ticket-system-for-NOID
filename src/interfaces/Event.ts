import { Optional } from 'sequelize';

export interface EventAttributes {
  id: string;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  isRandom: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface EventCreateAttributes extends Optional<EventAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

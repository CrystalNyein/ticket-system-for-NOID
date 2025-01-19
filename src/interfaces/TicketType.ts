import { Optional } from 'sequelize';

export interface TicketTypeAttributes {
  id: string;
  typeCode: string;
  name: string;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketTypeCreateAttributes extends Optional<TicketTypeAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

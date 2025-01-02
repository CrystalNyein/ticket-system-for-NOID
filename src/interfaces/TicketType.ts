import { Optional } from 'sequelize';

export interface TicketTypeAttributes {
  id: string;
  type_code: string;
  name: string;
  description: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface TicketTypeCreateAttributes extends Optional<TicketTypeAttributes, 'id' | 'created_at' | 'updated_at'> {}

import { Optional } from 'sequelize';

export interface EventAttributes {
  id: string;
  name: string;
  description: string | null;
  start_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;
}
export interface EventCreateAttributes extends Optional<EventAttributes, 'id' | 'created_at' | 'updated_at'> {}

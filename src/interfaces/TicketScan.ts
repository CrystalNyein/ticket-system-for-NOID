import { Optional } from 'sequelize';

export interface TicketScanAttributes {
  id: string;
  ticketId: string;
  scanDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketScanCreateAttributes extends Optional<TicketScanAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

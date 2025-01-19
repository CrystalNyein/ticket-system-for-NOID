import { Optional } from 'sequelize';
import { TTicketStatus } from '../common/types';

export interface TicketAttributes {
  id: string;
  ticketCode: string;
  eventId: string;
  ticketTypeCode: string;
  status: TTicketStatus;
  buyerId: string | null;
  qrCodePath: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketCreateAttributes extends Optional<TicketAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

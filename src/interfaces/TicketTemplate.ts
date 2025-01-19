import { Optional } from 'sequelize';

export interface TicketTemplateAttributes {
  id: string;
  eventId: string;
  ticketTypeCode: string;
  path: string;
  filename: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketTemplateCreateAttributes extends Optional<TicketTemplateAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

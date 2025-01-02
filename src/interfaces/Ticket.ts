import { Optional } from 'sequelize';

export interface TicketAttributes {
  id: string;
  ticket_code: string;
  event_id: string;
  ticket_type_code: string;
  status: 'available' | 'sold' | 'revoked' | 'expired';
  buyer_id: string | null;
  qr_code_path: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface TicketCreateAttributes extends Optional<TicketAttributes, 'id' | 'created_at' | 'updated_at'> {}

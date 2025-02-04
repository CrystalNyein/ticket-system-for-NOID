export type TTicketStatus = 'available' | 'sold' | 'revoked' | 'expired';

export type TUserRole = 'admin' | 'event_manager' | 'staff';

export type TTicketSaleRandomRows = {
  'Ticket Code': string;
  'Buyer Name': string;
  'Buyer Phone': string;
  'Buyer Email': string;
};

export type TTicketSaleSequenceRows = {
  'Ticket Type': string;
  'Buyer Name': string;
  'Buyer Phone': string;
  'Buyer Email': string;
  'Ticket From': string;
  'Ticket To': string;
};

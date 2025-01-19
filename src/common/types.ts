export type TTicketStatus = 'available' | 'sold' | 'revoked' | 'expired';

export type TUserRole = 'admin' | 'event_manager' | 'staff';

export type TTicketSaleRows = {
  'Ticket Code': string;
  'Buyer Name': string;
  'Buyer Phone': string;
  'Buyer Email': string;
};

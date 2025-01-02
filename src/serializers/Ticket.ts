import TicketModel from '../models/Ticket';

class TicketSerializer {
  serialize(ticket: TicketModel) {
    return {
      id: ticket.id,
      ticket_code: ticket.ticket_code,
      event_code: ticket.event_id,
      ticket_type_code: ticket.ticket_type_code,
      status: ticket.status,
      buyer_id: ticket.buyer_id,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    };
  }

  serializeMany(tickets: TicketModel[]) {
    return tickets.map((ticket) => this.serialize(ticket));
  }
}

export const ticketSerializer = new TicketSerializer();

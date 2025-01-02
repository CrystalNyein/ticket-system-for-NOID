import { TicketCreateAttributes } from '../interfaces/Ticket';
import { TicketModel } from '../models';

class TicketRepository {
  async create(ticketData: Partial<TicketModel>) {
    return await TicketModel.create(ticketData as TicketCreateAttributes);
  }
  async createBulkTickets(ticketData: TicketCreateAttributes[]): Promise<any[]> {
    try {
      const tickets = await TicketModel.bulkCreate(ticketData);
      return tickets;
    } catch (error) {
      throw new Error(`Error creating tickets in bulk: ${(error as Error).message}`);
    }
  }
  async findAll() {
    return await TicketModel.findAll();
  }
  async findById(id: string) {
    return await TicketModel.findByPk(id);
  }
  async update(id: string, updatedData: Partial<TicketModel>) {
    return await TicketModel.update(updatedData, { where: { id } });
  }
  async delete(id: string) {
    return await TicketModel.destroy({ where: { id } });
  }
  async isTicketCodeUnique(eventId: string, ticketTypeCode: string, ticketCode: string) {
    const existingTicket = await TicketModel.findOne({
      where: {
        event_id: eventId,
        ticket_type_code: ticketTypeCode,
        ticket_code: ticketCode,
      },
    });
    return !existingTicket; // Return true if no ticket with the same combination exists
  }
  async getTicketCountByEventAndType(eventId: string, ticketTypeCode: string): Promise<number> {
    try {
      const count = await TicketModel.count({
        where: {
          event_id: eventId,
          ticket_type_code: ticketTypeCode,
        },
      });
      return count;
    } catch (error) {
      throw new Error(`Error counting tickets: ${(error as Error).message}`);
    }
  }
}
export const ticketRepository = new TicketRepository();

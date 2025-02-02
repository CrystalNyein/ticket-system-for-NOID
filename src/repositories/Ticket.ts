import { col, fn, literal, Op } from 'sequelize';
import { TicketCreateAttributes } from '../interfaces/Ticket';
import { EventModel, TicketModel } from '../models';

class TicketRepository {
  async create(ticketData: TicketCreateAttributes) {
    return await TicketModel.create(ticketData);
  }
  async createBulkTickets(ticketData: TicketCreateAttributes[]): Promise<any[]> {
    try {
      const tickets = await TicketModel.bulkCreate(ticketData);
      return tickets;
    } catch (error) {
      throw new Error(`Error creating tickets in bulk: ${(error as Error).message}`);
    }
  }
  // Find all tickets with optional filters, pagination, and sorting
  async findAll(filters: any) {
    return await TicketModel.findAll(filters);
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
      where: { eventId, ticketTypeCode, ticketCode },
    });
    return !existingTicket; // Return true if no ticket with the same combination exists
  }
  async getTicketCountByEventAndType(eventId: string, ticketTypeCode: string): Promise<number> {
    try {
      const count = await TicketModel.count({
        where: { eventId, ticketTypeCode },
      });
      return count;
    } catch (error) {
      throw new Error(`Error counting tickets: ${(error as Error).message}`);
    }
  }
  async findByCode(eventId: string, ticketTypeCode: string, ticketCode: string) {
    return await TicketModel.findOne({
      where: {
        eventId,
        ticketTypeCode,
        ticketCode,
      },
    });
  }
  async getTicketCount(eventId?: string) {
    const whereClause = eventId ? { eventId } : {};
    return await TicketModel.count({
      where: whereClause,
    });
  }
  async getSoldTicketCount(eventId?: string) {
    const whereClause = eventId ? { eventId } : {};
    return await TicketModel.count({
      where: { status: 'sold', ...whereClause },
    });
  }
  async getTicketCountByPeriod(startDate: Date, endDate: Date, sold: boolean = false): Promise<number> {
    const whereClause: any = {
      createdAt: {
        [Op.between]: [startDate, endDate], // Filter by date range
      },
    };

    if (sold) {
      whereClause.status = 'sold';
    }

    return await TicketModel.count({
      where: whereClause,
    });
  }

  async getTicketCountsByTicketCodeAndEvent() {
    return await TicketModel.findAll({
      attributes: [
        'eventId',
        [col('event.name'), 'eventName'],
        'ticketTypeCode',
        [fn('COUNT', col('Ticket.id')), 'Total Tickets'],
        [fn('COUNT', literal("CASE WHEN Ticket.status='sold' THEN 1 END")), 'Sold Tickets'],
      ],
      include: [
        {
          model: EventModel,
          as: 'event',
          attributes: [],
        },
      ],
      group: ['eventId', 'ticketTypeCode'],
      raw: true,
    });
  }

  async deleteTicketsByEventAndType(eventId: string, ticketTypeCode: string) {
    const whereClause: any = { eventId };
    if (ticketTypeCode !== 'ALL') {
      whereClause.ticketTypeCode = ticketTypeCode;
    }
    return await TicketModel.destroy({
      where: whereClause,
    });
  }
}
export const ticketRepository = new TicketRepository();

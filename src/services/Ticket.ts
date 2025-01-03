import NotFoundError from '../common/errors/types/NotFoundError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { TicketCreateAttributes } from '../interfaces/Ticket';
import { TicketModel } from '../models';
import { eventRepository } from '../repositories/Event';
import { ticketRepository } from '../repositories/Ticket';
import { generateQRCode } from '../utils/qrUtils';
import { generateRandomTicketCode } from '../utils/ticketUtils';

class TicketService {
  // Method to generate a single ticket (prepare ticket data)
  async generateTicket(eventId: string, ticketTypeCode: string, ticketTemplatePath: string): Promise<TicketCreateAttributes> {
    try {
      // Find the event by its ID
      const event = await eventRepository.findById(eventId);
      if (!event) {
        throw new NotFoundError(messages.model.notFound('Event'));
      }

      // Generate unique ticket code
      const ticketCode = await this.generateUniqueTicketCode(eventId, ticketTypeCode); // Generate unique ticket code

      // Create the ticket data for this ticket
      const newTicket: TicketCreateAttributes = {
        event_id: eventId,
        ticket_code: ticketCode,
        ticket_type_code: ticketTypeCode,
        status: 'available',
        buyer_id: null,
        qr_code_path: null,
      };

      // Generate QR Code
      const qrCodeFilePath = await generateQRCode(event.name, eventId, ticketTypeCode, ticketCode, ticketTemplatePath);
      newTicket.qr_code_path = qrCodeFilePath;

      return newTicket;
    } catch (error) {
      throw new Error(messages.ticket.error.generateTicket((error as Error).message));
    }
  }

  // Method to create and save the ticket in the database
  async createTicket(ticketData: TicketCreateAttributes) {
    return await ticketRepository.create(ticketData);
  }

  // Get all tickets
  async getAllTickets(query: any) {
    const filters = buildFilters(query, TicketModel.filterableColumns, TicketModel.searchableColumns);

    // Fetch tickets with generated filters
    const tickets = await ticketRepository.findAll(filters);
    if (!tickets || tickets.length === 0) {
      throw new NotFoundError(messages.model.notFound('Tickets'));
    }
    return tickets;
  }

  // Get ticket by ID
  async getTicketById(id: string) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    return ticket;
  }

  // Update an existing ticket by ID
  async updateTicket(id: string, updatedData: Partial<TicketModel>) {
    // Only allow status and buyer_id to be updated
    const allowedFields = ['status', 'buyer_id'];
    const invalidFields = Object.keys(updatedData).filter((key) => !allowedFields.includes(key));

    if (invalidFields.length > 0) {
      throw new Error(messages.ticket.error.invalidFieldsEdit(invalidFields.join(', ')));
    }

    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    const [updatedRows] = await ticketRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    // Fetch the updated ticket to return the full entity
    const updatedTicket = await this.getTicketById(id);
    return updatedTicket;
  }

  // Delete an ticket by ID
  async deleteTicket(id: string) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    await ticketRepository.delete(id);
    return { id };
  }

  // Method to generate and save bulk tickets
  async generateBulkTickets(eventId: string, ticketTypeCode: string, totalCount: number, ticketTemplatePath: string): Promise<any[]> {
    try {
      // Prepare an array to hold the ticket data
      const ticketData: TicketCreateAttributes[] = [];
      const ticketCreatedCount = await ticketRepository.getTicketCountByEventAndType(eventId, ticketTypeCode);
      for (let i = 0; i < totalCount - ticketCreatedCount; i++) {
        const ticket = await this.generateTicket(eventId, ticketTypeCode, ticketTemplatePath);
        // Add the ticket data (with the QR code path if needed)
        ticketData.push(ticket);
      }
      // Save all the tickets to the database in bulk
      return await ticketRepository.createBulkTickets(ticketData);
    } catch (error) {
      throw new Error(messages.ticket.error.generateBulkTickets((error as Error).message));
    }
  }

  // Function to generate a unique ticket code
  generateUniqueTicketCode = async (eventId: string, ticketTypeCode: string): Promise<string> => {
    let uniqueTicketCode = '';
    let isUnique = false;
    while (!isUnique) {
      uniqueTicketCode = generateRandomTicketCode();
      isUnique = await ticketRepository.isTicketCodeUnique(eventId, ticketTypeCode, uniqueTicketCode);
    }
    return uniqueTicketCode;
  };
}
export const ticketService = new TicketService();
